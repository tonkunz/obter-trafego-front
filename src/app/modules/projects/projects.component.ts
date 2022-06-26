import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { IProjectListItem } from '../../core/services';
import { ProjectsFacade } from './projects.facade';
import { Subject } from 'rxjs';

@Component({
  selector: 'projects',
  templateUrl: 'projects.component.html',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;

  projects: IProjectListItem[] = [];

  tableColumns: string[] = ['title', 'inicio', 'fim', 'status', 'actions'];

  searchInputControl: FormControl;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _facade: ProjectsFacade,
    public dialog: MatDialog,
  ) {
    this.searchInputControl = new FormControl('');
  }

  ngOnInit(): void {
    this._facade.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });

    this._facade.projectsList$.subscribe((value) => {
      this.projects = value;
    });

    this._facade.loadProjectsList();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  handleCreateProject(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      panelClass: 'w-full',
      maxWidth: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._router.navigate(['projects/create-project'], {
          state: { credit: result },
        });
      }
    });
  }

  handleEditProject(project: IProjectListItem): void {
    this._router.navigate(['projects/edit-project/' + project.id]);
  }
}
