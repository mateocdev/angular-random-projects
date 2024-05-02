import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['warzone', Validators.required],
      ['fifa', Validators.required],
      ['gta', Validators.required],
      ['minecraft', Validators.required],
      ['fortnite', Validators.required],
      ['apex', Validators.required],
      ['valorant', Validators.required],
      ['csgo', Validators.required],
      ['pubg', Validators.required],
      ['lol', Validators.required],
      ['dota', Validators.required],
      ['overwatch', Validators.required],
      ['hearthstone', Validators.required],
      ['diablo', Validators.required],
      ['starcraft', Validators.required],
      ['heroes', Validators.required],
      ['hots', Validators.required],
      ['wow', Validators.required],
      ['sc2', Validators.required],
      ['warcraft', Validators.required],
      ['diablo2', Validators.required],
      ['diablo3', Validators.required],
      ['starcraft2', Validators.required],
      ['heroesofthestorm', Validators.required],
      ['worldofwarcraft', Validators.required],
      ['hearthstone2', Validators.required],
    ]),
  });
  constructor(private fb: FormBuilder) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string) {
    return (
      this.myForm.controls[field].touched && this.myForm.controls[field].errors
    );
  }

  onDeleteFavorite(i: number) {
    this.favoriteGames.removeAt(i);
  }

  public newFavorite: FormControl = new FormControl('', Validators.required);
  onAddFavorite(): void {
    if (this.newFavorite.invalid) {
      return;
    }
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame));
    this.newFavorite.reset();
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

  isValidFieldArray(formArray: FormArray, i: number) {
    return formArray.controls[i].touched && formArray.controls[i].errors;
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset();
    this.favoriteGames.clear();
  }
}
