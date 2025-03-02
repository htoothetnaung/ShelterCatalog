import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.scss']
})
export class AdoptionFormComponent implements OnInit {
  petId!: number; // Define petId here
  adoptionForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute ,// Inject ActivatedRoute to access route parameters
    private router: Router
  ) {
    this.adoptionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get petId from the route
    this.petId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onSubmit() {
    if (this.adoptionForm.valid) {
      const formData = { petId: this.petId, ...this.adoptionForm.value };
  
      this.http.post('http://localhost:8081/api/applicationForm/saveForm', formData).subscribe(
        response => {
          console.log('Adoption request submitted:', response);
          
          this.adoptionForm.reset();
  
          // Navigate to the confirmation page
          this.router.navigate(['/confirmation']); // Update with your actual confirmation route
        },
        error => {
          console.error('Error submitting adoption request:', error);
          alert('Error submitting adoption request.');
        }
      );
    }
  }

  goHome() {
    this.router.navigate(['/']); // Navigate to the home page
  }
  
}
