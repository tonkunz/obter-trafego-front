import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';
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

  getProjectById(id: number): Observable<IProject> {
    const params = new HttpParams().set('id', id);

    return this._http
      .get<IProject>(`${environment.api}/projeto`, { params })
      .pipe(tap((value: any) => Project.fromJson(value)));
  }

  postProject(newProject: INewProject): any {
    const projectToApi = NewProject.toJson(newProject);

    return this._http.post(`${environment.api}/criar-projeto`, projectToApi);
  }

  putProject(project: IProject): any {
    const projectToApi = {
      ...Project.toJson(project),
      referencias: [],
    };

    const params = new HttpParams().set('id', projectToApi.id);

    return this._http.post(`${environment.api}/projeto`, projectToApi, {
      params,
    });
  }
}
