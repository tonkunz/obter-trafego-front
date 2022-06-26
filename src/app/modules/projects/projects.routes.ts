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
      import('./crud-project/crud-project.module').then(
        (m) => m.CrudProjectModule
      ),
  },
  {
    path: 'edit-project/:id',
    loadChildren: () =>
      import('./crud-project/crud-project.module').then(
        (m) => m.CrudProjectModule
      ),
  }
];
