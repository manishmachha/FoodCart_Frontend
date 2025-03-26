import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    MatDialogModule,
    CommonModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsUpdateDialogComponent {
  signupForm: FormGroup;
  showPassword = false;
  data: { userId: number } = inject(MAT_DIALOG_DATA);

  constructor(private fb: FormBuilder, private userService: UserService,private dialogRef: MatDialogRef<UserDetailsUpdateDialogComponent>) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      role: ['', [Validators.required]],
      isActive: ['',[Validators.required]],
    });
  }

  ngOnInit() {
    console.log(this.data);
    this.userService.getUserById(this.data.userId).subscribe((user) => {
      this.signupForm.patchValue(user.data);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this.userService.updateUser(this.data.userId, this.signupForm.value).subscribe(
        (response) => {
          console.log(response);
          if(response.status === 200){
            this.dialogRef.close();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
