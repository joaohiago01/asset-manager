export class SoftwareLicense {
  public id!: number;
  public name: string;
  public number: string;
  public activationKey: string;
  public maxActivations?: any;
  public numberOfActivationsUsed: number;
  public ignoreMaxActivations?: boolean;
  public categoryId: number;
  public categoryName?: string;

  constructor(props: Omit<SoftwareLicense, 'id'>, id?: number) {
    this.name = props.name;
    this.number = props.number;
    this.activationKey = props.activationKey;
    this.maxActivations = props.maxActivations;
    this.numberOfActivationsUsed = props.numberOfActivationsUsed;
    this.ignoreMaxActivations = props.ignoreMaxActivations;
    this.categoryId = props.categoryId;
    if (id != undefined) {
      this.id = id;
    }
  }
}
