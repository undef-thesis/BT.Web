export default class Address {
  public latitude?: number;
  public longitude?: number;
  public range?: number;
  public country?: string;
  public countryCode?: string;
  public province?: string;
  public city?: string;
  public street?: string;
  public postalCode?: string;

  constructor(
    latitude: number,
    longitude: number,
    range: number,
    country: string,
    province: string,
    city: string,
    street: string,
    postalCode: string
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.range = range;
    this.country = country;
    this.province = province;
    this.city = city;
    this.street = street;
    this.postalCode = postalCode;
  }
}
