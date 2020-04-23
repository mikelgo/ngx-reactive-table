import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import {
  Column,
  RowDefinition,
  CellRenderer,
  ColumnDefinition,
  HeaderColumns
} from './table/models/table-models';
import { TableConfig } from './table/models/table-config';
import { ExampleData, getTestdata } from './_example/example.model';
import { Datasource, TableDatasource } from './datasource/datasource';

@Component({
  selector: 'ngx-table-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-table';
  public rows: RowDefinition[];

  public headerDefinition: HeaderColumns = {
    headers: [
      { columnTitle: 'c1' },
      { columnTitle: 'c2' },
      { columnTitle: 'c3' },
      { columnTitle: 'c4' },
      { columnTitle: 'c5' }
    ]
  };

  // TODO check with CellRenderer
  // TODO check with custom template
  public dataColumnDefinition: ColumnDefinition = {
    columns: [
      { displayProperty: 'id' },
      { displayProperty: 'p1' },
      { displayProperty: 'p2' },
      { displayProperty: 'p3' },
      { displayProperty: 'p4' }
    ]
  };

  public testdata: ExampleData[] = getTestdata();
  public datasource: Datasource<ExampleData> = new TableDatasource<ExampleData>(
    this.testdata
  );

  tableConfig: TableConfig = {
    width: '400px',
    maxBodyHeight: '200px'
  };

  ngOnInit() {
    this.rows = this.initializeRows();
  }

  getVal(element) {
    console.log(element);
    return element;
  }
  initializeRows(): RowDefinition[] {
    // return this.initializeXrows(500);
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
          { val: 'Some longer string value', cellRenderer: CellRenderer.input },
          { val: 'b' },
          { val: 'c' },
          { val: 'some longer string value which is longer ' },
          { val: 'asdf asdf ' }
        ]
      },
      { values: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] },
      { values: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] },
      { values: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] },
      { values: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] },
      { values: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] }
    ];
  }

  initializeXrows(count: number): RowDefinition[] {
    const rows: RowDefinition[] = [];
    for (let i = 1; i <= count; i++) {
      rows.push({
        values: [
          { val: 1 },
          { val: 1 },
          { val: 1 },
          { val: 100012 },
          { val: 'Some string' }
        ]
      });
    }
    return rows;
  }
}
