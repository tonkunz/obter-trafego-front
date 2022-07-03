import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ReplaySubject,
  takeUntil,
  distinctUntilChanged,
  pairwise,
  startWith,
} from 'rxjs';

@Component({
  selector: 'third-step-form',
  templateUrl: 'third-step-form.component.html',
})
export class ThirdStepComponent implements OnInit, OnDestroy {
  @Input() basicSettingsData;

  targetSettingsForm: FormGroup;

  private _unsubscribeAll$ = new ReplaySubject();

  controllerFlag = null;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next(null);
    this._unsubscribeAll$.complete();
  }

  createForm(): void {
    this.targetSettingsForm = this._fb.group({
      taxaDesktop: [50, [Validators.required]],
      taxaMobile: [50, [Validators.required]],
      taxaOrganica: [0, [Validators.required]],
      taxaDireto: [0, [Validators.required]],
      taxaReferencia: [0, [Validators.required]],
    });

    // Desktop and Mobile Rate Handlers
    const { taxaDesktop, taxaMobile } = this.targetSettingsForm.controls;

    taxaDesktop.valueChanges
      .pipe(takeUntil(this._unsubscribeAll$), distinctUntilChanged())
      .subscribe((value: number) => taxaMobile.setValue(100 - value));

    taxaMobile.valueChanges
      .pipe(takeUntil(this._unsubscribeAll$), distinctUntilChanged())
      .subscribe((value: number) => taxaDesktop.setValue(100 - value));

    // Traffic Rates
    const { taxaOrganica, taxaDireto, taxaReferencia } =
      this.targetSettingsForm.controls;

    taxaOrganica.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll$),
        startWith(null),
        distinctUntilChanged(),
        pairwise()
      )
      .subscribe(([prev, value]) =>
        this.handleTaxas(taxaOrganica, prev, value)
      );

    taxaDireto.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll$),
        startWith(null),
        distinctUntilChanged(),
        pairwise()
      )
      .subscribe(([prev, value]) => this.handleTaxas(taxaDireto, prev, value));

    taxaReferencia.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll$),
        startWith(null),
        distinctUntilChanged(),
        pairwise()
      )
      .subscribe(([prev, value]) =>
        this.handleTaxas(taxaReferencia, prev, value)
      );
  }

  handleTaxas(controller, prevValue, nextValue) {
    if (this.controllerFlag !== controller) {
      return;
    }

    const { taxaOrganica, taxaDireto, taxaReferencia } =
      this.targetSettingsForm.controls;
    const controllers = [taxaOrganica, taxaDireto, taxaReferencia];
    const secundarios = controllers.filter((c) => c !== controller);
    let rest = 0;

    if (prevValue === null) {
      rest = 100 - nextValue;
      secundarios.forEach((c) => c.setValue(rest / 2));
      return;
    }

    rest = prevValue - nextValue;
    secundarios.forEach((c) => c.setValue(c.value + rest / 2));
  }

  onFocus(controller) {
    this.controllerFlag = this.targetSettingsForm.controls[controller];
  }

  handleBack(): void {
    // TODO: Voltar para o step anterior
  }

  handleSubmit(): void {
    console.log('submit');
  }
}
