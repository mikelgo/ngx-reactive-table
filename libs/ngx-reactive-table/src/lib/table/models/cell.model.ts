import { TemplateRef } from '@angular/core';
import { CellRenderer } from './cell-renderer-types';

export interface Cell {
  val: any;
  hide?: boolean;
  cssClass?: string;
  template?: TemplateRef<any>;
  label?: string;
  cellRenderer?: CellRenderer;
}
