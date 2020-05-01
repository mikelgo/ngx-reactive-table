/* tslint:disable:no-unused-variable */
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;

  beforeEach(() => {
    component = new FooterComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial row count of 0', () => {
    expect(component.rowCount).toEqual(0);
  });
  it('should display the current row count', () => {
    component.rowCount = 10;

    expect(component.rowCount).toEqual(10);
  });
});
