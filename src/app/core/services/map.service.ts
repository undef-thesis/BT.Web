import { Injectable } from '@angular/core';
import { GoogleAddressParser } from 'src/app/shared/map/GoogleAddressParser';
import Address from '../models/Address';
import { BehaviorSubject, Observable } from 'rxjs';

// TODO: REMOVE THIS COMPONENT???

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  public geocode(
    latitude: number,
    longitude: number,
    NUMBER_OF_ADDRESS_SUGGESTIONS: number
  ) {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(latitude, longitude);
    let addresses: Array<Address> = [];
    let myBehaviorSubject = new BehaviorSubject(addresses);

    geocoder.geocode({ location: latlng }, (results) => {
      if (results) {
        console.log(results);
        const numberofAddresses = results.length;

        if (NUMBER_OF_ADDRESS_SUGGESTIONS > numberofAddresses) {
          NUMBER_OF_ADDRESS_SUGGESTIONS = numberofAddresses;
        }

        for (let i = 0; i < NUMBER_OF_ADDRESS_SUGGESTIONS; i++) {
          const parsedAddress: Address = new GoogleAddressParser(
            results[i].address_components,
            { latitude, longitude }
          ).result();

          addresses.push(parsedAddress);
          myBehaviorSubject.next(addresses);
        }

        return myBehaviorSubject.asObservable();
      } else {
        console.log('No results found');
        return null;
      }
    });
  }
}
