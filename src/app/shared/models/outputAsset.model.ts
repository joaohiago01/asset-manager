import { Asset } from "./asset.model";
import { Output } from "./output.model";

export class OutputAsset extends Output {

    public amount: number;
    public assetId?: number;
    public assetName?: string;
    public departmentId?: number;
    public asset?: Asset;
    public serviceAssetTableId?: number;
    public unitOfMeasurement?: string;

    constructor(props: Omit<OutputAsset, 'id'>, id?: number) {
        super(props);
        this.amount = props.amount;
        this.asset = props.asset;
        this.departmentId = props.departmentId;
        this.assetId = props.assetId;
        this.assetName = props.assetName;
        this.serviceAssetTableId = props.serviceAssetTableId;
        this.unitOfMeasurement = props.unitOfMeasurement;
        if (id != undefined) {
          this.id = id;
        }
      }
    
}