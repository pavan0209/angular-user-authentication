import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { AppButton } from '../../../shared/components/app-button/app-button';
import { AppTextField } from '../../../shared/components/app-text-field/app-text-field';

import { UserResponse } from '../../auth/models/user-response';
import { AuthService } from '../services/auth';
import { LoadingService } from '../../../core/services/loading';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatDividerModule, AppButton, AppTextField],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);

  private readonly loadingService = inject(LoadingService);

  private readonly notificationService = inject(NotificationService);

  user!: UserResponse;

  readonly profileForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
  });

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = JSON.parse(user);

    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
    });
  }

  get initials(): string {
    return `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`.toUpperCase();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.loadingService.show();

    this.authService.updateUser(this.user.id, this.profileForm.getRawValue()).subscribe({
      next: (response) => {
        this.loadingService.hide();
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        this.profileForm.patchValue({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        });

        this.profileForm.markAsPristine();
        this.notificationService.success(response.message);
      },
      error: (error) => {
        this.loadingService.hide();
        this.notificationService.error(error.error?.message ?? 'Unable to update profile.');
      },
    });
  }

  deleteProfile(): void {
    console.log('Delete Profile');
  }
}
