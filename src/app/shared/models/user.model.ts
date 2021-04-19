export class User {
  public username: string;
  public password: string;

  constructor(props: User) {
    this.username = props.username;
    this.password = props.password;
  }
}
