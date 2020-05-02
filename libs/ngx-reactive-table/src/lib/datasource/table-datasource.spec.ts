import { TableDatasource } from './table-datasource';
import { Observable, of } from 'rxjs';

import { tick, async } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { throttleTime } from 'rxjs/operators';
interface TestPersonModel {
  id: number;
  firstName: string;
  lastName: string;
}

const TEST_DATA: TestPersonModel[] = [
  { id: 1, firstName: 'Adam', lastName: 'James' },
  { id: 2, firstName: 'Alan', lastName: 'Dallan' }
];

describe('TableDatasource', () => {
  let datasource: TableDatasource<TestPersonModel>;
  const testScheduler = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal
    // e.g. using chai.
    expect(actual).toEqual(expected);
  });

  const marbles = {
    a: TEST_DATA,
    n: null
  };

  beforeEach(() => {
    datasource = new TableDatasource();
  });
  afterEach(() => {
    datasource = null;
  });

  it('connect(): should take an array as input and data$$ should emit the values', () => {
    spyOn(datasource['data$$'], 'next');
    datasource.connect(TEST_DATA);

    expect(datasource['data$$'].next).toHaveBeenCalledWith(TEST_DATA);
  });
  it('connect(): should take an observable as input, subscribe to it and data$$ should emit the values', async(() => {
    const data$: Observable<TestPersonModel[]> = of(TEST_DATA);
    spyOn(datasource['data$$'], 'next');
    spyOn(data$, 'subscribe');
    datasource.connect(data$);
    tick();
    expect(data$.subscribe).toHaveBeenCalled();
    expect(datasource['data$$'].next).toHaveBeenCalledWith(TEST_DATA);
  }));
  // Marble test data$$.next() and check data$ + fetchingData$
  // prettier-ignore-start
  it('generate the stream correctly', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const e1 = cold('-a--b--c---|');
      const subs = '^----------!';
      const expected = '-a-----c---|';

      expectObservable(e1.pipe(throttleTime(3, testScheduler))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(subs);
    });
  });
  it('connect() should take an observable as input, subscribe to it and data$$ should emit the values ', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;

      const data$: Observable<TestPersonModel[]> = of(TEST_DATA);

      datasource.connect(data$);

      const expectedMarble = '--a--';
    });
  });
  // prettier-ignore-end
});
