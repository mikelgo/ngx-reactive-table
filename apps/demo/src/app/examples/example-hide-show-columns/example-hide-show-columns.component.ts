import { Component, OnInit } from '@angular/core';
import { Person, getTestdata } from '../../_example/example.model';
import { TitleColumn, DataColumn, Datasource, TableDatasource } from '@ngx-table/ngx-reactive-table';

@Component({
  selector: 'ngx-table-example-hide-show-columns',
  templateUrl: './example-hide-show-columns.component.html',
  styleUrls: ['./example-hide-show-columns.component.scss']
})
export class ExampleHideShowColumnsComponent implements OnInit {
  public testdata: Person[] = getTestdata();

  public headerDefinition: TitleColumn[] = [
    { columnTitle: 'ID', width: '1fr' },
    { columnTitle: 'Firstname', width: '1fr' },
    { columnTitle: 'Lastname', width: '1fr' },
    { columnTitle: 'Job', width: '1fr', hide: true },
    { columnTitle: 'App', width: '1fr', hide: true }
  ];
  public dataColumnDefinition: DataColumn[] = [
    { displayProperty: 'id' },
    { displayProperty: 'firstName' },
    { displayProperty: 'lastName' },
    { displayProperty: 'jobDesc' },
    { displayProperty: 'random' }
  ];
  public staticDatasource: Datasource<Person> = new TableDatasource<Person>();

  constructor() {}

  ngOnInit() {
    this.staticDatasource.connect(this.testdata);

  }



}
