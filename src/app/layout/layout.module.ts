import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, TranslateModule, SharedModule],
  exports: [NavbarComponent, FooterComponent],
})
export class LayoutModule {}
