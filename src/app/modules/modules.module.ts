import { HomeComponent } from './home/home.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow';

@NgModule({
  declarations: [HomeComponent],
  imports: [SlideshowModule, SharedModule, CommonModule],
})
export class ModulesModule {}
