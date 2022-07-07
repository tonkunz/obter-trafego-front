import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsFacade } from '../../projects.facade';
import { panelOptions } from './panel-data';
import { Location } from '@angular/common';

@Component({
  selector: 'crud-project',
  templateUrl: 'crud-project.component.html',
})
export class CrudProjectComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;

  pageTitle: string = 'projects.new-project';

  isLoading: boolean;
  isLoadingProject: boolean;

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = panelOptions;
  selectedPanel: string = 'first-step';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _projectsFacade: ProjectsFacade,
    private _location: Location,
  ) {
    if (this._router.url.includes('edit-project')) {
      this.pageTitle = 'projects.manage-project';
    }

    if (this._activatedRoute.snapshot.params['id']) {
      this._projectsFacade.setCurrentProject(this._activatedRoute.snapshot.params['id']);
    }
  }

  ngOnInit(): void {
    this._projectsFacade.isLoadingList$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((val) => this.isLoading = val);

    this._projectsFacade.isLoadingProject$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((val) => this.isLoadingProject = val);

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
    return this.panels.find((panel: any) => panel.id === id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  handleNextStep(): void {
    switch(this.selectedPanel) {
      case 'first-step':
        this.selectedPanel = 'second-step';
        break;
      case 'second-step':
        this.selectedPanel = 'third-step';
        break;
      case 'third-step':
        this.selectedPanel = 'fourth-step';
        break;
      case 'fourth-step':
        this.selectedPanel = 'fifth-step';
        break;
    }
  }

  handleBackStep(): void {
    switch(this.selectedPanel) {
      case 'first-step':
        this._location.back();
        break;
      case 'second-step':
        this.selectedPanel = 'first-step';
        break;
      case 'third-step':
        this.selectedPanel = 'second-step';
        break;
      case 'fourth-step':
        this.selectedPanel = 'third-step';
        break;
      case 'fifth-step':
        this.selectedPanel = 'fourth-step';
        break;
    }
  }

  handleSaveChanges(): void {
    this._projectsFacade.updateCurrentProject2();
  }
}
