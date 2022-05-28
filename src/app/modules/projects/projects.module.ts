import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ProjectsComponent } from './projects.component';
import { projectsRoutes } from './projects.routes';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateProjectComponent } from './create-project/create-project.component';

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,

    // Material Imports
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  declarations: [ProjectsComponent, CreateProjectComponent],
})
export class ProjectsModule {}
