import {
  Component,
  OnInit,
  HostBinding,
  ViewChild,
  Input,
  ChangeDetectorRef,
  ViewContainerRef,
  ElementRef,
  TemplateRef,
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
