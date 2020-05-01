import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ExampleData, getTestdata } from './_example/example.model';
import { delay } from 'rxjs/operators';
import {
  TitleColumn,
  DataColumn,
  Datasource,
  TableConfig,
  TitlePositions,
  TableDatasource
} from '@ngx-table/ngx-reactive-table';

@Component({
  selector: 'ngx-table-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('templateTest', { static: true }) templateTest: TemplateRef<any>;

  title = 'ngx-table';

  public headerDefinition: TitleColumn[] = [];

  // TODO check with custom template
  public dataColumnDefinition: DataColumn[] = [];
  public dataColumnDefinition2: DataColumn[] = [];

  public testdata: ExampleData[] = getTestdata();
  data$$ = new BehaviorSubject(this.testdata);
  data$ = this.data$$.asObservable();
  // public datasource: Datasource<ExampleData> = new TableDatasource<ExampleData>(
  //   this.testdata
  // );
  public datasource: Datasource<ExampleData>;

  tableConfig: TableConfig = {
    width: '500px',
    maxBodyHeight: '200px',
    headerConfig: {
      titleRowHeight: '60px',
      titlePositioning: TitlePositions.LEFT_CENTER
    },
    rowConfig: {
      style: 'dense',
      striped: true,
      stripedStyleConfig: {
        backgroundColor: 'yellow',
        bottomBorderStyle: '1px solid blue',
        topBorderStyle: '1px solid blue'
      }
    }
  };
  // d$$ = new BehaviorSubject(this.testdata);
  // d$ = this.d$$.asObservable();

  // ds$$ = new BehaviorSubject(new TableDatasource<ExampleData>(this.testdata));
  // ds$ = this.ds$$.asObservable();

  config$$ = new BehaviorSubject(this.tableConfig);
  config$ = this.config$$.asObservable();
  ngOnInit() {
    this.headerDefinition = [
      { columnTitle: 'ID', width: '10%' },
      { columnTitle: 'Firstname', width: '20%' },
      { columnTitle: 'Lastname', width: '20%' },
      { columnTitle: 'Job', hide: false, width: '25%' },
      { columnTitle: 'App', hide: true, width: '25%' }
    ];
    this.dataColumnDefinition = [
      { displayProperty: 'id', template: this.templateTest },
      { displayProperty: 'p1' },
      { displayProperty: 'p2' },
      { displayProperty: 'p3', hide: false },
      { displayProperty: 'p4', hide: true }
    ];
    this.dataColumnDefinition2 = [
      { displayProperty: 'id' },
      { displayProperty: 'p1' },
      { displayProperty: 'p2' },
      { displayProperty: 'p3', hide: false },
      { displayProperty: 'p4', hide: true }
    ];
    this.datasource = new TableDatasource<ExampleData>();
    /**
     * Simulating HTTP call
     * (1) -> works but table looks weird - fixed
     * (2) -> works and table is fine
     */
    // (1)
    const d$ = this.getExampleData();
    this.datasource.connect(d$);

    // (2)
    // this.getExampleData().subscribe(d => this.datasource.connect(d));

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
      this.datasource.connect(ne);
      this.data$$.next(ne);
    }, 4000);
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

  getExampleData(): Observable<ExampleData[]> {
    return of(this.testdata).pipe(delay(1500));
  }
}
