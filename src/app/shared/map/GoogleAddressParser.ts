interface AddressComponent {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

interface Address {
  latitude?: number;
  longitude?: number;
  country?: string;
  countryCode?: string;
  province?: string;
  city?: string;
  street?: string;
  postalCode?: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export class GoogleAddressParser {
  private address: Address = {};

  constructor(
    private addressComponents: Array<AddressComponent>,
    private coordinates: Coordinates
  ) {
    this.parseAddress();
  }

  public result(): Address {
    return this.address;
  }

  private parseAddress() {
    if (!Array.isArray(this.addressComponents)) {
      throw Error('Address Components is not an array');
    }

    if (!this.addressComponents.length) {
      throw Error('Address Components is empty');
    }

    let streetNumber: string = '';

    for (let i = 0; i < this.addressComponents.length; i++) {
      const component: AddressComponent = this.addressComponents[i];

      this.address.latitude = this.coordinates.latitude;
      this.address.longitude = this.coordinates.longitude;

      if (this.isStreetNumber(component) && component.long_name !== undefined) {
        streetNumber = component.long_name;
      }

      if (
        this.isStreetName(component) &&
        component.long_name !== 'Unnamed Road'
      ) {
        this.address.street = `${component.long_name} ${streetNumber}`;
      }

      if (this.isCity(component)) {
        this.address.city = component.long_name;
      }

      if (this.isCountry(component)) {
        this.address.country = component.long_name;
      }

      if (this.isProvince(component)) {
        this.address.province = component.long_name;
      }

      if (this.isPostalCode(component)) {
        this.address.postalCode = component.long_name;
      }
    }
  }

  public parseAddressShort() {
    if (!Array.isArray(this.addressComponents)) {
      throw Error('Address Components is not an array');
    }

    if (!this.addressComponents.length) {
      throw Error('Address Components is empty');
    }

    for (let i = 0; i < this.addressComponents.length; i++) {
      const component: AddressComponent = this.addressComponents[i];

      this.address.latitude = this.coordinates.latitude;
      this.address.longitude = this.coordinates.longitude;

      if (this.isCity(component)) {
        this.address.city = component.long_name;
      }

      if (this.isCountry(component)) {
        this.address.country = component.long_name;
        this.address.countryCode = component.short_name;
      }
    }

    return this.address;
  }

  private isStreetNumber(component: AddressComponent): boolean {
    return component.types.includes('street_number');
  }

  private isStreetName(component: AddressComponent): boolean {
    return component.types.includes('route');
  }

  private isCity(component): boolean {
    return component.types.includes('locality');
  }

  private isProvince(component): boolean {
    return component.types.includes('administrative_area_level_1');
  }

  private isCountry(component): boolean {
    return component.types.includes('country');
  }

  private isPostalCode(component): boolean {
    return component.types.includes('postal_code');
  }
}
