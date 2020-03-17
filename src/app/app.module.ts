import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { NodeGridComponent } from './node-grid/node-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    NodeGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
