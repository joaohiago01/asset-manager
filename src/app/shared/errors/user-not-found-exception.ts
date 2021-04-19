export class UserNotFoundException implements Error {
  constructor() {
    this.name = 'UserNotFoundException';
    this.message = 'User not found';
  }
  name: string;
  message: string;
  stack?: string | undefined;
}
