import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Meeting from 'src/app/core/models/Meeting';
import { MeetingsService } from 'src/app/core/services/meetings.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  public meetings: Array<Meeting> = [];

  constructor(
    private meetingsService: MeetingsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let { city, country, term, category } = params;

      city = city === undefined ? '' : city;
      country = country === undefined ? '' : country;
      term = term === undefined ? '' : term;
      category = category === undefined ? '' : category;

      if (category) {
        this.meetingsService
          .getFilteredMeetings('categoryId', category)
          .subscribe((meeting) => {
            this.meetings = meeting;
          });
      } else {
        this.meetingsService
          .searchMeetings(term, city, country)
          .subscribe((meeting) => {
            this.meetings = meeting;
          });
      }
    });
  }
}
