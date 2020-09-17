export default class Address {
  public latitude?: number;
  public longitude?: number;
  public country?: string;
  public province?: string;
  public city?: string;
  public street?: string;
  public postalCode?: string;

  constructor(
    latitude: number,
    longitude: number,
    country: string,
    province: string,
    city: string,
    street: string,
    postalCode: string
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.country = country;
    this.province = province;
    this.city = city;
    this.street = street;
    this.postalCode = postalCode;
  }
}
