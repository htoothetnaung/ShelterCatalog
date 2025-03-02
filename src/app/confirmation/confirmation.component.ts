import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  petId!: string;
  name!: string;
  email!: string;
  phone!: string;
  reason!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.petId = params['petId'];
      this.name = params['name'];
      this.email = params['email'];
      this.phone = params['phone'];
      this.reason = params['reason'];
    });
  }

  goHome() {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
