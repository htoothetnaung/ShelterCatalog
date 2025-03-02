import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { PetService } from '../services/pet.service';
import { UserPetlistComponent } from '../user-petlist/user-petlist.component'; 
import { Route } from '@angular/router';
import { CatListComponent } from '../components/cat-list/cat-list.component';
import { DogListComponent } from '../components/dog-list/dog-list.component';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterModule, UserPetlistComponent, RouterLink],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  routes: Route[] = [
    { path: 'dogs', component: DogListComponent },
    { path: 'cats', component: CatListComponent }
  ];

  petService = inject(PetService);
  router = inject(Router);
  pets: any[] = [];
  currentPage: number = 1; 
  itemsPerPage: number = 10; 

  ngOnInit() {
    this.petService.getPets().subscribe((data) => {
      this.pets = data;
    });
  }

  get paginatedPets(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pets.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.pets.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  viewPetDetails(id: number) {
    this.router.navigate(['/pet', id]);
  }

  // Function to navigate to /userprofile
  goToUserProfile() {
    this.router.navigate(['/userProfile']);
  }
}
