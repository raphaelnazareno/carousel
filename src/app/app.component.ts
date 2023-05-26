import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  slides: any = [
    { id: 1, class: 'one' },
    { id: 2, class: 'two' },
    { id: 3, class: 'three' },
    { id: 4, class: 'one' },
    { id: 5, class: 'two' },
    { id: 6, class: 'three' },
  ];
}
