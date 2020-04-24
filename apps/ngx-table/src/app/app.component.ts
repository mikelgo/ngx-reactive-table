import { Component, OnInit } from '@angular/core';
import { TableConfig } from './table/models/table-config';
import { ExampleData, getTestdata } from './_example/example.model';
import { Datasource, TableDatasource } from './datasource/datasource';
import { TitleColumn } from './table/models/title-column.model';
import { DataColumn } from './table/models/data-column.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

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
    maxBodyHeight: '200px'
  };
  public show = new Subject<TitleColumn>();
  public show$: Observable<TitleColumn> = this.show.asObservable();
  ngOnInit() {
    /**
     * Example for using the toggle/show column API
     */
    // setTimeout(() => {
    //   const col = this.headerDefinition[4];
    //   col.hide = false;
    //   this.show.next(col);
    // }, 1000);
    // this.show$.subscribe();
  }

  getVal(element) {
    console.log(element);
    return element;
  }
}
