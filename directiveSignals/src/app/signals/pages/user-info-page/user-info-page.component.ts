import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css',
})
export class UserInfoPageComponent implements OnInit {
  private usersService = inject(UserServiceService);
  public userId = signal<number>(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal<boolean>(true);

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number): void {
    if (id <= 0) return;
    this.userId.set(id);
    this.currentUser.set(undefined);
    this.usersService.getUserById(id).subscribe((user) => {
      this.currentUser.set(user);
    });
  }
}
