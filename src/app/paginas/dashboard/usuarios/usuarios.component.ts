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
  modalupdate: boolean = false;
  showModalDeRegistro: boolean = false;
  idUsuario:string = "";

  //datos del formulario :


  showPassword: boolean = false
  clickMostrarPassword(): void {
    this.showPassword = !this.showPassword
  }
  ngOnInit(): void {
    initFlowbite();
    this.getDatos();
  }

  datos: any[] = [];
  datosEmpresa: any[] = [];
  isAdmin = false;
  getDatos() {
    const url = import.meta.env.NG_APP_API + '/keycloak/user/search';
    this.api.getApi(url).subscribe({
      next: data => {
        this.datos  = data;
        },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
  getDatosEmpresa() {
    const url = import.meta.env.NG_APP_API + '/empresas';
    this.api.getApi(url).subscribe({
      next: data => {
        this.datosEmpresa = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
  editarUsuario(id:any){
    this.modalupdate = true;

  }
  cerrarUpdate(){
    this.modalupdate = false;
  }
  eliminarUsuario(id:any){
    const url = import.meta.env.NG_APP_API + '/keycloak/user/delete/' + id;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteApi(url).subscribe({
          next: data => {
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            ).then((result) => {
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
    })
  }

  submit(e:any) {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const datos ={
      username: formdata.get('username')?.toString(),
      email: formdata.get('email')?.toString(),
      password: formdata.get('password')?.toString(),
      firstName: formdata.get('firstName')?.toString(),
      lastName: formdata.get('lastName')?.toString(),
      roles: [formdata.get('roles')?.toString()],
      // envialo como un long
      idEmpresa: formdata.get('empresa') ? parseInt(formdata.get('empresa')!.toString(), 10) : null
    }

    const url = import.meta.env.NG_APP_API + '/keycloak/user/create';
    this.api.postApi(url, datos).subscribe({
      next: data => {
        Swal.fire({
          title: 'Usuario creada',
          text: 'El usuario se ha creado correctamente',
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

  openmodal(id:String){
    this.modalupdate = true
  }

  abrirModalRegistro() {
    this.showModalDeRegistro = true;
  }
  closeModalRegistro() {
    this.showModalDeRegistro = false;
  }

  onPerfilChange($event: any) {
    const perfilSeleccionado = $event.target.value;
    console.log('Selected value:', perfilSeleccionado);
    if (perfilSeleccionado == 'admin') {
      this.isAdmin = true;
      this.getDatosEmpresa();
    } else {
      this.isAdmin = false;
    }
  }

}


