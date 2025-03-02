import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router ,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  signUp() {
    console.log('Raw Password:', this.password);
  
    this.http.post('http://localhost:8081/user/register', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        alert('User registered successfully');
        this.router.navigate(['/userProfile']);
      },
      (error) => {
        console.log('Error details:', error);  
        alert('Username already exists or invalid details');
      }
    );
  }
  


}
