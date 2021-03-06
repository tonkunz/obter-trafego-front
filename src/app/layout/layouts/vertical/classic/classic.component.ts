import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
  FuseNavigationItem,
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { NavigationService } from 'app/core/navigation/navigation.service';

@Component({
  selector: 'classic-layout',
  templateUrl: './classic.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  navigation: FuseNavigationItem[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService
  ) {}

  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    // Subscribe to navigation data
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: FuseNavigationItem[]) => {
        this.navigation = navigation;
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }
}
