import { Output } from "./output.model";

export class OutputAsset extends Output {

    public amount: number;
    public assetId?: number;
    public assetName?: string;
    public departmentId?: number;

    constructor(props: Omit<OutputAsset, 'id'>, id?: number) {
        super(props);
        this.amount = props.amount;
        this.departmentId = props.departmentId;
        if (id != undefined) {
          this.id = id;
        }
      }
    
}