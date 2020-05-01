import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgxReactiveTableModule } from '@ngx-table/ngx-reactive-table';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NgxReactiveTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
