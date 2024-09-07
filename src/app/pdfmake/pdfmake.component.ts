import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdfmake',
  standalone: true,
  imports: [],
  templateUrl: './pdfmake.component.html',
  styleUrl: './pdfmake.component.css',
})
export class PdfmakeComponent {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.jalarImagen();
  }

  base64data: any;

  jalarImagen() {
    // Carga la imagen desde los assets
    this.http
      .get('../assets/img/logodatatronica.png', { responseType: 'blob' })
      .subscribe((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.base64data = reader.result as string;
        };
      });
  }

  generatePdf() {
    const pdfDefinition: any = {
      content: [
        {
          columns: [
            {
              image: this.base64data, // Asumiendo que `this.base64data` contiene tu imagen base64
              width: 150,
            },
            {
              stack: [
                {},
                { text: 'Celular : 942710264 - 959414940', alignment: 'right' },
                { text: 'www.datatronicaperu.com', alignment: 'right' },
              ],
              style: 'header',
              alignment: 'right',
              width: '*', // Ancho automático
            },
          ],
        },
        {
          style: 'tableExample',
          margin: [0, 10, 0, 10], // Añade margen superior
          table: {
            headerRows: 1,
            widths: [81, '*', 81], // Anchuras de las columnas: 200 para la primera y última, automático (*) para la segunda
            body: [
              [
                { text: '', style: 'tableHeader', alignment: 'center' },
                {
                  stack: [
                    {
                      text: 'CENTRO DE SERVICIOS AUTORIZADOS',
                      style: 'tableHeader',
                      alignment: 'center',
                      margin: [0, 0, 0, 5],
                    },
                    {
                      text: 'FORMATO DE CONFORMIDAD DE SERVICIOS',
                      style: 'tableHeader',
                      alignment: 'center',
                    },
                  ],
                  alignment: 'center',
                },
                {
                  text: 'O.S: 5125779178ASFFFFFFFFFFFFFFFF',
                  style: 'tableHeader',
                  alignment: 'center',
                },
              ],
              [
                {
                  text: 'INFORMACION GENERAL',
                  style: 'tableHeader',
                  alignment: 'center',
                  colSpan: 3,
                },
                {},
                {},
              ],
              [
                {
                  text: 'CLIENTE / EMPRESA:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: 'MARCO ISRAEL CALDERON GARCIA',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: 'CEL: 950566962',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, true, true],
                },
              ],
              [
                {
                  text: 'DNI / RUC:	',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: '1071244326',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: '',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                },
              ],
              [
                {
                  text: 'DIRECCION:	',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: 'CAHUIDE 741 , LA BANDA DE SHILCAYO , SAN MARTIN , SAN MARTIN',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: '',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                },
              ],
              [
                {
                  text: 'TIPO DE SERVICIO:	',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: 'PARTICULAR',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: '',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                },
              ],
              [
                {
                  text: 'TECNICO RESPONSABLE:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: 'VICTOR HUGO BRAVO GARCIA ',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: '',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                },
              ],
              [
                {
                  text: 'INFORMACION EQUIPO	',
                  style: 'tableHeader',
                  alignment: 'center',
                  colSpan: 3,
                },
                {},
                {},
              ],
              [
                {
                  text: 'MARCA:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: 'EPSON ',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: '',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                },
              ],
              [
                {
                  text: 'TIPO EQUIPO:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: 'EPSON TKSAKHGAG ',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: '',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                },
              ],
              [
                {
                  text: 'MODELO:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: 'EASFSAFSAPSON ',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: '',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                },
              ],
              [
                {
                  text: 'SERIE:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: 'EASFSAFSAPSOSASAFN ',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, false, true],
                },
                {
                  text: '',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                },
              ],
              [
                {
                  text: 'FALLAS:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Sed viverra, ipsum at facilisis suscipit, magna felis vestibulum nunc, at egestas turpis urna nec sapien. Praesent vehicula tortor in libero euismod, sed tincidunt eros lobortis. Nam eget arcu ut nulla laoreet tincidunt. Curabitur sit amet enim vel magna ultricies faucibus a a elit. Integer pretium, libero sed tristique efficitur, tortor mi interdum libero, sed tempor odio urna a erat. Etiam at bibendum erat. Nulla facilisi. Pellentesque convallis ligula at nibh luctus, vel tincidunt libero fringilla.
`,
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                  colSpan: 2,
                },
                {},
              ],
              [
                {
                  text: 'REPUESTOS:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Sed viverra, ipsum at facilisis suscipit, magna felis vestibulum nunc, at egestas turpis urna nec sapien. Praesent vehicula tortor in libero euismod, sed tincidunt eros lobortis. Nam eget arcu ut nulla laoreet tincidunt. Curabitur sit amet enim vel magna ultricies faucibus a a elit. Integer pretium, libero sed tristique efficitur, tortor mi interdum libero, sed tempor odio urna a erat. Etiam at bibendum erat. Nulla facilisi. Pellentesque convallis ligula at nibh luctus, vel tincidunt libero fringilla.
`,
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                  colSpan: 2,
                },
                {},
              ],
              [
                {
                  text: 'DIAGNOSTICO:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Sed viverra, ipsum at facilisis suscipit, magna felis vestibulum nunc, at egestas turpis urna nec sapien. Praesent vehicula tortor in libero euismod, sed tincidunt eros lobortis. Nam eget arcu ut nulla laoreet tincidunt. Curabitur sit amet enim vel magna ultricies faucibus a a elit. Integer pretium, libero sed tristique efficitur, tortor mi interdum libero, sed tempor odio urna a erat. Etiam at bibendum erat. Nulla facilisi. Pellentesque convallis ligula at nibh luctus, vel tincidunt libero fringilla.
`,
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                  colSpan: 2,
                },
                {},
              ],
              [
                {
                  text: 'DESARROLLO:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Sed viverra, ipsum at facilisis suscipit, magna felis vestibulum nunc, at egestas turpis urna nec sapien. Praesent vehicula tortor in libero euismod, sed tincidunt eros lobortis. Nam eget arcu ut nulla laoreet tincidunt. Curabitur sit amet enim vel magna ultricies faucibus a a elit. Integer pretium, libero sed tristique efficitur, tortor mi interdum libero, sed tempor odio urna a erat. Etiam at bibendum erat. Nulla facilisi. Pellentesque convallis ligula at nibh luctus, vel tincidunt libero fringilla.
                  `,
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                  colSpan: 2,
                },
                {},
              ],
              [
                {
                  text: 'PRUEBAS DE CALIDAD:',
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [true, true, false, true],
                },
                {
                  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Sed viverra, ipsum at facilisis suscipit, magna felis vestibulum nunc, at egestas turpis urna nec sapien. Praesent vehicula tortor in libero euismod, sed tincidunt eros lobortis. Nam eget arcu ut nulla laoreet tincidunt. Curabitur sit amet enim vel magna ultricies faucibus a a elit. Integer pretium, libero sed tristique efficitur, tortor mi interdum libero, sed tempor odio urna a erat. Etiam at bibendum erat. Nulla facilisi. Pellentesque convallis ligula at nibh luctus, vel tincidunt libero fringilla.
                  `,
                  style: 'tableHeader',
                  alignment: 'left',
                  border: [false, true, true, true],
                  colSpan: 2,
                },
                {},
              ],
              [
                {
                  text: 'OBSERVACIONES Y/O RECOMENDACIONES',
                  style: 'tableHeader',
                  alignment: 'center',
                  colSpan: 3,
                },
                {},
                {},
              ],
              [
                {
                  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Sed viverra, ipsum at facilisis suscipit, magna felis vestibulum nunc, at egestas turpis urna nec sapien. Praesent vehicula tortor in libero euismod, sed tincidunt eros lobortis. Nam eget arcu ut nulla laoreet tincidunt. Curabitur sit amet enim vel magna ultricies faucibus a a elit. Integer pretium, libero sed tristique efficitur, tortor mi interdum libero, sed tempor odio urna a erat. Etiam at bibendum erat. Nulla facilisi. Pellentesque convallis ligula at nibh luctus, vel tincidunt libero fringilla.
                  `,
                  style: 'tableHeader',
                  alignment: 'center',
                  colSpan: 3,
                },
                {},
                {},
              ],
              // Agrega más filas según sea necesario
            ],
          },
        },
        {
          columns: [
            {
              stack: [
                { text: 'Fecha Inicio : 10/02/2024', alignment: 'left' },
              ],
              style: 'header',
              alignment: 'right',
              width: '*', // Ancho automático
            },
            {
              stack: [
                { text: 'Fecha Fin : 10/02/2024', alignment: 'right' },
              ],
              style: 'header',
              alignment: 'right',
              width: '*', // Ancho automático
            },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 7,
          bold: true,
        },
        customStyle: {
          fontSize: 7,
          bold: true,
          color: '#4a4a4a',
        },
        tableHeader: {
          bold: true,
          fontSize: 7,
          color: 'black',
          alignment: 'center',
          // Añadido para alinear al centro si es necesario
        },
        tableData: {
          fontSize: 7,
          color: 'black',
        },
      },
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
