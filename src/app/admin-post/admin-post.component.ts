import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.scss'],
})
export class AdminPostComponent implements OnInit {
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);

  }
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; 
  }

  successMessage: string = '';
  posts: any[] = [];
  post: any = {
    name:'',
    type: '',
    breed: '',
    age: 0,
    size: '',
    gender: '',
    description: '',
    image: null,
    color:'',
    price: 0
  };


  filteredPosts: any[] = [];
  searchQuery: string = '';

  constructor(private postService: PostService, private router: Router) {}
  


  types = ['DOG', 'CAT'];
  sizes = ['SMALL', 'MEDIUM', 'LARGE'];
  breeds: { [key: string]: string[] } = {
    DOG: ['Labrador_Retriever', 'German_Shepherd' ,'GOLDEN_RETRIEVER', 'French_Bulldog', 'Poodle', 'Bulldog','Beagle','Rottweiler','Siberian_Husky','Dachshund','Other'],
    CAT: [	'Persian' ,'Maine_Coon','Siamese','Bengal','Ragdoll','Scottish_Fold','Sphynx','British_Shorthair','Russian_Blue','Abyssinian' ,'Other'  ],
  };
  genders = ['MALE', 'FEMALE'];
  filteredBreeds: string[] = [];


  ngOnInit(): void {
    this.loadPosts();
  }

  onTypeChange() {
    this.filteredBreeds = this.breeds[this.post.type] || [];
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.post.image = file;
    }
  }

  submitPost() {
    const formData = new FormData();
    formData.append('name', this.post.name); 
    formData.append('type', this.post.type);
    formData.append('breed', this.post.breed);
    formData.append('age', this.post.age.toString());
    formData.append('size', this.post.size);
    formData.append('gender', this.post.gender);
    formData.append('description', this.post.description);
    formData.append('image', this.post.image); 
    formData.append('color', this.post.color); 
    formData.append('price', this.post.price.toString()); 



    this.postService.addPost(formData).subscribe({
      next: (response) => {
        console.log('Post added:', response);
        this.successMessage='Post added successfully!';

        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
        this.loadPosts(); 
        this.resetForm();
        this.resetImage();
      },
      error: (error) => {
        console.error('Error adding post:', error);
      }
    });
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = data; 
      },
      error: (error) => {
        console.error('Error fetching posts', error);
      }
    });
  }

  filterPosts() {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      Object.values(post).some(value =>
        (value as string)?.toString().toLowerCase().includes(query)
      )
    );
  }
  
  resetForm() {
    this.post = { name: '',type: '', breed: '', age: 0, size: '', gender: '', description: '', image: null ,color: '',price:0};
  }

  resetImage() {
    let fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  getImageUrl(post: any): string {
    return `http://localhost:8081/uploads/${post.imageUrl}`;
  }

  //View Detail Post

  viewPost(post: any) {
    this.router.navigate(['/adminPostDetails', post.id]);
  }

}
