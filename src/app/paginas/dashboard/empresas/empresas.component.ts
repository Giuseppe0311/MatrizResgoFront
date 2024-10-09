import {Component, OnInit} from '@angular/core';
import {PeticionesapiService} from "../../../services/peticionesapi.service";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";
@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent implements OnInit {
  showModalRegister = false;
  datos: any[] = [];
  dataEdit: any = {};
  showModalEdit = false;

  constructor(
    private Service: PeticionesapiService,
    private toastrf: ToastrService
  ) {
  }

  ngOnInit(): void {
    const url = import.meta.env.NG_APP_API + `/empresas`;
    this.Service.getApi(url).subscribe({
      next: data => {
        this.toastrf.success('Datos cargados correctamente');
        this.datos = data;
      },
      error: error => {
        this.toastrf.error('Error al cargar los datos');
      }
    });
  }
  openModalEdit(id : number) {
    const url = import.meta.env.NG_APP_API + `/empresas/${id}`;
    this.Service.getApi(url).subscribe({
      next: data => {
        this.dataEdit = data;
        this.showModalEdit = true;
      },
      error: error => {
        this.toastrf.error('Error al cargar los datos');
        console.log(error);
      }
    });
  }
  closeModalEdit() {
    this.showModalEdit = false;
  }
  openModalRegister() {
    this.showModalRegister = true;
  }
  closeModalRegister() {
    this.showModalRegister = false;
  }
  delete(id: number) {
    const url = import.meta.env.NG_APP_API + `/empresas/${id}`;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Service.deleteApi(url).subscribe({
          next: data => {
            this.toastrf.success('Datos eliminados correctamente');
            window.location.reload();
          },
          error: error => {
            this.toastrf.error('Error al eliminar los datos');
            console.log(error);
          }
        });
      }
    })
  }
  save(e:any) {
    const url = import.meta.env.NG_APP_API + `/empresas`;
    const formdata = new FormData(e.target);
    const data = {
      nombre: formdata.get('nombre'),
    }

    this.Service.postApi(url, data).subscribe({
      next: data => {
        this.toastrf.success('Datos guardados correctamente');
        window.location.reload()
      },
      error: error => {
        this.toastrf.error('Error al guardar los datos');
        console.log(error);

      }
    });
  }
  edit(e:any) {
    const formdata = new FormData(e.target);
    const data = {
      id: formdata.get('id'),
      nombre: formdata.get('nombre'),
    }
    const url = import.meta.env.NG_APP_API + `/empresas/${data.id}`;

    this.Service.putApi(url, data).subscribe({
      next: data => {
        this.toastrf.success('Datos editados correctamente');
        window.location.reload();
      },
      error: error => {
        this.toastrf.error('Error al editar los datos' + error);
        console.log(error);
        this.closeModalEdit();
      }
    });
  }
}
