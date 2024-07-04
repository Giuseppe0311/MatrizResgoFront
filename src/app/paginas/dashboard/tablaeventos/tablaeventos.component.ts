import { Component } from '@angular/core';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import * as jwt from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { EventosServicio } from './eventos.service';
import { Router } from '@angular/router';
import { MatrizServicio } from '../matrices/matriz.servicio';
import { PosteventosComponent } from '../posteventos/posteventos.component';

@Component({
  selector: 'app-tablaeventos',
  standalone: true,
  imports: [CommonModule, PosteventosComponent],
  templateUrl: './tablaeventos.component.html',
  styleUrl: './tablaeventos.component.css'
})
export class TablaeventosComponent {

  constructor(private api:PeticionesapiService, private eventoservicio: EventosServicio, private router: Router, private matrizServicio: MatrizServicio) { }
  id_empresa: any
  perfil : any
  datos_matriz : any
  id_usuario: any
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any
      console.log(decodedToken)
      this.id_empresa = decodedToken.id_empresa;
      this.id_usuario = decodedToken.sub;
      this.perfil = decodedToken.role;
      this.datos_matriz = this.matrizServicio.getData()
      console.log(this.datos_matriz)
    }
    else{
      window.location.href = "/";
    }
    this.getDatos()
  }


  datos : any
  getDatos() {
    let url
    console.log(this.perfil)
    if(this.perfil === "SUPERADMIN"){
      url = import.meta.env.NG_APP_API + '/eventos/matriz/' + this.datos_matriz.id_matriz ;
    }
    else{
      url = import.meta.env.NG_APP_API + '/eventos/usuarios/' + this.id_usuario ;
    }
    this.api.getApi(url).subscribe({
      next: data => {
        this.datos  = data;
        console.log(this.datos)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  recibirLaRepuestaDelPostHiJOParaActualizar(event: boolean) {
    if (event) {
      this.getDatos(); // Actualizar la tabla después de la solicitud POST
    }
  }

  clickVerMatriz(data:any){
    this.eventoservicio.setData(data);
    this.router.navigate(['/dashboard/matrices/eventos/vereventos']);
  }

  clickVerMatriz2(data:any){
    this.eventoservicio.setData(data);
    this.router.navigate(['/dashboard/matrices/eventos/compartirusuario']);
  }
  

}
