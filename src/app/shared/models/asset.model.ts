export class Asset {
  public id!: number;
  public name: string;
  public bookcase: string;
  public shelf: string;
  public minQuantity: number;
  public currentQuantity: number;
  public unitOfMeasurement: string;
  public categoryId: number;
  public categoryName?: string;

  constructor(props: Omit<Asset, 'id'>, id?: number) {
    this.name = props.name;
    this.bookcase = props.bookcase;
    this.shelf = props.shelf;
    this.minQuantity = props.minQuantity;
    this.currentQuantity = props.currentQuantity;
    this.unitOfMeasurement = props.unitOfMeasurement;
    this.categoryId = props.categoryId;
    if (id != undefined) {
      this.id = id;
    }
  }
}
