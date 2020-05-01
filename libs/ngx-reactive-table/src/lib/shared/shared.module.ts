import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

const COMPONENTS = [CheckboxComponent];
const MODULES = [CommonModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule {}
