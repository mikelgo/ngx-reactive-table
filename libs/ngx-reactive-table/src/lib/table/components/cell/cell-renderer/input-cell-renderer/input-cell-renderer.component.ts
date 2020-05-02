import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-table-input-cell-renderer',
  templateUrl: './input-cell-renderer.component.html',
  styleUrls: ['./input-cell-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCellRendererComponent implements OnInit {
  @Input() label: string = '';
  @Input() value: any = null;
  constructor() {}

  ngOnInit() {}

  public showLabel(): boolean {
    if (this.label && this.label.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
