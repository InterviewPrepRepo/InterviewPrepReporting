import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private auth : AuthService, private router : Router) {
    this.username = '';
    this.password = '';
  }

  login() {
    // Perform login logic here
    if (this.username === 'admin' && this.password === 'password') {
      // Successful login, redirect to dashboard
      console.log('Login successful!');
      
      this.auth.setCurrentUser({name: this.username});
      this.router.navigate(['tests'])
    } else {
      // Invalid credentials, display error message
      console.log('Invalid credentials');
    }
  }
}