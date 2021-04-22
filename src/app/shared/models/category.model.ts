import { CategoryType } from "./categoryType.enum";

export class Category {
  public id!: number;
  public name: string;
  public categoryType: CategoryType;

  constructor(props: Omit<Category, 'id'>, id?: number) {
    this.name = props.name;
    this.categoryType = props.categoryType;
    if (id != undefined) {
      this.id = id;
    }
  }
}
