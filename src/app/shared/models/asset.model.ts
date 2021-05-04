import { ConservationState } from './conservationState.enum';
import { Network } from './network.model';

export class Asset {
  public id!: number;
  public description: string;
  public number: number;
  public serialNumber: string;
  public categoryId: number;
  public categoryName?: string;
  public block: string;
  public room: string;
  public conservationState: ConservationState;
  public network: Network;
  public filename: string;

  constructor(props: Omit<Asset, 'id'>, id?: number) {
    this.description = props.description;
    this.number = props.number;
    this.serialNumber = props.serialNumber;
    this.categoryId = props.categoryId;
    this.block = props.block;
    this.room = props.room;
    this.conservationState = props.conservationState;
    this.network = props.network;
    this.filename = props.filename;
    if (id != undefined) {
      this.id = id;
    }
  }
}
