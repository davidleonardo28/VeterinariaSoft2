import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  constructor(private fb: FormBuilder) {}
  errorMessage: any = null;
  baseForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]],
  });

  isValidField(field: string): boolean {
    this.getErrorMessages(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }
  getErrorMessages(field: string) {
    // let message;
    if (this.baseForm.get(field).errors?.['required']) {
      this.errorMessage = 'Debes ingresar un valor';
    } else if (this.baseForm.get(field).hasError('pattern')) {
      this.errorMessage = 'No es un correo valido';
    } else if (this.baseForm.get(field).hasError('minlength')) {
      const minLength =
        this.baseForm.get(field).errors?.['minlength'].requiredLength;
      this.errorMessage = `Este campo debe tener más de  caracteres ${minLength} caracteres`;
    }
    return this.errorMessage;
  }
}
