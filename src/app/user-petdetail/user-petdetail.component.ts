import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../services/pet.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-petdetail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-petdetail.component.html',
  styleUrl: './user-petdetail.component.scss'
})
export class UserPetdetailComponent implements OnInit{
  route = inject(ActivatedRoute);
  petService = inject(PetService);
  pet: any;
  petId!: string;  // Define petId here

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetByIdFromUserDB(id).subscribe((data) => {
      this.pet = data;
      this.petId = this.route.snapshot.paramMap.get('id')!;
    });
  }

  goToPreviousPage() {
    window.history.back(); // Navigate to the previous page
  }

}
