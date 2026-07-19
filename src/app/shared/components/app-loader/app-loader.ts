import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './app-loader.html',
  styleUrl: './app-loader.scss',
})
export class LoaderComponent {
  readonly diameter = input<number>(48);
  readonly strokeWidth = input<number>(4);
  readonly message = input<string>('');
}
