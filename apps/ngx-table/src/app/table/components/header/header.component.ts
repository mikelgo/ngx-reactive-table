import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../models/table-models';

@Component({
  selector: 'ngx-table-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() displayColumns: Column[] = [];
  constructor() {}

  ngOnInit() {}
}
