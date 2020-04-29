import { BehaviorSubject, Observable, isObservable } from 'rxjs';
import { Datasource } from './datasource';

export class TableDatasource<T> implements Datasource<T> {
  private data$$: BehaviorSubject<T[]> = new BehaviorSubject(null);
  public data$: Observable<T[]> = this.data$$.asObservable();

  constructor() {}

  connect(data: T[]): void;
  connect(data: Observable<T[]>): void;
  connect(data: any): void {
    if (isObservable(data)) {
      /**
       * no need to handle subscription as it does not come from external source.
       * Will be cleaned up by JS-GC
       */
      (data as Observable<T[]>).subscribe(data => this.data$$.next(data));
    }
    if (Array.isArray(data)) {
      this.data$$.next(data);
    }
  }

  getDataSnapshot() {
    if (this.data$$) {
      return this.data$$.getValue();
    } else {
      return null;
    }
  }
}
