import { Component } from '@angular/core';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import Swal from 'sweetalert2';
import * as jwt from 'jwt-decode';

import { EventosServicio } from '../tablaeventos/eventos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puteventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puteventos.component.html',
  styleUrl: './puteventos.component.css',
})
export class PuteventosComponent {
  constructor(
    private api: PeticionesapiService,
    private datosRecolectados: EventosServicio
  ) {}

  idusuario: number = 0;

  datos: any;

  matriz_impacto: any = [];

  matriz_probabilidad: any = [];

  /* ACA SE HACE LA LOGICA DEL COLOR CON TODO :V  */

  /* COLOR ACEPTABLE */

  valor_aceptable_de: number = 0;
  valor_aceptable_a: number = 0;

  /* COLOR TOLERABLE */
  valor_tolerable_de: number = 0;
  valor_tolerable_a: number = 0;

  /* COLOR ALTO */

  valor_alto_de: number = 0;
  valor_alto_a: number = 0;

  /* COLOR EXTREMO */

  valor_extremo_de: number = 0;
  valor_extremo_a: number = 0;

  /*  */

  /* intervalos */

  intervalor_color_verde: any[] = [];
  intervalor_color_amarillo: any[] = [];
  intervalor_color_naranja: any[] = [];
  intervalor_color_rojo: any[] = [];
  /*  */

  /* VALORES DE IMPACTO */
  valor_minima: number = 0;
  valor_menor: number = 0;
  valor_moderada: number = 0;
  valor_mayor: number = 0;
  valor_maxima: number = 0;
  /*  */

  /* VALORES DE PROBABILIDAD */
  valor_muy_alta: number = 0;
  valor_alta: number = 0;
  valor_media: number = 0;
  valor_baja: number = 0;
  valor_muy_baja: number = 0;
  /*  */

  /* resultados de la primera columna */
  restuladoMinimayMuyAlta: number = 0;
  resultadoMinimayAlta: number = 0;
  resultadoMinimayMedia: number = 0;
  resultadoMinimayBaja: number = 0;
  restuladoMinimayMuyBaja: number = 0;
  /*  */

  /* resultados de la segunda columna */

  restuladoMenoryMuyAlta: number = 0;
  resultadoMenoryAlta: number = 0;
  resultadoMenoryMedia: number = 0;
  resultadoMenoryBaja: number = 0;
  restuladoMenoryMuyBaja: number = 0;
  /*  */

  /* resultados de la tercera columa */
  restuladoModeradayMuyAlta: number = 0;
  resultadoModeradayAlta: number = 0;
  resultadoModeradayMedia: number = 0;
  resultadoModeradayBaja: number = 0;
  restuladoModeradayMuyBaja: number = 0;
  /*  */

  /* resutlados de la cuarta columna */
  resultadoMayoryMuyAlta: number = 0;
  resultadoMayoryAlta: number = 0;
  resultadoMayoryMedia: number = 0;
  resultadoMayoryBaja: number = 0;
  resultadoMayoryMuyBaja: number = 0;
  /*  */

  /* resutlados de la  quintacoluma */
  resultadoMaximayMuyAlta: number = 0;
  resultadoMaximayAlta: number = 0;
  resultadoMaximayMedia: number = 0;
  resultadoMaximayBaja: number = 0;
  resultadoMaximayMuyBaja: number = 0;

  nombre_matriz : string = '';

  nombre_evento: string = '';
  que_probabilidad_eligio = '';
  que_impacto_eligio = '';

  ngOnInit(): void {
    this.datos = this.datosRecolectados.getData();
    this.nombre_matriz = this.datos.matriz.nombre_matriz;
    
    this.nombre_evento = this.datos.nombre_evento;
    this.que_probabilidad_eligio = this.datos.probabilidad;
    this.que_impacto_eligio = this.datos.impacto;

    this.matriz_impacto = this.datos.matriz_impacto;
    this.matriz_probabilidad = this.datos.matriz_probabilidad;

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any;
      this.idusuario = decodedToken.sub;
    } else {
      window.location.href = '/';
    }

    this.initializeValues();
  }

  initializeValues(): void {
    this.valor_minima = this.matriz_impacto.minima;
    this.valor_menor = this.matriz_impacto.menor;
    this.valor_moderada = this.matriz_impacto.moderada;
    this.valor_mayor = this.matriz_impacto.mayor;
    this.valor_maxima = this.matriz_impacto.maxima;

    this.valor_muy_alta = this.matriz_probabilidad.muy_alta;
    this.valor_alta = this.matriz_probabilidad.alta;
    this.valor_media = this.matriz_probabilidad.media;
    this.valor_baja = this.matriz_probabilidad.baja;
    this.valor_muy_baja = this.matriz_probabilidad.muy_baja;

    this.valor_aceptable_de = this.datos.intervalo_verde[0].de_verde;
    this.valor_aceptable_a = this.datos.intervalo_verde[0].a_verde;

    this.valor_tolerable_de = this.datos.intervalo_amarillo[0].de_amarillo;
    this.valor_tolerable_a = this.datos.intervalo_amarillo[0].a_amarillo;

    this.valor_alto_de = this.datos.intervalo_naranja[0].de_naranja;
    this.valor_alto_a = this.datos.intervalo_naranja[0].a_naranja;

    this.valor_extremo_de = this.datos.intervalo_rojo[0].de_rojo;
    this.valor_extremo_a = this.datos.intervalo_rojo[0].a_rojo;

    this.updateIntervalos();
    this.calculateResultados();

  }

  updateIntervalos(): void {
    this.intervalor_color_verde =
      this.valor_aceptable_de && this.valor_aceptable_a
        ? [this.valor_aceptable_de, this.valor_aceptable_a]
        : [];
    this.intervalor_color_amarillo =
      this.valor_tolerable_de && this.valor_tolerable_a
        ? [this.valor_tolerable_de, this.valor_tolerable_a]
        : [];
    this.intervalor_color_naranja =
      this.valor_alto_de && this.valor_alto_a
        ? [this.valor_alto_de, this.valor_alto_a]
        : [];
    this.intervalor_color_rojo =
      this.valor_extremo_de && this.valor_extremo_a
        ? [this.valor_extremo_de, this.valor_extremo_a]
        : [];

        console.log(this.intervalor_color_verde);
        console.log(this.intervalor_color_amarillo);
        console.log(this.intervalor_color_naranja);
        console.log(this.intervalor_color_rojo);
  }

  calculateResultados(): void {
    this.restuladoMinimayMuyAlta = this.valor_minima * this.valor_muy_alta;
    this.resultadoMinimayAlta = this.valor_minima * this.valor_alta;
    this.resultadoMinimayMedia = this.valor_minima * this.valor_media;
    this.resultadoMinimayBaja = this.valor_minima * this.valor_baja;
    this.restuladoMinimayMuyBaja = this.valor_minima * this.valor_muy_baja;

    this.restuladoMenoryMuyAlta = this.valor_menor * this.valor_muy_alta;
    this.resultadoMenoryAlta = this.valor_menor * this.valor_alta;
    this.resultadoMenoryMedia = this.valor_menor * this.valor_media;
    this.resultadoMenoryBaja = this.valor_menor * this.valor_baja;
    this.restuladoMenoryMuyBaja = this.valor_menor * this.valor_muy_baja;

    this.restuladoModeradayMuyAlta = this.valor_moderada * this.valor_muy_alta;
    this.resultadoModeradayAlta = this.valor_moderada * this.valor_alta;
    this.resultadoModeradayMedia = this.valor_moderada * this.valor_media;
    this.resultadoModeradayBaja = this.valor_moderada * this.valor_baja;
    this.restuladoModeradayMuyBaja = this.valor_moderada * this.valor_muy_baja;

    this.resultadoMayoryMuyAlta = this.valor_mayor * this.valor_muy_alta;
    this.resultadoMayoryAlta = this.valor_mayor * this.valor_alta;
    this.resultadoMayoryMedia = this.valor_mayor * this.valor_media;
    this.resultadoMayoryBaja = this.valor_mayor * this.valor_baja;
    this.resultadoMayoryMuyBaja = this.valor_mayor * this.valor_muy_baja;

    this.resultadoMaximayMuyAlta = this.valor_maxima * this.valor_muy_alta;
    this.resultadoMaximayAlta = this.valor_maxima * this.valor_alta;
    this.resultadoMaximayMedia = this.valor_maxima * this.valor_media;
    this.resultadoMaximayBaja = this.valor_maxima * this.valor_baja;
    this.resultadoMaximayMuyBaja = this.valor_maxima * this.valor_muy_baja;
  }

  

  /* -------------------------------------------------------------------------------------------------------------------------------------------- */

  calcularIntervaloVerde(valor: number): boolean {
    console.log(valor);
    return (
      valor >= this.intervalor_color_verde[0] &&
      valor <= this.intervalor_color_verde[1]
    );
  }

  calcularIntervaloAmarillo(valor: number): boolean {
    return (
      valor >= this.intervalor_color_amarillo[0] &&
      valor <= this.intervalor_color_amarillo[1]
    );
  }

  calcularIntervaloNaranja(valor: number): boolean {
    return (
      valor >= this.intervalor_color_naranja[0] &&
      valor <= this.intervalor_color_naranja[1]
    );
  }

  calcularIntervaloRojo(valor: number): boolean {
    return (
      valor >= this.intervalor_color_rojo[0] &&
      valor <= this.intervalor_color_rojo[1]
    );
  }


  calcularYRegistrar(color: string, valor: number): boolean {
    let resultado: boolean;
    switch (color) {
        case 'verde':
            resultado = this.calcularIntervaloVerde(valor);
            break;
        case 'amarillo':
            resultado = this.calcularIntervaloAmarillo(valor);
            break;
        case 'naranja':
            resultado = this.calcularIntervaloNaranja(valor);
            break;
        case 'rojo':
            resultado = this.calcularIntervaloRojo(valor);
            break;
        default:
            resultado = false;
    }
    console.log(`Color: ${color}, Valor: ${valor}, Resultado: ${resultado}`);
    return resultado;
}


  /* -------------------------------------------------------------------------------------------------------------------------------------------- */


}
