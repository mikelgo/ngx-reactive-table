# ngx-reactive-table

This library was generated with [Nx](https://nx.dev).

## TOC

- [Why this library?](#why-this-library)
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [Open requirements](#open-requirements)
- [Contribution](#contribution)

## Why this library?

This library has the goal to provide a lightweight, reactive and customizable table-component for Angular, leveraging the power of RxJs. The table is responsive by leveraging CSS-Grid.

One of the reasons to publish this library is the possibility to provide easy customization in comparison to other table-components like Angular material
or Ag Grid.

E.g. it is not possible out of the box to create a **reusable** Angular material table which has the ability to use different column templates/content for certain columns in some components using the table. To have this feature the developer needs e.g. to leverage content-projection techniques. From my experience this is a common use case and should be possible out of the box.

In comparison to Ag Grid `ngx-reactive-table` can convice with a small bundle size. The Ag Grid packages shipd usually with > 20MB. Of course Ag Grid provides much more functionalities and is in general very powerful.

## Quick start

First import `NgxReactiveTableModule` into your app.

The min. requirements to use the component is to provide three things:

- a `headerDefinition` which describes the column titles,
- a `dataColumnDefinition` which describes which property of a given data structure should be used to display the data,
- a `datasource` providing static or dynamic data (e.g. from a HTTP call).

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
  public headerDefinition: TitleColumn[] = [
    { columnTitle: 'ID' },
    { columnTitle: 'Firstname' },
    { columnTitle: 'Lastname' }
  ];
  public dataColumnDefinition: DataColumn[] = [
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

### Table configuration

Several properties of the table can be customized by providing configuration-objects. The default configuration is:

```typescript
const DEFAULT_TABLE_CONFIG: TableConfig = {
  headerConfig: DEFAULT_HEADER_CONFIG,
  rowConfig: DEFAULT_ROW_CONFIG,
  width: '100%',
  maxBodyHeight: '300px',
  defaultColumnWidth: '1fr'
};

const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  titleRowHeight: '50px',
  titlePositioning: TitlePositions.CENTER_CENTER
};

const DEFAULT_ROW_CONFIG: RowConfig = {
  style: 'wide',
  striped: false
};
```

Every property can be overwritten by providing a custom config as table-input. It is of course also possible to switch configuration easy during runtime (e.g. to provide the possibility to toggle between wide/dense table rows).

### Column configuration

In the [Quick start](#quick-start)-section we had a first look on how to define the columns, which should be used in the table.

Generally there are two types of columns: `TitleColumn` and `DataColumn`, both extending a `Column`.

A `TitleColumn` just defines a column which is shown in the table header. A `DataColumn` therefor is just a column holding some data.

#### Providing a custom template

To have a flexible table it is possible to provide a custom `ng-template` which will be rendered as cell-template instead of a the default cell.

To do so it is necessary to provide a template

```html
<ng-template #customTemplate let-element="element">
  <div class="custom">
    {{ element }}
  </div>
</ng-template>
```

and assign it to the according column:

```typescript
@Component({...})
export class TableHostComponent implements OnInit {}
  @ViewChild('customTemplate', { static: true }) customTemplate: TemplateRef<any>;

  ngOnInit() {
    this.dataColumnDefinition: DataColumn[] = [
    { displayProperty: 'id', template: this.customTemplate },
    {...}
  ]
  }
```

# Open issues

Please have a look at the [issues](https://github.com/mikelgo/ngx-reactive-table/issues).

# Contribution
