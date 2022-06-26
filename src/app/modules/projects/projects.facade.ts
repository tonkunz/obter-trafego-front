import { Injectable } from '@angular/core';
import { IProject, IProjectListItem, Project, ProjectListItem, ProjectsService } from 'app/core/services';
import { ProjectState } from './crud-project/state/project.state';

@Injectable({providedIn: 'root'})
export class ProjectsFacade {
  constructor(
    private _state: ProjectState,
    private _api: ProjectsService,
  ) { }

  projectsList$ = this._state.projectList$;

  currentProject$ = this._state.currentProject$;

  isLoading$ = this._state.isLoadingProject$;

  loadProjectsList(): void {
    if (this._state.projectList.length) return;

    this._state.isLoadingProject = true;
    this._api.getProjects()
      .subscribe((projects: IProjectListItem[]) => {
        this._state.projectList = projects.map((project) => ProjectListItem.fromJson(project));

        this._state.isLoadingProject = false;
      });
  }

  setCurrentProject(id?: number): void {
    this._state.isLoadingProject = true;

    if (id) {
      this._api.getProjectById(id)
        .subscribe((res: IProject) => {
          this._state.currentProject = res;
          this._state.isLoadingProject = false;
        });
        return;
    }

    console.log('new project');
    this._state.currentProject = new Project();
  }
}
