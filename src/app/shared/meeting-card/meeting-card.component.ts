import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss'],
})
export class MeetingCardComponent implements OnInit {
  @Input() Images: Array<string>;

  constructor() {}

  ngOnInit(): void {}
}
