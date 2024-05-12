import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-crearevento',
  standalone: true,
  imports: [],
  templateUrl: './crearevento.component.html',
  styleUrl: './crearevento.component.css'
})
export class CreareventoComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    initFlowbite()
  }

  enviarDatos(e: any){
   e.preventDefault();
   const formdata = new FormData(e.target);
   const datos={
      nombre_evento: formdata.get('nombre_evento'),
      probabilidad: formdata.get('probabilidad'),
      impacto: formdata.get('impacto'),
   }
   console.log(datos)
  }

}
