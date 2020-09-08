import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public imageUrlArray: Array<string> = [
    '../../../assets/slide_1.jpg',
    '../../../assets/slide_2.jpg',
    '../../../assets/slide_3.jpg',
    '../../../assets/slide_4.jpg',
  ];

  constructor() {}

  ngOnInit(): void {}
}
