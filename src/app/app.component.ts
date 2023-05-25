import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  name = 'Angular 5';

  active: number = 0;
  sliderObject: any = { total: 1 };

  slides: any = [
    { id: 1, class: 'one' },
    { id: 2, class: 'two' },
    { id: 3, class: 'three' },
    { id: 4, class: 'one' },
    { id: 5, class: 'two' },
    { id: 6, class: 'three' },
  ];

  // slides: any = [
  //   { id: 1, class: 'one', label: 'One' },
  //   { id: 2, class: 'two', label: 'Two' },
  //   { id: 3, class: 'three', label: 'Three' },
  //   { id: 4, class: 'one', label: 'Four' },
  //   { id: 5, class: 'two', label: 'Five' },
  //   { id: 6, class: 'three', label: 'Six' },
  // ];

  pages: any[] = [1];

  constructor(private cd: ChangeDetectorRef) {}

  sliderUpdate(obj: any) {
    //console.log(obj);
    this.sliderObject = obj;
    this.cd.detectChanges();
  }
}
