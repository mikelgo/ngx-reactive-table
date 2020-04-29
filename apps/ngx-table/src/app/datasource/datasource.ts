import { BehaviorSubject, Observable, isObservable } from 'rxjs';

export interface Datasource<T> {
  /**
   * Data stream
   */
  data$: Observable<T[]>;
  /**
   *  Connects the data with the datasource and sets also the data
   * @param data
   */
  connect(data: T[]): void;
  connect(data: Observable<T[]>): void;
  connect(data: any): void;
  // connect(data?: T[], data$?: Observable<T[]>): void;
  /**
   * Returns a snapshot of the current data
   */
  getDataSnapshot(): T[] | null;
}

export class TableDatasource<T> implements Datasource<T> {
  private data$$: BehaviorSubject<T[]> = new BehaviorSubject(null);
  public data$: Observable<T[]> = this.data$$.asObservable();

  constructor() {
    // this.data$$.next(data);
  }
  // TODO fix this with nice method overloading signature
  // Currently user has to ds.connect(null, data$)
  connect(data: T[]): void;
  connect(data: Observable<T[]>): void;
  connect(data: any): void {
    if (isObservable(data)) {
      this.data$ = data as Observable<T[]>;
    }
    if (Array.isArray(data)) {
      this.data$$.next(data);
    }
  }
  // connect(data?: T[], data$?: Observable<T[]>): void {
  //   if (data) {
  //     this.data$$.next(data);
  //   }
  //   if (data$) {
  //     this.data$ = data$;
  //   }
  // }

  getDataSnapshot() {
    if (this.data$$) {
      return this.data$$.getValue();
    } else {
      return null;
    }
  }
}
