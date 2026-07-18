import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './app-button.html',
  styleUrl: './app-button.scss',
})
export class AppButton {
  text = input.required<string>();
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
}
