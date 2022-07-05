import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsFacade } from 'app/modules/projects/projects.facade';
import { ITargetSettingsData } from 'app/modules/projects/projects.types';
import { takeUntil, distinctUntilChanged, pairwise, startWith } from 'rxjs';
import { BaseStepFormComponent } from '../base/base-step-form.component';

@Component({
  selector: 'third-step-form',
  templateUrl: 'third-step-form.component.html',
})
export class ThirdStepComponent extends BaseStepFormComponent implements OnInit {
  @Input() basicSettingsData;

  targetSettingsForm: FormGroup;

  controllerFlag = null;

  constructor(private _fb: FormBuilder, private _facade: ProjectsFacade) {
    super();
  }

  ngOnInit() {
    this.createForm(this._facade.getThirdStepInfo());
  }

  createForm(initData: ITargetSettingsData): void {
    this.targetSettingsForm = this._fb.group({
      taxaDesktop: [initData.taxaDesktop || 50, [Validators.required]],
      taxaMobile: [initData.taxaMobile || 50, [Validators.required]],
      taxaOrganica: [initData.taxaOrganica || 0, [Validators.required]],
      taxaDireto: [initData.taxaDireto || 0, [Validators.required]],
      taxaReferencia: [initData.taxaReferencia || 0, [Validators.required]],
    });

    // Update changes on State
    this.targetSettingsForm.valueChanges.subscribe(
      (values: ITargetSettingsData) => this._facade.updateThirdStepInfo(values)
    );

    // Desktop and Mobile Rate Handlers
    const { taxaDesktop, taxaMobile } = this.targetSettingsForm.controls;

    taxaDesktop.valueChanges
      .pipe(takeUntil(this.unsubscribeAll$), distinctUntilChanged())
      .subscribe((value: number) => taxaMobile.setValue(100 - value));

    taxaMobile.valueChanges
      .pipe(takeUntil(this.unsubscribeAll$), distinctUntilChanged())
      .subscribe((value: number) => taxaDesktop.setValue(100 - value));

    // Traffic Rates
    const { taxaOrganica, taxaDireto, taxaReferencia } =
      this.targetSettingsForm.controls;

    taxaOrganica.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll$),
        startWith(null),
        distinctUntilChanged(),
        pairwise()
      )
      .subscribe(([prev, value]) =>
        this.handleTaxas(taxaOrganica, prev, value)
      );

    taxaDireto.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll$),
        startWith(null),
        distinctUntilChanged(),
        pairwise()
      )
      .subscribe(([prev, value]) => this.handleTaxas(taxaDireto, prev, value));

    taxaReferencia.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll$),
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
}
