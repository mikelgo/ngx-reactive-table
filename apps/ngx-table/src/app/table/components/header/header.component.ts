import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Renderer2,
  ElementRef
} from '@angular/core';
import { TitleColumn } from '../../models/table-models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-table-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _displayColumns: TitleColumn[] = [];
  @Input() set displayColumns(displayColumns: TitleColumn[]) {
    this._displayColumns = displayColumns;
  }
  @Input() columnCount: number = 0;
  gridCols = 4;
  gap = 4;

  get displayColumns() {
    return this._displayColumns;
  }

  getTemplateColumns(): string {
    return `repeat(${this.columnCount}, 1fr)`;
  }
  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngOnInit() {}
}
