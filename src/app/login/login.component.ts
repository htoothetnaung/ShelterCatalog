import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router ,RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
    imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    console.log('Raw Password:', this.password);
  
    this.http.post('http://localhost:8081/user/login', {
      email: this.email,
      password: this.password 
    }).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        alert("Login Successful!!!");
        this.router.navigate(['/userProfile']);
      },
      (error) => {
        alert('Invalid credentials');
      }
    );
  }

  // Function to navigate to /userprofile
  goToAdminLogin() {
    this.router.navigate(['/adminLogin']);
  }

  


}

