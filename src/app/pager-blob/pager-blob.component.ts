import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'pager-blob',
  templateUrl: './pager-blob.component.html',
  styleUrls: ['./pager-blob.component.sass'],
})
export class PagerBlobComponent implements OnInit {
  _total: any = [];
  @Input()
  set total(total: any) {
    console.log('total ', total);

    if (typeof total == 'number') {
      this._total = Array(total).map((x, i) => ({ _index: i }));
    } else {
      this._total = total.map((x: any, i: any) => {
        if (typeof x == 'object') {
          x._index = i;
        }
        if (typeof x == 'number') {
          return { _index: x };
        }
        return x;
      });
    }
  }

  _config: any = { margin: 4, width: 20, height: 20 };
  svg: any = { values: '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 40 -16', blur: 4 };

  @Input()
  set config(config: any) {
    this._config = this.extend(this._config, config);
  }

  _active!: number;

  @Input()
  set active(active: number) {
    this.cd.detectChanges();

    this._active = active;
    let p = (this._config.width + this._config.margin) * this._active;
    console.log('this.point ', this.point);

    this.rend.setStyle(
      this.point.nativeElement,
      'transform',
      'translate3d(' + p + 'px,0,0)'
    );
  }
  @Output() activeChange: EventEmitter<number> = new EventEmitter<number>();

  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('point') point!: ElementRef;

  constructor(private cd: ChangeDetectorRef, private rend: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    //console.log(this._total);
    //let p = 36 * this._active;
    // <<<---using ()=> syntax

    this.rend.setStyle(
      this.point.nativeElement,
      'width',
      this._config.width - 6 + 'px'
    );
    this.rend.setStyle(
      this.point.nativeElement,
      'height',
      this._config.height - 6 + 'px'
    );

    this.svg.blur = 4;
    this.svg.values =
      '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ' +
      this._config.width +
      ' -' +
      this._config.width * 0.46;

    this.cd.detectChanges();
  }

  setActive(item: any) {
    this._active = item;
    this.activeChange.emit(item);
    this.update.emit({ _index: item });
    // this._active = item._index;
    // this.activeChange.emit(item._index);
    // this.update.emit(item);
  }

  extend(obj: any, src: any) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
  }
}
