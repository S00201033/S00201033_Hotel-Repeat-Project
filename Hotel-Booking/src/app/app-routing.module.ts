import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { LoginComponent } from './components/login/login.component';
import { CreateBookingPageComponent } from './components/create-booking-page/create-booking-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},// canActivate:[OnlyClient]},
  {path:'dashboard', component: DashboardComponent},// canActivate:[OnlyClient]},
  {path:'my-bookings', component: MyBookingsComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: SignupComponent},
  // {path:'prediction-result/:id', component: PredictionResultComponent},
  {path:'create/:roomId', component: CreateBookingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
