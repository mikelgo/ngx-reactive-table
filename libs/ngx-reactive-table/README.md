# ngx-reactive-table

This library was generated with [Nx](https://nx.dev).

TOC

- Why this library?
- Quick Exmaple how to use/MVE.
- Configuration: Default and options + examples and demo
  - Rowconfig
  - Columnconfig (Width, etc. )
- Datasource
- loading indication
- CellRenderer
- Celltemplates

## Why this library?

This library has the goal to provide a lightweight, reactive and customizable table-component for Angular, leveraging the power of RxJs.

One of the reasons to publish this library is the possibility to provide easy customization in comparison to other table-components like Angular material
or Ag Grid.

E.g. it is not possible out of the box to create a **reusable** Angular material table which has the ability to use different column templates/content for certain columns in some components using the table. To have this feature the developer needs e.g. to leverage content-projection techniques. From my experience this is a common use case and should be possible out of the box.

Also it is not possible without additional effort to change e.g. the look and feel of an Angular material table during runtime. `Ngx-reactive-table` solves this issue
as it is implemented in a reactive way.

In comparison to Ag Grid `ngx-reactive-table` can convice with a small bundle size. The Ag Grid packages shipd usually with > 20MB. Of course Ag Grid provides much more functionalities and is in general very powerful.

I do also really appreciate the work of the Angular material team and all people contributing to material. I love to use the lib and I do not want to bash the
provided table component. I just think some things could be better.

## Quick start

The min. requirements to use the component is to provide three things:

- a `headerDefinition` which describes the column titles,
- a `dataColumnDefinition` which describes which property of a given data structure should be used to display the data,
- a `datasource` providing static or dynamic data (e.g. from an HTTP call).

```typescript
@Component({
  template: `
    <ngx-table
      [headerDefinition]="headerDefinition"
      [dataColumnDefinition]="dataColumnDefinition"
      [datasource]="datasource"
    >
    </ngx-table>
  `
})
export class TableHostComponent implements OnInit {
  public headerDefinition = [
    { columnTitle: 'ID' },
    { columnTitle: 'Firstname' },
    { columnTitle: 'Lastname' }
  ];
  public dataColumnDefinition = [
    { displayProperty: 'id' },
    { displayProperty: 'firstName' },
    { displayProperty: 'lastName' }
  ];

  public datasource = new TableDataSource<Person>();

  constructor(private http: HttpClient) {};

  ngOnInit() {
    // Calling 'connect', connects the datasource to the table.
    this.datasource.connect([//...some static data]);

    // It is also possible to directly pass an observable to the
    // 'connect'-method. This is e.g. helpful if you have an observable
    // from an HTTP-reuqest.

    const data$ = this.http.get('some-endpoint');
    this.datasource.connect(data$);
  }
}

interface Person {
  id: number;
  firstName: string;
  lastName: string;
}
```

## Configuration

### Default config

```typescript
DEFAULT_HEADER_CONFIG: HeaderConfig = {
  titleRowHeight: '50px',
  titlePositioning: TitlePositions.CENTER_CENTER
};

DEFAULT_ROW_CONFIG: RowConfig = {
  style: 'wide'
};

DEFAULT_TABLE_CONFIG: TableConfig = {
  headerConfig: DEFAULT_HEADER_CONFIG,
  rowConfig: DEFAULT_ROW_CONFIG,
  width: '100%',
  maxBodyHeight: '300px'
};
```
