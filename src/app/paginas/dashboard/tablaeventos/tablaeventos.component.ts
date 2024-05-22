import { Component } from '@angular/core';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import * as jwt from 'jwt-decode';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tablaeventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablaeventos.component.html',
  styleUrl: './tablaeventos.component.css'
})
export class TablaeventosComponent {

  constructor(private api:PeticionesapiService) { }
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
    if(this.perfil == "SUPERADMIN"){
      url = import.meta.env.NG_APP_API + '/eventos' ;
    }
    else{
      url = import.meta.env.NG_APP_API + '/eventos/' + this.id_empresa ;
    }
    this.api.getApi(url).subscribe({
      next: data => {
        this.datos  = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  

}
