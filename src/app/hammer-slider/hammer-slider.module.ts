import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerSliderComponent } from './hammer-slider.component';
import { HWrapComponent } from './wrap.component';
import { HSlideDirective } from './hslide.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HammerSliderComponent,
    HWrapComponent,
    HSlideDirective
  ],
  declarations: [
    HammerSliderComponent,
    HWrapComponent,
    HSlideDirective
  ],
  entryComponents: [HammerSliderComponent, HWrapComponent]
})
export class HammerSliderModule { }