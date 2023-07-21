import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDTO } from 'src/app/models/user/UserLoginDTO';
import { UserRegisterDTO } from 'src/app/models/user/UserRegisterDTO';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup = new FormGroup({});
  user: UserRegisterDTO = {
    Number: 0,
    Password: '',
    Name: '',
    LastName: '',
    Email: '',
  };
  userLogin: UserLoginDTO = {
    Email: '',
    Password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.addValidations();
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.user.Number = this.registrationForm.get('phoneNumber')?.value;
      this.user.Name = this.registrationForm.get('FirstName')?.value;
      this.user.LastName = this.registrationForm.get('LastName')?.value;
      this.user.Email = this.registrationForm.get('email')?.value;
      this.user.Password = this.registrationForm.get('password')?.value;
      this.authService.register(this.user).subscribe(
        (response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registered successfully!',
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              this.router.navigate(['/email-confirm']);
              this.loginUser();
            }
          });
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
    } else this.markAllFieldsAsTouched();
  }

  loginUser() {
    this.userLogin.Email = this.user.Email;
    this.userLogin.Password = this.user.Password;
    this.authService.login(this.userLogin).subscribe(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
  addValidations(): void {
    this.registrationForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  markAllFieldsAsTouched() {
    Object.keys(this.registrationForm.controls).forEach((field) => {
      const control = this.registrationForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
