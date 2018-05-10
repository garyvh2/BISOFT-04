
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






var elementoSelecionado;

llenarLista();

//Cuando el usuario seleccione una tienda debera almacenar el id en session

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function llenarLista () {
  var elUlListaEventos = document.querySelector("#ListaDeTiposEvento");
  var IdTienda = getParameterByName('idTienda');



  var aIdEvento =               JSON.parse(localStorage.getItem('id_evento_CU7'));
  var aNombreEvento =           JSON.parse(localStorage.getItem('nombre_evento_CU7'));
  var aDescripcionEvento =      JSON.parse(localStorage.getItem('descripcion_evento_CU7'));
  var aDescuento =              JSON.parse(localStorage.getItem('descuento_CU7'));
  var aImagenEvento=            JSON.parse(localStorage.getItem('imagen_evento_CU7'));
  var aEstadoEvento=            JSON.parse(localStorage.getItem('estado_evento_CU7'));
  var aIdTienda=                JSON.parse(localStorage.getItem('id_tienda_CU7'));

  var arrayLength = aIdEvento.length;

  for (var i = 0; i < arrayLength; i++) {
    if (aIdTienda[i] == IdTienda) {
      var elLink = document.createElement('a');
        elLink.setAttribute("onclick", "IrARegistrar(this.value)");
        elLink.value = aIdEvento[i];
        var elLiEvento = document.createElement('li');
          var elImagenEvento = document.createElement('div');
          if (aImagenEvento[i] != null) {
            elImagenEvento.style.backgroundImage = "url(" + String(aImagenEvento[i]) + ")";
          }
          elImagenEvento.id = 'ImagenEvento';

          var elH2NombreEvento = document.createElement('h2');
          elH2NombreEvento.innerHTML = aNombreEvento[i];

          var elH4DescripcionEvento = document.createElement('h4');
          elH4DescripcionEvento.innerHTML = aDescripcionEvento[i];

          elLiEvento.appendChild(elImagenEvento);
          elLiEvento.appendChild(elH2NombreEvento);
          elLiEvento.appendChild(elH4DescripcionEvento);

          elLink.appendChild(elLiEvento);

          elUlListaEventos.appendChild(elLink);
    }
  }
}

function IrARegistrar (idEvento) {
  if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
    window.location = "registrarListaEvento.html?eventoTienda=" + idEvento + "&idTienda=" + getParameterByName('idTienda');
  } else {
    window.location = "registrarListaEventoAdmin.html?eventoTienda=" + idEvento + "&idTienda=" + getParameterByName('idTienda');
  }
}
