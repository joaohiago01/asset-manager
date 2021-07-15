import { Contributor } from "./contributor.model";
import { Department } from "./department.model";
import { Output } from "./output.model";
import { ServiceType } from "./serviceType.enum";

export class Service extends Output {
  public returnDate: any;
  public serviceType?: ServiceType;
  public description: string;
  public equipmentId: number;
  public equipmentName?: string;
  public department?: Department;
  public requestor: Contributor;
  public consignor: Contributor;

  constructor(props: Omit<Service, 'id'>, id?: number) {
    super(props);
    this.returnDate = props.returnDate;
    this.serviceType = props.serviceType;
    this.description = props.description;
    this.equipmentId = props.equipmentId;
    this.department = props.department;
    this.requestor = props.requestor;
    this.consignor = props.consignor;
    if (props.equipmentName != undefined) {
      this.equipmentName = props.equipmentName;
    }
    if (id != undefined) {
      this.id = id;
    }
  }
}
