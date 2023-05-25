import { Directive, ElementRef, HostBinding} from '@angular/core';

@Directive({
  selector: '[hslide]'
})
export class HSlideDirective {


  @HostBinding('class.hslide') slideClass:boolean = true; 
  
  constructor(private el:ElementRef) {
    
  }
}