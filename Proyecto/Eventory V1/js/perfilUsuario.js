
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
  var nLatitud = sessionStorage.getItem("sesion_latitud_tiendas_CU5");
  var nLongitud = sessionStorage.getItem("sesion_longitud_tiendas_CU5");

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


var aCedula=[];
var aNombre=[];
var aSegundoNombre=[];
var aApellido=[];
var aSegundoApellido=[];
var aTelefono=[];
var aTelefono2=[];
var aFechaNacimiento=[];
var aCorreoElectronico=[];
var aContrasena=[];
var aGenero=[];
var aNacionalidad = [];
var aTipoUsuario = [];
var aEstado = [];
var aIdTienda = [];
var aImagenPerfil = [];

if(localStorage.getItem("numero_identificacion") !=null){
	aCedula= JSON.parse(localStorage.getItem("numero_identificacion"));
	aNombre= JSON.parse(localStorage.getItem("primer_nombre"));
	aSegundoNombre= JSON.parse(localStorage.getItem("segundo_nombre"));
	aApellido= JSON.parse(localStorage.getItem("primer_apellido"));
	aSegundoApellido= JSON.parse(localStorage.getItem("segundo_apellido"));
	aTelefono= JSON.parse(localStorage.getItem("numero_telefono"));
	aTelefono2= JSON.parse(localStorage.getItem("numero_telefono2"));
	aFechaNacimiento= JSON.parse(localStorage.getItem("fecha_nacimiento"));
	aCorreoElectronico= JSON.parse(localStorage.getItem("correo_electronico"));
	aContrasena= JSON.parse(localStorage.getItem("contrasena"));
	aNacionalidad = JSON.parse(localStorage.getItem("nacionalidad"));
	aGenero= JSON.parse(localStorage.getItem("genero"));
	aTipoUsuario= JSON.parse(localStorage.getItem("tipo_usuario"));
	aEstado= JSON.parse(localStorage.getItem("estado_usuario"));
	aIdTienda= JSON.parse(localStorage.getItem("id_tienda"));
	aImagenPerfil= JSON.parse(localStorage.getItem("foto_perfil"));
}

function ValidarDatosUsuario () {
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


	for(var i=0; i < elTxtGenero.length;i++){
		if(elTxtGenero[i].checked){
			var sGenero=elTxtGenero[i].value;
		}
	}


	if (sContrasena == sConfirmarContrasena) {
		var CorreoLibre = 1;
		var idLength = aCedula.length;
		for (var i = 0; i < idLength; i++) {
			if (aCorreoElectronico[i] == sCorreoElectronico && sCorreoElectronico != sessionStorage.getItem("sesion_correo_electronico") ) {
				CorreoLibre = 0;
			}
		}
		if (CorreoLibre == 1) {
			ActualizarDatosUsuario(nCedula,sNombre,sSegundoNombre,sApellido,sSegundoApellido,nTelefono,
			nTelefono2,dFechaNacimiento,sCorreoElectronico,sContrasena,sGenero,sPais);
		}

		else {
			swal({
				title: "Error!",
				text: "Este correo electrónico ya se encuentra registrado.",
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
nTelefono2,dFechaNacimiento,sCorreoElectronico,sContrasena,sGenero,sPais) {
  var nUsuariosLength = aCedula.length;
  for (var i = 0; i < nUsuariosLength; i++) {
    if (aCedula[i] == nCedula) {
      aCedula[i]=nCedula;
      aNombre[i]=sNombre;
      aSegundoNombre[i]=sSegundoNombre;
      aApellido[i]=sApellido;
      aSegundoApellido[i]=sSegundoApellido;
      aTelefono[i]=nTelefono;
      aTelefono2[i]=nTelefono2;
      aFechaNacimiento[i]=dFechaNacimiento;
      aCorreoElectronico[i]=sCorreoElectronico;
      aContrasena[i]=sContrasena;
      aGenero[i]=sGenero;
      aNacionalidad[i]=sPais ;
      aTipoUsuario[i]=sessionStorage.getItem("sesion_tipo_usuario");
      aEstado[i]=1;
      aIdTienda[i]=sessionStorage.getItem("sesion_id_tienda");
      if (imgBase64 != undefined) {
        aImagenPerfil[i]= imgBase64;
      } else {
        aImagenPerfil[i]= sessionStorage.getItem('sesion_foto_perfil');
      }

      sessionStorage.setItem('sesion_cedula_cliente',aCedula[i]);
      sessionStorage.setItem('sesion_primer_nombre',aNombre[i]);
      sessionStorage.setItem('sesion_segundo_nombre',aSegundoNombre[i]);
      sessionStorage.setItem('sesion_primer_apellido',aApellido[i]);
      sessionStorage.setItem('sesion_segundo_apellido',aSegundoApellido[i]);
      sessionStorage.setItem('sesion_numero_telefono',aTelefono[i]);
      sessionStorage.setItem('sesion_numero_telefono2',aTelefono2[i]);
      sessionStorage.setItem('sesion_fecha_nacimiento',aFechaNacimiento[i]);
      sessionStorage.setItem('sesion_correo_electronico',aCorreoElectronico[i]);
      sessionStorage.setItem('sesion_contrasena',aContrasena[i]);
      sessionStorage.setItem('sesion_genero',aGenero[i]);
      sessionStorage.setItem('sesion_nacionalidad',aNacionalidad[i]);
      sessionStorage.setItem('sesion_tipo_usuario',aTipoUsuario[i]);
      sessionStorage.setItem('sesion_estado_usuario',aEstado[i]);
      sessionStorage.setItem('sesion_foto_perfil',aImagenPerfil[i]);

    }
  }
  localStorage.setItem('numero_identificacion',JSON.stringify(aCedula));
  localStorage.setItem('primer_nombre',JSON.stringify(aNombre));
  localStorage.setItem('segundo_nombre',JSON.stringify(aSegundoNombre));
  localStorage.setItem('primer_apellido',JSON.stringify(aApellido));
  localStorage.setItem('segundo_apellido',JSON.stringify(aSegundoApellido));
  localStorage.setItem('numero_telefono',JSON.stringify(aTelefono));
  localStorage.setItem('numero_telefono2',JSON.stringify(aTelefono2));
  localStorage.setItem('fecha_nacimiento',JSON.stringify(aFechaNacimiento));
  localStorage.setItem('contrasena',JSON.stringify(aContrasena));
  localStorage.setItem('correo_electronico',JSON.stringify(aCorreoElectronico));
  localStorage.setItem('genero',JSON.stringify(aGenero));
  localStorage.setItem('nacionalidad',JSON.stringify(aNacionalidad));
  localStorage.setItem('tipo_usuario',JSON.stringify(aTipoUsuario));
  localStorage.setItem('estado_usuario',JSON.stringify(aEstado));
  localStorage.setItem('id_tienda',JSON.stringify(aIdTienda));
  try {
  localStorage.setItem('foto_perfil',JSON.stringify(aImagenPerfil));
  } catch (e) {
    console.log(e);
  }

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
}


CargarDatos();
function CargarDatos () {
  //Cargar datos de cliente
  document.querySelector("#txtPrimerNombre").value = sessionStorage.getItem("sesion_primer_nombre");
  document.querySelector("#txtSegundoNombre").value = sessionStorage.getItem("sesion_segundo_nombre");
  document.querySelector("#txtPrimerApellido").value = sessionStorage.getItem("sesion_primer_apellido");
  document.querySelector("#txtSegundoApellido").value = sessionStorage.getItem("sesion_segundo_apellido");
  document.querySelector("#txtNacionalidad").value = sessionStorage.getItem("sesion_nacionalidad");
  document.querySelector("#txtCedula").value = sessionStorage.getItem("sesion_cedula_cliente");
  document.querySelector("#txtFechaNacimiento").value = sessionStorage.getItem("sesion_fecha_nacimiento");
  var sGenero = sessionStorage.getItem("sesion_genero");
  var elGenero = document.getElementsByName("GeneroRedondo");
  for(var i=0; i < elGenero.length;i++){
		if(elGenero[i].value == sGenero){
			elGenero[i].checked = true;
		}
	}
  document.querySelector("#txtTelefonoPrincipal").value = sessionStorage.getItem("sesion_numero_telefono");
  document.querySelector("#txtTelefonoSecundario").value = sessionStorage.getItem("sesion_numero_telefono2");
  var elFotoPefil = document.querySelector("#ImagenPerfilUsuario");
  if (elFotoPefil) {
    elFotoPefil.style.backgroundImage = "url(" + sessionStorage.getItem("sesion_foto_perfil") + ")";
    elFotoPefil.style.backgroundRepeat  = "no-repeat";
    elFotoPefil.style.backgroundSize = "cover";
  }
  document.querySelector("#txtCorreoElectronico").value = sessionStorage.getItem("sesion_correo_electronico");
  //Cargar datos de tienda
  var elFotoPefil = document.querySelector("#LogoCompania");
  if (elFotoPefil) {
    elFotoPefil.style.backgroundImage = "url(" + sessionStorage.getItem("sesion_logo_tienda_CU5") + ")";
    elFotoPefil.style.backgroundRepeat  = "no-repeat";
    elFotoPefil.style.backgroundSize = "contain";
  }
  if (sessionStorage.getItem("sesion_tipo_usuario") != 4) {
    document.querySelector("#txtNombreTienda").value = sessionStorage.getItem("sesion_nombre_tiendas_CU5");
    document.querySelector("#txtTelefonoTienda").value = sessionStorage.getItem("sesion_telefono_tiendas_CU5");
    document.querySelector("#txtCorreoTienda").value = sessionStorage.getItem("sesion_correo_tiendas_CU5");
    document.querySelector("#txtProvinciaTienda").value = sessionStorage.getItem("sesion_provincia_tiendas_CU5");
    document.querySelector("#txtCantonTienda").value = sessionStorage.getItem("sesion_canton_tiendas_CU5");
    document.querySelector("#txtDistritoTienda").value = sessionStorage.getItem("sesion_distrito_tiendas_CU5");
    document.querySelector("#txtImpuestoVentaTienda").value = sessionStorage.getItem("sesion_impuesto_venta_tiendas_CU5");
    document.querySelector("#txtImpuestoValorTienda").value = sessionStorage.getItem("sesion_impuesto_valor_tiendas_CU5");
    document.querySelector("#txtTipoTienda").value = sessionStorage.getItem("sesion_tipo_tiendas_CU5");
  }

  var elFotoPefil = document.querySelector("#BotonMenuUsuario div");
  if (elFotoPefil) {
    elFotoPefil.style.backgroundImage = "url(" + sessionStorage.getItem("sesion_foto_perfil") + ")";
    elFotoPefil.style.backgroundRepeat  = "no-repeat";
    elFotoPefil.style.backgroundSize = "cover";
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



}
