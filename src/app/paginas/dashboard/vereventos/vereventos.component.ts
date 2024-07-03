import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import { EventosServicio } from '../tablaeventos/eventos.service';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import * as jwt from 'jwt-decode';
@Component({
  selector: 'app-vereventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vereventos.component.html',
  styleUrl: './vereventos.component.css'
})
export class VereventosComponent {


  idusuario: number = 0;

  constructor(
    private api: PeticionesapiService,
    private datosRecolectados: EventosServicio
  ) {}



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

  impacto_seleccionado: string = '';
  probalidad_seleccionada: string = '';
  nombre_evento_seleccionado: string = '';
  dominio_seleccionado: string = '';
  objetivo_seleccionado: string = '';
  control_seleccionado: string = '';

  idevento : any
  getJalarEvento() {
 this.idevento = this.datosRecolectados.getData().id_evento;

    let url = import.meta.env.NG_APP_API + '/eventos/' + this.idevento
    this.api.getApi(url).subscribe({
      next: (data) => {
        console.log('Datos de la matriz:', data);
        if (data && data.length > 0) {
          this.datos = data[0]; // Asigna el primer objeto del arreglo a this.datos

          this.nombre_evento_seleccionado = this.datos.nombre_evento;
          this.probalidad_seleccionada = this.datos.probabilidad;
          this.impacto_seleccionado = this.datos.impacto;
          this.dominio_seleccionado = this.datos.dominio;
          this.objetivo_seleccionado = this.datos.objetivo;
          this.control_seleccionado = this.datos.control;

  
          // Lógica que depende de this.datos
          if (this.datos.matriz) {

            console.log(this.datos.matriz);

            this.nombre_matriz = this.datos.matriz.nombre_matriz;
            this.matriz_impacto = this.datos.matriz.matriz_impacto;
            this.matriz_probabilidad = this.datos.matriz.matriz_probabilidad;
          }
  
          const token = localStorage.getItem('token');
          if (token) {
            const decodedToken = jwt.jwtDecode(token) as any;
            this.idusuario = decodedToken.sub;
          } else {
            window.location.href = '/';
          }
  
          this.initializeValues();
        } else {
          console.error('La respuesta de la API no contiene datos.');
        }
      },
      error: (error) => {
        console.log('Error cargando los datos de la matriz:', error);
      }
    });
  }
  
  ngOnInit(): void {
    initFlowbite();
    this.jalarIso();
    this.getJalarEvento();
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

    this.valor_aceptable_de = this.datos.matriz.intervalo_verde[0].de_verde;
    this.valor_aceptable_a = this.datos.matriz.intervalo_verde[0].a_verde;

    this.valor_tolerable_de = this.datos.matriz.intervalo_amarillo[0].de_amarillo;
    this.valor_tolerable_a = this.datos.matriz.intervalo_amarillo[0].a_amarillo;

    this.valor_alto_de = this.datos.matriz.intervalo_naranja[0].de_naranja;
    this.valor_alto_a = this.datos.matriz.intervalo_naranja[0].a_naranja;

    this.valor_extremo_de = this.datos.matriz.intervalo_rojo[0].de_rojo;
    this.valor_extremo_a = this.datos.matriz.intervalo_rojo[0].a_rojo;

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


dominios: any[] = [];
isos: any[] = []; // Asumiendo que aquí se almacenarán los datos obtenidos del servicio API
selectedDominio: string = '';
selectedDominioObjetivos: any[] = [];
selectedObjetivoControles: any[] = [];
filteredControls: any[] = []; // Para almacenar los controles filtrados por objetivo seleccionado

jalarIso(): void {
  this.api.getApi(import.meta.env.NG_APP_API + '/iso').subscribe({
    next: (data) => {
      console.log('ISOS:', data);
      this.isos = data;
      this.groupByDomainAndObjective();
    },
    error: (error) => {
      console.log('Error cargando los ISOS:', error);
    },
  });
}

groupByDomainAndObjective(): void {
  this.dominios = []; // Limpiamos el array de dominios para reconstruirlo
  this.isos.forEach((iso) => {
    const existingDomain = this.dominios.find(d => d.dominio === iso.dominio);

    if (!existingDomain) {
      // Si el dominio no existe, lo agregamos con su primer objetivo y control
      this.dominios.push({
        dominio: iso.dominio,
        objetivos: [{ objetivo: iso.objetivo, controles: [iso.control] }]
      });
    } else {
      // Si el dominio ya existe, verificamos si el objetivo existe
      const existingObjetivo = existingDomain.objetivos.find((o : any) => o.objetivo === iso.objetivo);

      if (!existingObjetivo) {
        // Si el objetivo no existe para este dominio, lo agregamos con su control
        existingDomain.objetivos.push({
          objetivo: iso.objetivo,
          controles: [iso.control]
        });
      } else {
        // Si el objetivo existe, verificamos si el control ya está incluido
        if (!existingObjetivo.controles.includes(iso.control)) {
          existingObjetivo.controles.push(iso.control);
        }
      }
    }
  });

  console.log('Dominios:', this.dominios);
}

onDominioChange(event: any): void {
  this.selectedDominio = event.target.value;

  if (this.selectedDominio !== '') {
    const selectedDomain = this.dominios.find(d => d.dominio === this.selectedDominio);

    if (selectedDomain) {
      // Reiniciar la lista de objetivos y controles al cambiar de dominio
      this.selectedDominioObjetivos = selectedDomain.objetivos.map((objetivo:any) => ({ objetivo: objetivo.objetivo }));
      this.selectedObjetivoControles = [];
      console.log('Objetivos:', this.selectedDominioObjetivos);
    } else {
      this.selectedDominioObjetivos = [];
      this.selectedObjetivoControles = [];
    }
  } else {
    this.selectedDominioObjetivos = [];
    this.selectedObjetivoControles = [];
  }
}

onObjetivoChange(event: any): void {
  const objetivo = event.target.value;
  const selectedDomain = this.dominios.find(d => d.dominio === this.selectedDominio);

  if (selectedDomain) {
    const selectedObjetivo = selectedDomain.objetivos.find((obj:any) => obj.objetivo === objetivo);

    console.log('Objetivo seleccionado:', selectedObjetivo);

    if (selectedObjetivo) {
      // Supongamos que los controles están almacenados en el objeto 'selectedObjetivo.controles'
      this.selectedObjetivoControles = selectedObjetivo.controles.map((control:any) => ({ control: control }));
      console.log('Controles:', this.selectedObjetivoControles);
    } else {
      this.selectedObjetivoControles = [];
    }
  } else {
    this.selectedObjetivoControles = [];
  }
}




// enviarDatos(e: any) {
//   e.preventDefault();

//   let enviar = true; // Variable para controlar si se deben enviar los datos

//   if (this.probabilidad && this.impacto) {
//     if (this.probabilidad === "muy_alta" && this.impacto === "minima") {
//       this.valor = this.valor_muy_alta * this.valor_minima;
//     }
//     else if (this.probabilidad === "alta" && this.impacto === "minima") {
//       this.valor = this.valor_alta * this.valor_minima;
//     }
//     else if (this.probabilidad === "media" && this.impacto === "minima") {
//       this.valor = this.valor_media * this.valor_minima;
//     }
//     else if (this.probabilidad === "baja" && this.impacto === "minima") {
//       this.valor = this.valor_baja * this.valor_minima;
//     }
//     else if (this.probabilidad === "muy_baja" && this.impacto === "minima") {
//       this.valor = this.valor_muy_baja * this.valor_minima;
//     }
//     else if (this.probabilidad === "muy_alta" && this.impacto === "menor") {
//       this.valor = this.valor_muy_alta * this.valor_menor;
//     }
//     else if (this.probabilidad === "alta" && this.impacto === "menor") {
//       this.valor = this.valor_alta * this.valor_menor;
//     }
//     else if (this.probabilidad === "media" && this.impacto === "menor") {
//       this.valor = this.valor_media * this.valor_menor;
//     }
//     else if (this.probabilidad === "baja" && this.impacto === "menor") {
//       this.valor = this.valor_baja * this.valor_menor;
//     }
//     else if (this.probabilidad === "muy_baja" && this.impacto === "menor") {
//       this.valor = this.valor_muy_baja * this.valor_menor;
//     }
//     else if (this.probabilidad === "muy_alta" && this.impacto === "moderada") {
//       this.valor = this.valor_muy_alta * this.valor_moderada;
//     }
//     else if (this.probabilidad === "alta" && this.impacto === "moderada") {
//       this.valor = this.valor_alta * this.valor_moderada;
//     }
//     else if (this.probabilidad === "media" && this.impacto === "moderada") {
//       this.valor = this.valor_media * this.valor_moderada;
//     }
//     else if (this.probabilidad === "baja" && this.impacto === "moderada") {
//       this.valor = this.valor_baja * this.valor_moderada;
//     }
//     else if (this.probabilidad === "muy_baja" && this.impacto === "moderada") {
//       this.valor = this.valor_muy_baja * this.valor_moderada;
//     }
//     else if (this.probabilidad === "muy_alta" && this.impacto === "mayor") {
//       this.valor = this.valor_muy_alta * this.valor_mayor;
//     }
//     else if (this.probabilidad === "alta" && this.impacto === "mayor") {
//       this.valor = this.valor_alta * this.valor_mayor;
//     }
//     else if (this.probabilidad === "media" && this.impacto === "mayor") {
//       this.valor = this.valor_media * this.valor_mayor;
//     }
//     else if (this.probabilidad === "baja" && this.impacto === "mayor") {
//       this.valor = this.valor_baja * this.valor_mayor;
//     }
//     else if (this.probabilidad === "muy_baja" && this.impacto === "mayor") {
//       this.valor = this.valor_muy_baja * this.valor_mayor;
//     }
//     else if (this.probabilidad === "muy_alta" && this.impacto === "maxima") {
//       this.valor = this.valor_muy_alta * this.valor_maxima;
//     }
//     else if (this.probabilidad === "alta" && this.impacto === "maxima") {
//       this.valor = this.valor_alta * this.valor_maxima;
//     }
//     else if (this.probabilidad === "media" && this.impacto === "maxima") {
//       this.valor = this.valor_media * this.valor_maxima;
//     }
//     else if (this.probabilidad === "baja" && this.impacto === "maxima") {
//       this.valor = this.valor_baja * this.valor_maxima;
//     }
//     else if (this.probabilidad === "muy_baja" && this.impacto === "maxima") {
//       this.valor = this.valor_muy_baja * this.valor_maxima;
//     }

//     // Determinación del nivel de riesgo
//     if (this.calcularIntervaloVerde(this.valor)) {
//       this.nivel_de_riesgo = "Riesgo Aceptable";
//     } else if (this.calcularIntervaloAmarillo(this.valor)) {
//       this.nivel_de_riesgo = "Riesgo Tolerable";
//     } else if (this.calcularIntervaloNaranja(this.valor)) {
//       this.nivel_de_riesgo = "Riesgo Alto";
//     } else if (this.calcularIntervaloRojo(this.valor)) {
//       this.nivel_de_riesgo = "Riesgo Extremo";
//     } else {
//       enviar = false; // Si no se puede determinar el nivel de riesgo, no enviar los datos
//       alert("UPS, EL CALCULO NO SE PUDO REALIZAR, porque el nivel de riesgo no se puede determinar.");
//     }
//   } else {
//     enviar = false; // Si no se han seleccionado la probabilidad y el impacto, no enviar los datos
//     alert("Debe seleccionar la probabilidad y el impacto");
//   }

//   if (enviar) {
//     const formdata = new FormData(e.target);

//     const dominio = formdata.get("dominio");
//     const objetivo = formdata.get("objetivo");
//     const control = formdata.get("control");

//     const datos = {
//       nombre_evento: formdata.get("nombre_evento"),
//       probabilidad: formdata.get("probabilidad"),
//       impacto: formdata.get("impacto"),
//       valor: this.valor,
//       nivel_riesgo: this.nivel_de_riesgo,
//       id_matriz : this.datosMatriz.id_matriz,
//       dominio: dominio,
//       objetivo: objetivo,
//       control: control,

//     }
//     console.log("datos ", datos);
  


//   const url = import.meta.env.NG_APP_API + "/eventos";
//   this.api.postApi(url, datos).subscribe(
//     {
//       next: (data) => {
//         Swal.fire(
//         {
//           icon: "success",
//           title: "Exito",
//           text: "Se ha guardado los datos correctamente",
//         }
        
//         ).then(() => {
//           this.Completado.emit(true);
//           this.cerrarBotonRef.nativeElement.click();
//           e.target.reset(); 
//         });
//       },
//       error: (error) => {
//         console.log(error);
//         alert("Error al enviar los datos");
//       }
//     }
//   )
// }
// }




}




 


  /* -------------------------------------------------------------------------------------------------------------------------------------------- */


