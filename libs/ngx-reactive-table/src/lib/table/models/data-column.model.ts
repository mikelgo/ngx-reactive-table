import { Column } from './column.model';
import { TemplateRef } from '@angular/core';
import { CellRenderer } from './cell-renderer-types';

/**
 * Defines the columns which hold the data to display in a table
 */
export interface DataColumn extends Column {
  /**
   * Property name/object key which should be displayed.
   */
  displayProperty: string;
  /**
   * Defines if a column should be visible or not.
   */
  hide?: boolean;
  /**
   * Custom css class which will be rendered instead of styling.
   */
  class?: string;
  /**
   * Custom ng-template which will be rendered instead of default column.
   */
  template?: TemplateRef<any>;
  /**
   * Custom cell renderer which will be rendered instead of default column.
   */
  cellRenderer?: CellRenderer;
}
