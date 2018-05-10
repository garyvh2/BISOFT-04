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
    var peticion = $.ajax({
        url: "services/checkCorreo.php",
        type: "POST",
        data: {
          'sCorreoElectronico' : sCorreoElectronico
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',

        success: function(response){
          console.log(response);
          if (Number(response[0]['disponible'] == 1) ) {
      			ActualizarDatosUsuario(nCedula,sNombre,sSegundoNombre,sApellido,sSegundoApellido,nTelefono,nTelefono2,dFechaNacimiento,sCorreoElectronico,sContrasena,sGenero,sPais,sImagePath);
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
nTelefono2,dFechaNacimiento,sCorreoElectronico,sContrasena,sGenero,sPais,sImagePath) {
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
        'sImagePath'          : sImagePath
      },
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
      },
      error: function(request, error) {
          alert(error);
      }
  });
}

CargarDatos();
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
        console.log(response);
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


        CargarDatosDeUsuario();
      },
      error: function(request, error) {
          alert(error);
      }
  });
}
