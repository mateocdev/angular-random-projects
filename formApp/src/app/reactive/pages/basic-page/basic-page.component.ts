import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPAgeComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], [])
  // });

  ngOnInit(): void {
    this.myForm.reset({
      name: 'Product 1',
      price: 100,
      inStorage: 10,
    });
  }

  isValidField(field: string) {
    return (
      this.myForm.controls[field].touched && this.myForm.controls[field].errors
    );
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

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  onSave(): void {
    if (this.myForm.invalid) {
      console.log('Form invalid');
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({
      name: '',
      price: 0,
      inStorage: 0,
    });
  }
}
