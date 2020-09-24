import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-error',
  templateUrl: './text-error.component.html',
  styleUrls: ['./text-error.component.scss'],
})
export class TextErrorComponent implements OnInit {
  @Input() activator: boolean = false;
  @Input() field;
  @Input() translate: string;

  constructor() {}

  ngOnInit(): void {}
}
