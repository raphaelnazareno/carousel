import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HammerSliderModule } from './web-component/hammer-slider/hammer-slider.module';

import * as Hammer from 'hammerjs';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { PagerBlobComponent } from './web-component/pager-blob/pager-blob.component';
import { CarouselComponent } from './web-component/carousel/carousel.component';

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
  declarations: [AppComponent, PagerBlobComponent, CarouselComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
