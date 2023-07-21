import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { HomeRedirectGuard } from './guards/home-redirect.guard';
import { LoginComponent } from './components/login/login.component';
import { CarRentDetailsComponent } from './components/car-rent-details/car-rent-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FilterCarsComponent } from './components/filter-cars/filter-cars.component';
import { EmailConfirmComponent } from './components/email-confirm/email-confirm.component';
import { EmailConfirmedComponent } from './components/email-confirmed/email-confirmed.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'Register',
    component: RegisterComponent,
    canActivate: [HomeRedirectGuard],
  },
  {
    path: 'CarAdd',
    component: AddCarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cars/:id',
    component: CarRentDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [HomeRedirectGuard],
  },
  {
    path: 'Filter',
    component: FilterCarsComponent,
  },
  {
    path: 'email-confirm',
    component: EmailConfirmComponent,
  },
  {
    path: 'emailConfirmed',
    component: EmailConfirmedComponent,
  },
  {
    path: 'verify-user',
    component: VerifyUserComponent,
  },
  { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
