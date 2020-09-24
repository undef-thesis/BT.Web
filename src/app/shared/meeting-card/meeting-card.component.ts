import { Component, OnInit, Input } from '@angular/core';
import Meeting from 'src/app/core/models/Meeting';
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
  @Input() maxParticipants: number;
  @Input() date: string;
  @Input() images: Array<Image>;
  @Input() category: Category;

  public base64images: Array<string> = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.base64images = [];
    this.images.map((item) => {
      const img: string = 'data:image/jpg;base64,' + item.picture;

      this.base64images.push(img);
    });
  }

  public get parseDate(): string {
    return moment(this.date).format('DD.mm.yyy HH:mm').toString();
  }
}
