import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PetService } from '../services/pet.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-doglist',
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './user-doglist.component.html',
  styleUrl: './user-doglist.component.scss'
})
export class UserDoglistComponent implements OnInit{
  petService = inject(PetService);
  router = inject(Router);
  dogs: any[] = [];

  filters: { breed: string; age: number | null; size: string; gender: string; color: string } = {
    breed: '',
    age: null,  // ✅ Ensure age is explicitly initialized as a number or null
    size: '',
    gender: '',
    color: ''
  };

  sizes = ['Small', 'Medium', 'Large'];
  dogColors: string[] = [
    'Black', 'Blue', 'Brown', 'Tan', 'Golden (Yellow)', 'Gray',
    'Brindle', 'Merle(Speckled coat pattern, often blue or red)', 'Fawn (Pale yellow-brown)',' Sable (Dark tips on lighter fur)', 'White'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDogs();
  }

  fetchDogs() {
    this.http.get<any[]>('http://localhost:8081/api/userPosts/getPetsByType?type=DOG').subscribe(data => {
      this.dogs = data;
      console.log(this.dogs);
    });
  }

  applyFilters() {
    let queryParams = `type=DOG`;
  
    if (this.filters.breed) queryParams += `&breed=${this.filters.breed}`;
    if (this.filters.age) queryParams += `&age=${this.filters.age}`;
    if (this.filters.size) queryParams += `&size=${this.filters.size}`;
    if (this.filters.gender) queryParams += `&gender=${this.filters.gender}`;
    if (this.filters.color) queryParams += `&color=${this.filters.color}`;


    this.http.get<any[]>(`http://localhost:8081/api/userPosts/search?${queryParams}`).subscribe(
      data => {
        this.dogs = data;
      },
      error => {
          console.error('Error fetching dogs:', error);
          alert("Breed is not recognized by our system.");
      }
    );
  }
  

  viewPetDetails(id: number) {
    this.router.navigate(['/userpet', id]);
  }

  goToPreviousPage() {
    window.history.back(); // Navigate to the previous page
  }
}

