import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth :AuthService, private router : Router) { }
  
  logout() : void {
    this.auth.clearCurrentUser();
    this.router.navigate(['login'])
  }
}
