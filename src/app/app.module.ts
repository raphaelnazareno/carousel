import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CarouselModule } from './web-component/carousel/carousel.module';

@NgModule({
  imports: [BrowserModule, CarouselModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
