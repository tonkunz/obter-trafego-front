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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'create-project',
  templateUrl: 'create-project.component.html',
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'account';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _router: Router
  ) {
    const s = this._router.getCurrentNavigation().extras.state;
    console.log('state: ', s);
  }

  ngOnInit(): void {
    // Setup available panels
    this.panels = [
      {
        id: 'account',
        icon: 'heroicons_outline:user-circle',
        title: 'Account',
        description: 'Manage your public profile and private information',
      },
      {
        id: 'security',
        icon: 'heroicons_outline:lock-closed',
        title: 'Security',
        description: 'Manage your password and 2-step verification preferences',
      },
      {
        id: 'plan-billing',
        icon: 'heroicons_outline:credit-card',
        title: 'Plan & Billing',
        description:
          'Manage your subscription plan, payment method and billing information',
      },
      {
        id: 'notifications',
        icon: 'heroicons_outline:bell',
        title: 'Notifications',
        description: "Manage when you'll be notified on which channels",
      },
      {
        id: 'team',
        icon: 'heroicons_outline:user-group',
        title: 'Team',
        description: 'Manage your existing team and change roles/permissions',
      },
    ];

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
    // Unsubscribe from all subscriptions
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
}
