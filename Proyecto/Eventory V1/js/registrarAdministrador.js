
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
}

if(localStorage.getItem("primer_nombre") !=null){
	aNombre= JSON.parse(localStorage.getItem("primer_nombre"));
}

if(localStorage.getItem("segundo_nombre") !=null){
	aSegundoNombre= JSON.parse(localStorage.getItem("segundo_nombre"));
}

if(localStorage.getItem("primer_apellido") !=null){
	aApellido= JSON.parse(localStorage.getItem("primer_apellido"));
}

if(localStorage.getItem("segundo_apellido") !=null){
	aSegundoApellido= JSON.parse(localStorage.getItem("segundo_apellido"));
}

if(localStorage.getItem("numero_telefono") !=null){
	aTelefono= JSON.parse(localStorage.getItem("numero_telefono"));
}
if(localStorage.getItem("numero_telefono2") !=null){
	aTelefono2= JSON.parse(localStorage.getItem("numero_telefono2"));
}

if(localStorage.getItem("fecha_nacimiento") !=null){
	aFechaNacimiento= JSON.parse(localStorage.getItem("fecha_nacimiento"));
}
if (localStorage.getItem("correo_electronico")) {
	aCorreoElectronico= JSON.parse(localStorage.getItem("correo_electronico"));
}
if(localStorage.getItem("contrasena") !=null){
	aContrasena= JSON.parse(localStorage.getItem("contrasena"));
}

if(localStorage.getItem("nacionalidad") != null){
	aNacionalidad = JSON.parse(localStorage.getItem("nacionalidad"));
}

if(localStorage.getItem("genero") !=null){
	aGenero= JSON.parse(localStorage.getItem("genero"));
}
if(localStorage.getItem("tipo_usuario") !=null){
	aTipoUsuario= JSON.parse(localStorage.getItem("tipo_usuario"));
}
if(localStorage.getItem("estado_usuario") !=null){
	aEstado= JSON.parse(localStorage.getItem("estado_usuario"));
}
if(localStorage.getItem("id_tienda") !=null){
	aIdTienda= JSON.parse(localStorage.getItem("id_tienda"));
}
if(localStorage.getItem("foto_perfil") !=null){
	aImagenPerfil= JSON.parse(localStorage.getItem("foto_perfil"));
}



function validar(){
	/*variables para los elemnetos del formulario*/
	var elTxtCedula=document.querySelector('#txtCedula');
	var elTxtNombre=document.querySelector('#txtNombre');
	var elTxtSegundoNombre=document.querySelector('#txtSegundoNombre');
	var elTxtApellido=document.querySelector('#txtApellido');
	var elTxtSegundoApellido=document.querySelector('#txtSegundoApellido');
	var elTxtNacionalidad=document.querySelector('#txtNacionalidad');
	var elTxtTelefono=document.querySelector('#txtNumeroTelefono');
	var elTxtTelefono2=document.querySelector('#txtNumeroTelefono2');
	var elTxtFechaNacimiento=document.querySelector('#txtFechaNacimiento');
	var elTxtCorreoElectronico=document.querySelector('#txtCorreoElectronico');
	var elTxtContrasena=document.querySelector('#txtContrasena');
	var elTxtConfirmarContrasena=document.querySelector('#txtConfirmarContrasena');
	var elTxtGenero=document.getElementsByName('genero');


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
			if (aCorreoElectronico[i] == sCorreoElectronico) {
				CorreoLibre = 0;
			}
		}
		if (CorreoLibre == 1) {
			registrar(nCedula,sNombre,sSegundoNombre,sApellido,sSegundoApellido,nTelefono,
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

function registrar(pnCedula,psNombre,psSegundoNombre,psApellido,psSegundoApellido,
	pnTelefono,pnTelefono2,pdFechaNacimiento,psCorreoElectronico,psContrasena,psGenero,psPais){


	aCedula.push(pnCedula);
	aNombre.push(psNombre);
	aSegundoNombre.push(psSegundoNombre);
	aApellido.push(psApellido);
	aSegundoApellido.push(psSegundoApellido);
	aTelefono.push(pnTelefono);
	aTelefono2.push(pnTelefono2);
	aFechaNacimiento.push(pdFechaNacimiento);
	aCorreoElectronico.push(psCorreoElectronico);
	aContrasena.push(psContrasena);
	aGenero.push(psGenero);
	aNacionalidad.push(psPais);
	aTipoUsuario.push(1);
	aEstado.push(1);
	aIdTienda.push(0);
  aImagenPerfil.push(imgBase64);

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
	sessionStorage.removeItem('id_administrador_registrar_tienda');
	sessionStorage.setItem('id_administrador_registrar_tienda', JSON.stringify(pnCedula));

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
			window.location = "registrarTiendas.html";
		});

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
