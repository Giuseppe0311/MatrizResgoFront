import { Component } from '@angular/core';
import { PostmatrizComponent } from './postmatriz/postmatriz.component';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import { Router } from '@angular/router';
import { MatrizServicio } from './matriz.servicio';
import * as jwt from 'jwt-decode';
import { UpdatematrizComponent } from "./updatematriz/updatematriz.component";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-matrices',
  standalone: true,
  imports: [UpdatematrizComponent, PostmatrizComponent],
  templateUrl: './matrices.component.html',
  styleUrl: './matrices.component.css',
})
export class MatricesComponent {
  constructor(private api: PeticionesapiService, private router : Router, private guardarMatriz : MatrizServicio) {}

  isOpen = false;
  idMatriz : number = 0;
  ngOnInit() {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   const decodedToken = jwt.jwtDecode(token) as any
    //   this.id_empresa = decodedToken.id_empresa;
    //   this.perfil = decodedToken.role;
    // }
    // else{
    //   window.location.href = "/";
    // }
    this.getData()
  }

  datosArreglo : any = [];

  recibirLaRepuestaDelPostHiJOParaActualizar(event: boolean) {
    if (event) {
      this.getData(); // Actualizar la tabla después de la solicitud POST
    }
  }
  recibirLaRepuestaDelPUtHiJOParaActualizar(event: boolean) {
    if (event) {
      this.getData(); // Actualizar la tabla después de la solicitud POST
    }
    this.isOpen = false;

  }
  abrirModalActualizar(id:number){
    console.log(id)
    this.idMatriz = id;
    this.isOpen = true;
  }
    
  cambiarPagina(valor : any){
    this.router.navigate(['/dashboard/matrices/eventos'])
  }

  eliminarMatriz(id:number){
    let url = import.meta.env.NG_APP_API + '/matrices/' + id;
      //swal fire  con pregunta con si o no 
      Swal.fire({
        title: '¿Estás seguro de eliminar la matriz?',
        showDenyButton: true,
        confirmButtonText: `Sí`,
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.deleteApi(url).subscribe({
            next: (data) => {
              Swal.fire('Matriz eliminada', '', 'success')
              this.getData();
            },
            error: (error) => {
              console.log(error);
              Swal.fire('Error en el servidor', '', 'error')
            },
          });
          this.getData();
        } else if (result.isDenied) {
          Swal.fire('La matriz no ha sido eliminada', '', 'info')
        }
      })
  }

  getData() {
    let url  
    url = import.meta.env.NG_APP_API + '/matrices' ;
    console.log(url)

    this.api.getApi(url).subscribe({
      next: (data) => {
         this.datosArreglo = data;
         console.log(this.datosArreglo)
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
