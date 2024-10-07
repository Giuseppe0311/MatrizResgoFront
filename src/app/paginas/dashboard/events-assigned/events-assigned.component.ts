import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {PeticionesapiService} from "../../../services/peticionesapi.service";
import {ToastRef, ToastrService} from "ngx-toastr";
import {NgClass} from "@angular/common";
import {timeout} from "rxjs";
import {HttpParams} from "@angular/common/http";
@Component({
  selector: 'app-events-assigned',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './events-assigned.component.html',
  styleUrl: './events-assigned.component.css'
})
export class EventsAssignedComponent implements OnInit{
  constructor(private token:AuthService,private apiService:PeticionesapiService,private  toastrf: ToastrService) {}
  idUsuario: string | null = null;
  datos: any[] = [];
  iaIsLoading = false;
  analisisGenerado = false;
  labelButtonIa = 'Generar análisis IA';
  ngOnInit() {
    if (this.token.getDecodedToken() && this.token.getSubject()) {
      this.idUsuario = this.token.getSubject();
    }
    this.getEventosofUsuarid();
  }
  getEventosofUsuarid(){
    if (this.idUsuario!=null) {
      const url = import.meta.env.NG_APP_API + `/eventos/serach-by-user/${this.idUsuario}`;
      this.apiService.getApi(url).subscribe({
        next: data => {
          this.toastrf.success('Datos cargados correctamente');
          this.datos = this.organizeByCompanyAndMatrix(data);
          console.log(this.datos);
        },
        error: error => {
          this.toastrf.error('Error al cargar los datos');
        }
      })
    }else{
      this.toastrf.error('Error al cargar los datos , usuario null');
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
  organizeByCompanyAndMatrix(data: any[]) {
    return data.reduce((acc, evento) => {
      const { nombreEmpresa, nombreMatriz } = evento;

      let empresa = acc.find(e => e.nombreEmpresa === nombreEmpresa);
      if (!empresa) {
        empresa = { nombreEmpresa, matrices: [] };
        acc.push(empresa);
      }

      let matriz = empresa.matrices.find(m => m.nombreMatriz === nombreMatriz);
      if (!matriz) {
        matriz = { nombreMatriz, eventos: [] };
        empresa.matrices.push(matriz);
      }

      // Agregar propiedades de estado para cada evento
      evento.mostrarAnalisisIA = false;
      evento.iaIsLoading = false;
      evento.analisisGenerado = false;
      evento.labelButtonIa = 'Generar análisis IA';

      matriz.eventos.push(evento);
      return acc;
    }, []);
  }


  regenerarAnalisisIA(eventos) {
    // Resetea los estados necesarios
    eventos.iaIsLoading = true;
    eventos.analisisGenerado = false;
    eventos.labelButtonIa = 'Generando análisis...';

    // Llama nuevamente a la función que genera el análisis
    this.generarAnalisisIA(eventos);
  }

  generarAnalisisIA(evento: any) {
    evento.mostrarAnalisisIA = true;
    evento.iaIsLoading = true;
    evento.labelButtonIa = 'Análisis en proceso...';

    const url = import.meta.env.NG_APP_API + `/ia`;

    // Crear los query params utilizando HttpParams
    let params = new HttpParams()
      .set('event', evento.nombre)
      .set('riskLevel', evento.nivelRiesgo)
      .set('probability', this.probabilidadLabels[evento.probabilidad])
      .set('impact', this.impactoLabels[evento.impacto])
      .set('value', evento.valor);

    // Llamar a la API usando getApi con los query params
    this.apiService.getApi(url, params).subscribe({
      next: (data) => {
        evento.iaIsLoading = false;
        evento.analisisGenerado = true;
        evento.labelButtonIa = 'Análisis generado';
        this.toastrf.success('Análisis generado correctamente');
        console.log('Análisis IA generado:', data); // Para depuración
        evento.analisisIA = {
          analisis: data.analisis,
          dominio: data.dominio,
          objetivo: data.objetivo,
          control: data.control
        };
      },
      error: (error) => {
        evento.iaIsLoading = false;
        evento.labelButtonIa = 'Generar análisis IA';
        this.toastrf.error('Error al generar el análisis');
        console.error('Error al generar el análisis IA:', error); // Para depuración
      }
    });
  }
}
