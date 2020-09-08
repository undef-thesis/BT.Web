import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() images: Array<String>;
  @Input() minHeight: String;
  @Input() autoPlay: boolean;
  @Input() showArrows: boolean;
  @Input() autoPlayInterval: Number;

  constructor() {}

  ngOnInit(): void {}
}
