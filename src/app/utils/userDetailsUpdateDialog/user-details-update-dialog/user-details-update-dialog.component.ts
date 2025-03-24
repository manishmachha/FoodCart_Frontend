import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewUser } from '../../../models/NewUser';
@Component({
  selector: 'app-signup',
  templateUrl: './user-details-update-dialog.component.html',
  styleUrls: ['./user-details-update-dialog.component.css'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailsUpdateDialogComponent {
  signupForm: FormGroup;
  showPassword = false;
  data: { user: NewUser } = inject(MAT_DIALOG_DATA);
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group({
      name: [this.data.user.name  , [Validators.required, Validators.minLength(3)]],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      password: [this.data.user.password, [Validators.required, Validators.minLength(6)]],
      phoneNumber: [this.data.user.phoneNumber, [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this.userService.signup(this.signupForm.value).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
