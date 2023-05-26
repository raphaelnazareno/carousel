import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
})
export class CarouselComponent {
  @Input() buttons: boolean = false;
  @Input() dots: boolean = true;
  @Input() slides!: any;

  @ContentChildren(TemplateRef) templates: any;

  active: number = 0;
  sliderObject: any = { total: 1 };

  pages: any[] = [1];

  constructor(private cd: ChangeDetectorRef) {}

  sliderUpdate(obj: any) {
    this.sliderObject = obj;
    this.cd.detectChanges();
  }
}
