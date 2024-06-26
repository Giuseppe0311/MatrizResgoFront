import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { PeticionesapiService } from '../../../../services/peticionesapi.service';
import Swal from 'sweetalert2';
import * as jwt from 'jwt-decode';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-postmatriz',
  standalone: true,
  imports: [],
  templateUrl: './postmatriz.component.html',
  styleUrl: './postmatriz.component.css'
})
export class PostmatrizComponent {

  @Output() Completado = new EventEmitter<boolean>();
  @ViewChild('cerrarBoton') cerrarBotonRef!: ElementRef;

  constructor(private api: PeticionesapiService) {}

  idusuario: any;

  ngOnInit(): void {
    initFlowbite();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any
      this.idusuario = decodedToken.sub;
    }
    else{
      window.location.href = "/";
    }
    
  }


  loading = false;  

  enviarDatos(e:any){
    e.preventDefault();
    this.loading = true;

    const formulario = new FormData(e.target);
    
    const matriz = formulario.get('nombre_matriz');

    const datosEnviar = {
      nombre_matriz: matriz,
      idusuario : String(this.idusuario)
    }

    const url = import.meta.env.NG_APP_API + '/matriz';
    this.api.postApi(url, datosEnviar).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Matriz creada',
          text: 'La matriz ha sido creada con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.Completado.emit(true);
          this.cerrarBotonRef.nativeElement.click();
        })
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear la matriz',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    });
  }


}
