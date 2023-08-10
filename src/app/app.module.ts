
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';


import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';

import { HomeComponent } from './component/home/home.component';

import { FormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { getFirestore, provideFirestore, } from '@angular/fire/firestore';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { ButtonComponent } from './component/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent,
    HomeComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');

        },
        allowedDomains: ['localhost'],
        disallowedRoutes: ['localhost/auth/login']
      }
    })
  ],

  providers: [
    ApiService,
    AuthGuard,
    AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

