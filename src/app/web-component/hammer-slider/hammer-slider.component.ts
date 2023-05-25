import {
  Component,
  HostBinding,
  HostListener,
  ViewChild,
  ContentChildren,
  ContentChild,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ChangeDetectorRef,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ViewEncapsulation,
} from '@angular/core';
import {
  style,
  animate,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';

import { HSlideDirective } from '../../directives/hslide.directive';
import { HWrapComponent } from '../wrap/wrap.component';

@Component({
  selector: 'hammer-slider',
  templateUrl: './hammer-slider.component.html',
  styleUrls: ['./hammer-slider.component.sass'],
})
export class HammerSliderComponent implements OnInit {
  public total: number = 0;
  @Input('config')
  config: any[] = [];

  ready: boolean = false;
  _active: number = 0;
  @Input()
  set active(active: number) {
    if (this.ready && !this.animating) {
      this._active = active;
      this.goTo(this._active);
    }
  }
  @Output() activeChange: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('mask') mask!: ElementRef;
  maskw: number = 0;
  maskh: number = 0;

  @ViewChild('wrap') wrap!: ElementRef;
  wrapw: number = 0;
  wraph: number = 0;

  @ContentChildren(HSlideDirective) hslides!: QueryList<HSlideDirective>;

  public perc!: number;
  public perCur!: number;
  public pos!: number;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  public player: any;
  private animating: boolean = false;
  private animFactory: any;
  public showing!: number[];

  allSlides: any[] = [];
  preSlides: any[] = [];
  postSlides: any[] = [];

  @ViewChild('slidesVC', { read: ViewContainerRef })
  slidesVC!: ViewContainerRef;

  @HostListener('window:resize', ['$event'])
  sizeChange(event: any) {
    this.getSize();
  }

  /**
   * constructor
   */
  constructor(
    private el: ElementRef,
    private rend: Renderer2,
    private builder: AnimationBuilder,
    private cd: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.hslides.toArray().forEach((hslide: any) => {
      this.preSlides.push(hslide.el.nativeElement.cloneNode(true));
      this.allSlides.push(hslide.el.nativeElement);
      this.postSlides.push(hslide.el.nativeElement.cloneNode(true));
    });

    const factory = this.cfr.resolveComponentFactory(HWrapComponent);

    const preSlideWrap: any = this.slidesVC.createComponent(
      factory,
      0,
      undefined,
      [this.preSlides]
    );
    this.rend.addClass(preSlideWrap.location.nativeElement, 'pre-slide');

    const slideWrap: any = this.slidesVC.createComponent(
      factory,
      0,
      undefined,
      [this.allSlides]
    );
    this.rend.addClass(slideWrap.location.nativeElement, 'all-slide');
    // this.rend.addClass(slideWrap.instance.el.nativeElement, 'all-slide');

    const postSlideWrap: any = this.slidesVC.createComponent(
      factory,
      0,
      undefined,
      [this.postSlides]
    );
    this.rend.addClass(postSlideWrap.location.nativeElement, 'post-slide');
    // this.rend.addClass(postSlideWrap.instance.el.nativeElement, 'post-slide');
    this.cd.detectChanges();
  }

  ngAfterContentInit() {
    this.total = this.hslides.length;
    this.hslides.toArray().map((slide: any, index: any) => {
      slide.index = index;
    });
    this.ready = true;
    this.goTo(this._active);
    this.getSize();
  }

  getSize() {
    this.maskw = this.mask.nativeElement.offsetWidth;
    this.maskh = this.mask.nativeElement.offsetHeight;
    this.wrapw = this.maskw * this.total;
  }

  tick() {
    let obj = {
      active: this._active,
      perc: this.perc,
      perCur: this.perCur,
      pos: this.pos,
      total: this.total,
      animating: this.animating,
    };
    this.update.emit(obj);
  }

  panStart(e: any) {
    this.getSize();
  }

  panMove(e: any) {
    this.perc = ((100 / this.total) * e.deltaX) / this.maskw;
    this.perCur = (100 * e.deltaX) / this.maskw;
    this.pos = this.perc - (100 / this.total) * this._active;

    this.rend.setStyle(
      this.wrap.nativeElement,
      'transform',
      'translate3d( ' + this.pos + '%,0,0)'
    );
    this.tick();
  }

  animMS: number = 700;

  panEnd(e: any) {
    if (e.velocityX > 1) {
      this.animMS = this.animMS / e.velocityX;
      this.goTo(this._active - 1);
    } else if (e.velocityX < -1) {
      this.animMS = this.animMS / -e.velocityX;
      this.goTo(this._active + 1);
    } else {
      if (this.perc <= -(25 / this.total)) this.goTo(this._active + 1);
      else if (this.perc >= 25 / this.total) this.goTo(this._active - 1);
      else this.goTo(this._active);
    }
    this.tick();
  }

  goTo(_to: any) {
    if (!this.animating) {
      this._active = _to;
      this.activeChange.emit(this._active);
      this.pos = -(100 / this.total) * _to;
      this.animating = true;
      this.tick();

      this.animFactory = this.builder.build(this.buildAnim());

      this.player = this.animFactory.create(this.wrap.nativeElement);

      this.player.onDone(() => {
        this.animEnd();
        this.animating = false;
        this.animMS = 700;
        this.tick();
      });

      this.player.play();
    }
  }

  buildAnim() {
    let arr = [];
    arr.push(
      animate(
        this.animMS + 'ms cubic-bezier(.7,1.5,.8,1.1)',
        style({ transform: 'translate3d( ' + this.pos + '% ,0,0)' })
      )
    );

    return arr;
  }

  animEnd() {
    this.perc = 0;
    this.perCur = 0;
    this.tick();

    if (this._active < 0) {
      this._active = this.total - 1;
    }
    if (this._active > this.total - 1) {
      this._active = 0;
    }

    this.pos = -(100 / this.total) * this._active;

    this.activeChange.emit(this._active);

    this.rend.setStyle(
      this.wrap.nativeElement,
      'transform',
      'translate3d( ' + this.pos + '%,0,0)'
    );
    this.player.destroy();
    this.setShowing();
    this.tick();
  }

  setShowing() {
    let lh = this._active - 1 < 0 ? this.hslides.length - 1 : this._active - 1;

    //this.vcSlideLast.insert(last.cd);
    //this.showing = [lh, this._active, this._active + 1];
    //this.hslides._results.map((slide, index) => {
    //slide.show = true; //(this.showing.indexOf(index) > -1);
    //});
  }
}
