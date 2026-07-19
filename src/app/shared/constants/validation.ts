export const ValidationMessages = {
  required: 'This field is required.',

  email: 'Please enter a valid email address.',

  minlength: (length: number) => `Minimum ${length} characters required.`,

  maxlength: (length: number) => `Maximum ${length} characters allowed.`,

  pattern: 'Invalid format.',
};

export interface ValidationMessage {
  key: string;
  message: string;
}
