import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { UserPostService } from '../service/user-post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {  

  constructor(private router: Router, private postService: UserPostService) {} 

  userId: number = 0;
  username: string = '';
  email: string = '';
  posts: any[] = [];
  searchQuery = '';
  filteredPosts: any[] =[];
  successMessage: string = '';
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

  types = ['DOG', 'CAT'];
  sizes = ['SMALL', 'MEDIUM', 'LARGE'];
  breeds: { [key: string]: string[] } = {
    DOG: ['Labrador_Retriever', 'German_Shepherd' ,'GOLDEN_RETRIEVER', 'French_Bulldog', 'Poodle', 'Bulldog','Beagle','Rottweiler','Siberian_Husky','Dachshund','Other'],
    CAT: [  'Persian' ,'Maine_Coon','Siamese','Bengal','Ragdoll','Scottish_Fold','Sphynx','British_Shorthair','Russian_Blue','Abyssinian' ,'Other'  ],
  };
  genders = ['MALE', 'FEMALE'];
  filteredBreeds: string[] = [];
  selectedPost: any = null; 


   // Function to navigate to /petlist
   goToPetList() {
    this.router.navigate(['/petlist']);
  }

  onTypeChange() {
    if (this.selectedPost) {
      this.filteredBreeds = this.breeds[this.selectedPost.type] || [];
    } else {
      this.filteredBreeds = this.breeds[this.post.type] || [];
    }
  }
  

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.post.image = file;
    }
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      this.selectedImage = file;
      console.log("This is selected image: ", this.selectedImage);
    } else {
      console.log("No image selected.");
    }
  }
  

  submitPost() {
    if (!this.post.image) {
      this.successMessage = "Please upload an image before submitting.";
      setTimeout(() => (this.successMessage = ""), 2000);
      return;
    }
    const formData = new FormData();
    formData.append('userId', this.userId.toString()); 
    formData.append('name', this.post.name); 
    formData.append('type', this.post.type);
    formData.append('breed', this.post.breed);
    formData.append('age', this.post.age.toString());
    formData.append('size', this.post.size);
    formData.append('gender', this.post.gender);
    formData.append('description', this.post.description);
    formData.append('contactInfo', this.post.contactInfo);
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
        this.getUserPosts(); 
        this.resetForm();
        this.resetImage();
      },
      error: (error) => {
        console.error('Error adding post:', error);
      }
    });
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

  searchPosts() {
    this.filteredPosts = this.posts.filter(post => {
      return post.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
             post.breed.toLowerCase().includes(this.searchQuery.toLowerCase()) ;
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
  

  getUserInfo() {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);  
  
        if (decodedToken) {
          this.username = decodedToken.username;
          this.email = decodedToken.sub;
          this.userId =decodedToken.userId;
          
          this.getUserPosts();
        } else {
          console.log('Decoded token is invalid or missing data');
        }
      } catch (error) {
        console.log('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }
  }

   getUserPosts() {
    if (this.userId) {
      console.log(`Fetching posts for userId: ${this.userId}`); // Debugging API call

      this.postService.getUserPosts(this.userId).subscribe({
        next: (data) => {
          this.posts = data;
          this.filteredPosts = [...this.posts];
        },
        error: (err) => {
          console.log('Error fetching posts:', err);
        }
      });
    } else {
      console.log('User ID is not set, skipping API call');
    }
  }

  confirmDelete() {
    if (this.selectedPost) {
      console.log("Deleting post:", this.selectedPost); // Debugging line
  
      this.postService.deletePost(this.selectedPost.id).subscribe({
        next: () => {
          alert('Post deleted successfully!');
          this.filteredPosts = this.filteredPosts.filter(post => post.id !== this.selectedPost.id);
          this.selectedPost = null;
          window.location.reload();
        },
        error: (err) => {
          console.log('Error deleting post:', err);
        }
      });
    }
  }
  

  showDetails(post: any) {
    this.selectedPost = post; 
  }
  
  openUpdate(post: any) {
    this.selectedPost = { ...post }; 
    this.filteredBreeds = this.breeds[this.selectedPost.type] || []; 
  }
  
  selectedImage: File | null = null;


  updatePost() {
    const formData = new FormData();
    formData.append('userId', this.selectedPost.userId);
    formData.append('name', this.selectedPost.name);
    formData.append('type', this.selectedPost.type);
    formData.append('breed', this.selectedPost.breed);
    formData.append('age', this.selectedPost.age.toString());
    formData.append('size', this.selectedPost.size);
    formData.append('gender', this.selectedPost.gender);
    formData.append('description', this.selectedPost.description);
    formData.append('color', this.selectedPost.color);
    formData.append('price', this.selectedPost.price.toString());
    formData.append('contactInfo', this.selectedPost.contactInfo);
    
    
    if (this.selectedImage) {
      formData.append("image", this.selectedImage);
    }



    this.postService.updatePost(this.selectedPost.id, formData).subscribe(
      response => {
        console.log("This is selected image"+   this.selectedImage)
        console.log("Post updated successfully", response);
        alert("Post updated!");
        this.getUserPosts();
        window.location.reload();
      },
      error => {
        alert('Error updating post: ' + error.error?.error || 'Unknown error');
      }
    );
  }

  getImageUrl(post: any): string {
    if (!post?.imagePath) {
      return 'assets/default-image.jpg';
    }
    return `http://localhost:8081${post.imagePath}`;
  }
  

}
