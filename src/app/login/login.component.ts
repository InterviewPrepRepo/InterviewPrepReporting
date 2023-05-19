import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

  login() {
    // Perform login logic here
    if (this.username === 'admin' && this.password === 'password') {
      // Successful login, redirect to dashboard
      console.log('Login successful!');
    } else {
      // Invalid credentials, display error message
      console.log('Invalid credentials');
    }
  }
}