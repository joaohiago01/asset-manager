import { Contributor } from "./contributor.model";
import { Department } from "./department.model";
import { Output } from "./output.model";
import { OutputAsset } from "./outputAsset.model";
import { ServiceType } from "./serviceType.enum";

export class Service extends Output {
  public serviceType?: ServiceType;
  public description: string;
  public returnDate: Date;
  public departmentId?: number;
  public equipmentId: number;
  public equipmentName?: string;
  public assetOutputs?: OutputAsset[];

  constructor(props: Omit<Service, 'id'>, id?: number) {
    super(props);
    this.serviceType = props.serviceType;
    this.description = props.description;
    this.returnDate = props.returnDate;
    this.departmentId = props.departmentId;
    this.equipmentId = props.equipmentId;
    this.assetOutputs = props.assetOutputs;
    if (props.equipmentName != undefined) {
      this.equipmentName = props.equipmentName;
    }
    if (id != undefined) {
      this.id = id;
    }
  }
}
