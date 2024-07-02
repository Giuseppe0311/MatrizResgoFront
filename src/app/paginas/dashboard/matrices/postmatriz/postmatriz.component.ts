import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { PeticionesapiService } from '../../../../services/peticionesapi.service';
import Swal from 'sweetalert2';
import * as jwt from 'jwt-decode';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-postmatriz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postmatriz.component.html',
  styleUrl: './postmatriz.component.css'
})
export class PostmatrizComponent {

  @Output() Completado = new EventEmitter<boolean>();
  @ViewChild('cerrarBoton') cerrarBotonRef!: ElementRef;
  constructor(private api: PeticionesapiService) { }

  idusuario: number = 0;

  ngOnInit(): void {

    initFlowbite()

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.jwtDecode(token) as any
      this.idusuario = decodedToken.sub;
    }
    else{
      window.location.href = "/";
    }
  }

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

  datosRecolectadoyResultados(e: any, input: string) {
    if (input === 'minima') {
      this.valor_minima = parseFloat(e.target.value);
    }
    else if (input === 'menor') {
      this.valor_menor = parseFloat(e.target.value);
    }

    else if (input === 'moderada') {
      this.valor_moderada = parseFloat(e.target.value);
    }

    else if (input === 'mayor') {
      this.valor_mayor = parseFloat(e.target.value);
    }

    else if (input === 'maxima') {
      this.valor_maxima = parseFloat(e.target.value);
    }

    else if (input === 'muy_alta') {
      this.valor_muy_alta = parseFloat(e.target.value);
    }
    else if (input === 'alta') {
      this.valor_alta = parseFloat(e.target.value);
    }
    else if (input === 'media') {
      this.valor_media = parseFloat(e.target.value);
    }
    else if (input === 'baja') {
      this.valor_baja = parseFloat(e.target.value);
    }
    else if (input === 'muy_baja') {
      this.valor_muy_baja = parseFloat(e.target.value);
    }

    /* resultadosminima */
    this.restuladoMinimayMuyAlta = this.valor_minima * this.valor_muy_alta;
    this.resultadoMinimayAlta = this.valor_minima * this.valor_alta;
    this.resultadoMinimayMedia = this.valor_minima * this.valor_media;
    this.resultadoMinimayBaja = this.valor_minima * this.valor_baja;
    this.restuladoMinimayMuyBaja = this.valor_minima * this.valor_muy_baja;

    /* resultadosmenor */

    this.restuladoMenoryMuyAlta = this.valor_menor * this.valor_muy_alta;
    this.resultadoMenoryAlta = this.valor_menor * this.valor_alta;
    this.resultadoMenoryMedia = this.valor_menor * this.valor_media;
    this.resultadoMenoryBaja = this.valor_menor * this.valor_baja;
    this.restuladoMenoryMuyBaja = this.valor_menor * this.valor_muy_baja;

    /* resultadosmoderada */

    this.restuladoModeradayMuyAlta = this.valor_moderada * this.valor_muy_alta;
    this.resultadoModeradayAlta = this.valor_moderada * this.valor_alta;
    this.resultadoModeradayMedia = this.valor_moderada * this.valor_media;
    this.resultadoModeradayBaja = this.valor_moderada * this.valor_baja;
    this.restuladoModeradayMuyBaja = this.valor_moderada * this.valor_muy_baja;

    /* resultados mayor */
    this.resultadoMayoryMuyAlta = this.valor_mayor * this.valor_muy_alta;
    this.resultadoMayoryAlta = this.valor_mayor * this.valor_alta;
    this.resultadoMayoryMedia = this.valor_mayor * this.valor_media;
    this.resultadoMayoryBaja = this.valor_mayor * this.valor_baja;
    this.resultadoMayoryMuyBaja = this.valor_mayor * this.valor_muy_baja;


    /* resultada de maxima */
    this.resultadoMaximayMuyAlta = this.valor_maxima * this.valor_muy_alta;
    this.resultadoMaximayAlta = this.valor_maxima * this.valor_alta;
    this.resultadoMaximayMedia = this.valor_maxima * this.valor_media;
    this.resultadoMaximayBaja = this.valor_maxima * this.valor_baja;
    this.resultadoMaximayMuyBaja = this.valor_maxima * this.valor_muy_baja;

  }

  /* -------------------------------------------------------------------------------------------------------------------------------------------- */

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

  datosRecolectadosColores(e: any, input: string) {
    const valor = parseFloat(e.target.value);
    /*  // Verificar si el valor ya está presente en algún intervalo
     const valorExiste = this.verificarValorEnIntervalo(valor);
 
     if (valorExiste) {
       alert('Este número ya está en un intervalo.');
       e.target.value = ''; // Limpiar el valor de la celda
       return; // Detener la ejecución si el valor ya está en un intervalo
     } */

    if (input === 'aceptable_de') {
      this.valor_aceptable_de = valor;
    } else if (input === 'aceptable_a') {
      this.valor_aceptable_a = valor;
    } else if (input === 'tolerable_de') {
      this.valor_tolerable_de = valor;
    } else if (input === 'tolerable_a') {
      this.valor_tolerable_a = valor;
    } else if (input === 'alto_de') {
      this.valor_alto_de = valor;
    } else if (input === 'alto_a') {
      this.valor_alto_a = valor;
    } else if (input === 'extremo_de') {
      this.valor_extremo_de = valor;
    } else if (input === 'extremo_a') {
      this.valor_extremo_a = valor;
    }

    // Reemplazar los valores en lugar de agregar nuevos
    if (this.valor_aceptable_de && this.valor_aceptable_a) {
      this.intervalor_color_verde = [this.valor_aceptable_de, this.valor_aceptable_a];
    } else {
      this.intervalor_color_verde = []; // Limpiar el intervalo si falta algún valor
    }
    if (this.valor_tolerable_de && this.valor_tolerable_a) {
      this.intervalor_color_amarillo = [this.valor_tolerable_de, this.valor_tolerable_a];
    } else {
      this.intervalor_color_amarillo = []; // Limpiar el intervalo si falta algún valor
    }
    if (this.valor_alto_de && this.valor_alto_a) {
      this.intervalor_color_naranja = [this.valor_alto_de, this.valor_alto_a];
    } else {
      this.intervalor_color_naranja = []; // Limpiar el intervalo si falta algún valor
    }
    if (this.valor_extremo_de && this.valor_extremo_a) {
      this.intervalor_color_rojo = [this.valor_extremo_de, this.valor_extremo_a];
    } else {
      this.intervalor_color_rojo = []; // Limpiar el intervalo si falta algún valor
    }

    // console.log(this.intervalor_color_verde);
    // console.log(this.intervalor_color_amarillo);
    // console.log(this.intervalor_color_naranja);
    // console.log(this.intervalor_color_rojo);
  }

  /* 
    verificarValorEnIntervalo(valor: number): boolean {
      // Verificar si el valor está dentro de algún intervalo existente
      const intervalos = [
        this.intervalor_color_verde,
        this.intervalor_color_amarillo,
        this.intervalor_color_naranja,
        this.intervalor_color_rojo,
      ];
    
      for (const intervalo of intervalos) {
        const inicio = intervalo[0];
        const fin = intervalo[1];
    
        if (valor > inicio && valor < fin) { // Excluir los casos donde valor es igual al inicio o al final
          return true; // El valor está dentro de un intervalo existente
        }
      }
    
      return false; // El valor no está dentro de ningún intervalo existente
    } 
   */


  calcularIntervaloVerde(valor: number): boolean {
    return valor >= this.intervalor_color_verde[0] && valor <= this.intervalor_color_verde[1];
  }

  calcularIntervaloAmarrillo(valor: number): boolean {
    return valor >= this.intervalor_color_amarillo[0] && valor <= this.intervalor_color_amarillo[1];
  }

  calcularIntervaloNaranja(valor: number): boolean {
    return valor >= this.intervalor_color_naranja[0] && valor <= this.intervalor_color_naranja[1];
  }

  calcularIntervaloRojo(valor: number): boolean {
    return valor >= this.intervalor_color_rojo[0] && valor <= this.intervalor_color_rojo[1];
  }

  /* -------------------------------------------------------------------------------------------------------------------------------------------- */

  probabilidad: string = "";
  impacto: string = "";


  agarrarValorProbabilidad(e: any) {
    this.probabilidad = e.target.value;
    // console.log(this.probabilidad);

  }
  agarrarValorImpacto(e: any) {

    this.impacto = e.target.value;
    // console.log(this.impacto);

  }


  valor: number = 0;
  nivel_de_riesgo: string = "";


  validarIntervalos(): boolean {
    const resultados = [
      this.restuladoMinimayMuyAlta,
      this.resultadoMinimayAlta,
      this.resultadoMinimayMedia,
      this.resultadoMinimayBaja,
      this.restuladoMinimayMuyBaja,
      this.restuladoMenoryMuyAlta,
      this.resultadoMenoryAlta,
      this.resultadoMenoryMedia,
      this.resultadoMenoryBaja,
      this.restuladoMenoryMuyBaja,
      this.restuladoModeradayMuyAlta,
      this.resultadoModeradayAlta,
      this.resultadoModeradayMedia,
      this.resultadoModeradayBaja,
      this.restuladoModeradayMuyBaja,
      this.resultadoMayoryMuyAlta,
      this.resultadoMayoryAlta,
      this.resultadoMayoryMedia,
      this.resultadoMayoryBaja,
      this.resultadoMayoryMuyBaja,
      this.resultadoMaximayMuyAlta,
      this.resultadoMaximayAlta,
      this.resultadoMaximayMedia,
      this.resultadoMaximayBaja,
      this.resultadoMaximayMuyBaja,
    ];
  
    for (const resultado of resultados) {
      if (!this.calcularIntervaloVerde(resultado) &&
          !this.calcularIntervaloAmarrillo(resultado) &&
          !this.calcularIntervaloNaranja(resultado) &&
          !this.calcularIntervaloRojo(resultado)) {
        return false;
      }
    }
    return true;
  }


  enviarDatos(e: any) {
    e.preventDefault();

    if (!this.validarIntervalos()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validación fallida',
        text: 'No debe dejar espacios grises'
      });
      return;
    }

    let enviar = true; // Variable para controlar si se deben enviar los datos


    if (enviar) {
      const formdata = new FormData(e.target);
      const datos = {
        nombre_matriz: formdata.get("nombre_matriz"),
        minima: this.valor_minima,
        menor: this.valor_menor,
        moderada: this.valor_moderada,
        mayor: this.valor_mayor,
        maxima: this.valor_maxima,
        muy_alta: this.valor_muy_alta,
        alta: this.valor_alta,
        media: this.valor_media,
        baja: this.valor_baja,
        muy_baja: this.valor_muy_baja,
        de_verde: this.intervalor_color_verde[0],
        a_verde: this.intervalor_color_verde[1],
        de_amarillo: this.intervalor_color_amarillo[0],
        a_amarillo: this.intervalor_color_amarillo[1],
        de_naranja: this.intervalor_color_naranja[0],
        a_naranja: this.intervalor_color_naranja[1],
        de_rojo: this.intervalor_color_rojo[0],
        a_rojo: this.intervalor_color_rojo[1],
        id_usuario: this.idusuario

      }



    const url = import.meta.env.NG_APP_API + "/matriz";
    this.api.postApi(url, datos).subscribe(
      {
        next: (data) => {
          Swal.fire(
          {
            icon: "success",
            title: "Exito",
            text: "Se ha guardado los datos correctamente",
          }
          
          ).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No Se ha guardado los datos correctamente",
          })
        }
      }
    )
  }
}
}

