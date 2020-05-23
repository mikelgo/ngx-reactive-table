import { Component, OnInit, OnDestroy } from '@angular/core';
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

  private destroy$$ = new Subject();
  private config: TableConfig = {
    rowConfig: {
      style: 'wide',
    }
  }
  private config$$ = new BehaviorSubject<TableConfig>(this.config);
  public config$ = this.config$$.asObservable();

  public rowStyleSelect = new FormControl('wide');

  public TITLE_POSITIONS = TitlePositions;
  public headerPositionSelect = new FormControl(this.TITLE_POSITIONS.CENTER_CENTER);

  public tableWidthInput = new FormControl(100);
  public tableWidthUnitSelect = new FormControl('%');




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
  constructor() { }

  ngOnInit() {
    this.staticDatasource.connect(this.testdata);

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
    const width$ = this.tableWidthInput.valueChanges.pipe(startWith(100));
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

  private subscribeToTitlePositionChange() {
    this.headerPositionSelect.valueChanges.subscribe(position => {
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

}
