The minimum requirements to use `ngx-table` is to provide a `TitleColumn[]`, `DataColumn[]` and a `TableDatasource`.

See example below:

```typescript
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
  public datasource: Datasource<Person> = new TableDatasource<Person>();

  ngOnInit() {
    this.datasource.connect([...some static data...]);
  }
```
