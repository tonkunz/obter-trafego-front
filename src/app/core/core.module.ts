import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { CreditsService, ProjectsService } from './services';
import { LocationsService } from './services/locations/locations.service';

@NgModule({
  imports: [
    AuthModule,
    IconsModule,
    TranslocoCoreModule
  ],
  providers: [
    CreditsService,
    ProjectsService,
    LocationsService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import this module in the AppModule only.'
      );
    }
  }
}
