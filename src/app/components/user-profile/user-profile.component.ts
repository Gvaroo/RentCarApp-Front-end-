import { Component } from '@angular/core';
import { GetUserDTO } from 'src/app/models/user/GetUserDTO';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user: GetUserDTO | undefined;

  constructor(private authService: AuthService) {
    const email = localStorage.getItem('email') || '';
    this.authService.getUser(email).subscribe(
      (response) => {
        if (response.success) {
          this.user = response.data;
          console.log(this.user);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
