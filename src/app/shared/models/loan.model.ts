import { Output } from "./output.model";
import { StatusLoan } from "./statusLoan.enum";

export class Loan extends Output {
  public returnDate: any;
  public expectedReturnDate: any;
  public statusLoan?: StatusLoan;
  public equipmentId: number;
  public equipmentName?: string;

  constructor(props: Omit<Loan, 'id'>, id?: number) {
    super(props);
    this.returnDate = props.returnDate;
    this.expectedReturnDate = props.expectedReturnDate;
    this.statusLoan = props.statusLoan;
    this.equipmentId = props.equipmentId;
    if (props.equipmentName != undefined) {
      this.equipmentName = props.equipmentName;
    }
    if (id != undefined) {
      this.id = id;
    }
  }
}
