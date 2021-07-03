import { Contributor } from "./contributor.model";
import { Department } from "./department.model";
import { Output } from "./outpup.model";
import { StatusLoan } from "./statusLoan.enum";

export class Loan extends Output {
  public returnDate: Date;
  public expectedReturnDate: Date;
  public statusLoan: StatusLoan;
  public equipmentId: number;
  public equipmentName?: string;
  public department: Department;
  public requestor: Contributor;
  public consignor: Contributor;

  constructor(props: Omit<Loan, 'id'>, id?: number) {
    super(props);
    this.returnDate = props.returnDate;
    this.expectedReturnDate = props.expectedReturnDate;
    this.statusLoan = props.statusLoan;
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
