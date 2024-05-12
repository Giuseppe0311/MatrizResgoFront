import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  }
}
