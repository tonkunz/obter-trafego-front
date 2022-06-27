import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CrudProjectComponent } from './containers/crud-project.component';
import { FirstStepFormComponent } from './components/first-step-form/first-step-form.component';
import { ProjectState } from './state/project.state';
import { ProjectsFacade } from '../projects.facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SecStepComponent } from './components/sec-step-form/sec-step-form.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
  ],
  providers: [
    ProjectState,
    ProjectsFacade,
  ]
})
export class CrudProjectModule {}
