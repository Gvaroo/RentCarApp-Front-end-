import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDTO } from 'src/app/models/user/UserLoginDTO';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: UserLoginDTO = {
    Password: '',
    Email: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      (response) => {
        if (response.data.ipVerified) {
          if (!response.data.emailVerified) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title:
                'Your email is not verified! If you want to access full features of the web, please verify!',
              showConfirmButton: false,
              timer: 800,
            }).then((result2) => {
              if (result2.dismiss === Swal.DismissReason.timer) {
                this.router.navigateByUrl('/').then(() => {
                  window.location.reload();
                });
              }
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Login successful!',
              showConfirmButton: false,
              timer: 700,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                this.router.navigateByUrl('/').then(() => {
                  window.location.reload();
                });
              }
            });
          }
        } else if (!response.data.ipVerified) {
          this.router.navigate(['/verify-user'], {
            queryParams: { verified: false },
          });
        }
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
