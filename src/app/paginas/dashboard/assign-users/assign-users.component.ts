import {Component, inject, OnInit} from '@angular/core';
import {PeticionesapiService} from "../../../services/peticionesapi.service";
import {AuthService} from "../../../auth/auth.service";
import { ToastrService } from "ngx-toastr";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
// import Swal Fire
import Swal from 'sweetalert2';
@Component({
  selector: 'app-assign-users',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './assign-users.component.html',
  styleUrl: './assign-users.component.css'
})
export class AssignUsersComponent implements OnInit{
  showModalAssignUsers:boolean = false;
  showModalUpdateAssignUsers:boolean = false;
  toastr= inject(ToastrService)
  apiservice  = inject(PeticionesapiService)
  token = inject(AuthService)
  auxNombreMatriz: String = "";
  auxNombreEvento: String = "";
  selectedUserId: String = "";
  idEvento: number = 0;
  idEmpresa:String = "";
  usuarios: any[] = [];
  datos: any[] = [];
  ngOnInit() {
    if (this.token.getEmpresaId() != null) {
      this.idEmpresa = this.token.getEmpresaId().toString();
    }else {
      this.token.removeToken();
      window.location.href = '/login';
    }
    this.getDatos();
  }

  getDatos() {
    const url = import.meta.env.NG_APP_API + `/matrices/search-by-empresa/${this.idEmpresa}`;
    this.apiservice.getApi(url).subscribe({
      next: data => {
        this.datos  = data;
        this.toastr.success('Datos cargados correctamente');
        console.log(data);
      },
      error: error => {
        this.toastr.error('Error al cargar los datos');
      }
    })
  }

  getUsuarios(){
    const url = import.meta.env.NG_APP_API + `/keycloak/user/search/profile/user`;
    this.apiservice.getApi(url).subscribe({
      next: data => {
        this.usuarios = data;
      },
      error: error => {
        this.toastr.error('Error al cargar los usuarios');
      }
    })
  }

  private assignUserAction(formdata: FormData) {
    if (formdata.get('usuario') != null && this.idEvento != 0) {
      const url = import.meta.env.NG_APP_API + `/eventos/assign-user/${this.idEvento}/${formdata.get('usuario')}`;
      this.apiservice.postApi(url, {}).subscribe({
        next: data => {
          this.toastr.success('Usuario asignado correctamente');
          this.showModalAssignUsers = false;
          window.location.reload();
        },
        error: error => {
          this.toastr.error('Error al asignar el usuario');
        }
      });
    } else {
      this.toastr.error('Error al asignar el usuario, verifique los datos');
    }
  }

  assignUser($event: any) {
    $event.preventDefault();
    const formdata = new FormData($event.target);
    this.assignUserAction(formdata);
  }

  assignUpdateUser($event: any) {
    $event.preventDefault();
    const formdata = new FormData($event.target);
    this.assignUserAction(formdata);
  }

  probabilidadLabels: { [key: string]: string } = {
    '0': 'Muy Alta',
    '1': 'Alta',
    '2': 'Media',
    '3': 'Baja',
    '4': 'Muy Baja',
  };
  impactoLabels: { [key: string]: string } = {
    '0': 'Mínima',
    '1': 'Menor',
    '2': 'Moderada',
    '3': 'Mayor',
    '4': 'Máxima',
  };
  showAssignUsers( nombreMatriz: String, nombreEvento: String, idEvento: number) {
    this.showModalAssignUsers = true;
    this.auxNombreMatriz = nombreMatriz;
    this.auxNombreEvento = nombreEvento;
    this.idEvento = idEvento;
    this.getUsuarios();
  }
  showUpdateAssignUsers( nombreMatriz: String, nombreEvento: String, idEvento: number, idUsuarioAsignado: String) {
    this.showModalUpdateAssignUsers = true;
    this.auxNombreMatriz = nombreMatriz;
    this.auxNombreEvento = nombreEvento;
    this.idEvento = idEvento;
    this.selectedUserId = idUsuarioAsignado;
    this.getUsuarios();
  }
  closeUpdateAssignUsers() {
    this.showModalUpdateAssignUsers = false;
  }
  closeAssignUsers() {
    this.showModalAssignUsers = false;
  }

  deleteAssingUser(id:number) {
    const url = import.meta.env.NG_APP_API + `/eventos/unassign-user/${id}`;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiservice.deleteApi(url).subscribe({
          next: data => {
            this.toastr.success('Usuario borrado correctamente');
            window.location.reload();
          },
          error: error => {
            this.toastr.error('Error al borrar el usuario');
          }
        });
      }
    })
  }
}
