import { Contributor } from "./contributor.model";
import { Department } from "./department.model";

export class Output {
  public id!: number;
  public callNumberSuap?: string;
  public callLinkSuap?: string;
  public observations?: string;
  public outputDate?: any;
  public requestor?: Contributor;
  public consignor?: Contributor;
  public department?: Department;

  constructor(props: Omit<Output, 'id'>, id?: number) {
    this.callNumberSuap = props.callNumberSuap;
    this.callLinkSuap = props.callLinkSuap;
    this.observations = props.observations;
    this.outputDate = props.outputDate;
    this.requestor = props.requestor;
    this.consignor = props.consignor;
    this.department = props.department;
    if (id != undefined) {
      this.id = id;
    }
  }
}
