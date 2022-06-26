import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreditItem } from 'app/core/services/credits/credits.types';
import { isGoogleCode } from 'app/shared/validators/google-code.validator';
import { IFirstStepForm } from './first-step-form.types';
import { Location } from '@angular/common';

@Component({
  selector: 'first-step-form',
  templateUrl: 'first-step-form.component.html',
})
export class FirstStepFormComponent implements OnInit {
  @Input() projectType: ICreditItem = {
    id: 0,
    acessos: 0,
    creditos: 0,
    nome: 'Undefined',
  };

  @Input() projectId: number = 0;

  @Input() projectData;

  @Output() saveNewProject: EventEmitter<IFirstStepForm> = new EventEmitter();

  firstStepForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.firstStepForm = this._fb.group({
      title: ['', Validators.required],
      projectTypeId: [this.projectType?.id || 0, Validators.required],
      googleCode: ['', [Validators.required, isGoogleCode()]],
      siteUrl: ['', Validators.required],
    });

    console.log('project Data: ', this.projectData);
  }

  handleSaveNewProject(): void {
    if (this.firstStepForm.invalid) {
      return;
    }

    this.saveNewProject.emit(this.firstStepForm.value);
  }

  handleBack(): void {
    this._location.back();
  }
}
