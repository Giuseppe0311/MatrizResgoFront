import { HttpInterceptorFn} from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Usar 'inject' en lugar de 'new Router()'
  const authToken = localStorage.getItem("token");

  console.log(authToken); // Verifica si el token está disponible

  if (!authToken) {
    router.navigate(['/login']); // Redirigir al login si no hay token
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}` // Añadir el token al header
    }
  });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        router.navigate(['/login']); // Redirigir si hay un error 401 (Unauthorized)
      }
      return throwError(() => error); // Reemitir el error para que otros lo manejen
    })
  );
};
