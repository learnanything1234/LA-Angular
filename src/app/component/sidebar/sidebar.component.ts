import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor(private auth: AuthService,) { }

  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
  logout() {

    this.auth.logout();
  }
}
