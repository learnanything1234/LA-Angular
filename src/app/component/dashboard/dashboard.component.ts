import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';
 
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 
  user_id: string;
  email: string;

  constructor(private auth: AuthService,
 
    
   ) { }

  ngOnInit(): void {

   
        
    const app = initializeApp(environment.firebaseConfig);
 
    const auth = getAuth(app);

    this.email = auth.currentUser.email;
    this.user_id = auth.currentUser.uid;
     

    


   
    
  }


 
  logout(){
    this.auth.logout();
    
  }

 
 
 
  

}
