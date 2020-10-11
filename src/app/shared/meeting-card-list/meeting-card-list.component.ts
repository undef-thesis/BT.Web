import { Component, Input, OnInit } from '@angular/core';
import Meeting from 'src/app/core/models/Meeting';

@Component({
  selector: 'app-meeting-card-list',
  templateUrl: './meeting-card-list.component.html',
  styleUrls: ['./meeting-card-list.component.scss'],
})
export class MeetingCardListComponent implements OnInit {
  @Input() meetings: Array<Meeting>;
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
