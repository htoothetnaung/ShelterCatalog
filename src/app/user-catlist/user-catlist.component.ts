import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PetService } from '../services/pet.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-catlist',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './user-catlist.component.html',
  styleUrl: './user-catlist.component.scss'
})
export class UserCatlistComponent implements OnInit{
  petService = inject(PetService);
  router = inject(Router);
  cats: any[] = [];

  filters: { breed: string; age: number | null; size: string; gender: string; color: string } = {
    breed: '',
    age: null,  // ✅ Ensure age is explicitly initialized as a number or null
    size: '',
    gender: '',
    color: ''
  };

  sizes = ['Small', 'Medium', 'Large'];
  catColors: string[] = [
    'White', 'Black', 'Gray (Silver)', 'Cream','Gray',
    'Bicolor (White and another color)', 'Orange',  'Tabby', 'Tortoiseshell'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCats();
  }

  fetchCats() {
    this.http.get<any[]>('http://localhost:8081/api/userPosts/getPetsByType?type=CAT').subscribe(data => {
      this.cats = data;
    });
  }

  applyFilters() {
    let queryParams = `type=CAT`;
  
    if (this.filters.breed) queryParams += `&breed=${this.filters.breed}`;
    if (this.filters.age) queryParams += `&age=${this.filters.age}`;
    if (this.filters.size) queryParams += `&size=${this.filters.size}`;
    if (this.filters.gender) queryParams += `&gender=${this.filters.gender}`;
    if (this.filters.color) queryParams += `&color=${this.filters.color}`;

    this.http.get<any[]>(`http://localhost:8081/api/userPosts/search?${queryParams}`).subscribe(data => {
      this.cats = data;
    });
  }
  

  viewPetDetails(id: number) {
    this.router.navigate(['/userpet', id]);
  }

  goToPreviousPage() {
    window.history.back(); // Navigate to the previous page
  }
}
