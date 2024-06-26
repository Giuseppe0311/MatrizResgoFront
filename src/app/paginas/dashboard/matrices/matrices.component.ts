import { Component } from '@angular/core';
import { PostmatrizComponent } from './postmatriz/postmatriz.component';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import { Router } from '@angular/router';
import { MatrizServicio } from './matriz.servicio';

@Component({
  selector: 'app-matrices',
  standalone: true,
  imports: [PostmatrizComponent],
  templateUrl: './matrices.component.html',
  styleUrl: './matrices.component.css',
})
export class MatricesComponent {
  constructor(private api: PeticionesapiService, private router : Router, private guardarMatriz : MatrizServicio) {}

  ngOnInit() {
    this.getData();
  }

  datosArreglo : any = [];

  recibirLaRepuestaDelPostHiJOParaActualizar(event: boolean) {
    if (event) {
      this.getData(); // Actualizar la tabla después de la solicitud POST
    }
  }

    
  cambiarPagina(valor : any){
    console.log(valor)
    const dato = {
      id: valor.id_matriz,
      nombre_matriz : valor.nombre_matriz,
    }
    this.guardarMatriz.setData(dato)
    this.router.navigate(['/dashboard/matrices/eventos'])
  }



  getData() {
    const url = import.meta.env.NG_APP_API + '/matriz';

    this.api.getApi(url).subscribe({
      next: (data) => {
         this.datosArreglo = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
