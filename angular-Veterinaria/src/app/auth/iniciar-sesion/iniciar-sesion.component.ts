import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { BaseFormUser } from '@shared/utils/base-form-user';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
})
export class IniciarSesionComponent implements OnInit {
  private isValidEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  hide = true;
  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // const userData = {
    //   username: 'ximena@unbosque.edu.co',
    //   password: 'funcia1234',
    // };
    // this.authSvc.login(userData).subscribe((res) => console.log('Login'));
  }

  ngOnDestroy(): void {}

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value;
    this.authSvc.login(formValue).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login éxitoso',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  getErrorMessages(field: string) {
    let message;
    if (this.loginForm.get(field).errors?.['required']) {
      message = 'Debes ingresar un valor';
    } else if (this.loginForm.get(field).hasError('pattern')) {
      message = 'No es un correo valido';
    } else if (this.loginForm.get(field).hasError('minlength')) {
      const minLength =
        this.loginForm.get(field).errors?.['minlength'].requiredLength;
      message = `Este campo debe tener más de  caracteres ${minLength} caracteres`;
    }
    return message;
  }

  isValidField(field: string): boolean {
    return (
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) &&
      !this.loginForm.get(field).valid
    );
  }
}
