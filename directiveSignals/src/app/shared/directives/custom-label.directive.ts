import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors: ValidationErrors | null | undefined;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessgae();
  }

  constructor(private el: ElementRef) {
    this.htmlElement = el;
    this.htmlElement.nativeElement.innerHTML = 'blue';
  }
  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessgae(): void {
    if (!this._errors) return;
    if (!this._errors) {
      this.htmlElement!.nativeElement.innerHTML = '';
      return;
    }

    const errors = Object.keys(this._errors);
    if (errors.includes('required')) {
      this.htmlElement!.nativeElement.innerHTML = 'This field is required';
      return;
    }
    if (errors.includes('minlength')) {
      this.htmlElement!.nativeElement.innerHTML = 'This field is too short';
      return;
    }

    if (errors.includes('maxlength')) {
      this.htmlElement!.nativeElement.innerHTML = 'This field is too long';
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement!.nativeElement.innerHTML =
        'This field is not a valid email';
      return;
    }
  }
}
