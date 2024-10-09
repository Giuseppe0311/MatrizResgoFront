import {ChangeDetectorRef, Component} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import Swal from 'sweetalert2';
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {KeycloakUser} from "./keycloak-user.model";
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent {


  constructor(private api:PeticionesapiService,
              private toast:ToastrService) { }
  modalupdate: boolean = false;
  showModalDeRegistro: boolean = false;
  idUsuario:string = "";
  nombreEmpresa: string = 'No asignable';




  showPassword: boolean = false
  clickMostrarPassword(): void {
    this.showPassword = !this.showPassword
  }
  ngOnInit(): void {
    initFlowbite();
    this.getDatos();
  }

  datos: any[] = [];
  datosupdate: KeycloakUser = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    emailVerified: false,
    attributes: {
      idEmpresa: ['']
    },
    realmRoles: [''],
    enabled: true
  };
  datosEmpresa: any[] = [];
  isAdmin = false;
  getDatos() {
    const url = import.meta.env.NG_APP_API + '/keycloak/user/search';
    this.api.getApi(url).subscribe({
      next: data => {
        this.datos = data;
        this.datos.forEach(usuario => {
          if (usuario.attributes && usuario.attributes.idEmpresa && usuario.attributes.idEmpresa.length > 0) {
            const idEmpresa = usuario.attributes.idEmpresa[0];
            this.getNombreEmpresa(idEmpresa, usuario);
          } else {
            usuario.nombreEmpresa = 'No asignado';
          }
        });
      },
      error: error => {
        this.toast.error('Ha ocurrido un error al obtener los usuarios');
      }
    });
  }


  getNombreEmpresa(idEmpresa: string, usuario: any) {
    const url = import.meta.env.NG_APP_API + '/empresas/' + idEmpresa;
    this.api.getApi(url).subscribe({
      next: data => {
        const empresa = data;
        if (empresa && empresa.nombre) {
          usuario.nombreEmpresa = empresa.nombre;
        } else {
          usuario.nombreEmpresa = 'No asignado';
        }
      },
      error: error => {
        if (error.status === 404) {
          usuario.nombreEmpresa = 'No asignado';
        } else {
          this.toast.error('Ha ocurrido un error al obtener el nombre de la empresa');
          usuario.nombreEmpresa = 'No asignado';
        }
      }
    });
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
  editarUsuario(username: string) {
    this.modalupdate = true;
    const url = import.meta.env.NG_APP_API + '/keycloak/user/search/' + username;
    this.api.getApi(url).subscribe({
      next: (data) => {
        if (data && data[0]) {
          this.datosupdate = {
            ...data[0],
            attributes: {
              idEmpresa: data[0].attributes?.idEmpresa || ['']
            }
          };
          this.isAdmin = this.datosupdate.realmRoles.includes('admin');
          if (this.isAdmin) {
            this.getDatosEmpresa();
          }
        }
      },
      error: error => {
        this.toast.error('Error al cargar los datos del usuario');
      }
    });
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
       this.toast.success('Usuario creado correctamente');
       this.showModalDeRegistro = false;
       this.getDatos();
      },
      error: error => {
        console.error('There was an error!', error);
        this.toast.error('Ha ocurrido un error');
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
  closeModalUpdate() {
    this.modalupdate = false;
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
  onperfilUpdateChange($event: any) {
    const selectedValue = $event.target.value;
    this.isAdmin = selectedValue === 'admin';

    if (!this.datosupdate.attributes) {
      this.datosupdate.attributes = {};
    }

    if (this.isAdmin) {
      this.getDatosEmpresa();
    } else {
      this.datosupdate.attributes.idEmpresa = [''];
    }
  }

  update(e:any){
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(this.datosupdate);

    const datos = {
      username: formData.get('username')?.toString(),
      email: formData.get('email')?.toString(),
      firstName: formData.get('firstName')?.toString(),
      lastName: formData.get('lastName')?.toString(),
      roles: this.datosupdate.realmRoles,
      password: formData.get('password')?.toString() != '' ? formData.get('password')?.toString() : null,
      idEmpresa: this.datosupdate.attributes && this.datosupdate.attributes.idEmpresa &&
      this.datosupdate.attributes.idEmpresa[0] ?
        parseInt(this.datosupdate.attributes.idEmpresa[0]) : null    };

    console.log(datos);
    if (formData.get('id') == null) {
      this.toast.error('Ha ocurrido un error');
      return;
    }
    const url = import.meta.env.NG_APP_API + '/keycloak/user/update/' + formData.get('id').toString();
    console.log(url);
     this.api.putApi(url, datos).subscribe({
      next: data => {
        this.toast.success('Usuario actualizado correctamente');
        this.modalupdate = false;
        this.getDatos();
      },
      error: error => {
        console.error('There was an error!', error);
        this.toast.error('Ha ocurrido un error');
      }
    });
  }
}


