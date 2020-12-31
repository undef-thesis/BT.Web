interface LatLng {
  lat: number;
  lng: number;
}

export default class Marker {
  public id?: string;
  public position: LatLng;
  public title?: string;
  public info?: any;
  public range?: number;

  constructor(
    id: string,
    position: LatLng,
    title: string = '',
    info: any = '',
    range: number = 0
  ) {
    this.id = id;
    this.position = position;
    this.title = title;
    this.info = info;
    this.range = range;
  }
}
