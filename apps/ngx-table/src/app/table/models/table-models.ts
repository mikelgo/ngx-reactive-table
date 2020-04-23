import { TemplateRef } from '@angular/core';

export interface HeaderColumns {
  headers: TitleColumn[];
}

export interface ColumnDefinition {
  columns: DataColumn[];
}

export interface Column {
  id?: string | number;
  index?: number;
  columnTitle: string;
  hide?: boolean;
  class?: string;
  template?: TemplateRef<any>;
}

export interface TitleColumn extends Column {
  columnTitle: string;
}

export interface DataColumn extends Column {
  value: any;
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
  cellRenderer?: CellRenderer;
}

export enum CellRenderer {
  default = 'default',
  input = 'input'
}

// TODO interface TableBehavior
// TODO interface CellRenderer
// TODO interface Column
// TODO interface Row
