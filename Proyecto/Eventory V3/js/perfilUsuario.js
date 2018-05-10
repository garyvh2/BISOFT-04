
//Se declara la latitud y longitud global
var nLatitud, nLongitud, sDireccion, gmMarcador, gmMapa, gmVentanaInformacion;
//Funcion llamada por API para inicializar el mapa
function funcionInicializarMapa (latitud,longitud) {

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
  nLatitud = latitud;
  nLongitud = longitud;

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


  var geocoder = new google.maps.Geocoder;

  geocoder.geocode({'location': gmMarcador.position}, function(results, status) {

    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var gmContenido = '<h2>' + results[1].formatted_address + '</h2>' + '<p>' + gmMarcador.position + '</p>';
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
}

function ValidarDatosUsuario (vThis) {
  /*variables para los elemnetos del formulario*/
	var elTxtCedula=document.querySelector('#txtCedula');
	var elTxtNombre=document.querySelector('#txtPrimerNombre');
	var elTxtSegundoNombre=document.querySelector('#txtSegundoNombre');
	var elTxtApellido=document.querySelector('#txtPrimerApellido');
	var elTxtSegundoApellido=document.querySelector('#txtSegundoApellido');
	var elTxtNacionalidad=document.querySelector('#txtNacionalidad');
	var elTxtTelefono=document.querySelector('#txtTelefonoPrincipal');
	var elTxtTelefono2=document.querySelector('#txtTelefonoSecundario');
	var elTxtFechaNacimiento=document.querySelector('#txtFechaNacimiento');
	var elTxtCorreoElectronico=document.querySelector('#txtCorreoElectronico');
	var elTxtContrasena=document.querySelector('#txtContrasena');
	var elTxtConfirmarContrasena=document.querySelector('#txtContrasena2');
	var elTxtGenero=document.getElementsByName('GeneroRedondo');
  var  elcbxJuridico         = document.querySelector("#chkJuridico");
  if (elcbxJuridico.checked == true) {
     var juridico = 1;
  } else {
     var juridico = 0;
  }

	/*Variables para los valores que esten dentro de cada uno de
	los elementos del formulario*/
	var nCedula=Number (elTxtCedula.value);
	var sNombre=elTxtNombre.value;
	var sSegundoNombre=elTxtSegundoNombre.value;
	var sApellido=elTxtApellido.value;
	var sSegundoApellido=elTxtSegundoApellido.value;
	var nTelefono=Number (elTxtTelefono.value);
	var nTelefono2=Number (elTxtTelefono2.value);
	var dFechaNacimiento= elTxtFechaNacimiento.value;
	var sCorreoElectronico=(elTxtCorreoElectronico.value);
	var sContrasena=elTxtContrasena.value;
	var sConfirmarContrasena=elTxtConfirmarContrasena.value;
	var sPais = elTxtNacionalidad.value;
  var sImagePath;

  /*****************************************************************************
    Se realiza la subida de la imagen
  *****************************************************************************/
  var peticion = $.ajax({
    url					: "services/imageUploader.php?path=../imgs/uploads/foto_perfil/", //Se envia el path como paremetro para el envio de la imagen
    type				: "POST",
    data				: new FormData(vThis),
    contentType	: false,
    cache				: false,
    processData	:	false,
    async: false,
    timeout: 30000,

    success: function(data) {
      sImagePath = data.replace('../','');
    },
    error: function(request, cerror) {
      alert(cerror);
    }
  });

	for(var i=0; i < elTxtGenero.length;i++){
		if(elTxtGenero[i].checked){
			var sGenero=elTxtGenero[i].value;
		}
	}


	if (sContrasena == sConfirmarContrasena) {
		if (formatoDeContrasenna(sContrasena) == true) {
      var peticion = $.ajax({
          url: "services/checkCorreo.php",
          type: "POST",
          data: {
            'sCorreoElectronico' : sCorreoElectronico
          },
          contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
          dataType: 'json',

          success: function(response){
            if (Number(response[0]['disponible'] == 1) ) {
        			ActualizarDatosUsuario(nCedula,sNombre,sSegundoNombre,sApellido,sSegundoApellido,nTelefono,nTelefono2,dFechaNacimiento,sCorreoElectronico,sContrasena,sGenero,sPais,sImagePath,juridico);
            } else {
              swal({
        				title: "Error!",
        				text: "Este correo electrónico ya se encuentra registrado.",
        				type: "error",
        				showCancelButton: false,
        				confirmButtonColor: "red",
        				confirmButtonText: "Continuar",
        				closeOnConfirm: false
        			});
            }
          },
          error: function(request, error) {
              alert(error);
          }
      });
		} else {
			swal({
				title: "Error",
				text: "La contraseña no cumple con el formato adecuado (De 8 a 15 caracteres, incluyendo al menos una mayúscula, una minúscula y un número excluyendo caracteres especiales).",
				type: "error",
				showCancelButton: false,
				confirmButtonColor: "red",
				confirmButtonText: "Continuar",
				closeOnConfirm: false
			});
		}
	} else {
		swal({
			title: "Error!",
			text: "Las contraseñas no coinciden.",
			type: "error",
			showCancelButton: false,
			confirmButtonColor: "red",
			confirmButtonText: "Continuar",
			closeOnConfirm: false
		}/*,
			function(isConfirm){
				window.location = "registrarTiendas.html";
			}*/);
	}

  return false;
}

function ActualizarDatosUsuario (nCedula,sNombre,sSegundoNombre,sApellido,sSegundoApellido,nTelefono,
nTelefono2,dFechaNacimiento,sCorreoElectronico,sContrasena,sGenero,sPais,sImagePath,juridico) {
  var peticion = $.ajax({
      url: "services/modificarUsuario.php",
      type: "POST",
      data: {
        'nCedula'             : nCedula,
        'sNombre'             : sNombre,
        'sSegundoNombre'      : sSegundoNombre,
        'sApellido'           : sApellido,
        'sSegundoApellido'    : sSegundoApellido,
        'nTelefono'           : nTelefono,
        'nTelefono2'          : nTelefono2,
        'dFechaNacimiento'    : dFechaNacimiento,
        'sCorreoElectronico'  : sCorreoElectronico,
        'sContrasena'         : sContrasena,
        'sGenero'             : sGenero,
        'sPais'               : sPais,
        'sImagePath'          : sImagePath,
        'juridico'            : juridico
      },
      async: false,
      timeout: 30000,
      success: function(response){
        swal({
          title: "La información fue ingresada correctamente",
          text: "Los datos del perfil han sido actualizados.",
          type: "success",
          showCancelButton: false,
          confirmButtonColor: "green",
          confirmButtonText: "Continuar",
          closeOnConfirm: false
        });
        CargarDatos();
        CargarDatosDeUsuario();
      },
      error: function(request, error) {
          alert(error);
      }
  });
}


function CargarDatos () {
  var peticion = $.ajax({
      url: "services/selectUsuario.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,

      success: function(response){
        //Cargar datos de cliente
        document.querySelector("#txtPrimerNombre").value          = response[0]['primer_nombre'];
        document.querySelector("#txtSegundoNombre").value         = response[0]['segundo_nombre'];
        document.querySelector("#txtPrimerApellido").value        = response[0]['primer_apellido'];
        document.querySelector("#txtSegundoApellido").value       = response[0]['segundo_apellido'];
        document.querySelector("#txtNacionalidad").value          = response[0]['nacionalidad'];
        document.querySelector("#txtCedula").value                = response[0]['identificacion'];
        document.querySelector("#txtFechaNacimiento").value       = response[0]['fecha_nacimiento'];
        var sGenero                                               = response[0]['genero'];


        var elGenero = document.getElementsByName("GeneroRedondo");
        for(var i=0; i < elGenero.length;i++){
      		if(elGenero[i].value == sGenero){
      			elGenero[i].checked = true;
      		}
      	}
        if (response[0]['juridico'] == 1) {
                  document.querySelector("#chkJuridico").checked = true;
              } else {
                  document.querySelector("#chkJuridico").checked = false;
              }
        document.querySelector("#txtTelefonoPrincipal").value     = response[0]['numero_telefono_primario'];
        document.querySelector("#txtTelefonoSecundario").value    = response[0]['numero_telefono_secundario'];

        var elFotoPefil = document.querySelector("#ImagenPerfilUsuario");
        if (elFotoPefil) {
          if (ImageExist(response[0]['foto_perfil'])) {
            elFotoPefil.style.backgroundImage = "url(" + response[0]['foto_perfil'] + ")";
            elFotoPefil.style.backgroundRepeat  = "no-repeat";
            elFotoPefil.style.backgroundSize = "cover";
          }
        }
        document.querySelector("#txtCorreoElectronico").value     = response[0]['correo_electronico'];

      },
      error: function(request, error) {
          alert(error);
      }
  });
  var peticion2 = $.ajax({
      url: "services/selectTienda.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,

      success: function(response){
        //Cargar datos de tienda
        var elFotoPefil = document.querySelector("#LogoCompania");
        if (elFotoPefil) {
          if (ImageExist(response[0]['logo_tienda'])) {
            elFotoPefil.style.backgroundImage = "url(" + response[0]['logo_tienda'] + ")";
            elFotoPefil.style.backgroundRepeat  = "no-repeat";
            elFotoPefil.style.backgroundSize = "contain";
          }
        }

          document.querySelector("#txtNombreTienda").value        = response[0]['nombre'];
          document.querySelector("#txtTelefonoTienda").value      = response[0]['numero_telefono'];
          document.querySelector("#txtCorreoTienda").value        = response[0]['correo_electronico'];
          document.querySelector("#txtProvinciaTienda").value     = response[0]['provincia'];
          document.querySelector("#txtCantonTienda").value        = response[0]['canton'];
          document.querySelector("#txtDistritoTienda").value      = response[0]['distrito'];
          document.querySelector("#txtImpuestoVentaTienda").value = response[0]['impuesto_ventas'];
          document.querySelector("#txtTipoTienda").value          = response[0]['tipo_tienda'];

        funcionInicializarMapa(response[0]['latitud'],response[0]['longitud']);

        CargarDatosDeUsuario();
      },
      error: function(request, error) {
          alert(error);
      }
  });
}
