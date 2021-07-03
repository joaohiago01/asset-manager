export class Contributor {
  public name: string;
  public registrationNumber: string;  

  constructor(contributor: Contributor) {
    this.name = contributor.name;
    this.registrationNumber = contributor.registrationNumber;
  }
}
