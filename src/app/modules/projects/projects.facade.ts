import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILocalizacao, IProject, IProjectListItem, Project, ProjectListItem, ProjectsService } from 'app/core/services';
import { ILocation } from 'app/core/services/locations/locations.types';
import { IFirstStepForm } from './crud-project/components/first-step-form/first-step-form.types';
import { IBasicSettingsData, ITargetSettingsData } from './projects.types';
import { ProjectState } from './state/project.state';

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

  createNewProject(): void {
    this._state.isLoadingProject = true;

    const fistStepForm: IFirstStepForm = {
      googleCodigo: this._state.currentProject.googleCodigo,
      projectTypeId: this._state.currentProject.projetoTipoId,
      siteUrl: this._state.currentProject.siteUrl,
      titulo: this._state.currentProject.titulo,
    }

    this._api.postProject(fistStepForm)
      .subscribe((res) => {
        this._state.currentProject = Project.fromJson(res);
        this._state.isLoadingProject = false;
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

  // TODO: For test
  updateCurrentProject2(): void {
    this._state.isLoadingProject = true;

    this._api.putProject(this._state.currentProject)
      .subscribe((res) => {
        this._state.currentProject = Project.fromJson(res);
        this._state.isLoadingProject = false;
      });
  }

  setNewCurrentProject(projectType): void {
    this._state.currentProject = {
      ...new Project(),
      projetoTipo: [projectType],
      projetoTipoId: projectType.id,
    };
  }

  //
  //
  // First Step Handlers

  getFirstStepInfo(): any {
    const {
      titulo,
      projetoTipoId,
      googleCodigo,
      siteUrl,
      projetoTipo
    } = this._state.currentProject;

    return {
      titulo,
      projetoTipoId,
      googleCodigo,
      siteUrl,
      projetoTipo
    }
  }

  updateFirstStepInfo(info): void {
    this._state.currentProject = {
      ...this._state.currentProject,
      titulo: info?.titulo,
      googleCodigo: info?.googleCodigo,
      siteUrl: info?.siteUrl,
    }
  }

  //
  //
  // Second Step Handlers
  getSecStepInfo(): IBasicSettingsData {
    const {
      renovacaoAutomatica,
      taxaRejeicao,
      taxaRetorno,
      tempoPagina
    } = this._state.currentProject;

    return {
      renovacaoAutomatica,
      taxaRejeicao,
      taxaRetorno,
      tempoPagina,
    };
  }

  updateSecStepInfo(info: IBasicSettingsData): void {
    this._state.currentProject = {
      ...this._state.currentProject,
      renovacaoAutomatica: info.renovacaoAutomatica,
      taxaRejeicao: info.taxaRejeicao,
      taxaRetorno: info.taxaRetorno,
      tempoPagina: info.tempoPagina,
    }
  }

  //
  //
  // Third Step Handlers
  getThirdStepInfo(): ITargetSettingsData {
    const {
      taxaDesktop,
      taxaMobile,
      taxaOrganica,
      taxaDireto,
      taxaReferencia,
    } = this._state.currentProject;

    return {
      taxaDesktop,
      taxaMobile,
      taxaOrganica,
      taxaDireto,
      taxaReferencia,
    }
  }

  updateThirdStepInfo(info: ITargetSettingsData): void {
    this._state.currentProject = {
      ...this._state.currentProject,
      taxaDesktop: info.taxaDesktop,
      taxaMobile: info.taxaMobile,
      taxaOrganica: info.taxaOrganica,
      taxaDireto: info.taxaDireto,
      taxaReferencia: info.taxaReferencia,
    }
  }

  //
  //
  // Fourth Step Handlers
  getFourthStepInfo(): ILocalizacao[] {
    return this._state.currentProject.localizacoes;
  }

  updateFourthStepInfo(info: ILocation[]): void {
    const newLocations: ILocation[] = info.length !== 0 ? [...info] : [];

    this._state.currentProject = {
      ...this._state.currentProject,
      localizacoes: newLocations,
    }
  }
}
