export class InputAsset {
  public id!: number;
  public inputDate: Date;
  public expirationDate: Date;
  public amount: number;
  public assetId?: number;
  public assetName?: string;

  constructor(props: Omit<InputAsset, 'id'>, id?: number) {
    this.inputDate = props.inputDate;
    this.expirationDate = props.expirationDate;
    this.amount = props.amount;
    this.assetId = props.assetId;
    this.assetName = props.assetName;
    if (id != undefined) {
      this.id = id;
    }
  }
}
