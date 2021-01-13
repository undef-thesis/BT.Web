import { AuthService } from 'src/app/core/services/auth.service';
import { MeetingsService } from 'src/app/core/services/meetings.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
  private id;
  public meeting;
  public isUserBelongToTheMeeting: boolean = false;
  public isUserMeetingOrganizer: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(
    public meetingsService: MeetingsService,
    public authService: AuthService,
    private router: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.authService.isLoggedIn.subscribe((response) => {
      this.isLoggedIn = response;
      console.log(response);
    });

    this.getMeetingDetails();
  }

  private getMeetingDetails(): void {
    this.spinner.show();
    this.meetingsService
      .getMeetingDetails(this.id)
      .subscribe((meeting) => {
        this.meeting = meeting;

        this.isUserBelongToTheMeeting = this.checkUserBelongToTheMeeting();
        this.isUserMeetingOrganizer = this.checkUserIsMeetingOrganizer();
      })
      .add(() => {
        this.spinner.hide();
      });
  }

  public parseDate(date: string): string {
    return moment(date).format('DD-MM-yyy HH:mm');
  }

  public joinMeeting(): void {
    this.meetingsService.joinMeeting(this.meeting.id).subscribe(() => {
      this.toastr.success(this.translate.instant('notification.join'));

      this.isUserBelongToTheMeeting = true;
      this.meeting.participantCount += 1;
    });
  }

  public quitMeeting(): void {
    this.meetingsService.quitMeeting(this.meeting.id).subscribe(() => {
      this.toastr.success(this.translate.instant('notification.quit'));

      this.isUserBelongToTheMeeting = false;
      this.meeting.participantCount -= 1;
    });
  }

  public deleteMeeting(): void {
    this.meetingsService.deleteMeeting(this.meeting.id).subscribe(() => {
      this.toastr.success(this.translate.instant('notification.delete'));
      this.location.back();
    });
  }

  private checkUserBelongToTheMeeting(): boolean {
    let id: string | null = '';
    const me = JSON.parse(localStorage.getItem('me'));
    if (me !== null) {
      id = me.id;
    }

    const isExists: boolean = this.meeting.participants.some(
      (participant) => participant.userId === id
    );

    return isExists;
  }

  private checkUserIsMeetingOrganizer(): boolean {
    let id: string | null = '';
    const me = JSON.parse(localStorage.getItem('me'));
    if (me !== null) {
      id = me.id;
    }

    return this.meeting.meetingOrganizer.id === id ? true : false;
  }
}
