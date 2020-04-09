export interface ColumnDefinition {
  id?: string | number;
  displayValue: string;
  class?: string;
}

export interface RowDefinition {
  id?: string | number;
  index?: number;
  cssClass?: string;
  values: RowValue[]; // the values for each colum
}

export interface RowValue {
  val: any;
  cssClass?: string;
}
