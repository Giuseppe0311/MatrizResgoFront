import { Component } from '@angular/core';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import * as jwt from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { EventosServicio } from './eventos.service';
import { Router } from '@angular/router';
import { MatrizServicio } from '../matrices/matriz.servicio';
import { PosteventosComponent } from './posteventos/posteventos.component';
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
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any
      this.id_empresa = decodedToken.id_empresa;
      this.perfil = decodedToken.role;
    }
    else{
      window.location.href = "/";
    }
    this.getDatos()
  }

  datos : any
  getDatos() {
    let url
    // if(this.perfil == "SUPERADMIN"){
    //   url = import.meta.env.NG_APP_API + '/eventos' ;
    // }
    // else{
    //   url = import.meta.env.NG_APP_API + '/eventos/' + this.id_empresa ;
    // }

    url = import.meta.env.NG_APP_API + '/eventos/' + this.matrizServicio.getData().id + '?' + 'id_empresa=' + this.id_empresa;

    this.api.getApi(url).subscribe({
      next: data => {
        this.datos  = data;
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
    this.router.navigate(['/dashboard/matrices/eventos/vermatriz']);
  }
  

}
