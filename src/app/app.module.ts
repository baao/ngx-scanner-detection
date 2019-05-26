import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ScannerDetectionModule} from '../../projects/ngx-scanner-detection/src/lib/scanner-detection.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScannerDetectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
