export interface Datasource<T> {
  // connect(data: T[]): void;

  getData(): T[];
}

// TODO provide possibility to direclty provide a stream$
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

  getData(): T[] {
    return this._data;
  }
}
