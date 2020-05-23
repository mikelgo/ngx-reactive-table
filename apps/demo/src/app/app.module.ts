import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgxReactiveTableModule } from '@ngx-table/ngx-reactive-table';

import { Example1Component } from './examples/example-1/example-1.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MarkdownModule, MarkedOptions, MarkedRenderer  } from 'ngx-markdown';
import { ExampleConfigurationComponent } from './examples/example-configuration/example-configuration/example-configuration.component';
import { ExampleLoadingIndicationComponent } from './examples/example-loading-indication/example-loading-indication.component';

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  declarations: [AppComponent, Example1Component, ExampleConfigurationComponent, ExampleLoadingIndicationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NgxReactiveTableModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
