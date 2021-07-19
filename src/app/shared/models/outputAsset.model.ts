import { Asset } from "./asset.model";
import { Output } from "./output.model";

export class OutputAsset extends Output {

    public amount: number;
    public assetId?: number;
    public assetName?: string;
    public departmentId?: number;
    public asset?: Asset;

    constructor(props: Omit<OutputAsset, 'id'>, id?: number) {
        super(props);
        this.amount = props.amount;
        this.asset = props.asset;
        this.departmentId = props.departmentId;
        this.assetId = props.assetId;
        this.assetName = props.assetName;
        if (id != undefined) {
          this.id = id;
        }
      }
    
}