import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})
export class CatListComponent implements OnInit {
  petService = inject(PetService);
  router = inject(Router);
  cats: any[] = [];
  
  filters: { breed: string; age: number | null; size: string; gender: string; color: string } = {
    breed: '',
    age: null,
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
    this.http.get<any[]>(`${environment.backend1Url}/getPetsByType?type=CAT`).subscribe(data => {
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

    this.http.get<any[]>(`${environment.backend1Url}/search?${queryParams}`).subscribe(
      data => {
        this.cats = data;
      },
      error => {
          console.error('Error fetching dogs:', error);
          alert("Breed is not recognized by our system.")
      }
    );
  }
  

  viewPetDetails(id: number) {
    this.router.navigate(['/pet', id]);
  }

  goToPreviousPage() {
    window.history.back();
  }
  
}
