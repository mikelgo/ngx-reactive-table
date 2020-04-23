export interface Datasource<T> {
  // connect(data: T[]): void;
}

export class TableDatasource<T> implements Datasource<T> {
  private _data: T[] = [];
  // public set data(data: T[]) {
  //   this._data = data;
  // }

  // public get data(): T[] {
  //   return this._data;
  // }

  constructor(data: T[]) {
    this._data = data;
  }
}
