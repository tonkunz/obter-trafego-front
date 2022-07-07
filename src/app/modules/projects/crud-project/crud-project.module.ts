import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CrudProjectComponent } from './containers/crud-project.component';

// Material Imports
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

// Step Components
import { FirstStepFormComponent } from './components/first-step-form/first-step-form.component';
import { SecStepComponent } from './components/sec-step-form/sec-step-form.component';
import { ThirdStepComponent } from './components/third-step-form/third-step-form.component';
import { FourthStepComponent } from './components/fourth-step-form/fourth-step-form.component';
import { FifthStepComponent } from './components/fifth-step-form/fifth-step-form.component';

const routes: Route[] = [
  {
    path: '',
    component: CrudProjectComponent,
  },
];

@NgModule({
  declarations: [
    CrudProjectComponent,
    FirstStepFormComponent,
    SecStepComponent,
    ThirdStepComponent,
    FourthStepComponent,
    FifthStepComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
})
export class CrudProjectModule {}
