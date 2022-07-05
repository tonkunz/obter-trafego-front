import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.basicSettingsForm = this._fb.group({
      renovacaoAutomatica: [false, [Validators.required]],
      taxaRejeicao: [0, [Validators.required]],
      taxaRetorno: [0, [Validators.required]],
      tempoPagina: [0, [Validators.required]],
    });
  }
}
