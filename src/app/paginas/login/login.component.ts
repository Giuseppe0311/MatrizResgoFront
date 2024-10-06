import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as jwt from 'jwt-decode';
import { PeticionesapiService } from '../../services/peticionesapi.service';
import { catchError, of } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ngOnInit() {
    localStorage.removeItem('token');
    this.attemptCounter = 0; // Inicia el contador de intentos fallidos
  }

  constructor(private serviceLogin: PeticionesapiService, private toastr: ToastrService,
              private router: Router
  ) { }

  showPassword: boolean = false
  loading: boolean = false
  attemptCounter: number = 0; // Contador de intentos fallidos
  maxAttempts: number = 3; // Número máximo de intentos permitidos

  clickMostrarPassword(): void {
    this.showPassword = !this.showPassword
  }

  formulario = new FormGroup({
    usuario: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
    password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
  })

  getErrorMessage(controlName: string): string {
    const control = this.formulario.get(controlName);
    if (control?.hasError('minlength')) {
      return `${controlName} debe tener al menos 4 caracteres.`;
    }

    if (control?.hasError('maxlength')) {
      return `${controlName} debe tener al menos 16 caracteres.`;
    }

    return '';
  }

  errorEnSolicitud: any

  sendForm() {
    if (this.attemptCounter >= this.maxAttempts) {
      // Bloquear al usuario si alcanza el número máximo de intentos
      this.toastr.error('Has sido bloqueado después de demasiados intentos fallidos.');
      return;
    }

    this.serviceLogin.getToken(
      this.formulario.get('usuario')?.value,
      this.formulario.get('password')?.value
    ).pipe(
      catchError(error => {
        console.error('Error details:', error);
        this.toastr.error(error.error.error_description, 'Error');

        // Incrementa el contador de intentos fallidos
        this.attemptCounter++;

        // Mostrar un mensaje con el intento actual
        this.toastr.info(`Intento ${this.attemptCounter} de ${this.maxAttempts}`, 'Intento de inicio de sesión fallido');

        if (this.attemptCounter >= this.maxAttempts) {
          this.toastr.error('Has sido bloqueado después de 3 intentos fallidos.');
        }

        return of (null);
      })

    ).subscribe((response) => {
      if (response) {
        this.toastr.success('Bienvenido');
        localStorage.setItem("token", response.access_token);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
