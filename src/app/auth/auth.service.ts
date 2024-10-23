import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Guardar el token en localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Eliminar el token (para logout)
  removeToken(): void {
    localStorage.removeItem('token');
  }

  // Decodificar el token y obtener los claims
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token); // Decodifica el token JWT
      } catch (error) {
        console.error('Error al decodificar el token', error);
        return null;
      }
    }
    return null;
  }

  getUserRole(): string[] | null {
    const decodedToken = this.getDecodedToken();

    // Verifica si el token está decodificado y tiene la estructura esperada
    if (decodedToken && decodedToken['resource_access'] && decodedToken['resource_access']['matriz-riesgo']) {
      // Extrae los roles del objeto 'matriz-riesgo'
      return decodedToken['resource_access']['matriz-riesgo']['roles'];
    }

    return null; // Retorna null si no se encuentra la estructura o el token es inválido
  }

  getEmpresaId(): number | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken['empresa_id']) {
      return decodedToken['empresa_id'];
    }
    return null;
  }
  getSubject(): string | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken['sub']) {
      return decodedToken['sub']; // El 'sub' en JWT usualmente representa el subject o ID del usuario
    }
    return null;
  }

}
