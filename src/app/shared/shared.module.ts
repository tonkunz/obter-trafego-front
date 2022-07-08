import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FuseAlertModule } from '@fuse/components/alert';

// Components
import { PageLayout1Component } from './components/page-layouts/page-layout-1.component';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { AlertSnackbarComponent } from './components/alert-snackbar/alert-snackbar.component';

@NgModule({
  declarations: [
    PageLayout1Component,
    CustomSpinnerComponent,
    AlertSnackbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FuseAlertModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,

    // Components
    PageLayout1Component,
    CustomSpinnerComponent,
  ],
})
export class SharedModule {}
