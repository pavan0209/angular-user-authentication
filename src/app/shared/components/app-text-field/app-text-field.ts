import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ValidationUtils } from '../../utils/validation.utils';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app-text-field.html',
  styleUrl: './app-text-field.scss',
})
export class AppTextField {
  readonly label = input.required<string>();

  readonly placeholder = input('');

  readonly type = input<'text' | 'email' | 'password' | 'tel' | 'number' | 'search'>('text');

  readonly leadingIcon = input('');

  readonly appearance = input<MatFormFieldAppearance>('outline');

  readonly control = input.required<FormControl<string>>();

  readonly hidePassword = signal(true);

  get showError(): boolean {
    const control = this.control();
    return control.invalid && (control.touched || control.dirty);
  }

  get errorMessage(): string {
    return ValidationUtils.getError(this.control(), this.label());
  }

  togglePassword(): void {
    this.hidePassword.update((value) => !value);
  }
}
