import { TemplateRef } from '@angular/core';

export interface ColumnDefinition {
  id?: string | number;
  index?: number;
  columnTitle: string;
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
  cellTemplate?: TemplateRef<any>;
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
