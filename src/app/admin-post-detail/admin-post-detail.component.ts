import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../service/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [FormsModule,RouterLink, CommonModule],
  templateUrl: './admin-post-detail.component.html',
  styleUrl: './admin-post-detail.component.scss'
})
export class AdminPostDetailComponent implements OnInit {
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  post: any = {};
  postToUpdate: any = {
    name: '',
    type: '',
    breed: '',
    age: 0,
    size: '',
    gender: '',
    description: '',
    image: null,
    color:'',
    price:0
  };


  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  types = ['DOG', 'CAT'];
  sizes = ['SMALL', 'MEDIUM', 'LARGE'];
  breeds: { [key: string]: string[] } = {
    DOG: ['Labrador_Retriever', 'German_Shepherd', 'GOLDEN_RETRIEVER', 'French_Bulldog', 'Poodle', 'Bulldog', 'Beagle', 'Rottweiler', 'Siberian_Husky', 'Dachshund', 'Other'],
    CAT: ['Persian', 'Maine_Coon', 'Siamese', 'Bengal', 'Ragdoll', 'Scottish_Fold', 'Sphynx', 'British_Shorthair', 'Russian_Blue', 'Abyssinian', 'Other'],
  };
  genders = ['MALE', 'FEMALE'];
  filteredBreeds: string[] = [];

  onTypeChange() {
    if (this.postToUpdate.type) {
      this.filteredBreeds = this.breeds[this.postToUpdate.type] || [];
    } else {
      this.filteredBreeds = [];
      this.postToUpdate.breed = '';
    }
    console.log("Filtered Breeds:", this.filteredBreeds);
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.postToUpdate.image = file;
    }
  }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPostById(postId).subscribe(
        (data) => {
          if (data) {
            this.post = data;
          } else {
            console.error("Post not found");
            this.post = {};
            this.router.navigate(['/adminPost']);
          }
        },
        (error) => {
          console.error('Error fetching post:', error);
          this.post = {};
        }
      );
    }
  }

  getImageUrl(post: any): string {
    return post && post.imageUrl ? `${environment.backend1Url}/uploads/${post.imageUrl}` : 'assets/default-image.jpg';
  }

  deletePost(post: any) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(post.id).subscribe({
        next: () => {
          alert('Post deleted successfully');
          this.router.navigate(["/adminPost"]);
        },
        error: (err) => console.error('Error deleting post:', err)
      });
    }
  }



  editPost(post: any) {
    this.postToUpdate = { ...post };
    this.onTypeChange();
  }


  updatePost(): void {
    console.log("Before Updating:", this.postToUpdate);

    const formData = new FormData();
    formData.append('name', this.postToUpdate.name);
    formData.append('type', this.postToUpdate.type);
    formData.append('breed', this.postToUpdate.breed);
    formData.append('age', this.postToUpdate.age.toString());
    formData.append('size', this.postToUpdate.size);
    formData.append('gender', this.postToUpdate.gender);
    formData.append('description', this.postToUpdate.description);
    formData.append('color', this.postToUpdate.color);
    formData.append('price', this.postToUpdate.price.toString());

    if (this.postToUpdate.image) {
      formData.append('image', this.postToUpdate.image);
    }

    console.log("Sending FormData:", [...formData.entries()]);

    this.postService.updatePost(this.postToUpdate.id, formData).subscribe(
      () => {
        console.log("Updated Successfully:", this.postToUpdate);
        alert('Post updated successfully!');
        window.location.reload();
      },
      (error) => {
        console.error('Error updating post:', error);
        alert('Failed to update post.');
      }
    );
  }

}
