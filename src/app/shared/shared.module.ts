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
import { RouterModule } from '@angular/router';
import { TextErrorComponent } from './text-error/text-error.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    MeetingCardComponent,
    MeetingCardListComponent,
    ModalComponent,
    CarouselComponent,
    MapComponent,
    TextErrorComponent,
    SearchBoxComponent,
  ],
  imports: [
    SlideshowModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GoogleMapsModule,
    RouterModule,
    TranslateModule,
    AutocompleteLibModule
  ],
  exports: [
    MeetingCardListComponent,
    ModalComponent,
    CarouselComponent,
    MapComponent,
    TextErrorComponent,
    TranslateModule,
    SearchBoxComponent
  ],
})
export class SharedModule {}
