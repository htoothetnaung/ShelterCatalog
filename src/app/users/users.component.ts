import { Component ,OnInit} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true, 
  imports: [FormsModule,CommonModule,RouterLink],  
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);    
  }
  users: any[] = [];
  constructor(private userService: UserService,private router: Router) {}


  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; 
  }

  
}
