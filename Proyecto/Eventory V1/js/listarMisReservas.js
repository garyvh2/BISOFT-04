
function CerrarSesion () {
  sessionStorage.clear();
  window.location='iniciarSesion.html';
}
function IrAlPerfil () {
  if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
    window.location='perfilCliente.html';
  } else {
    window.location='perfilUsuario.html';
  }
}




elFotoPefil = document.querySelector("#BotonMenuUsuario div");
elFotoPefil.style.backgroundImage = "url(" + sessionStorage.getItem("sesion_foto_perfil") + ")";
elFotoPefil.style.backgroundRepeat  = "no-repeat";

var elNombreUsuario = document.querySelector("#BotonMenuUsuario h2");
elNombreUsuario.innerHTML = sessionStorage.getItem("sesion_primer_nombre") + " " + sessionStorage.getItem("sesion_primer_apellido");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
}
var today = yyyy+'-'+mm+'-'+dd;

llenarLista();

//Cuando el usuario seleccione una tienda debera almacenar el id en session


function llenarLista () {
  var elUlListaTiendas = document.querySelector("#ListaMisListas");

  var IdReserva          = [];
  var IdProductoReserva  = [];
  var IdListaReserva     = [];
  var IdUsuarioReserva    = [];
  var CantidadReserva    = [];
  var EstadoReserva    = [];
  if (localStorage.getItem('id_reserva') != null) {
    IdReserva=          JSON.parse(localStorage.getItem('id_reserva'));
    IdProductoReserva=  JSON.parse(localStorage.getItem('id_producto_reserva'));
    IdListaReserva=     JSON.parse(localStorage.getItem('id_lista_reserva'));
    IdUsuarioReserva=   JSON.parse(localStorage.getItem('id_usuario_reserva'));
    CantidadReserva=    JSON.parse(localStorage.getItem('cantidad_reserva'));
    EstadoReserva=      JSON.parse(localStorage.getItem('estado_reserva'));
  }

  if(localStorage.getItem("id_lista_evento_CU8") !=null){
    var aIdListaEvento=       JSON.parse(localStorage.getItem('id_lista_evento_CU8')); //Se auto genera
    var aIdAsociadoEvento=    JSON.parse(localStorage.getItem('id_asociado_evento_CU8')); //Se jala de session
    var aIdTipoEvento=        JSON.parse(localStorage.getItem('id_tipo_evento_CU8')); //Se escoge en una lista o en combo box
    var aIdTiendaLista=       JSON.parse(localStorage.getItem('id_tienda_evento_CU8')); //Se escoge en una lista
    var aNombreEvento=        JSON.parse(localStorage.getItem('nombre_evento_CU8'));;
    var aFechaEvento=         JSON.parse(localStorage.getItem('fecha_evento_CU8')); //Se agrega en un formulario
    var aEnvio=               JSON.parse(localStorage.getItem('envio_evento_CU8')); //Se agrega en un formulario
    var aLatitudListaEvento=  JSON.parse(localStorage.getItem('latitud_evento_CU8')); //Se obtiene del mapa
    var aLongitudListaEvento= JSON.parse(localStorage.getItem('longitud_evento_CU8')); //Se obtiene del mapa
    var aEstadoListaEventos = JSON.parse(localStorage.getItem('estado_lista_evento'));
  }


  var aIdProducto = [];
  var aNombreProducto = [];

  if(localStorage.getItem('ids_producto_CU6') != null){
    aIdProducto = JSON.parse(localStorage.getItem('ids_producto_CU6'));
    aNombreProducto = JSON.parse(localStorage.getItem('nombre_producto_CU6'));
  }

  var FechaHoy = new Date(today.replace(/-/g, '\/'));

  var arrayLength = IdReserva.length;

  for (var i = 0; i < arrayLength; i++) {
    if (IdUsuarioReserva[i] == sessionStorage.getItem("sesion_cedula_cliente")) {

      var elLink = document.createElement('a');
        elLink.setAttribute("onclick", "CargarLista(this.value)");
        elLink.value = IdListaReserva[i];
        var elLiTienda = document.createElement('li');

          var elNombreEvento = document.createElement('h2');
          var arrayIdEventoLength = aIdListaEvento.length;
          for (var e = 0; e < arrayIdEventoLength; e++) {
            if (aIdListaEvento[e] == IdListaReserva[i]) {
              //Titulo del evento
                var txtNombreEvento = document.createTextNode(aNombreEvento[e]);
                elNombreEvento.appendChild(txtNombreEvento);
            }
          }
          var divEstado = document.createElement('div');

          var aIdListaEvento=       JSON.parse(localStorage.getItem('id_lista_evento_CU8'));
          var aEstadoListaEventos = JSON.parse(localStorage.getItem('estado_lista_evento'));
          for (var v = 0; v < aIdListaEvento.length; v++) {
            if (aIdListaEvento[v] == IdListaReserva[i]) {
              if (aEstadoListaEventos[v] == 0) {
                EstadoReserva[i] = 0;
              }
            }
          }
          localStorage.setItem('estado_reserva', JSON.stringify(EstadoReserva));

          var EstadoReservaActual;
          if (EstadoReserva[i] == 1) {
            divEstado.style.backgroundImage = "url(imgs/wait.png)";
            EstadoReservaActual = "Su reserva se encuentra activa";
          } else if (EstadoReserva[i] == 0) {
            divEstado.style.backgroundImage = "url(imgs/error.png)";
            EstadoReservaActual = "La fecha del evento ha pasado";
          } else if (EstadoReserva[i] == 2) {
            divEstado.style.backgroundImage = "url(imgs/success.png)";
            EstadoReservaActual = "La compra se ha realizado";
          }
          var elEstadoReservaActual = document.createElement('h3');
            var txtEstadoReservaActual = document.createTextNode(EstadoReservaActual);
            elEstadoReservaActual.appendChild(txtEstadoReservaActual);
          //Codigo de lista
          var elCodigoEvento = document.createElement('h3');
            var txtCodigoEvento = document.createTextNode("Su codigo es " + IdReserva[i]);
            elCodigoEvento.appendChild(txtCodigoEvento);

          var elEstadoEventoTexto = document.createElement('h4');
          var arrayaIdProductoLength = aIdProducto.length;
          for (var e = 0; e < arrayaIdProductoLength; e++) {
            if (aIdProducto[e] == IdProductoReserva[i]) {
              //Estado de lista texto
                var txtEstadoEventoTexto = document.createTextNode("El producto es " + aNombreProducto[e]);
                  elEstadoEventoTexto.appendChild(txtEstadoEventoTexto);
            }
          }
          //Fecha evento
          var elFechaEvento = document.createElement('h4');
            var txtFechaEvento = document.createTextNode("Cantidad reservada " + CantidadReserva[i]);
            elFechaEvento.appendChild(txtFechaEvento);

          elLiTienda.appendChild(elNombreEvento);
          elLiTienda.appendChild(divEstado);
          elLiTienda.appendChild(elEstadoReservaActual);
          elLiTienda.appendChild(elCodigoEvento);
          elLiTienda.appendChild(elEstadoEventoTexto);
          elLiTienda.appendChild(elFechaEvento);

          elLink.appendChild(elLiTienda);

          elUlListaTiendas.appendChild(elLink);
    }
  }
}
function CargarLista (idEvento) {
  if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
    window.location = "buscarListas.html?idEvento=" + idEvento;
  } else {
    window.location = "buscarListasAdmin.html?idEvento=" + idEvento;
  }
}
