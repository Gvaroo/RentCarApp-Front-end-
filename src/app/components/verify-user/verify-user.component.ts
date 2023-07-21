import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss'],
})
export class VerifyUserComponent {
  code: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.VerifyUserCode(this.code).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.data,
          showConfirmButton: false,
          timer: 700,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigateByUrl('/Login').then(() => {
              window.location.reload();
            });
          }
        });
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );
  }
}
