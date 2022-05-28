import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

// Components
import { PageLayout1Component } from './components/page-layouts/page-layout-1.component';

@NgModule({
  declarations: [PageLayout1Component],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,

    // Components
    PageLayout1Component,
  ],
})
export class SharedModule {}
