/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);

  },
  
  editarPregunta: function(preguntaEditada, id) {
    if(preguntaEditada) {
      this.modelo.editarPregunta(preguntaEditada, id);
    }
  },

  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },

  borrarTodo: function() {
    this.modelo.borrarTodo();
  }
  
};
