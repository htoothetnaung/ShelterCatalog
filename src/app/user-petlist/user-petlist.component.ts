import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PetService } from '../services/pet.service';
//import { NgModule } from '@angular/core';
@Component({
  selector: 'app-user-petlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-petlist.component.html',
  styleUrl: './user-petlist.component.scss'
})
export class UserPetlistComponent implements OnInit{
  petService = inject(PetService);
  router = inject(Router);
  pets: any[] = [];
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items per page


  ngOnInit() {
    this.petService.getPetsFromUserDB().subscribe((data) => {
      this.pets = data;
    });
  }

  // Function to get the current page of pets
  get paginatedPets(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pets.slice(startIndex, endIndex);
  }

  // Function to change the current page
  changePage(page: number): void {
    this.currentPage = page;
  }

    // Function to get the total number of pages
  get totalPages(): number {
    return Math.ceil(this.pets.length / this.itemsPerPage);
  }

  // Function to generate an array of page numbers
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  viewPetDetails(id: number) {
    this.router.navigate(['/userpet', id]);
  }


}
