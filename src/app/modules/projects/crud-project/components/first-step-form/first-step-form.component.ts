import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreditItem } from 'app/core/services/credits/credits.types';
import { isGoogleCode } from 'app/shared/validators/google-code.validator';
import { IFirstStepForm } from './first-step-form.types';
import { Location } from '@angular/common';
import { ProjectsFacade } from 'app/modules/projects/projects.facade';
import { BaseStepFormComponent } from '../base/base-step-form.component';

@Component({
  selector: 'first-step-form',
  templateUrl: 'first-step-form.component.html',
})
export class FirstStepFormComponent extends BaseStepFormComponent implements OnInit, OnChanges {
  @Input() projectType: ICreditItem = {
    id: 0,
    acessos: 0,
    creditos: 0,
    nome: 'Undefined',
  };

  @Input() projectData;

  @Output() saveProject: EventEmitter<IFirstStepForm> = new EventEmitter();

  firstStepForm: FormGroup;

  isLoadingProject: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _location: Location,
    private _projectFacade: ProjectsFacade,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm(this.projectData || null);

    this._projectFacade.isLoadingProject$.subscribe((val: boolean) => this.isLoadingProject = val);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { projectData } = changes;

    if (projectData.currentValue !== projectData.previousValue) {
      this.createForm(this.projectData || null);
    }
  }

  createForm(data?: any): void {
    this.firstStepForm = this._fb.group({
      titulo: [data?.titulo || '', Validators.required],
      projectTypeId: [this.projectType?.id || 0, Validators.required],
      googleCodigo: [
        data?.googleCodigo || '',
        [Validators.required, isGoogleCode()],
      ],
      siteUrl: [data?.siteUrl || '', Validators.required],
    });
  }

  handleSaveProject(): void {
    if (this.firstStepForm.invalid) return;

    this.saveProject.emit(this.firstStepForm.value);
  }

  handleBack(): void {
    this._location.back();
  }
}
