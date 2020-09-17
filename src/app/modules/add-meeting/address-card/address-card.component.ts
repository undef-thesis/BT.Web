import { Component, Input } from '@angular/core';
import Address from 'src/app/core/models/Address';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss'],
})
export class AddressCardComponent {
  @Input() address: Address;

  constructor() {}
}
