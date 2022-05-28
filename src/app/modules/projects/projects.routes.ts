import { Route } from '@angular/router';
import { ProjectsComponent } from './projects.component';

export const projectsRoutes: Route[] = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'create-project',
    loadChildren: () =>
      import('./create-project/create-project.module').then(
        (m) => m.CreateProjectModule
      ),
  },
];
