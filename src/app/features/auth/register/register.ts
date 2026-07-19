import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthLayout } from '../../../layouts/auth-layout/auth-layout';

import { AppButton } from '../../../shared/components/app-button/app-button';
import { AppTextField } from '../../../shared/components/app-text-field/app-text-field';

import { RegexConstants } from '../../../shared/constants/regex';
import { AuthService } from '../services/auth';
import { LoadingService } from '../../../core/services/loading';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthLayout, AppButton, AppTextField],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly loadingService = inject(LoadingService);

  private readonly notificationService = inject(NotificationService);

  private readonly router = inject(Router);

  readonly registerForm = this.fb.nonNullable.group({
    firstName: this.fb.nonNullable.control('', [Validators.required]),

    lastName: this.fb.nonNullable.control('', [Validators.required]),

    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),

    phoneNumber: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(RegexConstants.PHONE_NUMBER),
    ]),

    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm);
    this.loadingService.show();

    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: (response) => {
        this.loadingService.hide();
        this.notificationService.success(response.message);
        console.log(response.data);
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loadingService.hide();
        this.notificationService.error(error?.error?.message ?? 'Registration failed.');
        console.error(error);
      },
    });
  }
}
