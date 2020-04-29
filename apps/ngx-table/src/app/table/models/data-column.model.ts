import { Column } from './column.model';
import { TemplateRef } from '@angular/core';
import { CellRenderer } from './cell-renderer-types';

/**
 * defines the columns which hold the data to display in a table
 */
export interface DataColumn extends Column {
  displayProperty: string;
  hide?: boolean;
  // custom css class which will be rendered instead of styling
  class?: string;
  // custom ng-template which will be rendered instead of default column
  template?: TemplateRef<any>;
  // custom cell renderer which will be rendered insteaf of default column
  cellRenderer?: CellRenderer;
}
