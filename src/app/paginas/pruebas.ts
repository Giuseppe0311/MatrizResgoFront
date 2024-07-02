
// if (this.probabilidad && this.impacto) {
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
//     } else if (this.calcularIntervaloAmarrillo(this.valor)) {
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