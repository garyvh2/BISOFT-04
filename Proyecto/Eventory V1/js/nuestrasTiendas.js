
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










var elFotoPefil = document.querySelector("#BotonMenuUsuario div");
if (elFotoPefil) {
  elFotoPefil.style.backgroundImage = "url(" + sessionStorage.getItem("sesion_foto_perfil") + ")";
  elFotoPefil.style.backgroundRepeat  = "no-repeat";
}

var elNombreUsuario = document.querySelector("#BotonMenuUsuario h2");
if (elNombreUsuario) {
  if (sessionStorage.length != 0) {
    elNombreUsuario.innerHTML = sessionStorage.getItem("sesion_primer_nombre") + " " + sessionStorage.getItem("sesion_primer_apellido");
  }
}





var elementoSelecionado;

llenarLista();

//Cuando el usuario seleccione una tienda debera almacenar el id en session


function llenarLista () {
  var elUlListaTiendas = document.querySelector("#ListaDeTiendas");



  var aIdTiendas =              JSON.parse(localStorage.getItem('id_tiendas_CU5'));
  var aNombreTiendas =          JSON.parse(localStorage.getItem('nombre_tiendas_CU5'));
  var aTelefonoTiendas =        JSON.parse(localStorage.getItem('telefono_tiendas_CU5'));
  var aCorreoTiendas =          JSON.parse(localStorage.getItem('correo_tiendas_CU5'));
  var aProvinciaTiendas =       JSON.parse(localStorage.getItem('provincia_tiendas_CU5'));
  var aCantonTiendas =          JSON.parse(localStorage.getItem('canton_tiendas_CU5'));
  var aDistritoTiendas =        JSON.parse(localStorage.getItem('distrito_tiendas_CU5'));
  var aImpuestoVentasTiendas =  JSON.parse(localStorage.getItem('impuesto_venta_tiendas_CU5'));
  var aImpuestoValorTiendas =   JSON.parse(localStorage.getItem('impuesto_valor_tiendas_CU5'));
  var aTipoTiendas =            JSON.parse(localStorage.getItem('tipo_tiendas_CU5'));
  var aLatitudTiendas=          JSON.parse(localStorage.getItem('latitud_tiendas_CU5'));
  var aLongitudTiendas=         JSON.parse(localStorage.getItem('longitud_tiendas_CU5'));
  var aEstadoTiendas=           JSON.parse(localStorage.getItem('estado_tiendas_CU5'));
  var aIdAdministrador=         JSON.parse(localStorage.getItem('id_administrador_CU5'));
  var aLogoTienda=              JSON.parse(localStorage.getItem('logo_tienda_CU5'));

  var arrayLength = aIdTiendas.length;

  for (var i = 0; i < arrayLength; i++) {
      var elLink = document.createElement('a');
        var elLiTienda = document.createElement('li');

          var divImagen = document.createElement('div');
          divImagen.id = 'ImagenMapa';
          if (aLogoTienda[i] != null) {
            divImagen.style.backgroundImage = "url(" + String(aLogoTienda[i]) + ")";
          }
          elLiTienda.appendChild(divImagen);

          var elH2Nombre = document.createElement('h2');
          elH2Nombre.innerHTML = aNombreTiendas[i];

          var elH3Direccion = document.createElement('h4');
          elH3Direccion.innerHTML = aDistritoTiendas[i] + " " + aCantonTiendas[i] + " " + aProvinciaTiendas[i];
          var elH3Correo = document.createElement('h4');
          elH3Correo.innerHTML = aCorreoTiendas[i];
          var elH3Telefono = document.createElement('h4');
          elH3Telefono.innerHTML = "Tel: " + aTelefonoTiendas[i];

          var divMapa = document.createElement('div');
          divMapa.id = 'mapa' + String(i);
          divMapa.setAttribute('latitud', aLatitudTiendas[i]);
          divMapa.setAttribute('longitud', aLongitudTiendas[i]);
          divMapa.setAttribute('onclick', 'window.open("http://maps.google.es/?q=' + aLatitudTiendas[i] + "%20" + aLongitudTiendas[i] +'")');

          elLiTienda.appendChild(divImagen);
          elLiTienda.appendChild(elH2Nombre);
          elLiTienda.appendChild(elH3Direccion);
          elLiTienda.appendChild(elH3Correo);
          elLiTienda.appendChild(elH3Telefono);
          elLiTienda.appendChild(divMapa);
          elLink.appendChild(elLiTienda);

          elUlListaTiendas.appendChild(elLink);
  }
}
function IrATienda (idTienda) {
  if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
    window.location = "listarTiposEvento.html?idTienda=" + idTienda;
  } else {
    window.location = "listarTiposEventoAdmin.html?idTienda=" + idTienda;
  }

}



  //Funcion llamada por API para inicializar el mapa
  function funcionInicializarMapa () {
    var elMapas = document.querySelectorAll('#ListaDeTiendas a li');
    for (var i = 0; i < elMapas.length; i++) {
      var elMapa = document.querySelector('#mapa' + String(i));
      //Se crea una instancia para el mapa
      var gmMapa = new google.maps.Map(document.querySelector('#mapa' + String(i)), {
          //Se establece el zoom
          zoom: 16,
          //Se centra el mapa a una ubicacion
          center: new google.maps.LatLng(9.935, -84.092),
          //Se establece el tipo del mapa
          mapTypeId: google.maps.MapTypeId.HYBRID
      });
      //Se agregan opciones al mapa
      var gmOpcionesMapa = {
        //Se establece el zoom maximo
        maxZoom:20,
        //Se establece el zoom minimo
        minZoom:14,
        //Se deshabilita el uso de stree view
        streetViewControl: false,
        //Se deshabilita el control del tipo de mapa
        mapTypeControl: false
      }
      //Se agregan las opciones al mapa
      gmMapa.setOptions(gmOpcionesMapa);

      //Se setea un marcador con una ubicacion por defecto
      var gmMarcador = new google.maps.Marker({
          //Se agrega la posicion en San Jose
          position: new google.maps.LatLng(elMapa.getAttribute('latitud'), elMapa.getAttribute('longitud'))//,
          //Se habilita el arratre del marcador
          //draggable: true
      });
      //Se centra el mapa en la posicion del marcador
      gmMapa.setCenter(gmMarcador.position);
      //Se coloca el marcador en el mapa
      gmMarcador.setMap(gmMapa);
    }
  }
