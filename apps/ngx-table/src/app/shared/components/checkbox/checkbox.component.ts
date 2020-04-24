import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TitleColumn } from '../../../table/models/table-models';

@Component({
  selector: 'ngx-table-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() label: string = '';
  @Input() ID: string = '';
  @Input() value: TitleColumn = null;
  @Output() check = new EventEmitter<TitleColumn>();
  constructor() {}

  ngOnInit() {}

  onSelect() {
    this.check.emit(this.value);
  }
}
