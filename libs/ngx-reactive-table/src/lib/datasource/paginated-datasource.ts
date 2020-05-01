import { Datasource } from './datasource';

// TODO add
export class PaginatedDatasource<T> implements Datasource<T> {
  getData(): T[] {
    throw new Error('Method not implemented.');
  }
}
