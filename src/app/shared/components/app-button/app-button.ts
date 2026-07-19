import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './app-button.html',
  styleUrl: './app-button.scss',
})
export class AppButton {
  readonly text = input.required<string>();

  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly variant = input<'primary' | 'secondary' | 'danger'>('primary');

  readonly disabled = input(false);

  readonly loading = input(false);

  readonly fullWidth = input(true);

  readonly buttonClick = output<void>();

  onClick(): void {
    if (this.disabled() || this.loading()) {
      return;
    }
    this.buttonClick.emit();
  }
}
