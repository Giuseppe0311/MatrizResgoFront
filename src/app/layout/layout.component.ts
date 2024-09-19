import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as jwt from 'jwt-decode';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  
  constructor() { }

  menu : boolean = false;

  clickSalir(){
    window.location.href = '/';
  }

  usuario : string = "";
  sucrusal : string = "";
  empresa : string = "";
  imagen : string = "";
  perfil : string = "";

  ocultarMenu(){
    this.menu = !this.menu;
  }
  ngOnInit(): void {
    var isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      this.menu = true;
    } else {
      this.menu = false;
    }

    // const token = localStorage.getItem('token');
    // if (token) {
    //   const decodedToken = jwt.jwtDecode(token) as any
    //  this.usuario = decodedToken['username'];
    //   this.sucrusal = decodedToken['sucursal'];
    //   this.empresa = decodedToken['empresa'];
    //   this.imagen = decodedToken['imagen'];
    //   this.perfil = decodedToken['role'];
    // }
    // else{
    //   window.location.href = "/";
    // }

  }
  
}
