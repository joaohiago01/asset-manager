export enum CategoryType {
  SOFTWARE = 'SOFTWARE',
  HARDWARE = 'HARDWARE',
  REDE = 'REDE',
  MOBILIÁRIO = 'MOBILIÁRIO',
  OUTROS = 'OUTROS',
}

const categoryType: Array<string> = Object.keys(CategoryType).filter((key) =>
  isNaN(+key)
);
