import { Route } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectsComponent } from './projects.component';

export const projectsRoutes: Route[] = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'create-project',
    component: CreateProjectComponent,
  },
];
