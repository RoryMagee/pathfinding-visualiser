import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { NodeGridComponent } from './node-grid/node-grid.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@NgModule({
    declarations: [
        AppComponent,
        NodeComponent,
        NodeGridComponent,
        ControlPanelComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        DragDropModule
    ], providers: [], bootstrap: [AppComponent] })
export class AppModule { }
