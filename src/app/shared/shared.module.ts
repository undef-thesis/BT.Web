import { SlideshowModule } from 'ng-simple-slideshow';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingCardComponent } from './meeting-card/meeting-card.component';
import { MeetingCardListComponent } from './meeting-card-list/meeting-card-list.component';

@NgModule({
  declarations: [MeetingCardComponent, MeetingCardListComponent],
  exports: [MeetingCardListComponent],
  imports: [SlideshowModule, ReactiveFormsModule, FormsModule, CommonModule],
})
export class SharedModule {}
