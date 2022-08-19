import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    LoginComponent,
    MyBookingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
