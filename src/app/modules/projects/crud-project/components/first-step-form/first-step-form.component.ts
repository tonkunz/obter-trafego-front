import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isGoogleCode } from 'app/shared/validators/google-code.validator';
import { ProjectsFacade } from 'app/modules/projects/projects.facade';
import { BaseStepFormComponent } from '../base/base-step-form.component';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'first-step-form',
  templateUrl: 'first-step-form.component.html',
})
export class FirstStepFormComponent extends BaseStepFormComponent implements OnInit {
  firstStepForm: FormGroup;

  isLoadingProject: boolean = false;

  projectData;

  constructor(
    private _fb: FormBuilder,
    private _facade: ProjectsFacade,
    private _router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm(this._facade.getFirstStepInfo());

    this._facade.currentProject$
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(val =>  this.projectData = val);

    this._facade.isLoadingProject$
      .subscribe((val: boolean) => this.isLoadingProject = val);
  }

  createForm(data?: any): void {
    this.firstStepForm = this._fb.group({
      titulo: [data?.titulo || '', Validators.required],
      projetoTipoId: [data?.projetoTipoId || 0, Validators.required],
      googleCodigo: [
        data?.googleCodigo || '',
        [Validators.required, isGoogleCode()],
      ],
      siteUrl: [data?.siteUrl || '', Validators.required],
    });

    this.firstStepForm.valueChanges
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((val) => this._facade.updateFirstStepInfo(val));
  }

  handleSaveProject(): void {
    if (this.firstStepForm.invalid) return;
    this._facade.createNewProject();
  }

  handleBack(): void {
    this._router.navigate(['./projects']);
  }
}
