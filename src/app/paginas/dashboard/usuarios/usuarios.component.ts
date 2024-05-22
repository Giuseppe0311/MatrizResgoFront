import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  constructor(private api:PeticionesapiService) { }
  showPassword: boolean = false
  clickMostrarPassword(): void {
    this.showPassword = !this.showPassword
  }
  ngOnInit(): void {
    initFlowbite();
    this.getDatos();
    this.getDatosSucursales();
    this.getPerfiles();
  }

  datos : any
  getDatos() {
    const url = import.meta.env.NG_APP_API + '/usuarios';
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

  sucursales : any
  getDatosSucursales() {
    const url = import.meta.env.NG_APP_API + '/sucursales';
    this.api.getApi(url).subscribe({
      next: data => {
        console.log(data);
        this.sucursales  = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  perfiles : any
  getPerfiles() {
    const url = import.meta.env.NG_APP_API + '/perfiles';
    this.api.getApi(url).subscribe({
      next: data => {
        console.log(data);
        this.perfiles  = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }


  submit(e:any) {
    e.preventDefault();
    const formdata = new FormData(e.target);




    const url = import.meta.env.NG_APP_API + '/usuarios';

    this.api.postApi(url, formdata).subscribe({
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


