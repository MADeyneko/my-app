import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppService } from './app.service';
import { TooltipComponent } from './tooltip.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, TooltipComponent],
  providers:    [ AppService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
