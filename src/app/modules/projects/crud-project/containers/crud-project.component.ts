import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Project, ProjectsService } from 'app/core/services';
import { ICreditItem } from 'app/core/services/credits/credits.types';
import { Subject, takeUntil } from 'rxjs';
import { IFirstStepForm } from '../components/first-step-form/first-step-form.types';
import { panelOptions } from '../panel-data';

@Component({
  selector: 'crud-project',
  templateUrl: 'crud-project.component.html',
})
export class CrudProjectComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = panelOptions;
  selectedPanel: string = 'first-step';

  projectType: ICreditItem | null;

  projectCompleteForm: Project = new Project();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _router: Router,
    private _projectsService: ProjectsService
  ) {
    this.projectType =
      this._router.getCurrentNavigation()?.extras?.state?.credit;
  }

  ngOnInit(): void {
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        } else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  getPanelInfo(id: string): any {
    return this.panels.find((panel) => panel.id === id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // StepFormHandlers
  handleFirstStepForm(formValue: IFirstStepForm): void {
    this.projectCompleteForm = {
      ...this.projectCompleteForm,
      ...formValue,
    };

    if (this.projectCompleteForm?.id) {
      this._projectsService
        .putProject(this.projectCompleteForm)
        .subscribe((res) => this.setProjectDataFromApi(res));
        return;
    }

    this._projectsService
      .postProject(formValue)
      .subscribe((res) => this.setProjectDataFromApi(res));
  }

  setProjectDataFromApi(data: any): void {
    this.projectCompleteForm = {
      ...Project.fromJson(data),
    };
  }
}
