import { TemplateRef } from '@angular/core';
import { CellRenderer } from './cell-renderer-types';

/**
 * Defines a Column
 */
export interface Column {
  // id of the column
  id?: string | number;
  // index of the column. will be set automatically if not seet
  index?: number;
  // defines if the column is visible or not
  hide?: boolean;
}
