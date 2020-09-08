import { ModalComponent } from './modal/modal.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingCardComponent } from './meeting-card/meeting-card.component';
import { MeetingCardListComponent } from './meeting-card-list/meeting-card-list.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    MeetingCardComponent,
    MeetingCardListComponent,
    ModalComponent,
    CarouselComponent,
  ],
  imports: [SlideshowModule, ReactiveFormsModule, FormsModule, CommonModule],
  exports: [MeetingCardListComponent, ModalComponent, CarouselComponent],
})
export class SharedModule {}
