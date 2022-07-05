import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsFacade } from 'app/modules/projects/projects.facade';
import { IBasicSettingsData } from 'app/modules/projects/projects.types';
import { takeUntil } from 'rxjs';
import { BaseStepFormComponent } from '../base/base-step-form.component';

@Component({
  selector: 'sec-step-form',
  templateUrl: 'sec-step-form.component.html'
})
export class SecStepComponent extends BaseStepFormComponent implements OnInit {
  @Input() basicSettingsData;

  basicSettingsForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _facade: ProjectsFacade,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm(this._facade.getSecStepInfo());
  }

  createForm(initData: IBasicSettingsData): void {
    this.basicSettingsForm = this._fb.group({
      renovacaoAutomatica: [initData.renovacaoAutomatica || false, [Validators.required]],
      taxaRejeicao: [initData.taxaRejeicao || 0, [Validators.required]],
      taxaRetorno: [initData.taxaRetorno || 0, [Validators.required]],
      tempoPagina: [initData.tempoPagina || "", [Validators.required]],
    });

    this.basicSettingsForm.valueChanges
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((values: IBasicSettingsData) => this._facade.updateSecStepInfo(values));
  }
}
