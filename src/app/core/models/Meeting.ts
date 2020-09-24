import Address from './Address';
import Category from './Category';
import Image from './Image';

export default class Meeting {
  public name: string;
  public description: string;
  public maxParticipants: number;
  public date: Date;
  public address?: Address;
  public category?: Category;
  public images?: Array<Image>;

  constructor(
    name: string,
    description: string,
    maxParticipants: number,
    date: Date,
    address?: Address,
    category?: Category,
    images?: Array<Image>
  ) {
    this.name = name;
    this.description = description;
    this.maxParticipants = maxParticipants;
    this.date = date;
    this.address = address;
    this.category = category;
    this.images = images;
  }
}
