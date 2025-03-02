import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { HttpClient,withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-dog-list',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss'],
  
})
export class DogListComponent implements OnInit {
  petService = inject(PetService);
  router = inject(Router);
  dogs: any[] = [];
  filters = { breed: '', age: null, size: '', gender: '', color: '' };

  // breeds = [
  //   'LABRADOR_RETRIEVER', 
  //   'GERMAN_SHEPHERD',
  //   'GOLDEN_RETRIEVER',
  //   'FRENCH_BULLDOG', 
  //   'POODLE', 
  //   'BULLDOG', 
  //   'BEAGLE', 
  //   'ROTTWEILER', 
  //   'SIBERIAN_HUSKY', 
  //   'DACHSHUND',
  //   'PERSIAN', 
  //   'MAINE_COON', 
  //   'SIAMESE', 
  //   'BENGAL', 
  //   'RAGDOLL', 
  //   'SCOTTISH_FOLD', 
  //   'SPHYNX', 
  //   'BRITISH_SHORTHAIR', 
  //   'RUSSIAN_BLUE', 
  //   'ABYSSINIAN',
  //   'OTHER']
  sizes = ['SMALL', 'MEDIUM','LARGE'];
  dogColors: string[] = [
    'Black', 'Blue', 'Brown', 'Tan', 'Golden (Yellow)', 'Gray',
    'Brindle', 'Merle(Speckled coat pattern, often blue or red)', 'Fawn (Pale yellow-brown)',' Sable (Dark tips on lighter fur)', 'White'
  ];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDogs();
  }

  fetchDogs() {
    this.http.get<any[]>('http://localhost:8081/getPetsByType?type=DOG').subscribe(data => {
      console.log(data); 
      this.dogs = data;
    });
  }

  applyFilters() {
    let queryParams = `type=DOG`;  // Start the query string
    if (this.filters.breed) queryParams += `&breed=${encodeURIComponent(this.filters.breed)}`;
    if (this.filters.age) queryParams += `&age=${this.filters.age}`;
    if (this.filters.size) queryParams += `&size=${this.filters.size}`;
    if (this.filters.gender) queryParams += `&gender=${this.filters.gender}`;
    if (this.filters.color) queryParams += `&color=${this.filters.color}`;
  
    console.log('Requesting:', `http://localhost:8081/search?${queryParams}`);  
  
    this.http.get<any[]>(`http://localhost:8081/search?${queryParams}`).subscribe(
      data => {
        this.dogs = data;
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
