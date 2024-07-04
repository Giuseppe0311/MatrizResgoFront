import { Component } from '@angular/core';
import { PeticionesapiService } from '../../../../services/peticionesapi.service';
import { EventosServicio } from '../eventos.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compartirusuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compartirusuario.component.html',
  styleUrl: './compartirusuario.component.css'
})
export class CompartirusuarioComponent {

  datos: any;
  id_usuario: any;

  constructor(private api: PeticionesapiService, private datosRecolectados: EventosServicio) { }

  datos2: any

  ngOnInit(): void {

    this.datos2 = this.datosRecolectados.getData()

    this.getUsuarios();
  }

  getUsuarios() {
    const url = `${import.meta.env.NG_APP_API}/usuarios`;

    this.api.getApi(url).subscribe({
      next: (data: any) => {
        this.datos = data;
      },
      error: (error: any) => {
        console.error('¡Hubo un error al obtener los usuarios!', error);
      }
    });
  }

  enviarDatos(e: any) {
    e.preventDefault();

    // Obtener el id_usuario del formulario (nota: asumo que está en algún lugar del formulario)
    const formData = new FormData(e.target);
    const idusuario = formData.get('id_usuario');

    // Verificar si se obtuvo correctamente el id_usuario
    if (!idusuario) {
      console.error('No se ha proporcionado un id_usuario válido.');
      return;
    }

    // Obtener el id_evento desde datosRecolectados (asumiendo que este método existe)
    const id_evento = this.datosRecolectados.getData().id_evento;

    // Construir la URL para la solicitud GET
    const url = `${import.meta.env.NG_APP_API}/eventos/cambiar/${id_evento}`;

    const datos ={
      id_usuario : idusuario
    }

    // Realizar la solicitud GET utilizando HttpClient de Angular
    this.api.putApi(url, datos).subscribe({
      next: (data: any) => {
        Swal.fire({
          icon: 'success',
          title: '¡Evento compartido!',
          showConfirmButton: true
        });
      },
      error: (error: any) => {
        console.error('¡Hubo un error al compartir el evento!', error);
      }
    });
  }
}
