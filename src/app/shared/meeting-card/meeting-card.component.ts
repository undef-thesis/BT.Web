import { Component, OnInit, Input } from '@angular/core';
import Meeting from 'src/app/core/models/Meeting';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss'],
})
export class MeetingCardComponent implements OnInit {
  @Input() meeting: Meeting;
  @Input() id: string;
  @Input() name: string;
  @Input() description: string;

  public images = [];

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.images = [];
    this.meeting.images.map((item) => {
      const img = 'data:image/jpg;base64,' + item.picture;

      this.images.push(img);
    });
  }
}
