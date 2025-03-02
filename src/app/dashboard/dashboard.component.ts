import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent { 
  constructor(private router: Router,private userService: UserService) {}
  
  users: any[] = [];
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; 
  }
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
