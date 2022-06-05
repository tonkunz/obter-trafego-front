import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { sanitizePutProject } from './projects.helpers';
import {
  INewProject,
  IProject,
  IProjectListItem,
  NewProject,
  Project,
} from './projects.types';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private _http: HttpClient) {}

  getProjects(): Observable<IProjectListItem[]> {
    return this._http.get<IProjectListItem[]>(`${environment.api}/projetos`);
  }

  postProject(newProject: INewProject): any {
    const projectToApi = NewProject.toJson(newProject);

    return this._http.post(`${environment.api}/criar-projeto`, projectToApi);
  }

  putProject(project: IProject): any {
    const projectToApi = {
      ...Project.toJson(project),
      ...sanitizePutProject(project),
    };

    const params = new HttpParams().set('id', projectToApi.id);

    return this._http.post(`${environment.api}/projeto`, projectToApi, {
      params,
    });
  }
}
