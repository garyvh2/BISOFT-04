
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
  var FechaHoy = new Date(today.replace(/-/g, '\/'));

  var arrayLength = aIdListaEvento.length;

  for (var i = 0; i < arrayLength; i++) {
    if (aIdAsociadoEvento[i] == sessionStorage.getItem("sesion_cedula_cliente")) {

      var elLink = document.createElement('a');
        elLink.setAttribute("onclick", "CargarLista(this.value)");
        elLink.value = aIdListaEvento[i];
        var elLiTienda = document.createElement('li');
          //Titulo del evento
          var elNombreEvento = document.createElement('h2');
            var txtNombreEvento = document.createTextNode(aNombreEvento[i]);
            elNombreEvento.appendChild(txtNombreEvento);
          //Estado del evento
          var elEstadoEvento = document.createElement('div');
          var FechaEventoIntacta = aFechaEvento[i];
          var FechaEvento = new Date(aFechaEvento[i].replace(/-/g, '\/'));


          var TextoEstadoEvento;

          if (FechaHoy <= FechaEvento) {
            if (aEstadoListaEventos[i] == 0) {
              elEstadoEvento.style.backgroundImage = "url(imgs/wait.png)";
              TextoEstadoEvento = "Su lista se encuentra en proceso";
            } else if (aEstadoListaEventos[i] == 1) {
              elEstadoEvento.style.backgroundImage = "url(imgs/success.png)";
              TextoEstadoEvento = "Su lista se encuentra activa";
            }
          } else {
            elEstadoEvento.style.backgroundImage = "url(imgs/error.png)";
            TextoEstadoEvento = "La fecha del evento ha pasado";
            aEstadoListaEventos[i] = 2;
          }
          localStorage.setItem('estado_lista_evento', JSON.stringify(aEstadoListaEventos));
          //Codigo de lista
          var elCodigoEvento = document.createElement('h3');
            var txtCodigoEvento = document.createTextNode("Su codigo es " + aIdListaEvento[i]);
            elCodigoEvento.appendChild(txtCodigoEvento);
          //Estado de lista texto
          var elEstadoEventoTexto = document.createElement('h4');
            var txtEstadoEventoTexto = document.createTextNode(TextoEstadoEvento);
            elEstadoEventoTexto.appendChild(txtEstadoEventoTexto);
          //Fecha evento
          var elFechaEvento = document.createElement('h4');
            var txtFechaEvento = document.createTextNode("La fecha del evento es " + FechaEventoIntacta);
            elFechaEvento.appendChild(txtFechaEvento);

          elLiTienda.appendChild(elNombreEvento);
          elLiTienda.appendChild(elEstadoEvento);
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
    window.location = "modificarListaEvento.html?idEvento=" + idEvento;
  } else {
    window.location = "modificarListaEventoAdmin.html?idEvento=" + idEvento;
  }
}
function CrearLista () {
  if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
    window.location = "listarTiendas.html";
  } else {
    window.location = "listarTiendasAdmin.html";
  }
}
