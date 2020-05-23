import { Component, OnInit } from '@angular/core';
import { Person, getTestdata } from '../../_example/example.model';
import { TitleColumn, DataColumn, Datasource, TableDatasource } from '@ngx-table/ngx-reactive-table';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ngx-table-example-loading-indication',
  templateUrl: './example-loading-indication.component.html',
  styleUrls: ['./example-loading-indication.component.scss']
})
export class ExampleLoadingIndicationComponent implements OnInit {
  public testdata: Person[] = getTestdata();

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

  public dynamicDatasource: Datasource<Person> = new TableDatasource<Person>();
  constructor() {}

  ngOnInit() {

    this.dynamicDatasource.connect(this.getExampleData())
  }

  getExampleData(): Observable<Person[]> {
    return of(this.testdata).pipe(delay(Number.MAX_SAFE_INTEGER));
  }

}
