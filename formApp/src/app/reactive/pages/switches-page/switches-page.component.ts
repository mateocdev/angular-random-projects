import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  ngOnInit(): void {
    this.myForm.reset({
      gender: 'M',
      wantNotifications: true,
      termsAndConditions: false,
    });
  }

  getFieldError(field: string) {
    if (!this.myForm.controls[field].errors) {
      return null;
    }
    const errors = this.myForm.controls[field].errors || {};
    for (const key in errors) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Min length is ${errors[key].requiredLength}`;
        case 'min':
          return `Min value is ${errors[key].min}`;
        default:
      }
    }

    return null;
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    return;
  }
}
