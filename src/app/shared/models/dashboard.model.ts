import { InputAsset } from "./inputAsset.model";
import { Loan } from "./loan.model";
import { OutputAsset } from "./outputAsset.model";
import { Service } from "./service.model";

export class Dashboard {
  public assetInputs: InputAsset[];
  public assetOutputs: OutputAsset[];
  public loans: Loan[];
  public services: Service[];

  constructor(props: Dashboard) {
    this.assetInputs = props.assetInputs;
    this.assetOutputs = props.assetOutputs;
    this.loans = props.loans;
    this.services = props.services;
  }
}
