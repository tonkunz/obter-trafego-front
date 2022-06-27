import { Injectable } from '@angular/core';
import { IProject, IProjectListItem } from 'app/core/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectState {
  private _projectsList$: BehaviorSubject<IProjectListItem[]>;

  private _currentProject$: BehaviorSubject<IProject>;

  private _isLoadingList$: BehaviorSubject<boolean>;

  private _isLoadingProject$: BehaviorSubject<boolean>;

  constructor() {
    this._projectsList$ = new BehaviorSubject<IProjectListItem[]>([]);

    this._currentProject$ = new BehaviorSubject<IProject>(null);

    this._isLoadingList$ = new BehaviorSubject<boolean>(false);

    this._isLoadingProject$ = new BehaviorSubject<boolean>(false);
  }

  // Projects List Handlers
  set projectList(list: IProjectListItem[]) {
    this._projectsList$.next(list);
  }

  get projectList$(): Observable<IProjectListItem[]> {
    return this._projectsList$.asObservable();
  }

  get projectList(): IProjectListItem[] {
    return this._projectsList$.value;
  }

  // Current Project Handlers
  set currentProject(project: IProject) {
    this._currentProject$.next(project);
  }

  get currentProject$(): Observable<IProject> {
    return this._currentProject$.asObservable();
  }

  get currentProject(): IProject {
    return this._currentProject$.value;
  }

  // Loading Handlers
  set isLoadingList(val: boolean) {
    this._isLoadingList$.next(val);
  }

  get isLoadingList$(): Observable<boolean> {
    return this._isLoadingList$.asObservable();
  }

  get isLoadingList(): boolean {
    return this._isLoadingList$.value;
  }

  // Loading Updates
  set isLoadingProject(val: boolean) {
    this._isLoadingProject$.next(val);
  }

  get isLoadingProject$(): Observable<boolean> {
    return this._isLoadingProject$.asObservable();
  }

  get isLoadingProject(): boolean {
    return this._isLoadingProject$.value;
  }
}
