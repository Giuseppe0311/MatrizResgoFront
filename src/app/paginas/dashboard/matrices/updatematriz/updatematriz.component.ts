import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PeticionesapiService } from '../../../../services/peticionesapi.service';
import Swal from 'sweetalert2';
import * as jwt from 'jwt-decode';
import { initFlowbite } from 'flowbite';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatematriz',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './updatematriz.component.html',
  styleUrl: './updatematriz.component.css',
})
export class UpdatematrizComponent {
  @Output() Finalizado = new EventEmitter<boolean>();
  @Input() idMatriz: number = 0;
  constructor(private api: PeticionesapiService) {}

  idusuario: number = 0;
  showModalCreateEvent: boolean = false;
  showModalUpdateEvent: boolean = false;
  idMatrizCreada: number = 0;
  dataMatriz: any[] = [];
  datosEvento: any[] = [];
  ngOnInit(): void {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   const decodedToken = jwt.jwtDecode(token) as any
    //   this.idusuario = decodedToken.sub;
    // }
    // else{
    //   window.location.href = "/";
    // }

    this.getDataApi();
  }

  getDataApi() {
    const url = import.meta.env.NG_APP_API + '/matrices/' + this.idMatriz;
    this.api.getApi(url).subscribe({
      next: (data) => {
        this.dataMatriz = data;
        this.datosEvento = data.eventos;
        this.nombreMatriz = data.nombre;
        this.valor_muy_alta = data.muyAlta;
        this.valor_alta = data.alta;
        this.valor_media = data.media;
        this.valor_baja = data.baja;
        this.valor_muy_baja = data.muyBaja;
        this.valor_minima = data.minima;
        this.valor_menor = data.menor;
        this.valor_moderada = data.moderada;
        this.valor_mayor = data.mayor;
        this.valor_maxima = data.maxima;

        this.valor_aceptable_a = data.aVerde;
        this.valor_aceptable_de = data.deVerde;
        this.valor_tolerable_a = data.aAmarillo;
        this.valor_tolerable_de = data.deAmarillo;
        this.valor_alto_a = data.aNaranja;
        this.valor_alto_de = data.deNaranja;
        this.valor_extremo_a = data.aRojo;
        this.valor_extremo_de = data.deRojo;

        this.datosRecolectadoyResultados();
        this.datosRecolectadosColores(this.valor_aceptable_de, 'aceptable_de');
        this.datosRecolectadosColores(this.valor_aceptable_a, 'aceptable_a');
        this.datosRecolectadosColores(this.valor_tolerable_de, 'tolerable_de');
        this.datosRecolectadosColores(this.valor_tolerable_a, 'tolerable_a');
        this.datosRecolectadosColores(this.valor_alto_de, 'alto_de');
        this.datosRecolectadosColores(this.valor_alto_a, 'alto_a');
        this.datosRecolectadosColores(this.valor_extremo_de, 'extremo_de');
        this.datosRecolectadosColores(this.valor_extremo_a, 'extremo_a');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /*DATOS ACTUALIZAR */
  nombreMatriz: string = '';

  /* VALORES DE RIESGO */
  nombreEvento: string = '';
  probabilidadEvento: string = '';
  impactoEvento: string = '';
  valorEvento: number = 0;
  nivelRiesgoEvento: string = '';

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

  actualizarValor(value: number, input: string) {
    if (input === 'minima') {
      this.valor_minima = value;
    } else if (input === 'menor') {
      this.valor_menor = value;
    } else if (input === 'moderada') {
      this.valor_moderada = value;
    } else if (input === 'mayor') {
      this.valor_mayor = value;
    } else if (input === 'maxima') {
      this.valor_maxima = value;
    } else if (input === 'muy_alta') {
      this.valor_muy_alta = value;
    } else if (input === 'alta') {
      this.valor_alta = value;
    } else if (input === 'media') {
      this.valor_media = value;
    } else if (input === 'baja') {
      this.valor_baja = value;
    } else if (input === 'muy_baja') {
      this.valor_muy_baja = value;
    }

    // Actualiza los cálculos, dependiendo del valor modificado
    this.datosRecolectadoyResultados();
  }

  datosRecolectadoyResultados() {
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

  datosRecolectadosColores(valor: number, input: string) {
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
      this.intervalor_color_verde = [
        this.valor_aceptable_de,
        this.valor_aceptable_a,
      ];
    } else {
      this.intervalor_color_verde = []; // Limpiar el intervalo si falta algún valor
    }
    if (this.valor_tolerable_de && this.valor_tolerable_a) {
      this.intervalor_color_amarillo = [
        this.valor_tolerable_de,
        this.valor_tolerable_a,
      ];
    } else {
      this.intervalor_color_amarillo = []; // Limpiar el intervalo si falta algún valor
    }
    if (this.valor_alto_de && this.valor_alto_a) {
      this.intervalor_color_naranja = [this.valor_alto_de, this.valor_alto_a];
    } else {
      this.intervalor_color_naranja = []; // Limpiar el intervalo si falta algún valor
    }
    if (this.valor_extremo_de && this.valor_extremo_a) {
      this.intervalor_color_rojo = [
        this.valor_extremo_de,
        this.valor_extremo_a,
      ];
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
    return (
      valor >= this.intervalor_color_verde[0] &&
      valor <= this.intervalor_color_verde[1]
    );
  }

  calcularIntervaloAmarrillo(valor: number): boolean {
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

  /* -------------------------------------------------------------------------------------------------------------------------------------------- */

  probabilidad: string = '';
  impacto: string = '';

  agarrarValorProbabilidad(e: any) {
    this.probabilidad = e.target.value;
    // console.log(this.probabilidad);
  }
  agarrarValorImpacto(e: any) {
    this.impacto = e.target.value;
    // console.log(this.impacto);
  }

  valor: number = 0;
  nivel_de_riesgo: string = '';

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
      if (
        !this.calcularIntervaloVerde(resultado) &&
        !this.calcularIntervaloAmarrillo(resultado) &&
        !this.calcularIntervaloNaranja(resultado) &&
        !this.calcularIntervaloRojo(resultado)
      ) {
        return false;
      }
    }
    return true;
  }

  // ----------------------------------------------------------------------------------------------------------------------------

  //  CUADRO  DE EVENTOS

  abrirCrearEvento() {
    this.showModalCreateEvent = !this.showModalCreateEvent;
  }
  abrirUpdateEvento() {
    this.showModalUpdateEvent = !this.showModalUpdateEvent;
  }
  enviarDatosEvento(e: any) {
    e.preventDefault();

    const formdata = new FormData(e.target);
    this.probabilidad = formdata.get('probabilidad') as string;
    this.impacto = formdata.get('impacto') as string;

    if (this.probabilidad && this.impacto) {
      this.calcularValor(this.probabilidad, this.impacto);
    } else {
      alert('Debe seleccionar la probabilidad y el impacto');
      return;
    }

    if (!this.validarIntervalos()) {
      Swal.fire({
        icon: 'warning',
        title: 'Alerta Validacion',
        text: 'No debe dejar espacios grises en la matriz',
      });
      return;
    }

   
    const datos = {
      nombre: formdata.get('evento'),
      probabilidad: this.probabilidad,
      impacto: this.impacto,
      valor: this.valor,
      nivelRiesgo: this.nivel_de_riesgo,
      idMatriz: this.idMatriz,
    };
    //guardar el evento
    const url = import.meta.env.NG_APP_API + '/eventos';
    this.api.postApi(url, datos).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Se ha guardado los datos correctamente',
        }).then(() => {
          this.getDataApi();
          this.showModalCreateEvent = false;
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No Se ha guardado los datos correctamente',
        });
      },
    });
  }
  calcularValor(probabilidad: string, impacto: string): void {
    if (probabilidad === '0' && impacto === '0') {
      this.valor = this.valor_muy_alta * this.valor_minima;
    } else if (probabilidad === '1' && impacto === '0') {
      this.valor = this.valor_alta * this.valor_minima;
    } else if (probabilidad === '2' && impacto === '0') {
      this.valor = this.valor_media * this.valor_minima;
    } else if (probabilidad === '3' && impacto === '0') {
      this.valor = this.valor_baja * this.valor_minima;
    } else if (probabilidad === '4' && impacto === '0') {
      this.valor = this.valor_muy_baja * this.valor_minima;
    } else if (probabilidad === '0' && impacto === '1') {
      this.valor = this.valor_muy_alta * this.valor_menor;
    } else if (probabilidad === '1' && impacto === '1') {
      this.valor = this.valor_alta * this.valor_menor;
    } else if (probabilidad === '2' && impacto === '1') {
      this.valor = this.valor_media * this.valor_menor;
    } else if (probabilidad === '3' && impacto === '1') {
      this.valor = this.valor_baja * this.valor_menor;
    } else if (probabilidad === '4' && impacto === '1') {
      this.valor = this.valor_muy_baja * this.valor_menor;
    } else if (probabilidad === '0' && impacto === '2') {
      this.valor = this.valor_muy_alta * this.valor_moderada;
    } else if (probabilidad === '1' && impacto === '2') {
      this.valor = this.valor_alta * this.valor_moderada;
    } else if (probabilidad === '2' && impacto === '2') {
      this.valor = this.valor_media * this.valor_moderada;
    } else if (probabilidad === '3' && impacto === '2') {
      this.valor = this.valor_baja * this.valor_moderada;
    } else if (probabilidad === '4' && impacto === '2') {
      this.valor = this.valor_muy_baja * this.valor_moderada;
    } else if (probabilidad === '0' && impacto === '3') {
      this.valor = this.valor_muy_alta * this.valor_mayor;
    } else if (probabilidad === '1' && impacto === '3') {
      this.valor = this.valor_alta * this.valor_mayor;
    } else if (probabilidad === '2' && impacto === '3') {
      this.valor = this.valor_media * this.valor_mayor;
    } else if (probabilidad === '3' && impacto === '3') {
      this.valor = this.valor_baja * this.valor_mayor;
    } else if (probabilidad === '4' && impacto === '3') {
      this.valor = this.valor_muy_baja * this.valor_mayor;
    } else if (probabilidad === '0' && impacto === '4') {
      this.valor = this.valor_muy_alta * this.valor_maxima;
    } else if (probabilidad === '1' && impacto === '4') {
      this.valor = this.valor_alta * this.valor_maxima;
    } else if (probabilidad === '2' && impacto === '4') {
      this.valor = this.valor_media * this.valor_maxima;
    } else if (probabilidad === '3' && impacto === '4') {
      this.valor = this.valor_baja * this.valor_maxima;
    } else if (probabilidad === '4' && impacto === '4') {
      this.valor = this.valor_muy_baja * this.valor_maxima;
    }
  
    // Determinación del nivel de riesgo
    if (this.calcularIntervaloVerde(this.valor)) {
      this.nivel_de_riesgo = 'Riesgo Aceptable';
    } else if (this.calcularIntervaloAmarrillo(this.valor)) {
      this.nivel_de_riesgo = 'Riesgo Tolerable';
    } else if (this.calcularIntervaloNaranja(this.valor)) {
      this.nivel_de_riesgo = 'Riesgo Alto';
    } else if (this.calcularIntervaloRojo(this.valor)) {
      this.nivel_de_riesgo = 'Riesgo Extremo';
    } else {
      alert('UPS, EL CALCULO NO SE PUDO REALIZAR, porque el nivel de riesgo no se puede determinar.');
    }
  }
  updateDatosEvento(e: any) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    this.probabilidad = formdata.get('probabilidad') as string;
    this.impacto = formdata.get('impacto') as string;
    if (this.probabilidad && this.impacto) {
      this.calcularValor(this.probabilidad, this.impacto);
    } else {
      alert('Debe seleccionar la probabilidad y el impacto');
      return;
    }
    if (!this.validarIntervalos()) {
      Swal.fire({
        icon: 'warning',
        title: 'Alerta Validacion',
        text: 'No debe dejar espacios grises en la matriz',
      });
      return;
    }

    const datos = {
      nombre: formdata.get('evento'),
      probabilidad: this.probabilidad,
      impacto: this.impacto,
      valor: this.valor,
      nivelRiesgo: this.nivel_de_riesgo,
    };

    //llamar a la api para actualizar el evento
    this.api
      .putApi(
        import.meta.env.NG_APP_API + '/eventos/' + this.idEventoActualizar,
        datos
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se ha actualizado el evento correctamente',
          }).then(() => {
            this.getDataApi();
            this.showModalUpdateEvent = false;
          });
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha actualizado el evento correctamente',
          });
        },
      });

    this.showModalUpdateEvent = false;
  }
  quitarEvento(id: number) {
    // Mostrar confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llama a la API para eliminar el evento
        this.api
          .deleteApi(import.meta.env.NG_APP_API + '/eventos/' + id)
          .subscribe({
            next: (data) => {
              Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha eliminado el evento correctamente',
              }).then(() => {
                this.getDataApi(); // Recargar la lista de eventos
              });
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el evento',
              });
            },
          });
      }
    });
  }
  idEventoActualizar: number = 0;
  actualizarEvento(id: number) {
    //lllamar a la api para actualizar el evento
    this.api.getApi(import.meta.env.NG_APP_API + '/eventos/' + id).subscribe({
      next: (data) => {
        this.nombreEvento = data.nombre;
        this.probabilidadEvento = data.probabilidad;
        this.idEventoActualizar = data.id;
        this.impactoEvento = data.impacto;
      },
      error: (error) => {
      },
    });
    this.abrirUpdateEvento();
  }
  crearEvento() {
    alert('Evento creado');
  }

  // ----------------------------------------------------------------------------------------------------------------------------

  enviarDatos(e: any) {
    e.preventDefault();

    if (!this.validarIntervalos()) {
      Swal.fire({
        icon: 'warning',
        title: 'Alerta Validacion',
        text: 'No debe dejar espacios grises',
      });
      return;
    }

    let enviar = true; // Variable para controlar si se deben enviar los datos

    if (enviar) {
      const formdata = new FormData(e.target);
      const datos = {
        nombre: formdata.get('nombre_matriz'),
        minima: this.valor_minima,
        menor: this.valor_menor,
        moderada: this.valor_moderada,
        mayor: this.valor_mayor,
        maxima: this.valor_maxima,
        muyAlta: this.valor_muy_alta,
        alta: this.valor_alta,
        media: this.valor_media,
        baja: this.valor_baja,
        muyBaja: this.valor_muy_baja,
        deVerde: this.intervalor_color_verde[0],
        aVerde: this.intervalor_color_verde[1],
        deAmarillo: this.intervalor_color_amarillo[0],
        aAmarillo: this.intervalor_color_amarillo[1],
        deNaranja: this.intervalor_color_naranja[0],
        aNaranja: this.intervalor_color_naranja[1],
        deRojo: this.intervalor_color_rojo[0],
        aRojo: this.intervalor_color_rojo[1],
        idUsuario: this.idusuario,
      };


      const url = import.meta.env.NG_APP_API + '/matrices/'+this.idMatriz;
      this.api.putApi(url, datos).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se ha guardado los datos correctamente',
          }).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No Se ha guardado los datos correctamente',
          });
        },
      });
    }
  }
  probabilidadLabels: { [key: string]: string } = {
    '0': 'Muy Alta',
    '1': 'Alta',
    '2': 'Media',
    '3': 'Baja',
    '4': 'Muy Baja',
  };
  impactoLabels: { [key: string]: string } = {
    '0': 'Mínima',
    '1': 'Menor',
    '2': 'Moderada',
    '3': 'Mayor',
    '4': 'Máxima',
  };
  cerrarModal() {
    this.Finalizado.emit(false);
  }
}
