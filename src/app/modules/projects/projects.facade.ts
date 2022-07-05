import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IProject, IProjectListItem, Project, ProjectListItem, ProjectsService } from 'app/core/services';
import { IFirstStepForm } from './crud-project/components/first-step-form/first-step-form.types';
import { ProjectState } from './crud-project/state/project.state';

@Injectable({providedIn: 'root'})
export class ProjectsFacade {
  constructor(
    private _state: ProjectState,
    private _api: ProjectsService,
    private _router: Router,
  ) { }

  projectsList$ = this._state.projectList$;

  currentProject$ = this._state.currentProject$;

  isLoadingList$ = this._state.isLoadingList$;

  isLoadingProject$ = this._state.isLoadingProject$;

  loadProjectsList(): void {
    // if (this._state.projectList.length) return;

    this._state.isLoadingList = true;
    this._api.getProjects()
      .subscribe((projects: IProjectListItem[]) => {
        this._state.projectList = projects.map((project) => ProjectListItem.fromJson(project));

        this._state.isLoadingList = false;
      });
  }

  setCurrentProject(id?: number): void {
    this._state.isLoadingList = true;

    if (id) {
      this._api.getProjectById(id)
        .subscribe((res: IProject) => {
          this._state.currentProject = Project.fromJson(res);
          this._state.isLoadingList = false;
        });
        return;
    }

    this._state.currentProject = new Project();
  }

  createNewProject(newProject: IFirstStepForm): void {
    this._state.isLoadingProject = true;

    this._api.postProject(newProject)
      .subscribe((res) => {
        this._state.currentProject = {
          ...this._state.currentProject,
          ...Project.fromJson(res),
        };
        this._state.isLoadingProject = false;
        console.log('res: ', res);
        this._router.navigate(['projects/edit-project/', res.id])
      });
  }

  updateCurrentProject(project: IProject): void {
    this._state.isLoadingProject = true;

    this._api.putProject(project)
      .subscribe((res) => {
        this._state.currentProject = Project.fromJson(res);
        this._state.isLoadingProject = false;
      });
  }
}
