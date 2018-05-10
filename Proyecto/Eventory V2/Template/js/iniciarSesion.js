elCorreoElectronico=document.querySelector('#correoElectronico');
elContrasena=document.querySelector('#contrasena');

elBotonIniciarSesion = document.querySelector("#IniciarSesion");
elBotonIniciarSesion.addEventListener("click", IniciarSesion);



function IniciarSesion () {
	var peticion = $.ajax({
    url					: "services/CerrarSesion.php", //Se envia el path como paremetro para el envio de la imagen
    type				: "POST",
    data				: {

    },
    contentType	: false,
    cache				: false,
    processData	:	false,
    async: false,
    timeout: 30000,

    success: function(data) {
    },
    error: function(request, cerror) {
      alert(cerror);
    }
  });


	//Se obtienen los valores de los input de texto
	var psCorreo=elCorreoElectronico.value;
	var psContrasena =elContrasena.value;
	/*****************************************************************************
		Se realiza la subida de la informacion a la base de datos
	*****************************************************************************/
	var peticion = $.ajax({
		url: "services/iniciarSesion.php",
		type: "POST",
		data: {
			'psCorreo'        : psCorreo,
			'psContrasena'   	: psContrasena
		},
		dataType: 'json',
		success: function(response) {
			if (response == "0") {
				swal({
					title: "¡Error!",
					text: "La contraseña o el correo electrónico son incorrectos",
					type: "error",
					showCancelButton: false,
					confirmButtonColor: "red",
					confirmButtonText: "Continuar",
					closeOnConfirm: false
				});
			} else if (response == "4") {
				window.location = "listarMisListas.html";
			} else if (response == "3" || response == "2" || response == "1") {
				window.location = "listarMisListasAdmin.html";
			}
		},
		error: function(request, cerror) {
			alert(cerror);
		}
	});
}
