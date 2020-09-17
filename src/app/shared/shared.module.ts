import { ModalComponent } from './modal/modal.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingCardComponent } from './meeting-card/meeting-card.component';
import { MeetingCardListComponent } from './meeting-card-list/meeting-card-list.component';
import { CarouselComponent } from './carousel/carousel.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    MeetingCardComponent,
    MeetingCardListComponent,
    ModalComponent,
    CarouselComponent,
    MapComponent,
  ],
  imports: [
    SlideshowModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GoogleMapsModule,
  ],
  exports: [
    MeetingCardListComponent,
    ModalComponent,
    CarouselComponent,
    MapComponent,
  ],
})
export class SharedModule {}
