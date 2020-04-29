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
  d$$ = new BehaviorSubject(this.testdata);
  d$ = this.d$$.asObservable();

  ds$$ = new BehaviorSubject(new TableDatasource<ExampleData>(this.testdata));
  ds$ = this.ds$$.asObservable();

  config$$ = new BehaviorSubject(this.tableConfig);
  config$ = this.config$$.asObservable();
  ngOnInit() {
    /**
     * Working but then in HTML: [datasource]="ds | async"
     */
    // setTimeout(() => {
    //   const ne = [...this.testdata];
    //   ne[0].p1 = 'abc';
    //   const d = this.ds$$.getValue();
    //   d.setData(ne);
    //   this.ds$$.next(d);
    // }, 1500);
    /**
     * Working with HTML [datasource]="datasource"
     * Would also be possible to next the datasource
     */
    setTimeout(() => {
      const ne = [...this.testdata];
      ne[0].p1 = 'abc';
      this.datasource.setData(ne);
    }, 1500);
    // setTimeout(() => {
    //   this.config$$.next({
    //     ...this.tableConfig,
    //     width: 'auto',
    //     maxBodyHeight: '400px',
    //     headerConfig: { titleRowHeight: '80px' },
    //     rowConfig: { style: 'wide' }
    //   });
    // }, 3000);
  }
}
