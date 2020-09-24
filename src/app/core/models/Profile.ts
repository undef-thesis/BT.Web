export class Profile {
  public firstname: string;
  public lastname: string;
  public avatar?: any;

  constructor(firstname: string, lastname: string, avatar?: any) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.avatar = avatar;
  }
}
