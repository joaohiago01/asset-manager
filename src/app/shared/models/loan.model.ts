import { Output } from "./outpup.model";
import { StatusLoan } from "./statusLoan.enum";

export class Loan extends Output {
  public returnDate: Date;
  public expectedReturnDate: Date;
  public statusLoan: StatusLoan;
  public equipmentId: number;
  public equipmentName?: string;

  constructor(props: Omit<Loan, 'id'>, id?: number) {
    super(props);
    this.returnDate = props.returnDate;
    this.expectedReturnDate = props.expectedReturnDate;
    this.statusLoan = props.statusLoan;
    this.equipmentId = props.equipmentId;
    if (id != undefined) {
      this.id = id;
    }
  }
}
