import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  user_id: string;
  email: string;

  constructor(private auth: AuthService,


  ) { }

  ngOnInit(): void {


    const app = initializeApp(environment.firebaseConfig);

    const auth = getAuth(app);
    console.log(auth.currentUser)
    this.email = auth.currentUser.email;
    this.user_id = auth.currentUser.uid;


  }



  logout() {
    this.auth.logout();

  }






}
