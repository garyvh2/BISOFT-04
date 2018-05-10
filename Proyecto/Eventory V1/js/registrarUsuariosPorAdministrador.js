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


var aPrimerNombre= [],
 aSegundoNombre = [],
 aPrimerApellido = [],
 aSegundoApellido = [],
 aNacionalidad = [],
 aCedula = [],
 aFechaNacimiento = [],
 aGenero = [],
 aTelefonoPrincipal = [],
 aTelefonoSecundario = [],
 aCorreoElectronico = [],
 aContrasena = [],
 aContrasena2 = [],
 aFotoPerfil = [],
 aTipoUsuario = [],
 aIdTienda = [],
 aEstado = [];

 if(localStorage.getItem('primer_nombre') != null){
 	aPrimerNombre = JSON.parse(localStorage.getItem('primer_nombre'));
 }
 if(localStorage.getItem('segundo_nombre') != null){

   aSegundoNombre = JSON.parse(localStorage.getItem('segundo_nombre'));
 }
 if(localStorage.getItem('primer_apellido') != null){
   aPrimerApellido = JSON.parse(localStorage.getItem('primer_apellido'));
 }
 if(localStorage.getItem('segundo_apellido') != null){
   aSegundoApellido = JSON.parse(localStorage.getItem('segundo_apellido'));
 }
 if(localStorage.getItem('nacionalidad') != null){
   aNacionalidad = JSON.parse(localStorage.getItem('nacionalidad'));
 }
 if(localStorage.getItem('numero_identificacion') != null){
   aCedula = JSON.parse(localStorage.getItem('numero_identificacion'));
 }
 if(localStorage.getItem('fecha_nacimiento') != null){
   aFechaNacimiento = JSON.parse(localStorage.getItem('fecha_nacimiento'));
 }
 if(localStorage.getItem('genero') != null){
   aGenero = JSON.parse(localStorage.getItem('genero'));
 }
 if(localStorage.getItem('numero_telefono') != null){
   aTelefonoPrincipal = JSON.parse(localStorage.getItem('numero_telefono'));
 }
 if(localStorage.getItem('numero_telefono2') != null){
  aTelefonoSecundario = JSON.parse(localStorage.getItem('numero_telefono2'));
 }
 if(localStorage.getItem('correo_electronico') != null){
   aCorreoElectronico = JSON.parse(localStorage.getItem('correo_electronico'));
 }
 if(localStorage.getItem('contrasena') != null){
   aContrasena = JSON.parse(localStorage.getItem('contrasena'));
 }
 if(localStorage.getItem('contrasena2') != null){
   aContrasena2 = JSON.parse(localStorage.getItem('contrasena2'));
 }
 if(localStorage.getItem('foto_perfil') != null){
   aFotoPerfil = JSON.parse(localStorage.getItem('foto_perfil'));
 }
 if(localStorage.getItem('tipo_usuario') != null){
   aTipoUsuario = JSON.parse(localStorage.getItem('tipo_usuario'));
 }
 if(localStorage.getItem('id_tienda') != null){
   aIdTienda = JSON.parse(localStorage.getItem('id_tienda'));
 }
 if(localStorage.getItem('estado_usuario') != null){
   aEstado = JSON.parse(localStorage.getItem('estado_usuario'));
 }

 var elTxtFechaNacimiento=document.querySelector('#txtFechaNacimiento');
   function validar(){

     	var elTxtPrimerNombre=document.querySelector('#txtPrimerNombre'),
     	 elTxtSegundoNombre=document.querySelector('#txtSegundoNombre'),
     	 elTxtPrimerApellido=document.querySelector('#txtPrimerApellido'),
        elTxtSegundoApellido=document.querySelector('#txtSegundoApellido'),
        elTxtNacionalidad=document.querySelector('#txtNacionalidad'),
        elTxtCedula=document.querySelector('#txtCedula'),
        elTxtFechaNacimiento=document.querySelector('#txtFechaNacimiento'),
        elTxtGenero=document.getElementsByName('GeneroRedondo'),
        elTxtTelefonoPrincipal=document.querySelector('#txtTelefonoPrincipal'),
        elTxtTelefonoSecundario=document.querySelector('#txtTelefonoSecundario'),
        elTxtCorreoElectronico=document.querySelector('#txtCorreoElectronico'),
        elTxtContrasena=document.querySelector('#txtContrasena'),
        elTxtContrasena2=document.querySelector('#txtContrasena2'),
        elRadioBtnTipoUsuario=document.getElementsByName('tipoUsuario');

       /*Variables para los valores que estan dentro de cada uno de los elementos del formulario*/

       var sPrimerNombre = elTxtPrimerNombre.value,
        sSegundoNombre = elTxtSegundoNombre.value,
        sPrimerApellido = elTxtPrimerApellido.value,
        sSegundoApellido = elTxtSegundoApellido.value,
        sNacionalidad = elTxtNacionalidad.value,
        nCedula = Number(elTxtCedula.value),
        dFechaNacimiento = txtFechaNacimiento.value,
        nTelefonoPrincipal = Number(elTxtTelefonoPrincipal.value),
        nTelefonoSecundario = Number(elTxtTelefonoSecundario.value),
        sCorreoElectronico = elTxtCorreoElectronico.value,
        sContrasena = elTxtContrasena.value,
        sContrasena2 = elTxtContrasena2.value;

        for (var i = 0; i < elRadioBtnTipoUsuario.length; i++) {
          if (elRadioBtnTipoUsuario[i].checked){
              var ntipoUsuario = Number(elRadioBtnTipoUsuario[i].value);
              break;
          }
        }
        for (var i = 0; i < elTxtGenero.length; i++) {
          if (elTxtGenero[i].checked){
              var sGenero = elTxtGenero[i].value;
              break;
          }
        }

        	if (sContrasena == sContrasena2) {
        		var CorreoLibre = 1;
        		var idLength = aCedula.length;
        		for (var i = 0; i < idLength; i++) {
        			if (aCorreoElectronico[i] == sCorreoElectronico) {
        				CorreoLibre = 0;
        			}
        		}
        		if (CorreoLibre == 1) {
              registrarUsuarioPorAdministrador(sPrimerNombre,sSegundoNombre,sPrimerApellido,sSegundoApellido,sNacionalidad,
           			nCedula,dFechaNacimiento,sGenero,sCorreoElectronico,sContrasena,sContrasena2,nTelefonoPrincipal,nTelefonoSecundario,ntipoUsuario);

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

   function registrarUsuarioPorAdministrador(psPrimerNombre,psSegundoNombre,psPrimerApellido,psSegundoApellido,psNacionalidad,
     pnCedula,pdFechaNacimiento,psGenero,psCorreoElectronico,psContrasena,psContrasena2,pnTelefonoPrincipal,pnTelefonoSecundario,pntipoUsuario){

   		aPrimerNombre.push(psPrimerNombre);
   		aSegundoNombre.push(psSegundoNombre);
   		aPrimerApellido.push(psPrimerApellido);
   		aSegundoApellido.push(psSegundoApellido);
   		aNacionalidad.push(psNacionalidad);
   		aCedula.push(pnCedula);
   		aFechaNacimiento.push(pdFechaNacimiento);
   		aGenero.push(psGenero);
   		aTelefonoPrincipal.push(pnTelefonoPrincipal);
   		aTelefonoSecundario.push(pnTelefonoSecundario);
   		aCorreoElectronico.push(psCorreoElectronico);
   		aContrasena.push(psContrasena);
      aContrasena2.push(psContrasena2);
   		aTipoUsuario.push(pntipoUsuario);
   		aEstado.push(1);
      aIdTienda.push(JSON.parse(sessionStorage.getItem("sesion_id_tienda")));
      aFotoPerfil.push(imgBase64);


   		localStorage.setItem('primer_nombre',JSON.stringify(aPrimerNombre));
   		localStorage.setItem('segundo_nombre',JSON.stringify(aSegundoNombre));
   		localStorage.setItem('primer_apellido',JSON.stringify(aPrimerApellido));
   		localStorage.setItem('segundo_apellido',JSON.stringify(aSegundoApellido));
   		localStorage.setItem('nacionalidad',JSON.stringify(aNacionalidad));
   		localStorage.setItem('numero_identificacion',JSON.stringify(aCedula));
   		localStorage.setItem('fecha_nacimiento',JSON.stringify(aFechaNacimiento));
   		localStorage.setItem('genero',JSON.stringify(aGenero));
   		localStorage.setItem('numero_telefono',JSON.stringify(aTelefonoPrincipal));
   		localStorage.setItem('numero_telefono2',JSON.stringify(aTelefonoSecundario));
   		localStorage.setItem('correo_electronico',JSON.stringify(aCorreoElectronico));
   		localStorage.setItem('contrasena',JSON.stringify(aContrasena));
      localStorage.setItem('contrasena2',JSON.stringify(aContrasena2));
   		localStorage.setItem('tipo_usuario',JSON.stringify(aTipoUsuario));
      localStorage.setItem('id_tienda',JSON.stringify(aIdTienda));
      localStorage.setItem('estado_usuario',JSON.stringify(aEstado));
      try {

        localStorage.setItem('foto_perfil',JSON.stringify(aFotoPerfil));
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
      	}/*,
      		function(isConfirm){
      			window.location = "registrarTiendas.html";
      		}*/);
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
