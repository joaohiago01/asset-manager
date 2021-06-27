export class Department {
  public id!: number;
  public name: string;
  public acronym: string;

  constructor(props: Omit<Department, 'id'>, id?: number) {
    this.name = props.name;
    this.acronym = props.acronym;
    if (id != undefined) {
      this.id = id;
    }
  }
}
