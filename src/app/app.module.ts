import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HammerSliderModule } from './hammer-slider/hammer-slider.module';

import * as Hammer from 'hammerjs';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { PagerBlobComponent } from './pager-blob/pager-blob.component';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HammerSliderModule,
    HammerModule,
  ],
  declarations: [AppComponent, PagerBlobComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
