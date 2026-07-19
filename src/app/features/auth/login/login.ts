import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthLayout } from '../../../layouts/auth-layout/auth-layout';

import { AppButton } from '../../../shared/components/app-button/app-button';
import { AppTextField } from '../../../shared/components/app-text-field/app-text-field';
import { AuthService } from '../services/auth';
import { LoadingService } from '../../../core/services/loading';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthLayout, AppTextField, AppButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly loadingService = inject(LoadingService);

  private readonly notificationService = inject(NotificationService);

  private readonly router = inject(Router);

  readonly loginForm = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loadingService.show();

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.loadingService.hide();
        this.notificationService.success(response.message);
        localStorage.setItem('user', JSON.stringify(response.data));
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loadingService.hide();
        this.notificationService.error(error?.error?.message ?? 'Invalid email or password.');
        console.error(error);
      },
    });
  }
}
