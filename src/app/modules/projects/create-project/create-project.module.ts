import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CreateProjectComponent } from './create-project.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

const routes: Route[] = [
  {
    path: '',
    component: CreateProjectComponent,
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatIconModule,
  ],
  declarations: [CreateProjectComponent],
})
export class CreateProjectModule {}
