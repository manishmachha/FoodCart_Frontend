import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  imports: [
    MatListModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  sortBy: string = '';
  roles: string[] = ['ROLE_ADMIN', 'ROLE_USER']; // Define roles here
  showSearch = false;
  showFilter = false;
  showSort = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.data;
      this.filteredUsers = this.users;
    });
  }

  editUser(id: number) {
    console.log(`Editing user with ID: ${id}`);
  }

  deleteUser(id: number) {
    console.log(`Deleting user with ID: ${id}`);
  }

  addUser() {
    this.router.navigate(['/signup']);
  }

  toggleOption(option: string) {
    if (option === 'search') {
      this.showSearch = !this.showSearch;
      this.showFilter = false;
      this.showSort = false;
    } else if (option === 'filter') {
      this.showFilter = !this.showFilter;
      this.showSearch = false;
      this.showSort = false;
    } else if (option === 'sort') {
      this.showSort = !this.showSort;
      this.showSearch = false;
      this.showFilter = false;
    }
  }

  applyFilters(): void {
    this.filteredUsers = this.users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.phoneNumber.includes(this.searchTerm) ||
          (user.role.toLowerCase().includes(this.searchTerm) &&
            (this.selectedRole ? user.role === this.selectedRole : true))
      )
      .sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]));
  }
}
