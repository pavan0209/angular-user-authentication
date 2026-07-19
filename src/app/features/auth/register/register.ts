import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthLayout } from '../../../layouts/auth-layout/auth-layout';
import { AppButton } from '../../../shared/components/app-button/app-button';
import { AppTextField } from '../../../shared/components/app-text-field/app-text-field';
import { RegexConstants } from '../../../shared/constants/regex';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthLayout, AppButton, AppTextField],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);

  readonly registerForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],

    lastName: ['', [Validators.required]],

    email: ['', [Validators.required, Validators.email]],

    phoneNumber: ['', [Validators.required, Validators.pattern(RegexConstants.PHONE_NUMBER)]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      return;
    }

    console.log(this.registerForm.getRawValue());
  }
}
