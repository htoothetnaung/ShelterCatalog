import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss']
})
export class PetDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  petService = inject(PetService);
  pet: any;
  petId!: string;  

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(id).subscribe((data) => {
      this.pet = data;
      console.log(this.pet);
      this.petId = this.route.snapshot.paramMap.get('id')!;
    });
  }

  goToPreviousPage() {
    window.history.back(); // Navigate to the previous page
  }
}
