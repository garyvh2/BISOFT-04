
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

var elFotoPerfilInformacion = document.querySelector("#Foto");
if (elFotoPerfilInformacion) {
  elFotoPerfilInformacion.style.backgroundColor = "#fff";
  elFotoPerfilInformacion.style.backgroundImage = "url(" + sessionStorage.getItem("sesion_logo_tienda_CU5") + ")";
  elFotoPerfilInformacion.style.backgroundRepeat  = "no-repeat";
}







var aIdListaEvento=[]; //Se auto genera
var aIdAsociadoEvento=[]; //Se jala de session
var aIdTipoEvento=[]; //Se escoge en una lista o en combo box
var aIdTiendaLista=[]; //Se escoge en una lista
var aNombreEvento=[];
var aFechaEvento=[]; //Se agrega en un formulario
var aEnvio=[]; //Se agrega en un formulario
var aLatitudListaEvento=[]; //Se obtiene del mapa
var aLongitudListaEvento=[]; //Se obtiene del mapa
var aEstadoListaEventos=[]; //Se obtiene del mapa



if(localStorage.getItem("id_lista_evento_CU8") !=null){
  aIdListaEvento=       JSON.parse(localStorage.getItem('id_lista_evento_CU8')); //Se auto genera
  aIdAsociadoEvento=    JSON.parse(localStorage.getItem('id_asociado_evento_CU8')); //Se jala de session
  aIdTipoEvento=        JSON.parse(localStorage.getItem('id_tipo_evento_CU8')); //Se escoge en una lista o en combo box
  aIdTiendaLista=       JSON.parse(localStorage.getItem('id_tienda_evento_CU8')); //Se escoge en una lista
  aNombreEvento=        JSON.parse(localStorage.getItem('nombre_evento_CU8'));;
  aFechaEvento=         JSON.parse(localStorage.getItem('fecha_evento_CU8')); //Se agrega en un formulario
  aEnvio=               JSON.parse(localStorage.getItem('envio_evento_CU8')); //Se agrega en un formulario
  aLatitudListaEvento=  JSON.parse(localStorage.getItem('latitud_evento_CU8')); //Se obtiene del mapa
  aLongitudListaEvento= JSON.parse(localStorage.getItem('longitud_evento_CU8')); //Se obtiene del mapa
  aEstadoListaEventos = JSON.parse(localStorage.getItem('estado_lista_evento'));
}



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

  var nIdListaEvento = getParameterByName("idEvento");
  var idListaEventoLength = aIdListaEvento.length;
  for (var i = 0; i < idListaEventoLength; i++) {
    if (aIdListaEvento[i] == nIdListaEvento) {
      nLatitud = aLatitudListaEvento[i];
      nLongitud = aLongitudListaEvento[i];
    }
  }
  //Se agregan las opciones al mapa
  gmMapa.setOptions(gmOpcionesMapa);
  //Se setea un marcador con una ubicacion por defecto
  gmMarcador = new google.maps.Marker({
      //Se agrega la posicion en San Jose
      position: new google.maps.LatLng(nLatitud, nLongitud)//,
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


function checkboxEnvio (el) {
  var elFechaCaducidad = document.querySelector('#mapWrapper');
  if (el.checked == true) {
    elFechaCaducidad.classList.remove("MapaOculto");
  }
  else {
    elFechaCaducidad.classList.add("MapaOculto");
  }
}


function validar(){
	/*variables para los elemnetos del formulario*/


	var txtNombreEvento=document.querySelector('#txtNombreEvento');
  var txtFechaEvento=document.querySelector('#txtFechaEvento');
  var txtTipoEvento=document.querySelector('#txtTipoEvento');
  var chkEnvio=document.querySelector('#chkEnvio');



	/*Variables para los valores que esten dentro de cada uno de
	los elementos del formulario*/

	var sNombreEvento=txtNombreEvento.value;
  var dFechaEvento=txtFechaEvento.value;
  var nTipoEvento=txtTipoEvento.value;
  var bEnvio=chkEnvio.checked;



  registrar(sNombreEvento,dFechaEvento,nTipoEvento,bEnvio);
  return false;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

cargarComboBox ();

function cargarComboBox () {
  //Proveedores
  if(localStorage.getItem('id_evento_CU7') != null){

    aIdEvento = JSON.parse(localStorage.getItem('id_evento_CU7'));
    aNombreTipoEvento = JSON.parse(localStorage.getItem('nombre_evento_CU7'));
    aDescripcionEvento = JSON.parse(localStorage.getItem('descripcion_evento_CU7'));
    aDescuento = JSON.parse(localStorage.getItem('descuento_CU7'));
    aImagenEvento= JSON.parse(localStorage.getItem('imagen_evento_CU7'));
    aEstadoEvento= JSON.parse(localStorage.getItem('estado_evento_CU7'));
    aIdTienda= JSON.parse(localStorage.getItem('id_tienda_CU7'));

    var nLength = aIdTienda.length;
  }
  var nIdListaEvento = getParameterByName("idEvento");
  var idListaEventoLength = aIdEvento.length;
  var idTiendaEventoComboBox;
  for (var i = 0; i < idListaEventoLength; i++) {
    if (aIdListaEvento[i] == nIdListaEvento) {
      var idTiendaEventoComboBox = aIdTiendaLista[i];
    }
  }
  var elSelectProvedorProducto = document.querySelector("#txtTipoEvento");
  for (var i = 0; i < nLength; i++) {
      var option = document.createElement('option');
        option.setAttribute("value", aIdEvento[i]);
        var nodoDeTexto = document.createTextNode(aNombreTipoEvento[i]);
      option.appendChild(nodoDeTexto);
      elSelectProvedorProducto.appendChild(option);

  }
  var TipoEvento = getParameterByName('eventoTienda');
  elSelectProvedorProducto.value = TipoEvento;
}



CargarInformacion();
function CargarInformacion () {
  //Informacion evento"
  var nIdListaEvento = getParameterByName("idEvento");
  var idListaEventoLength = aIdListaEvento.length;

	var txtNombreEvento=document.querySelector('#txtNombreEvento');
  var txtFechaEvento=document.querySelector('#txtFechaEvento');
  var txtTipoEvento=document.querySelector('#txtTipoEvento');
  var chkEnvio=document.querySelector('#chkEnvio');

  for (var i = 0; i < idListaEventoLength; i++) {
    if (aIdListaEvento[i] == nIdListaEvento) {
      txtNombreEvento.value = aNombreEvento[i];
      txtFechaEvento.value  = aFechaEvento[i];
      txtTipoEvento.value   = aIdTipoEvento[i];
      chkEnvio.checked      = aEnvio[i];


    }
  }
  //Productos en tienda
  var elTablaListaDeProductosTBody = document.querySelector("#TablaListaDeProductos tbody");
  /*Creación de los arreglos*/
  var aIdTienda = [];
  var aIdProducto = [];
  var aNombreProducto = [];
  var aDescripcionProducto = [];
  var aPrecioProductoSinImpuesto = [];
  var aMarcaProducto = [];
  var aProvedorProducto = [];
  var aCantidadProducto = [];
  var aTipoProducto = [];
  var aEstadoProducto = [];
  var aImagenProducto = [];


  var IdProductoEnLista=[];
  var CantidadProductoEnLista=[];
  var EstadoProductoEnLista=[];
  var IdListaDeProductosEvento=[];



  /* Almacenar los valores en cada uno de los arreglos correspondientes */
  /*******************************************************

      Declaracion de elementos

  *******************************************************/

  if(localStorage.getItem('ids_producto_CU6') != null){

    aIdTienda = JSON.parse(localStorage.getItem('ids_tienda_CU6'));
    aIdProducto = JSON.parse(localStorage.getItem('ids_producto_CU6'));
    aNombreProducto = JSON.parse(localStorage.getItem('nombre_producto_CU6'));
    aDescripcionProducto = JSON.parse(localStorage.getItem('descripcion_producto_CU6'));
    aPrecioProductoSinImpuesto = JSON.parse(localStorage.getItem('precio_producto_sin_impuesto_CU6'));
    aMarcaProducto = JSON.parse(localStorage.getItem('marca_producto_CU6'));
    aProvedorProducto = JSON.parse(localStorage.getItem('provedor_producto_CU6'));
    aCantidadProducto = JSON.parse(localStorage.getItem('cantidad_producto_CU6'));
    aTipoProducto = JSON.parse(localStorage.getItem('tipo_producto_CU6'));
    aEstadoProducto= JSON.parse(localStorage.getItem('estado_producto_CU6'));
    aImagenProducto= JSON.parse(localStorage.getItem('imagen_producto_CU6'));

  }


  IdProductoEnLista= JSON.parse(localStorage.getItem('id_producto_en_lista'));
  CantidadProductoEnLista= JSON.parse(localStorage.getItem('cantidad_producto_en_lista'));
  EstadoProductoEnLista=JSON.parse(localStorage.getItem('estado_producto_en_lista'));
  IdListaDeProductosEvento= JSON.parse(localStorage.getItem('id_lista_de_productos_evento'));

  nLength = IdProductoEnLista.length;
  for (var i = 0; i < nLength; i++) {
    if (IdListaDeProductosEvento[i] == nIdListaEvento) {
      var elFila = document.createElement('tr');
      var ProductoEnLista = IdProductoEnLista[i];

      var elCeldaCodigoProducto = document.createElement('td');
        var txtCodigoProducto = document.createTextNode(IdProductoEnLista[i]);
      var elCeldaEstadoProducto = document.createElement('td');
        var txtEstadoProducto = document.createTextNode(EstadoProductoEnLista[i]);
      var elCeldaCantidadProducto = document.createElement('td');
        var txtCantidadProducto = document.createTextNode(CantidadProductoEnLista[i]);
      //Dentro de for
      var elCeldaNombreProducto = document.createElement('td');
        var txtNombreProducto;
      var elCeldaMarcaProducto = document.createElement('td');
        var txtMarcaProducto;
      var elCeldaPrecioProducto = document.createElement('td');
        var txtPrecioProducto;

      var ProductoLength = aIdProducto.length;
      for (var e = 0; e < ProductoLength; e++) {
        if (aIdProducto[e] == ProductoEnLista) {
          txtNombreProducto = document.createTextNode(aNombreProducto[e]);
          txtMarcaProducto = document.createTextNode(aMarcaProducto[e]);
          txtPrecioProducto = document.createTextNode(aPrecioProductoSinImpuesto[e]);
        }
      }
      elCeldaCodigoProducto.appendChild(txtCodigoProducto);
      elCeldaEstadoProducto.appendChild(txtEstadoProducto);
      elCeldaCantidadProducto.appendChild(txtCantidadProducto);
      elCeldaNombreProducto.appendChild(txtNombreProducto);
      elCeldaMarcaProducto.appendChild(txtMarcaProducto);
      elCeldaPrecioProducto.appendChild(txtPrecioProducto);

      elFila.appendChild(elCeldaCodigoProducto);
      elFila.appendChild(elCeldaNombreProducto);
      elFila.appendChild(elCeldaMarcaProducto);
      elFila.appendChild(elCeldaPrecioProducto);
      elFila.appendChild(elCeldaCantidadProducto);
      elFila.appendChild(elCeldaEstadoProducto);

      elTablaListaDeProductosTBody.appendChild(elFila);
    }
  }



}

var elchkEnvio = document.querySelector("#chkEnvio");
checkboxEnvio(elchkEnvio);
