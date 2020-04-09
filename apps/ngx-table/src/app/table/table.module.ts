import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';

const COMPONENTS = [TableComponent];
const MODULES = [CommonModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
  providers: []
})
export class TableModule {}
