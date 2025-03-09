import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserPostService } from '../service/user-post.service';
import { UserService } from '../service/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-user-profile.component.html',
  styleUrl: './admin-user-profile.component.scss'
})
export class AdminUserProfileComponent {
  constructor(
    private router: Router,
    private userPostService: UserPostService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
    
    isCollapsed = false;
  
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed; 
    }
    logout() {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    }

    userId!: number;
    posts: any[] = [];
    user: any;
    postToView: any = {
      name: '',
      type: '',
      breed: '',
      age: 0,
      size: '',
      gender: '',
      description: '',
      imagePath: null,
      color:'',
      price:0,
      contactInfo:'',
      createdAt:'',
    };

    
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.userId = Number(params.get('id'));
        this.loadUserInfo();
        this.loadUserPosts();
      });
    }

    loadUserPosts(): void {
      this.userPostService.getPostsByUserId(this.userId).subscribe(
        (data) => this.posts = data,
        (error) => console.error('Error fetching posts:', error)
      );
    }

    loadUserInfo(): void {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => console.error('Error fetching user info:', error)
      );
    }
    getImageUrl(imagePath: string): string {
      return imagePath ? `${environment.backend1Url}/${imagePath}` : 'assets/default-post.jpg';
  }

  viewPostDetails(post: any) {
    this.postToView = { ...post };
  }

}
