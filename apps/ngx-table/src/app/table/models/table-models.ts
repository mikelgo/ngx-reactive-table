export interface ColumnDefinition {
  id?: string | number;
  displayValue: string;
  class?: string;
}

export interface RowDefinition {
  id?: string | number;
  index?: number;
  cssClass?: string;
  values: Cell[]; // the values for each colum
}

export interface Cell {
  val: any;
  cssClass?: string;
}
