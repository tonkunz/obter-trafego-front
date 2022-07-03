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
import { Project } from 'app/core/services';
import { ICreditItem } from 'app/core/services/credits/credits.types';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsFacade } from '../../projects.facade';
import { IFirstStepForm } from '../components/first-step-form/first-step-form.types';
import { panelOptions } from './panel-data';

@Component({
  selector: 'crud-project',
  templateUrl: 'crud-project.component.html',
})
export class CrudProjectComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;

  isLoading: boolean;

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
    private _activatedRoute: ActivatedRoute,
    private _projectsFacade: ProjectsFacade
  ) {
    this.projectType = this._router.getCurrentNavigation()?.extras?.state?.credit;

    if (this._activatedRoute.snapshot.params['id']) {
      this._projectsFacade.setCurrentProject(this._activatedRoute.snapshot.params['id']);
    }
  }

  ngOnInit(): void {
    this._projectsFacade.currentProject$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        if (data) {
          this.projectCompleteForm = data;

          this.projectType = {
            id: data.projetoTipoId,
            acessos: data.projetoTipo[0].acessos,
            nome: data.projetoTipo[0].nome,
            creditos: 0,
          };
        }
      });

    this._projectsFacade.isLoadingList$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((val) => this.isLoading = val);

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

  // StepFormHandlers
  handleFirstStepForm(formValue: IFirstStepForm): void {
    this.projectCompleteForm = {
      ...this.projectCompleteForm,
      ...formValue,
    };

    if (this.projectCompleteForm?.id) {
      this._projectsFacade.updateCurrentProject(this.projectCompleteForm);
      return;
    }

    this._projectsFacade.createNewProject(formValue);
  }
}
