import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { AddressCardComponent } from './add-meeting/address-card/address-card.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { PersonalComponent } from './userpanel/components/personal/personal.component';
import { AvatarComponent } from './userpanel/components/avatar/avatar.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent, AddMeetingComponent, AddressCardComponent, UserpanelComponent, MeetingDetailsComponent, PersonalComponent, AvatarComponent],
  imports: [
    SlideshowModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgxSpinnerModule
  ],
  exports: [TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModulesModule {}
