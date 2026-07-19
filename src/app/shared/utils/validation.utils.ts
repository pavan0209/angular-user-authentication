import { AbstractControl } from '@angular/forms';

export class ValidationUtils {
  static getError(control: AbstractControl | null | undefined, field: string): string {
    if (!control || !control.errors) {
      return '';
    }

    if (control.hasError('required')) {
      return `${field} is required.`;
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email address.';
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;

      return `${field} must contain at least ${requiredLength} characters.`;
    }

    if (control.hasError('maxlength')) {
      const requiredLength = control.getError('maxlength').requiredLength;

      return `${field} cannot exceed ${requiredLength} characters.`;
    }

    if (control.hasError('pattern')) {
      return `Please enter a valid ${field.toLowerCase()}.`;
    }

    return '';
  }
}
