import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';
import { ModulesModule } from './modules/modules.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ModulesModule,
    SharedModule,
    ViewsModule,
    LayoutModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
  ],

  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
