import { Component, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent {
  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  });

  public userChangedEffect = effect(() => {
    console.log('User changed', this.user()?.first_name);
  });

  onFieldUpdated(field: string, value: string) {
    this.user.update((user) => {
      switch (field) {
        case 'email':
          user.email = value;
          break;
        case 'first_name':
          user.first_name = value;
          break;
        case 'last_name':
          user.last_name = value;
          break;
        case 'avatar':
          user.avatar = value;
          break;
      }
      return user;
    });
  }
}
