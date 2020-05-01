import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { TableModule } from './table/table.module';

@NgModule({
  imports: [CommonModule, SharedModule, TableModule],
  exports: [TableModule]
})
export class NgxReactiveTableModule {}
