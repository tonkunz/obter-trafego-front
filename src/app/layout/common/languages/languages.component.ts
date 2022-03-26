import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import {
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'languages',
})
export class LanguagesComponent implements OnInit {
  availableLangs: AvailableLangs;
  activeLang: string;
  flagCodes: any;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseNavigationService: FuseNavigationService,
    private _translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    // Get the available languages from transloco
    this.availableLangs = this._translocoService.getAvailableLangs();
    console.log('available langs: ', this.availableLangs);

    // Subscribe to language changes
    this._translocoService.langChanges$.subscribe((activeLang) => {
      // Get the active lang
      this.activeLang = activeLang;

      // Update the navigation
      this._updateNavigation(activeLang);
    });

    // Set the country iso codes for languages for flags
    this.flagCodes = {
      en: 'us',
      br: 'br',
    };
  }

  setActiveLang(lang: string): void {
    // Set the active lang
    this._translocoService.setActiveLang(lang);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _updateNavigation(lang: string): void {
    // For the demonstration purposes, we will only update the Dashboard names
    // from the navigation but you can do a full swap and change the entire
    // navigation data.
    //
    // You can import the data from a file or request it from your backend,
    // it's up to you.

    // Get the component -> navigation data -> item
    const navComponent =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
        'mainNavigation'
      );

    // Return if the navigation component does not exist
    if (!navComponent) {
      return null;
    }

    // Get the flat navigation data
    const navigation = navComponent.navigation;

    // Get the Project dashboard item and update its title
    const projectDashboardItem = this._fuseNavigationService.getItem(
      'dashboards.project',
      navigation
    );
    if (projectDashboardItem) {
      this._translocoService
        .selectTranslate('Project')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          projectDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // Get the Analytics dashboard item and update its title
    const analyticsDashboardItem = this._fuseNavigationService.getItem(
      'dashboards.analytics',
      navigation
    );
    if (analyticsDashboardItem) {
      this._translocoService
        .selectTranslate('Analytics')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          analyticsDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }
  }
}