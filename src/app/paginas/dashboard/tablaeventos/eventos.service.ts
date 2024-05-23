import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosServicio {

    private data: any; // Propiedad privada para almacenar los datos

    constructor() {}
  
    // Método para obtener el valor de la propiedad privada
    getData(): any {
      return this.data;
    }
  
    // Método para establecer el valor de la propiedad privada
    setData(value: any): void {
      console.log(value)
      this.data = value;
    }
}