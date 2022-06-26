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

const routes: Route[] = [
  {
    path: '',
    component: CrudProjectComponent,
  },
];

@NgModule({
  declarations: [CrudProjectComponent, FirstStepFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    ProjectState,
    ProjectsFacade,
  ]
})
export class CrudProjectModule {}
