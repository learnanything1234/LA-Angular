 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { FormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
 
import { getFirestore, provideFirestore,  } from '@angular/fire/firestore';
 
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
 

 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
 


  ],

  providers: [ AuthGuard,AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
 
