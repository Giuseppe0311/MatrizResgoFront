import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {

  constructor(private api:PeticionesapiService) { }

  ngOnInit(): void {
    initFlowbite();
    this.getDatos();
  }

  datos : any
  getDatos() {
    const url = import.meta.env.NG_APP_API + '/empresas';
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


  submit(e:any) {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const datos = {
      nombre_empresa : formdata.get('nombre_empresa'),
    }

    console.log(datos);

    const url = import.meta.env.NG_APP_API + '/empresas';

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
