import { TemplateRef } from '@angular/core';
import { CellRenderer } from './cell-renderer-types';

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
