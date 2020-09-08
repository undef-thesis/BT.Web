import { HomeComponent } from './home/home.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent],
  imports: [
    SlideshowModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [TranslateModule],
})
export class ModulesModule {}
