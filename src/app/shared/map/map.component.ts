import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Address from 'src/app/core/models/Address';
import { GoogleAddressParser } from './GoogleAddressParser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() readMode: boolean = true;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() title: string;
  @Output() emittAddress = new EventEmitter<Array<Address>>();

  public NUMBER_OF_ADDRESS_SUGGESTIONS: number = 4;
  public marker;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {};

  constructor() {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  click(event: google.maps.MouseEvent) {
    const latitude: number = event.latLng.lat();
    const longitude: number = event.latLng.lng();

    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(latitude, longitude);

    this.marker = {
      position: {
        lat: latitude,
        lng: longitude,
      },
    };

    geocoder.geocode({ location: latlng }, (results) => {
      if (results) {
        console.log(results);

        const numberofAddresses = results.length;

        if (this.NUMBER_OF_ADDRESS_SUGGESTIONS > numberofAddresses) {
          this.NUMBER_OF_ADDRESS_SUGGESTIONS = numberofAddresses;
        }

        let addresses: Array<Address> = [];

        for (let i = 0; i < this.NUMBER_OF_ADDRESS_SUGGESTIONS; i++) {
          const parsedAddress: Address = new GoogleAddressParser(
            results[i].address_components,
            { latitude, longitude }
          ).result();

          addresses.push(parsedAddress);
        }

        this.emittAddress.emit(addresses);
      } else {
        console.log('No results found');
      }
    });
  }
}
