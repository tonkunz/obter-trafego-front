import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectsService } from './projects.service';
import { IProjectListItem, ProjectListItem } from './projects.types';

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

  constructor(private _projectsService: ProjectsService) {
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
}
