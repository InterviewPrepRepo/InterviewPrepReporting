import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private auth : AuthService, private router : Router) {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.router.navigate(['tests']);
    }
  }

  login() {
    // Perform login logic here
    if (this.username === 'admin' && this.password === 'password') {
      // Successful login, redirect to dashboard
      
      this.auth.setCurrentUser({name: this.username});
      this.router.navigate(['tests'])
    } else {
      // Invalid credentials, display error message
    }
  }
}