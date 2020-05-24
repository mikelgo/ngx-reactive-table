/* tslint:disable:no-unused-variable */
import { CellComponent } from './cell.component';
import { Cell } from '../../models/cell.model';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CellRenderer } from '../../models/public-api';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { InputCellRendererComponent } from './cell-renderer/input-cell-renderer/input-cell-renderer.component';
import { TableModule } from '../../table.module';
describe('CellComponent', () => {
  let component: CellComponent;

  describe('Unit tests', () => {
    beforeEach(() => {
      component = new CellComponent();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('set Cell(): should set a cell if the input is valid', () => {
      const cell: Cell = {
        val: 'some val'
      };
      component.cell = cell;

      expect(component.cell).toEqual(cell);
    });
    it('set Cell(): should not set a cell if the input is NOT valid', () => {
      component.cell = null;
      expect(component.cell).toEqual(null);
    });

    it('get Cell(): should return the cell', () => {
      const cell: Cell = {
        val: 'some val'
      };
      component.cell = cell;
      expect(component.cell).toEqual(cell);
    });
  });
  // TODO something seems to be wrong with Jest + TestBed usage..
  // describe('Template tests', () => {
  //   let comp: CellComponent;
  //   let fixture: ComponentFixture<CellComponent>;

  //   beforeEach(async(() => {
  //     TestBed.configureTestingModule({
  //       imports: [BrowserDynamicTestingModule, TableModule],
  //       declarations: [CellComponent, InputCellRendererComponent]
  //     }).compileComponents();
  //     fixture = TestBed.createComponent(CellComponent);
  //     comp = fixture.componentInstance;
  //     fixture.detectChanges();
  //   }));
  //   afterEach(() => {
  //     comp = null;
  //   });

  //   it('should render the cell value', () => {
  //     const cell: Cell = {
  //       val: 'some val'
  //     };
  //     comp.cell = cell;

  //     // TODO test
  //   });

  //   it('should NOT render a cell value when none is given or the cell is null', () => {
  //     comp.cell = null;

  //     // TODO test
  //   });

  //   it('should render the input cell renderer, when it is given', () => {
  //     const cell: Cell = {
  //       val: 'val',
  //       cellRenderer: CellRenderer.input
  //     };
  //     comp.cell = cell;
  //     //TODO test
  //     const template: HTMLElement = fixture.nativeElement;
  //     expect(template.textContent).toEqual(cell.val);
  //   });

  //   it('should only render the cell value when no cell renderer is given or cellRenderer.default is given', () => {
  //     //TODO test
  //   });
  // });
});
