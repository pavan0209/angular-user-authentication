import { Component, computed, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarData {
  type: SnackbarType;
  title: string;
  message: string;
}

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './app-snackbar.html',
  styleUrl: './app-snackbar.scss',
})
export class AppSnackbar {
  readonly data = inject<SnackbarData>(MAT_SNACK_BAR_DATA);

  readonly icon = computed(() => {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';

      case 'error':
        return 'error';

      case 'warning':
        return 'warning';

      default:
        return 'info';
    }
  });
}
