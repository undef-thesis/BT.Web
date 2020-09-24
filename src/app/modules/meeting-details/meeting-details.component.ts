import { MeetingsService } from 'src/app/core/services/meetings.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
  private id;
  public meeting;

  constructor(
    private meetingsService: MeetingsService,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.getMeetingDetails();
  }

  private getMeetingDetails(): void {
    this.spinner.show();
    this.meetingsService
      .getMeetingDetails(this.id)
      .subscribe((meeting) => {
        this.meeting = meeting;
      })
      .add(() => {
        this.spinner.hide();
      });
  }
}
