import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  imports: [MatGridListModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  navigateToUsers() {
    this.router.navigate(['/admin/users']); // Change '/users' to your target route
  }
}
