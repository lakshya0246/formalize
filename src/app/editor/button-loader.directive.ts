import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[showButtonLoader]',
})
export class ButtonLoaderDirective implements AfterViewInit {
  private buttonInnerHTML = '';
  @Input('showButtonLoader')
  public set showButtonLoader(value: boolean) {
    if (value === true) {
      this.buttonElement.nativeElement.innerHTML = 'Loading...';
      this.buttonElement.nativeElement.disabled = true;
    } else {
      if (this.buttonInnerHTML) {
        this.buttonElement.nativeElement.innerHTML = this.buttonInnerHTML;
      }
      this.buttonElement.nativeElement.disabled = false;
    }
  }
  constructor(private buttonElement: ElementRef<HTMLButtonElement>) {}

  ngAfterViewInit(): void {
    this.buttonInnerHTML = this.buttonElement.nativeElement.innerHTML;
  }
}
