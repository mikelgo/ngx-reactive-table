import { Component, OnInit } from '@angular/core';
import { Person, getTestdata } from '../../_example/example.model';
import {
  TitleColumn,
  DataColumn,
  Datasource,
  TableDatasource
} from '@ngx-table/ngx-reactive-table';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ngx-table-example-1',
  templateUrl: './example-1.component.html',
  styleUrls: ['./example-1.component.scss']
})
export class Example1Component implements OnInit {
  public testdata: Person[] = getTestdata();

  // Example basic usage
  public headerDefinition: TitleColumn[] = [
    { columnTitle: 'ID', width: '1fr' },
    { columnTitle: 'Firstname', width: '1fr' },
    { columnTitle: 'Lastname', width: '1fr' },
    { columnTitle: 'Job', width: '1fr' },
    { columnTitle: 'App', width: '1fr' }
  ];
  public dataColumnDefinition: DataColumn[] = [
    { displayProperty: 'id' },
    { displayProperty: 'firstName' },
    { displayProperty: 'lastName' },
    { displayProperty: 'jobDesc' },
    { displayProperty: 'random' }
  ];
  public staticDatasource: Datasource<Person> = new TableDatasource<Person>();
  public dynamicDatasource: Datasource<Person> = new TableDatasource<Person>();
  constructor() {}

  ngOnInit() {
    /**
     * Simulating HTTP call
     */
    // const d$ = this.getExampleData();
    // this.datasource.connect(d$);

    this.staticDatasource.connect(this.testdata);

    this.dynamicDatasource.connect(this.getExampleData())
  }

  getExampleData(): Observable<Person[]> {
    return of(this.testdata).pipe(delay(1500));
  }
}
