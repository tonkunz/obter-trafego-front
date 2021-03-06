import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { take, tap } from 'rxjs';
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
    [{ key: 'projects', value: 'common.projects' }]
      .map((x) => ({
        ...x,
        item: this._fuseNavigationService.getItem(x.key, navigation),
      }))
      .filter((x) => x.item)
      .map((x) =>
        this._translocoService
          .selectTranslate(x.value)
          .pipe(
            take(1),
            tap((t) => {
              x.item.title = t;
            })
          )
          .subscribe(() => navComponent.refresh())
      );
  }
}
