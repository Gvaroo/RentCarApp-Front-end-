import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSliderModule } from 'ngx-slider-v2';
import { AddCarComponent } from './components/add-car/add-car.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { RegisterComponent } from './components/register/register.component';
import { CarRentDetailsComponent } from './components/car-rent-details/car-rent-details.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { DeleteCarCardComponent } from './components/delete-car-card/delete-car-card.component';
import { EmailConfirmComponent } from './components/email-confirm/email-confirm.component';
import { EmailConfirmedComponent } from './components/email-confirmed/email-confirmed.component';
import { FavoriteCarsComponent } from './components/favorite-cars/favorite-cars.component';
import { FilterCarsComponent } from './components/filter-cars/filter-cars.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationBoxComponent } from './components/notification-box/notification-box.component';
import { PopularCarsComponent } from './components/popular-cars/popular-cars.component';
import { RentedCarsComponent } from './components/rented-cars/rented-cars.component';
import { UnlikeCarCardComponent } from './components/unlike-car-card/unlike-car-card.component';
import { UserAddedCarsComponent } from './components/user-added-cars/user-added-cars.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent,
    CustomDropdownComponent,
    RegisterComponent,
    CarRentDetailsComponent,
    CarCardComponent,
    CarsListComponent,
    DeleteCarCardComponent,
    EmailConfirmComponent,
    EmailConfirmedComponent,
    FavoriteCarsComponent,
    FilterCarsComponent,
    FooterComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    MessagesComponent,
    NavBarComponent,
    NotificationBoxComponent,
    PopularCarsComponent,
    RentedCarsComponent,
    UnlikeCarCardComponent,
    UserAddedCarsComponent,
    UserProfileComponent,
    ErrorPageComponent,
    VerifyUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule,
    NgxSliderModule,
    CarouselModule,
    NgbModule,
    NgbCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
