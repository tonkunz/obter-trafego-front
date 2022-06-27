import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'sec-step-form',
  templateUrl: 'sec-step-form.component.html'
})
export class SecStepComponent implements OnInit {
  @Input() basicSettingsData;

  basicSettingsForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _location: Location,
  ) { }

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

  handleBack(): void {
    this._location.back();
  }

  handleSubmit(): void {
    console.log('submit');
  }
}
