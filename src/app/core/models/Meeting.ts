export default class Meeting {
  public name: string;
  public description: string;
  public maxParticipants: number;
  public date: Date;
  public latitude: number;
  public longitude: number;
  public country: string;
  public province: string;
  public city: string;
  public street: string;
  public postalCode: string;
  public categoryId: string;
  public images: Array<any>;

  constructor(
    name: string,
    description: string,
    maxParticipants: number,
    date: Date,
    latitude: number,
    longitude: number,
    country: string,
    province: string,
    city: string,
    street: string,
    postalCode: string,
    categoryId: string,
    images: Array<any>
  ) {
    this.name = name;
    this.description = description;
    this.maxParticipants = maxParticipants;
    this.date = date;
    this.latitude = latitude;
    this.longitude = longitude;
    this.country = country;
    this.province = province;
    this.city = city;
    this.street = street;
    this.postalCode = postalCode;
    this.categoryId = categoryId;
    this.images = images;
  }
}
