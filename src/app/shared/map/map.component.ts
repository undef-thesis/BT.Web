import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import Address from 'src/app/core/models/Address';
import Marker from 'src/app/core/models/Marker';
import Meeting from 'src/app/core/models/Meeting';
import { GoogleAddressParser } from './GoogleAddressParser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  @Input() readMode: boolean = false;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() range?: number;
  @Input() meetings: Array<Meeting>;
  @Output() emittAddress = new EventEmitter<Array<Address>>();

  public NUMBER_OF_ADDRESS_SUGGESTIONS: number = 4;
  public markers: Array<Marker> = [];
  public infoContent = null;

  public mapRange: number = 0;

  public zoom: number = 12;
  public center: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setMarkers();

    this.mapRange = this.range;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.meetings && changes.meetings.currentValue) {
      this.setMarkers(changes.meetings.currentValue);
    }

    if (
      (changes.latitude && changes.latitude.currentValue) ||
      (changes.longitude && changes.longitude.currentValue)
    ) {
      this.setCenter(this.latitude, this.longitude);

      this.markers = [
        {
          position: {
            lat: this.latitude,
            lng: this.longitude,
          },
        },
      ];
    }

    if (changes.range && changes.range.currentValue) {
      this.mapRange = changes.range.currentValue;
    }
  }

  private setMarkers(meetings?: Array<Meeting>): void {
    this.markers = [];

    if (this.readMode) {
      this.setCenter(this.latitude, this.longitude);

      if (this.meetings) {
        this.meetings.forEach((meeting) => {
          this.markers.push({
            id: meeting.id,
            position: {
              lat: meeting.address.latitude,
              lng: meeting.address.longitude,
            },
            title: meeting.name,
            info: meeting.address,
            range: meeting.address.range ? meeting.address.range : null,
          });
        });
      }
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setCenter(position.coords.latitude, position.coords.longitude);
        },
        (error) => error,
        { enableHighAccuracy: true }
      );
    }
  }

  private setCenter(latitude: number, longitude: number): void {
    this.center = {
      lat: latitude,
      lng: longitude,
    };
  }

  openInfo(marker: MapMarker, content: Address, id: string) {
    this.infoContent = content;
    this.infoContent.id = id;
    this.infoWindow.open(marker);
  }

  public click(event: google.maps.MouseEvent): void {
    if (!this.readMode) {
      const latitude: number = event.latLng.lat();
      const longitude: number = event.latLng.lng();

      this.geocode(latitude, longitude);
    }
  }

  public goToMeetingDetails(id: string): void {
    this.router.navigate([`/meetings`, id]);
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
