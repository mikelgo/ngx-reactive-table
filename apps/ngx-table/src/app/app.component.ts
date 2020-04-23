import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import {
  Column,
  RowDefinition,
  CellRenderer,
  TitleColumn,
  DataColumn
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

  public headerDefinition: TitleColumn[] = [
    { columnTitle: 'ID' },
    { columnTitle: 'Firstname' },
    { columnTitle: 'Lastname' },
    { columnTitle: 'Job', hide: true },
    { columnTitle: 'App', hide: true }
  ];

  // TODO check with custom template
  public dataColumnDefinition: DataColumn[] = [
    { displayProperty: 'id' },
    { displayProperty: 'p1' },
    { displayProperty: 'p2' },
    { displayProperty: 'p3', hide: true },
    { displayProperty: 'p4', hide: true }
  ];

  public testdata: ExampleData[] = getTestdata();
  public datasource: Datasource<ExampleData> = new TableDatasource<ExampleData>(
    this.testdata
  );

  tableConfig: TableConfig = {
    width: '400px',
    maxBodyHeight: '200px'
  };

  ngOnInit() {}

  getVal(element) {
    console.log(element);
    return element;
  }
}
