import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
 
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$!: Observable<any>;

  constructor(private auth: AuthService,
    private fireauth: AngularFireAuth
    
   ) { }

  ngOnInit(): void {

   this.fireauth.authState.subscribe(
      (res:any) => {
        
        this.user$ = this.auth.getUserById(res.uid);
      } 

    );


   
    
  }


 
  logout(){
    this.auth.logout();
    
  }

 
 
 
  

}
