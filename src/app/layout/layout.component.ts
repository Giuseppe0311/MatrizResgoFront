import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "../auth/auth.service";
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  userRole: string[] | null = null;
  constructor(
    private token: AuthService
  ) {
  }
  menu : boolean = false;

  async  clickSalir(){
    localStorage.removeItem('token');
    window.location.href = "/";
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
    this.userRole = this.token.getUserRole();
  }

  hasRole(role: string): boolean {
    return this.userRole ? this.userRole.includes(role) : false;
  }

}
