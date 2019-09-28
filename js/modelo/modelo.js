/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.respuestaVotada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var ultimoId = 0;
    for (var i = 0; i < this.preguntas.length; i++) {
      if(this.preguntas[i].id > ultimoId) {
        ultimoId = this.preguntas[i].id;
      }
    }
    return ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  editarPregunta: function(preguntaEditada, id) {
    var preguntaAEditar = this.preguntas.find(function(pregunta) {
      return pregunta.id === id;
    });

    if(preguntaAEditar) {
      preguntaAEditar.textoPregunta = preguntaEditada;
      this.guardar();
      this.preguntaEditada.notificar();
    }
  },

  borrarPregunta: function(id) {
    this.preguntas = this.preguntas.filter(function(pregunta){
      return pregunta.id !== id;
    });
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodo: function() {
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada) {
    var preguntaVotada = this.preguntas.find(function(pregunta) {
      return pregunta.textoPregunta === nombrePregunta;
    });
    var respuestaVotada = preguntaVotada.cantidadPorRespuesta.find(function(clave) {
      return clave.textoRespuesta === respuestaSeleccionada;
    });

    respuestaVotada.cantidad ++;
    console.log(respuestaVotada);

    this.guardar();
    this.respuestaVotada.notificar();

  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  }
};
