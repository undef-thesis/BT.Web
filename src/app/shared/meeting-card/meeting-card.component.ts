import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import Category from 'src/app/core/models/Category';
import Image from 'src/app/core/models/Image';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss'],
})
export class MeetingCardComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() description: string;
  @Input() participantCount: number;
  @Input() maxParticipants: number;
  @Input() date: string;
  @Input() images: Array<Image>;
  @Input() category: Category;
  @Input() meetingOrganizerId: string;

  public base64images: Array<string> = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.base64images = [];
    this.images.map((item) => {
      const img: string = 'data:image/jpg;base64,' + item.picture;

      this.base64images.push(img);
    });
  }

  public checkOtherMeetingsByCategory() {
    this.router.navigate(['/meetings'], {
      relativeTo: this.route,
      queryParams: {
        category: this.category.id,
      },
    });
  }

  public get parseDate(): string {
    return moment(this.date).format('DD.MM.yyy HH:mm').toString();
  }

  public get isUserMeetingOrganizer(): boolean {
    let id: string | null = '';
    const me = JSON.parse(localStorage.getItem('me'));
    if(me !== null) {
      id = me.id 
    }

    return this.meetingOrganizerId === id
      ? true
      : false;
  }
}
