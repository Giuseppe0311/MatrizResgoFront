import { Component } from '@angular/core';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})
export class SucursalesComponent {

  constructor(private api:PeticionesapiService) { }

  ngOnInit(): void {
    initFlowbite();
    this.getDatos();
    this.getDatosEmpresas();
  }

  datos : any
  getDatos() {
    const url = import.meta.env.NG_APP_API + '/sucursales';
    this.api.getApi(url).subscribe({
      next: data => {
        console.log(data);
        this.datos  = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
empresas : any
  getDatosEmpresas() {
    const url = import.meta.env.NG_APP_API + '/empresas';
    this.api.getApi(url).subscribe({
      next: data => {
        console.log(data);
        this.empresas  = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }


  submit(e:any) {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const datos = {
      nombre_sucursal : formdata.get('nombre_sucursal'),
      idempresa : formdata.get('idempresa')
    }

    console.log(datos);

    const url = import.meta.env.NG_APP_API + '/sucursales';

    this.api.postApi(url, datos).subscribe({
      next: data => {
        Swal.fire({
          title: 'Empresa creada',
          text: 'La empresa se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      },
      error: error => {
        console.error('There was an error!', error);
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })

  }

}

