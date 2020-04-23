import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RowComponent } from './components/row/row.component';
import { CellComponent } from './components/cell/cell.component';
import { InputCellRendererComponent } from './components/cell/cell-renderer/input-cell-renderer/input-cell-renderer.component';
import { HeaderElementComponent } from './components/header/header-element/header-element.component';

const COMPONENTS = [
  TableComponent,
  BodyComponent,
  FooterComponent,
  HeaderComponent,
  RowComponent,
  CellComponent,
  InputCellRendererComponent,
  HeaderElementComponent
];
const MODULES = [CommonModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
  providers: []
})
export class TableModule {}
