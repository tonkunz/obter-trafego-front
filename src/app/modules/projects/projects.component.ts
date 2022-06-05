import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import {
  ProjectsService,
  IProjectListItem,
  ProjectListItem,
} from '../../core/services';

@Component({
  selector: 'projects',
  templateUrl: 'projects.component.html',
})
export class ProjectsComponent implements OnInit {
  // @ViewChild(MatPaginator) private _paginator: MatPaginator;
  // @ViewChild(MatSort) private _sort: MatSort;

  isLoading: boolean = false;

  projects: IProjectListItem[] = [];

  tableColumns: string[] = ['title', 'inicio', 'fim', 'status', 'actions'];

  searchInputControl: FormControl;

  constructor(
    private _projectsService: ProjectsService,
    private _router: Router,
    public dialog: MatDialog
  ) {
    this.searchInputControl = new FormControl('');
  }

  ngOnInit(): void {
    this.isLoading = true;

    this._projectsService
      .getProjects()
      .subscribe((projects: IProjectListItem[]) => {
        this.projects = projects.map((project) =>
          ProjectListItem.fromJson(project)
        );
        this.isLoading = false;
      });
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
}
