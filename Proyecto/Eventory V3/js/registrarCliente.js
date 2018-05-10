
function validar(vThis){
	/*variables para los elemnetos del formulario*/
	var elTxtCedula=document.querySelector('#txtCedula');
	var elTxtNombre=document.querySelector('#txtPrimerNombre');
	var elTxtSegundoNombre=document.querySelector('#txtSegundoNombre');
	var elTxtApellido=document.querySelector('#txtPrimerApellido');
	var elTxtSegundoApellido=document.querySelector('#txtSegundoApellido');
	var elTxtNacionalidad=document.querySelector('#txtNacionalidad');
	var elTxtTelefono=document.querySelector('#txtNumeroTelefono');
	var elTxtTelefono2=document.querySelector('#txtNumeroTelefono2');
	var elTxtFechaNacimiento=document.querySelector('#txtFechaNacimiento');
	var elTxtCorreoElectronico=document.querySelector('#txtCorreoElectronico');
	var elTxtContrasena=document.querySelector('#txtContrasena');
	var elTxtConfirmarContrasena=document.querySelector('#txtConfirmarContrasena');
	var elTxtGenero=document.getElementsByName('genero');
	var elcbxJuridico         = document.querySelector("#chkJuridico");


	/*Variables para los valores que esten dentro de cada uno de
	los elementos del formulario*/
	var nCedula=Number (elTxtCedula.value);
	var sNombre=elTxtNombre.value;
	var sSegundoNombre=elTxtSegundoNombre.value;
	var sPrimerApellido=elTxtApellido.value;
	var sSegundoApellido=elTxtSegundoApellido.value;
	var nTelefono=Number (elTxtTelefono.value);
	var nTelefono2=Number (elTxtTelefono2.value);
	var dFechaNacimiento= elTxtFechaNacimiento.value;
	var sCorreoElectronico=(elTxtCorreoElectronico.value);
	var sContrasena=elTxtContrasena.value;
	var sConfirmarContrasena=elTxtConfirmarContrasena.value;
	var sPais = elTxtNacionalidad.value;
	var sImagePath;

	if (elcbxJuridico.checked == true) {
		 var juridico = 1;
	} else {
		 var juridico = 0;
	}
	$.ajax({
	    url			: "services/imageUploader.php?path=../imgs/uploads/foto_perfil/",
	    type		: "POST",
	    data		: new FormData(vThis),
	    contentType	: false,
	    cache		: false,
	    processData	: false,
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
							url: "services/checkCorreoNuevo.php",
							type: "POST",
							data: {
								'sCorreoElectronico' : sCorreoElectronico
							},
							contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
							dataType: 'json',

							success: function(response){
								if (Number(response[0]['disponible'])== 1) {
	      			registrar(nCedula,sImagePath,sNombre,sSegundoNombre,sPrimerApellido,sSegundoApellido,sPais,dFechaNacimiento,sGenero,sCorreoElectronico,nTelefono,nTelefono2,sContrasena,juridico);

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
			title: "Error",
			text: "Las contraseñas no coinciden.",
			type: "error",
			showCancelButton: false,
			confirmButtonColor: "red",
			confirmButtonText: "Continuar",
			closeOnConfirm: false
		});
	}
	return false;
}

function registrar(pnCedula,psImagePath,psPrimerNombre,psSegundoNombre,psPrimerApellido,psSegundoApellido,psPais,pdFechaNacimiento,psGenero,psCorreoElectronico,pnTelefono,pnTelefono2,psContrasena,juridico){

	var tipoUsuario = 4;
	var estado = 1;

	var peticion = $.ajax({
		url: "services/registrarCliente.php",
	 	type: "POST",
		data: {
				'nCedula':pnCedula,
				'sImagePath':psImagePath,
				'sPrimerNombre':psPrimerNombre,
				'sSegundoNombre':psSegundoNombre,
				'sPrimerApellido':psPrimerApellido,
				'sSegundoApellido':psSegundoApellido,
				'sPais':psPais,
				'dFechaNacimiento':pdFechaNacimiento,
				'sGenero': psGenero,
				'sCorreoElectronico':psCorreoElectronico,
				'nTelefono': pnTelefono,
				'nTelefono2':pnTelefono2 ,
				'sContrasena':psContrasena,
				'nTipoUsuario': tipoUsuario,
				'nJuridico': juridico,
				'nEstado': estado

				},

		//dataType: 'json',

		success: function(response){
			swal({
				title: "La información fue ingresada correctamente",
				text: "Los datos del perfil han sido actualizados.",
				type: "success",
				showCancelButton: false,
				confirmButtonColor: "green",
				confirmButtonText: "Continuar",
				closeOnConfirm: false
			},
			function(isConfirm){
				window.location = "iniciarSesion.html";
			});
			 $( '#Form' ).each(function(){
					this.reset();
			 });
    	},
    error: function(request, cerror) {
      alert(cerror);
    }

	});
}
