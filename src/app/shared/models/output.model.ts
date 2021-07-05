export class Output {
  public id!: number;
  public callNumberSuap: string;
  public callLinkSuap: string;
  public observations: string;
  public outputDate?: any;

  constructor(props: Omit<Output, 'id'>, id?: number) {
    this.callNumberSuap = props.callNumberSuap;
    this.callLinkSuap = props.callLinkSuap;
    this.observations = props.observations;
    this.outputDate = props.outputDate;
    if (id != undefined) {
      this.id = id;
    }
  }
}
