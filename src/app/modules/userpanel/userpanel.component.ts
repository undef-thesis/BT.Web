import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MeetingsService } from 'src/app/core/services/meetings.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { MenuOptions } from './helpers/MenuOptions';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss'],
})
export class UserpanelComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  public organizedMeetings: Array<object> = [];
  public enrolledMeetings: Array<object> = [];
  public profile = null;
  public isLoading: boolean = false;

  public activePanel: MenuOptions = MenuOptions.Personal;

  constructor(
    private meetingsServie: MeetingsService,
    private userProfileService: UserProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getOrganizedMeetings();
    this.getEnrolledMeetings();
    this.getUserProfile();
  }

  public switchMenu(menuOptions: MenuOptions): void {
    switch (menuOptions) {
      case MenuOptions.Personal:
        this.activePanel = MenuOptions.Personal;
        break;
      case MenuOptions.Organized:
        this.activePanel = MenuOptions.Organized;
        break;
      case MenuOptions.Enrolled:
        this.activePanel = MenuOptions.Enrolled;
        break;
      default:
        this.activePanel = MenuOptions.Personal;
    }
  }

  private getUserProfile(): void {
    this.userProfileService
      .getUserProfile()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((userProfile) => {
        this.profile = userProfile;
      });
  }

  private getOrganizedMeetings(): void {
    this.meetingsServie
      .getOrganizedMeetings()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((meeting) => {
        this.organizedMeetings = meeting;
      });
  }

  private getEnrolledMeetings(): void {
    this.meetingsServie
      .getEnrolledMeetings()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((meeting) => {
        this.enrolledMeetings = meeting;
      });
  }

  public deleteAccount(): void {
    this.isLoading = false;

    this.userProfileService
      .deleteAccount()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.authService.logout();
      })
      .add(() => {
        this.isLoading = false;
      });
  }
}
