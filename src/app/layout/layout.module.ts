import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { ClassicLayoutModule } from 'app/layout/layouts/vertical/classic/classic.module';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    SharedModule,
    SettingsModule,

    // LayoutModules
    EmptyLayoutModule,
    ClassicLayoutModule,
  ],
  exports: [
    LayoutComponent,

    // LayoutModules
    EmptyLayoutModule,
    ClassicLayoutModule,
  ],
})
export class LayoutModule {}
