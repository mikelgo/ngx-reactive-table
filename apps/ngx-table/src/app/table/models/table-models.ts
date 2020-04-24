import { TemplateRef } from '@angular/core';

/**
 * Defines the header columns a table should have
 */

/**
 * defines the columns which hold the data to display in a table
 */
export interface DataColumn extends Column {
  displayProperty: string;
  id?: string | number;
  hide?: boolean;
}

/**
 * Defines a Column
 */
export interface Column {
  // custom css class which will be rendered instead of styling
  class?: string;
  // custom ng-template which will be rendered instead of default column
  template?: TemplateRef<any>;
  // custom cell renderer which will be rendered insteaf of default column
  cellRenderer?: CellRenderer;
}
/**
 * Defines a  column which is displayed in {@link HeaderColumns}
 */
export interface TitleColumn extends Column {
  // id of the column
  id?: string | number;
  // index of the column. will be set automatically if not seet
  index?: number;
  // title of the column
  columnTitle: string;
  // defines if the column is visible or not
  hide?: boolean;
}

export interface RowDefinition {
  id?: string | number;
  index?: number;
  cssClass?: string;
  values: Cell[]; // the values for each colum
}

export interface DataRow {
  id?: string | number;
  index?: number;
  cssClass?: string;
  values: Cell[];
}

export interface Cell {
  val: any;
  hide?: boolean;
  cssClass?: string;
  template?: TemplateRef<any>;

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
