import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfig, Scheme, Theme, Themes } from 'app/core/config/app.config';
import { Layout } from 'app/layout/layout.types';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { SettingsService } from './settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      settings {
        position: static;
        display: block;
        flex: none;
        width: auto;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(FuseDrawerComponent) settingsDrawer: FuseDrawerComponent;

  config: AppConfig;
  layout: Layout;
  scheme: 'dark' | 'light';
  theme: string;
  themes: Themes;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _fuseConfigService: FuseConfigService,
    private _settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => (this.config = config));
  }

  ngAfterViewInit(): void {
    // Subscribe to SettingsDrawerStatus changes
    this._settingsService.opened$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((opened: boolean) => {
        console.log('verify service: ', opened);
        if (opened) {
          this.settingsDrawer.open();
        } else {
          this.settingsDrawer.close();
        }
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router
      .navigate([], {
        queryParams: {
          layout: null,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        // Set the config
        this._fuseConfigService.config = { layout };
      });
  }

  setScheme(scheme: Scheme): void {
    this._fuseConfigService.config = { scheme };
  }

  setTheme(theme: Theme): void {
    this._fuseConfigService.config = { theme };
  }

  closeSettingsDrawer(): void {
    this._settingsService.closeSettingsDrawer();
  }
}
