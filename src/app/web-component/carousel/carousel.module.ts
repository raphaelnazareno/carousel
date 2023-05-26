import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Hammer from 'hammerjs';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';


import { HammerSliderComponent } from './components/hammer-slider/hammer-slider.component';
import { HSlideDirective } from '../../directives/hslide.directive';
import { HWrapComponent } from './components/wrap/wrap.component';
import { PagerBlobComponent } from './components/pager-blob/pager-blob.component';
import { CarouselComponent } from './carousel.component';


@Injectable()
export class HammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, FormsModule, HammerModule],
  exports: [
    HammerSliderComponent,
    HWrapComponent,
    HSlideDirective,
    PagerBlobComponent,
    CarouselComponent,
  ],
  declarations: [
    HammerSliderComponent,
    HWrapComponent,
    HSlideDirective,
    PagerBlobComponent,
    CarouselComponent,
  ],
  entryComponents: [HammerSliderComponent, HWrapComponent],
})
export class CarouselModule {}
