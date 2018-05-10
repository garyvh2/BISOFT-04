
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


var elTipoUsuarioInformacionPerfil = document.querySelector("#TipoUsuarioInformacionPerfil");
if (elTipoUsuarioInformacionPerfil) {
  var tipoUsuario;
  if (sessionStorage.getItem("sesion_tipo_usuario") == 2){
    tipoUsuario = "Serv. al cliente"
  }
  if (sessionStorage.getItem("sesion_tipo_usuario") == 3){
    tipoUsuario = "Cajero"
  }
  if (sessionStorage.getItem("sesion_tipo_usuario") == 1){
    tipoUsuario = "Administrador"
  }
  elTipoUsuarioInformacionPerfil.innerHTML = tipoUsuario;
}
var elTiendaInformacionPerfil = document.querySelector("#TiendaInformacionPerfil");
if (elTiendaInformacionPerfil) {
  elTiendaInformacionPerfil.innerHTML = sessionStorage.getItem("sesion_nombre_tiendas_CU5");
}
var elNombreUsuario = document.querySelector("#BotonMenuUsuario h2");
if (elNombreUsuario) {
  elNombreUsuario.innerHTML = sessionStorage.getItem("sesion_primer_nombre") + " " + sessionStorage.getItem("sesion_primer_apellido");
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

    var nLength = aIdTienda.length
  }
  var elSelectProvedorProducto = document.querySelector("#txtTipoEvento");
  for (var i = 0; i < nLength; i++) {
    if (aIdTienda[i] == getParameterByName('idTienda')){
      var option = document.createElement('option');
        option.setAttribute("value", aIdEvento[i]);
        var nodoDeTexto = document.createTextNode(aNombreTipoEvento[i]);
      option.appendChild(nodoDeTexto);
      elSelectProvedorProducto.appendChild(option);
    }
  }
  var TipoEvento = getParameterByName('eventoTienda');
  elSelectProvedorProducto.value = TipoEvento;
}

function registrar(sNombreEvento,dFechaEvento,nTipoEvento,bEnvio){
  var nIdListaEvento;
	if (aIdListaEvento.length != 0) {
     nIdListaEvento = aIdListaEvento.length + 1;
     aIdListaEvento.push(nIdListaEvento);
  }
  else {
     nIdListaEvento = 1;
     aIdListaEvento.push(nIdListaEvento);
  }
  /*almacenar los valores en cada uno de los arreglos correspondientes*/
  aIdAsociadoEvento.push(sessionStorage.getItem('sesion_cedula_cliente')); //Se jala de session
  aIdTipoEvento.push(nTipoEvento); //Se escoge en una lista o en combo box
  aIdTiendaLista.push(getParameterByName('idTienda')); //Se escoge en una lista
  aNombreEvento.push(sNombreEvento);
  aFechaEvento.push(dFechaEvento); //Se agrega en un formulario
  aEnvio.push(bEnvio); //Se agrega en un formulario
  aLatitudListaEvento.push(nLatitud); //Se obtiene del mapa
  aLongitudListaEvento.push(nLongitud); //Se obtiene del mapa
  aEstadoListaEventos.push(0);


	localStorage.setItem('id_lista_evento_CU8',JSON.stringify(aIdListaEvento));
	localStorage.setItem('id_asociado_evento_CU8',JSON.stringify(aIdAsociadoEvento));
  localStorage.setItem('id_tipo_evento_CU8',JSON.stringify(aIdTipoEvento));
	localStorage.setItem('id_tienda_evento_CU8',JSON.stringify(aIdTiendaLista));
  localStorage.setItem('nombre_evento_CU8',JSON.stringify(aNombreEvento));
  localStorage.setItem('fecha_evento_CU8',JSON.stringify(aFechaEvento));
  localStorage.setItem('envio_evento_CU8',JSON.stringify(aEnvio));
  localStorage.setItem('latitud_evento_CU8',JSON.stringify(aLatitudListaEvento));
  localStorage.setItem('longitud_evento_CU8',JSON.stringify(aLongitudListaEvento));
  localStorage.setItem('estado_lista_evento',JSON.stringify(aEstadoListaEventos));



  swal({
    title: "La información fue ingresada correctamente",
    text: "Los datos del evento han sido actualizados.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "green",
		confirmButtonText: "Continuar",
		closeOnConfirm: false
	},
		function(isConfirm){
			window.location = "listarProductos.html?idLista=" + nIdListaEvento + "&idTienda=" + getParameterByName('idTienda');
		});
}
