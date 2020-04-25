import { Component, OnInit } from '@angular/core';
import { TableConfig } from './table/models/table-config';
import { ExampleData, getTestdata } from './_example/example.model';
import { Datasource, TableDatasource } from './datasource/datasource';
import { TitleColumn } from './table/models/title-column.model';
import { DataColumn } from './table/models/data-column.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { TitlePositions } from './table/models/title-positions';

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
    { columnTitle: 'Job', hide: false },
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
    width: '500px',
    maxBodyHeight: '200px',
    headerConfig: {
      titleRowHeight: '60px',
      titlePositioning: TitlePositions.LEFT_CENTER
    },
    rowConfig: {
      style: 'dense'
    }
  };

  ngOnInit() {}
}
