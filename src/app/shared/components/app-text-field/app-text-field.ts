import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './app-text-field.html',
  styleUrl: './app-text-field.scss',
})
export class AppTextField {
  label = input.required<string>();
  placeholder = input<string>('');
  type = input<'text' | 'password' | 'email' | 'number' | 'tel' | 'search'>('text');
  leadingIcon = input<String>('');
  appearance = input<MatFormFieldAppearance>('outline');
  disabled = input(false);
  value = signal('');
  hidePassword = signal(true);
  togglePassword(): void {
    this.hidePassword.update((value) => !value);
  }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
  }
}
