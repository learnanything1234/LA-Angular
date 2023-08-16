import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  user_id: string;
  email: string;
  quizzes;

  constructor(private auth: AuthService, private apiService: ApiService


  ) { }

  ngOnInit(): void {


    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
    console.log(auth.currentUser)
    this.email = auth.currentUser.email;
    this.user_id = auth.currentUser.uid;

    this.getQuizzes();
    const body = { name: 'POST Example' };
    this.apiService.post('quizzes/52415', body).subscribe(
      (data) => {
        console.log(data);

      },
      (error) => {
        console.error('Error posting posts:', error);
      }
    );


    this.apiService.put('quizzes', body).subscribe(
      (data) => {
        console.log(data);

      },
      (error) => {
        console.error('Error putting post:', error);
      }
    );

    this.apiService.get('quizzes/52415').subscribe(
      (data) => {
        console.log(data);

      },
      (error) => {
        console.error('Error fetching single post:', error);
      }
    );

  }
  getQuizzes(): void {
    this.apiService.get('quizzes').subscribe(
      (data) => {
        console.log(data);
        this.quizzes = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  logout() {
    this.auth.logout();

  }






}
