import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdoptionHistoryService } from '../service/adoption-history.service';

@Component({
  selector: 'app-adoption-history',
  imports: [CommonModule,RouterLink],
  templateUrl: './adoption-history.component.html',
  styleUrl: './adoption-history.component.scss'
})
export class AdoptionHistoryComponent implements OnInit{
  
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);

  }
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; 
  }

  constructor(private router: Router,private adoptionHistoryService: AdoptionHistoryService) {}
  
  ngOnInit(): void {
    this.adoptionHistoryService.getAllHistory().subscribe(
      data => this.adoptionHistory = data,
      error => console.error('Error fetching adoption history:', error)
    );
  }

  adoptionHistory: any[] = [];

}
