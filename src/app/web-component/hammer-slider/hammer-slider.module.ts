import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerSliderComponent } from './hammer-slider.component';

import { HSlideDirective } from '../../directives/hslide.directive';
import { HWrapComponent } from '../wrap/wrap.component';

@NgModule({
  imports: [CommonModule],
  exports: [HammerSliderComponent, HWrapComponent, HSlideDirective],
  declarations: [HammerSliderComponent, HWrapComponent, HSlideDirective],
  entryComponents: [HammerSliderComponent, HWrapComponent],
})
export class HammerSliderModule {}
