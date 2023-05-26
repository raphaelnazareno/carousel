import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'slide-wrap',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./wrap.component.sass'],
})
export class HWrapComponent implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private vc: ViewContainerRef,
    private el: ElementRef
  ) {}

  ngOnInit() {}

  ngAfterViewChecked() {}
}
