export class Network {
  constructor(
    public hostname: string,
    public addressIP: string,
    public addressMAC: string
  ) {
    this.hostname = hostname;
    this.addressIP = addressIP;
    this.addressMAC = addressMAC;
  }
}
