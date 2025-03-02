import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdoptionRequestsService } from '../service/adoption-requests.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adoption-request',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './adoption-request.component.html',
  styleUrl: './adoption-request.component.scss'
})
export class AdoptionRequestComponent implements OnInit {

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(
    private router: Router,
    private adoptionRequestsService: AdoptionRequestsService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  requests: any[] = [];
  searchText: string = '';
  selectedRequest: any = {};
  selectedRequestId: number | null = null;
  rejectionReason: string = '';

  loadRequests(): void {
    this.adoptionRequestsService.getAllRequests().subscribe((data) => {
      this.requests = data;
      console.log("All Requests Loaded:", this.requests);  // Debugging
    });
  }

  get filteredRequests(): any[] {
    return this.requests.filter(request =>
      request.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewDetails(id: number): void {
    this.adoptionRequestsService.getApplicationDetails(id).subscribe((data) => {
      this.selectedRequest = data;
      console.log("Selected Request:", this.selectedRequest);
    });
  }

  openRejectModal(request: any) {
    this.selectedRequest = request; // Store the full request object
    this.selectedRequestId = request.id; // Store the ID
  }

  rejectApplication() {
    if (!this.rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    if (!this.selectedRequestId) {
      alert("Error: No request selected.");
      return;
    }

    const requestBody = {
      applicantEmail: this.selectedRequest.email,
      rejectionReason: this.rejectionReason
    };

    this.http.post(`http://localhost:8081/api/applicationForm/reject/${this.selectedRequestId}`, requestBody, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert("Rejection email sent and application deleted successfully.");
          window.location.reload();
          this.rejectionReason = '';
          console.log("Server Response:", response);
        },
        error: (error) => {
          alert("Error rejecting application.");
          console.error("HTTP Error:", error);
        }
      });
  }
  
  openApproveModal(request: any) {
    this.selectedRequest = request; 
  }

  
  adoptPet(applicationId: number, adopterEmail: string) {
    this.adoptionRequestsService.adoptPet(applicationId, adopterEmail).subscribe({
      next: (response) => {
        console.log('Adoption successful:', response);
        alert('Adoption successful! Check your email for confirmation.');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error adopting pet:', error);
        alert('Error adopting pet.');
      }
    });

  }

}
