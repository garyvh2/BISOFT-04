
function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], {type: contentType});
    }
    else {
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    }
}
var imgBase64;
$('#SubirFoto').change(function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(event) {
        var base64 = reader.result;

        //$('#base64').attr('value', base64);
        var blob = dataURLToBlob(base64);
        var formData = new FormData();
        formData.append('file', blob);

        $.ajax({
            url: '/echo/json/',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'text',
            success: function(response) {
                $('#result').text(response);
            }
        });
        imgBase64 = base64;
    }
});



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

  /*//Se caputura la posicion una vez termina el arrastrado
  google.maps.event.addListener(gmMarcador, 'dragend', function (evt) {
      //Se declara una variable para capturar la latitud y longitud de el marcador
      var gmLatLng = this.position;
      //Se almacena la latitud en una variable
      nLatitud = gmLatLng.lat();
      //Se almacena la longitud en una variable
      nLongitud = gmLatLng.lng();

      var geocoder = new google.maps.Geocoder;

      geocoder.geocode({'location': gmLatLng}, function(results, status) {

        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var gmContenido = '<h2>' + results[2].formatted_address + '</h2>' + '<p>' + gmLatLng + '</p>';
            gmVentanaInformacion = new google.maps.InfoWindow({
              content: gmContenido
            });
            gmNuevoMarcador = new google.maps.Marker({
              //Se establece la posicion del marcador
              position: gmLatLng,
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
            gmVentanaInformacion.open(gmMapa, gmMarcador);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
  });*/
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




//Declaracion de los arreglos de todas las tiendas
var  aIdTiendas              = [];
var  aNombreTiendas          = [];
var  aTelefonoTiendas        = [];
var  aCorreoTiendas          = [];
var  aProvinciaTiendas       = [];
var  aCantonTiendas          = [];
var  aDistritoTiendas        = [];
var  aImpuestoVentasTiendas  = [];
var  aImpuestoValorTiendas   = [];
var  aTipoTiendas            = [];
var  aLatitudTiendas         = [];
var  aLongitudTiendas        = [];
var  aEstadoTiendas          = [];
var  aIdAdministrador        = [];
var  aLogoTienda             = [];

/* Almacenar los valores en cada uno de los arreglos correspondientes */
/*******************************************************

    Declaracion de elementos

*******************************************************/
//document.getElementById("txtId").value = localStorage.getItem['id_tienda'];
if(localStorage.getItem('id_tiendas_CU5').length != null) {
   aIdTiendas =              JSON.parse(localStorage.getItem('id_tiendas_CU5'));
   aNombreTiendas =          JSON.parse(localStorage.getItem('nombre_tiendas_CU5'));
   aTelefonoTiendas =        JSON.parse(localStorage.getItem('telefono_tiendas_CU5'));
   aCorreoTiendas =          JSON.parse(localStorage.getItem('correo_tiendas_CU5'));
   aProvinciaTiendas =       JSON.parse(localStorage.getItem('provincia_tiendas_CU5'));
   aCantonTiendas =          JSON.parse(localStorage.getItem('canton_tiendas_CU5'));
   aDistritoTiendas =        JSON.parse(localStorage.getItem('distrito_tiendas_CU5'));
   aImpuestoVentasTiendas =  JSON.parse(localStorage.getItem('impuesto_venta_tiendas_CU5'));
   aImpuestoValorTiendas =   JSON.parse(localStorage.getItem('impuesto_valor_tiendas_CU5'));
   aTipoTiendas =            JSON.parse(localStorage.getItem('tipo_tiendas_CU5'));
   aLatitudTiendas=          JSON.parse(localStorage.getItem('latitud_tiendas_CU5'));
   aLongitudTiendas=         JSON.parse(localStorage.getItem('longitud_tiendas_CU5'));
   aEstadoTiendas=           JSON.parse(localStorage.getItem('estado_tiendas_CU5'));
   aIdAdministrador=         JSON.parse(localStorage.getItem('id_administrador_CU5'));
   aLogoTienda=              JSON.parse(localStorage.getItem('logo_tienda_CU5'));

}




function funcionRegistarTienda () {
  /*******************************************************

      Declaracion de elementos

  *******************************************************/
  //Declaracion del elemento de texto para el id
  //var elTxtId =         document.querySelector('#txtId');
  var eltxtCedulaJuridica =         document.querySelector('#txtCedulaJuridica');
  //Declaracion del elemento de texto para el nombre
  var elTxtNombre =         document.querySelector('#txtNombreTienda');
  //Declaracion del elemento de texto para el telefono
  var elTxtTelefono =       document.querySelector('#txtTelefonoTienda');
  //Declaracion del elemento de texto para el correo
  var elTxtCorreo =         document.querySelector('#txtCorreoTienda');
  //Declaracion del elemento de texto para el provincia
  var elTxtProvincia =      document.querySelector('#txtProvinciaTienda');
  //Declaracion del elemento de texto para el canton
  var elTxtCanton =         document.querySelector('#txtCantonTienda');
  //Declaracion del elemento de texto para el distrito
  var elTxtDistrito =       document.querySelector('#txtDistritoTienda');
  //Declaracion del elemento de texto para el impuesto de ventas
  var elTxtImpuestoVentas = document.querySelector('#txtImpuestoVentaTienda');
  //Declaracion del elemento de texto para el impuesto de valor agregado
  var elTxtImpuestoValor =  document.querySelector('#txtImpuestoValorTienda');
  //Declaracion del elemento de drop down list combo box para el tipo
  var elCbxTipo =           document.querySelector('#txtTipoTienda');
  /*******************************************************

      Declaracion de elementos

  *******************************************************/
  //Declaracion del valor correspondiente a su elemento
  //var nvId =          Number(elTxtId.value);
  var nCedula =       Number(eltxtCedulaJuridica.value);
  //Declaracion del valor correspondiente a su elemento
  var sNombre =         elTxtNombre.value;
  //Declaracion del valor correspondiente a su elemento
  var nTelefono =       Number(elTxtTelefono.value);
  //Declaracion del valor correspondiente a su elemento
  var sCorreo =         elTxtCorreo.value;
  //Declaracion del valor correspondiente a su elemento
  var sProvincia =      elTxtProvincia.value;
  //Declaracion del valor correspondiente a su elemento
  var sCanton =         elTxtCanton.value;
  //Declaracion del valor correspondiente a su elemento
  var sDistrito =       elTxtDistrito.value;
  //Declaracion del valor correspondiente a su elemento
  var nImpuestoVenta =  Number(elTxtImpuestoVentas.value);
  //Declaracion del valor correspondiente a su elemento
  var nImpuestoValor =  Number(elTxtImpuestoValor.value);
  //Declaracion del valor correspondiente a su elemento
  var sTipo =           elCbxTipo.value;


 registrar(nCedula,sNombre,nTelefono,sCorreo,sProvincia,sCanton,sDistrito,nImpuestoVenta,nImpuestoValor,sTipo,nLatitud,nLongitud);
 return false;
}


function registrar (nCedula,sNombre,nTelefono,sCorreo,sProvincia,sCanton,sDistrito,nImpuestoVenta,nImpuestoValor,sTipo,nLatitud,nLongitud) {
  //localStorage.clear(); para limpiar el valor

  //Auto generated ID
   aIdTiendas.push(nCedula);
   aNombreTiendas.push(sNombre);
   aTelefonoTiendas.push(nTelefono);
   aCorreoTiendas.push(sCorreo);
   aProvinciaTiendas.push(sProvincia);
   aCantonTiendas.push(sCanton);
   aDistritoTiendas.push(sDistrito);
   aImpuestoVentasTiendas.push(nImpuestoVenta);
   aImpuestoValorTiendas.push(nImpuestoValor);
   aTipoTiendas.push(sTipo);
   aLatitudTiendas.push(nLatitud);
   aLongitudTiendas.push(nLongitud);
   aEstadoTiendas.push(1);
   aIdAdministrador.push(JSON.parse(sessionStorage.getItem('id_administrador_registrar_tienda')));
   aLogoTienda.push(imgBase64);


  /********************************************************
    El metodo JSON.stringify nos permite convertir un arreglo en texto.
  ********************************************************/
  localStorage.setItem('id_tiendas_CU5' ,             JSON.stringify( aIdTiendas));
  localStorage.setItem('nombre_tiendas_CU5',          JSON.stringify( aNombreTiendas));
  localStorage.setItem('telefono_tiendas_CU5',        JSON.stringify( aTelefonoTiendas));
  localStorage.setItem('correo_tiendas_CU5',          JSON.stringify( aCorreoTiendas));
  localStorage.setItem('provincia_tiendas_CU5',       JSON.stringify( aProvinciaTiendas));
  localStorage.setItem('canton_tiendas_CU5',          JSON.stringify( aCantonTiendas));
  localStorage.setItem('distrito_tiendas_CU5',        JSON.stringify( aDistritoTiendas));
  localStorage.setItem('impuesto_venta_tiendas_CU5',  JSON.stringify( aImpuestoVentasTiendas));
  localStorage.setItem('impuesto_valor_tiendas_CU5',  JSON.stringify( aImpuestoValorTiendas));
  localStorage.setItem('tipo_tiendas_CU5',            JSON.stringify( aTipoTiendas));
  localStorage.setItem('latitud_tiendas_CU5',         JSON.stringify( aLatitudTiendas));
  localStorage.setItem('longitud_tiendas_CU5',        JSON.stringify( aLongitudTiendas));
  localStorage.setItem('estado_tiendas_CU5',          JSON.stringify( aEstadoTiendas));
  localStorage.setItem('id_administrador_CU5',        JSON.stringify( aIdAdministrador));
  localStorage.setItem('logo_tienda_CU5',             JSON.stringify( aLogoTienda));
  sessionStorage.removeItem('id_administrador_registrar_tienda');

  swal({
    title: "La información fue ingresada correctamente",
    text: "Los datos de la tienda han sido actualizados.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "green",
		confirmButtonText: "Continuar",
		closeOnConfirm: false
	},
		function(isConfirm){
			window.location = "iniciarSesion.html";
		});


}
