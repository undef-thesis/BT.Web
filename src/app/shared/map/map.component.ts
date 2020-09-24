import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import Address from 'src/app/core/models/Address';
import { GoogleAddressParser } from './GoogleAddressParser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() readMode: boolean = false;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() title: string;
  @Input() address: Address;
  @Output() emittAddress = new EventEmitter<Array<Address>>();

  public NUMBER_OF_ADDRESS_SUGGESTIONS: number = 4;
  public marker;
  public infoContent;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {};
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }
  constructor() {}

  ngOnInit(): void {
    if (this.readMode) {
      this.center = {
        lat: this.latitude,
        lng: this.longitude,
      };

      this.marker = {
        position: {
          lat: this.latitude,
          lng: this.longitude,
        },
        title: this.title,
        info: this.prepareAddress(),
      };
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  private prepareAddress(): string {
    const { street, province, postalCode, city, country } = this.address;
    return `${street} - ${province} - ${postalCode} - ${city} - ${country}`; 
    // return 
    //   '<div>' +
    //     '<div>' + street + '</div>'+
    //     '<div>'+ province + '</div>' +
    //     '<div>'+ postalCode + '</div>' +
    //     '<div>'+ city + '</div>' +
    //     '<div>'+ country + '</div>' + 
    //   '</div>';
  }

  public click(event: google.maps.MouseEvent): void {
    if (!this.readMode) {
      const latitude: number = event.latLng.lat();
      const longitude: number = event.latLng.lng();

      this.marker = {
        position: {
          lat: latitude,
          lng: longitude,
        },
      };

      this.geocode(latitude, longitude);
    }
  }

  private geocode(latitude: number, longitude: number): void {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({ location: latlng }, (results) => {
      if (results) {
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
