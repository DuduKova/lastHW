import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[abeOnProductHover]'
})
export class OnProductHoverDirective {
  @HostBinding('title') title = 'black';

  @HostListener('mouseenter', ['$event'])
  onHover(e) {
    this.title = 'orange';
  }
}
