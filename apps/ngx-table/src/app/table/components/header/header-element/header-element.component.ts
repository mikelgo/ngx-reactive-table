import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ngx-table-header-element',
  templateUrl: './header-element.component.html',
  styleUrls: ['./header-element.component.scss']
})
export class HeaderElementComponent implements OnInit {
  @Input() header = null;

  gridCols = 3;
  @HostBinding('style.grid-template-columns')
  colum = `repeat(${this.gridCols}, 1fr)`;
  @HostBinding('style.grid-gap.px') gap = '10';
  constructor() {}

  ngOnInit() {}
}
