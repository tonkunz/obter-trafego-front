import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ProjectsComponent } from './projects.component';
import { projectsRoutes } from './projects.routes';

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes), SharedModule],
  declarations: [ProjectsComponent],
})
export class ProjectsModule {}
