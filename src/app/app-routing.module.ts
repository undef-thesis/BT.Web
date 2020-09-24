import { MeetingDetailsComponent } from './modules/meeting-details/meeting-details.component';
import { UserpanelComponent } from './modules/userpanel/userpanel.component';
import { AddMeetingComponent } from './modules/add-meeting/add-meeting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './core/guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'meetings/add',
    component: AddMeetingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meetings/:id',
    component: MeetingDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userpanel',
    component: UserpanelComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
