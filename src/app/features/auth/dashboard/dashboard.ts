import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { AppButton } from '../../../shared/components/app-button/app-button';
import { AppTextField } from '../../../shared/components/app-text-field/app-text-field';

import { UserResponse } from '../../auth/models/user-response';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatDividerModule, AppButton, AppTextField],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly fb = inject(FormBuilder);

  private readonly router = inject(Router);

  readonly user: UserResponse = JSON.parse(localStorage.getItem('user') ?? '{}');

  readonly profileForm = this.fb.nonNullable.group({
    firstName: [this.user.firstName ?? '', Validators.required],

    lastName: [this.user.lastName ?? '', Validators.required],

    email: [this.user.email ?? '', [Validators.required, Validators.email]],

    phoneNumber: [this.user.phoneNumber ?? '', Validators.required],
  });

  get initials(): string {
    return (
      (this.user.firstName?.charAt(0) ?? '') + (this.user.lastName?.charAt(0) ?? '')
    ).toUpperCase();
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

    console.log(this.profileForm.getRawValue());
  }

  deleteProfile(): void {
    console.log('Delete Profile');
  }
}
