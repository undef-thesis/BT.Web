import User from './User';

export default class UserRegister extends User {
  public confirmPassword: string;
  public firstName: string;
  public lastName: string;

  constructor(
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) {
    super(email, password);
    this.confirmPassword = confirmPassword;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
