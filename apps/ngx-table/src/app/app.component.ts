import { Component } from '@angular/core';
import { ColumnDefinition, RowDefinition } from './table/table-models';

@Component({
  selector: 'ngx-table-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-table';

  initializeColumns(): ColumnDefinition[] {
    return [
      { displayValue: 'c1' },
      { displayValue: 'c2' },
      { displayValue: 'c3' },
      { displayValue: 'c4' },
      { displayValue: 'c5' }
    ];
  }

  initializeRows(): RowDefinition[] {
    return [
      { values: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] },
      { values: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] },
      { values: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] },
      {
        values: [
          { val: 'a' },
          { val: 'b' },
          { val: 'c' },
          { val: 'd' },
          { val: '' }
        ]
      },
      {
        values: [
          { val: 'Some longer string value' },
          { val: 'b' },
          { val: 'c' },
          { val: 'some longer string value which is longer ' },
          { val: '' }
        ]
      }
    ];
  }
}
