import { inject, Injectable } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import {
  AppSnackbar,
  SnackbarData,
  SnackbarType,
} from '../../shared/components/app-snackbar/app-snackbar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  private readonly horizontalPosition: MatSnackBarHorizontalPosition = 'right';

  private readonly verticalPosition: MatSnackBarVerticalPosition = 'top';

  success(message: string, title?: string): void {
    this.open({
      type: 'success',
      title: title ?? this.getTitle('success'),
      message,
    });
  }

  error(message: string, title?: string): void {
    this.open({
      type: 'error',
      title: title ?? this.getTitle('error'),
      message,
    });
  }

  warning(message: string, title?: string): void {
    this.open({
      type: 'warning',
      title: title ?? this.getTitle('warning'),
      message,
    });
  }

  info(message: string, title?: string): void {
    this.open({
      type: 'info',
      title: title ?? this.getTitle('info'),
      message,
    });
  }

  private open(data: SnackbarData): void {
    this.snackBar.openFromComponent(AppSnackbar, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [`snackbar-${data.type}`],
      data,
    });
  }

  private getTitle(type: SnackbarType): string {
    switch (type) {
      case 'success':
        return 'Success';

      case 'error':
        return 'Error';

      case 'warning':
        return 'Warning';

      case 'info':
        return 'Information';

      default:
        return 'Notification';
    }
  }
}
