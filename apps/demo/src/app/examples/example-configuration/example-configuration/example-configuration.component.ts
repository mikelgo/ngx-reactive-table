import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Person, getTestdata } from '../../../_example/example.model';
import { TitleColumn, DataColumn, Datasource, TableDatasource, TableConfig, TitlePositions } from '@ngx-table/ngx-reactive-table';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'ngx-table-example-configuration',
  templateUrl: './example-configuration.component.html',
  styleUrls: ['./example-configuration.component.scss']
})
export class ExampleConfigurationComponent implements OnInit, OnDestroy {
  @ViewChild('customTemplate', { static: true }) customTemplate: TemplateRef<any>;
  private destroy$$ = new Subject();
  private config: TableConfig = {
    rowConfig: {
      style: 'wide'
    }
  }
  private config$$ = new BehaviorSubject<TableConfig>(this.config);
  public config$ = this.config$$.asObservable();

  public tableWidthInput = new FormControl(80);
  public tableWidthUnitSelect = new FormControl('%');
  public tableBodyHeight = new FormControl(300);

  public TITLE_POSITIONS = TitlePositions;
  public headerPositionSelect = new FormControl(this.TITLE_POSITIONS.CENTER_CENTER);

  public rowStyleSelect = new FormControl('wide');
  public rowStripedSelect = new FormControl(false);



  public testdata: Person[] = getTestdata();
  // Example basic usage
  public headerDefinition: TitleColumn[] = [
    { columnTitle: 'ID', width: '10%' },
    { columnTitle: 'Firstname', width: '20%' },
    { columnTitle: 'Lastname', width: '20%' },
    { columnTitle: 'Job', width: '30%' },
    { columnTitle: 'App', width: '20%' }
  ];
  public dataColumnDefinition: DataColumn[] = [
    { displayProperty: 'id' },
    { displayProperty: 'firstName' },
    { displayProperty: 'lastName' },
    { displayProperty: 'jobDesc' },
    { displayProperty: 'random' }
  ];
  public staticDatasource: Datasource<Person> = new TableDatasource<Person>();

  public dataColumnWithTemplateDefinition: DataColumn[] = [];
  constructor() { }

  ngOnInit() {
    this.staticDatasource.connect(this.testdata);
    this.dataColumnWithTemplateDefinition = [
      { displayProperty: 'id', template: this.customTemplate },
      { displayProperty: 'firstName' },
      { displayProperty: 'lastName' },
      { displayProperty: 'jobDesc' },
      { displayProperty: 'random' }
    ];
    this.subscribe();

  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  private subscribe() {
   this.subscribeToRowStyleSelect();
   this.subscribeToTableWidthChange();
   this.subscribeToTitlePositionChange();
   this.subscribeToBodyHeightChange();
   this.subscribeToStripedRowsChange();
  }

  private subscribeToRowStyleSelect() {
    this.rowStyleSelect.valueChanges.pipe(
      takeUntil(this.destroy$$)
    ).subscribe(style => {
      const updatedConfig: TableConfig = {
        ...this.config,
        rowConfig: {
          ...this.config.rowConfig,
          style: style
        }
      }
      this.config$$.next(updatedConfig);
    });
  }

  private subscribeToTableWidthChange() {
    const width$ = this.tableWidthInput.valueChanges.pipe(startWith(80));
    const unit$ = this.tableWidthUnitSelect.valueChanges.pipe(startWith('%'));
    combineLatest([width$, unit$]).pipe(
      takeUntil(this.destroy$$)
    ).subscribe(([width, unit]) => {
      const newWidth = new String(width).concat(unit);
      const updatedConfig: TableConfig = {
        ...this.config,
        width: newWidth
      };
      this.config$$.next(updatedConfig);
    });
  }

  private subscribeToBodyHeightChange() {
    this.tableBodyHeight.valueChanges.pipe(
      takeUntil(this.destroy$$)
    ).subscribe(height => {
      const newHeight = new String(height).concat('px');
      const updatedConfig: TableConfig = {
        ...this.config,
        maxBodyHeight: newHeight
      };
      this.config$$.next(updatedConfig);
    })
  }

  private subscribeToTitlePositionChange() {
    this.headerPositionSelect.valueChanges.pipe(
      takeUntil(this.destroy$$)
    ).subscribe(position => {
      const updatedConfig: TableConfig = {
        ...this.config,
        headerConfig: {
          ...this.config.headerConfig,
          titlePositioning: position
        }
      };
      this.config$$.next(updatedConfig);
    });
  }

  private subscribeToStripedRowsChange() {
    this.rowStripedSelect.valueChanges.pipe(
      takeUntil(this.destroy$$)
    ).subscribe(isStriped => {
      const updatedConfig: TableConfig = {
        ...this.config,
        rowConfig: {
          ...this.config.rowConfig,
          striped: isStriped
        }
      };
      this.config$$.next(updatedConfig);
    })
  }

}
