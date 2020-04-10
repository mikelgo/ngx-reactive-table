import { TemplateRef } from '@angular/core';

export interface ColumnDefinition {
  columns: Column[];
}

export interface Column {
  id?: string | number;
  index?: number;
  columnTitle: string;
  hide?: boolean;
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
