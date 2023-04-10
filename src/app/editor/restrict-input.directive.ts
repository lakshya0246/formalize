import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[flRestrictInputTo]',
})
export class RestrictInputDirective {
  readonly NUMBER_ONLY_REGEX = /[^0-9]*/g;
  readonly STRING_ONLY_REGEX = /[^0-9]*/g;
  @Input('flRestrictInputTo') restrictionType!: 'number' | 'string';
  @Output('safeChange') change = new EventEmitter<string>();
  constructor() {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    if (!Boolean(event.target)) {
      return;
    }
    const eventTarget = event.target as HTMLInputElement;
    const initialValue = eventTarget.value;
    eventTarget.value = initialValue.replace(
      this.restrictionType === 'number'
        ? this.NUMBER_ONLY_REGEX
        : this.STRING_ONLY_REGEX,
      ''
    );
    if (initialValue !== eventTarget.value) {
      event.stopPropagation();
    } else {
      this.change.emit((event.target as any).value);
    }
  }
}
