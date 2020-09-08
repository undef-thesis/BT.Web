import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, TranslateModule],
  exports: [NavbarComponent, FooterComponent],
})
export class LayoutModule {}
