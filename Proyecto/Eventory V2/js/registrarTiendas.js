/****************************************************************************
  Autor: Diego Mendez Leon
  Fecha de creacion: 27/07/2016
  Fecha de modificacion: 08/08/2016
  EVENTORY APP
  2016
  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.
*****************************************************************************/
//Se declara la latitud y longitud global
var nLatitud, nLongitud, sDireccion, gmMarcador, gmMapa, gmVentanaInformacion;
//Funcion llamada por API para inicializar el mapa
function funcionInicializarMapa () {

  //Se crea una instancia para el mapa
  gmMapa = new google.maps.Map(document.querySelector('#mapa'), {
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
  gmMarcador = new google.maps.Marker({
      //Se agrega la posicion en San Jose
      position: new google.maps.LatLng(9.935, -84.092)//,
      //Se habilita el arratre del marcador
      //draggable: true
  });
  //Se centra el mapa en la posicion del marcador
  gmMapa.setCenter(gmMarcador.position);
  //Se coloca el marcador en el mapa
  gmMarcador.setMap(gmMapa);
  //Se obtiene una latitud y longitud por defecto
  nLatitud = gmMarcador.position.lat();
  nLongitud = gmMarcador.position.lng();


  //Se agrega un evento para cuando se realiza un click en el mapa, de manera que el marcador se mueva a esa ubicacion
  google.maps.event.addListener(gmMapa, 'click', function(event) {
    gmNuevoMarcador = new google.maps.Marker({
      //Se establece la posicion del marcador
      position: event.latLng,
      //Se establece el mapa donde se ubicara el marcador
      map: gmMapa,
      //Se establece la animacion del marcador
      animation: google.maps.Animation.DROP
    });
    //Si no existe un marcador se le asigna el valor del actual sino entonces es actualizado
    if (gmMarcador != undefined){
      gmMarcador.setMap(null);
    }
    gmMarcador = gmNuevoMarcador;
    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({'location': event.latLng}, function(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var gmContenido = '<h2>' + results[1].formatted_address + '</h2>' + '<p>' + event.latLng + '</p>';
          var gmVentanaInformacion = new google.maps.InfoWindow({
            content: gmContenido
          });
          gmVentanaInformacion.open(gmMapa, gmMarcador);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    //Se almacena la latitud en una variable
    nLatitud = event.latLng.lat();
    //Se almacena la longitud en una variable
    nLongitud = event.latLng.lng();
  });
}

function validar(vThis){
/*Variables para los elementos del formulario*/

  var eltxtCedulaJuridica = document.querySelector('#txtCedulaJuridica');
  var elTxtNombre         = document.querySelector('#txtNombreTienda');
  var elTxtTelefono       = document.querySelector('#txtTelefonoTienda');
  var elTxtCorreo         = document.querySelector('#txtCorreoTienda');
  var elTxtProvincia      = document.querySelector('#txtProvinciaTienda');
  var elTxtCanton         = document.querySelector('#txtCantonTienda');
  var elTxtDistrito       = document.querySelector('#txtDistritoTienda');
  var elTxtImpuestoVentas = document.querySelector('#txtImpuestoVentaTienda');
  var elCbxTipo           = document.querySelector('#txtTipoTienda');

/*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

  var nCedula        = Number(eltxtCedulaJuridica.value);
  var sImagePath;
  var sNombre        = elTxtNombre.value;
  var nTelefono      = Number(elTxtTelefono.value);
  var sCorreo        = elTxtCorreo.value;
  var sProvincia     = elTxtProvincia.value;
  var sCanton        = elTxtCanton.value;
  var sDistrito      = elTxtDistrito.value;
  var nImpuestoVenta = Number(elTxtImpuestoVentas.value);
  var sTipo          = elCbxTipo.value;
  var nidAdmin       = getParameterByName("idAdmin");

  $.ajax({
    url         : "services/imageUploader.php?path=../imgs/uploads/logo_tienda/",
    type        : "POST",
    data        : new FormData(vThis),
    contentType : false,
    cache       : false,
    processData : false,
    async: false,
    timeout: 30000,

    success: function(data) {
        sImagePath = data.replace('../','');
      },
      error: function(request, cerror) {
        alert(cerror);
      }
  });

  registrar(nCedula,sImagePath,sNombre,nTelefono,sCorreo,sProvincia,sCanton,sDistrito,nImpuestoVenta,sTipo,nLatitud,nLongitud,nidAdmin);

  return false;
}

function registrar (pnCedula,sImagePath,psNombre,pnTelefono,psCorreo,psProvincia,psCanton,psDistrito,pnImpuestoVenta,psTipo,pnLatitud,pnLongitud,pidAdmin) {
  var estado =1;
  var peticion = $.ajax({
    url: "services/registrarTienda.php",
    type: "post",
    data: {
      'nCedula'        :pnCedula,
      'sLogoTienda'    :sImagePath,
      'sNombre'        :psNombre,
      'nTelefono'      :pnTelefono,
      'sCorreo'        :psCorreo,
      'sProvincia'     :psProvincia,
      'sCanton'        :psCanton,
      'sDistrito'      :psDistrito,
      'nImpuestoVenta' :pnImpuestoVenta,
      'sTipo'          :psTipo,
      'nLatitud'       :pnLatitud,
      'nLongitud'      :pnLongitud,
      'nEstado'        :estado,
      'nIdAdmin'       :pidAdmin
    },

    //dataType: 'json',

    success: function(response) {
      swal({
        title: "La información fue ingresada correctamente",
        text: "Los datos de la tienda han sido ingresados.",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "green",
        confirmButtonText: "Continuar",
        closeOnConfirm: false
      },
        function(isConfirm){
          window.location = "iniciarSesion.html";
        });
    },
    error: function(request, error) {
      alert(error);
    }
  });

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
