export class Rede {
  constructor(
    public hostname: string,
    public enderecoIP: string,
    public enderecoMAC: string
  ) {
    this.hostname = hostname;
    this.enderecoIP = enderecoIP;
    this.enderecoMAC = enderecoMAC;
  }
}
