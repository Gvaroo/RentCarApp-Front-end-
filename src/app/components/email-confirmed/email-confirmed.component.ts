import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.scss'],
})
export class EmailConfirmedComponent {
  public confirmationMessage: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var token = params['code'];
      if (token) {
        this.authService.sendEmailConfirmationToken(token).subscribe(
          (response) => {
            this.confirmationMessage = response.data;
          },
          (error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: error.error.message,
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                this.router.navigateByUrl('/').then(() => {
                  window.location.reload();
                });
              }
            });
          }
        );
      }
    });
  }
}
