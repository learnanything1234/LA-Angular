import { AngularFireModule } from '@angular/fire/compat';
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
import { getFirestore, provideFirestore   } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
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
    RouterModule,
    FormsModule,
    AngularFireModule,
    AngularFirestoreModule,
    provideFirestore(() => getFirestore()),
    provideFirestore(() => getFirestore()),
 
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideAuth(arg0: () => import("@firebase/auth").Auth): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

