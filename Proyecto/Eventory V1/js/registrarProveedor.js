
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


var aIdProveedor=[];
var aNombre=[];
var aTelefono=[];
var aTelefono2=[];
var aFechaInicio=[];
var aIdTienda = [];



if(localStorage.getItem("id_proveedor_CU10") !=null){
	aIdProveedor= JSON.parse(localStorage.getItem('id_proveedor_CU10'));
}

if(localStorage.getItem("nombre_proveedor_CU10") !=null){
	aNombre= JSON.parse(localStorage.getItem("nombre_proveedor_CU10"));
}

if(localStorage.getItem("numero_telefono_CU10") !=null){
	aTelefono= JSON.parse(localStorage.getItem("numero_telefono_CU10"));
}
if(localStorage.getItem("numero_telefono2_CU10") !=null){
	aTelefono2= JSON.parse(localStorage.getItem("numero_telefono2_CU10"));
}

if(localStorage.getItem("fecha_inicio_CU10") !=null){
	aFechaInicio= JSON.parse(localStorage.getItem("fecha_inicio_CU10"));
}

if(localStorage.getItem('id_tienda_CU10') != null){
	aIdTienda = JSON.parse(localStorage.getItem('id_tienda_CU10'));
}





function validar(){
	/*variables para los elemnetos del formulario*/

	var elTxtNombre=document.querySelector('#txtNombre');
	var elTxtTelefono=document.querySelector('#txtNumeroTelefono');
	var elTxtTelefono2=document.querySelector('#txtNumeroTelefono2');
	var elTxtFechaInicio=document.querySelector('#txtFechaInicio');



	/*Variables para los valores que esten dentro de cada uno de
	los elementos del formulario*/

	var sNombre=elTxtNombre.value;
	var nTelefono=Number (elTxtTelefono.value);
	var nTelefono2=Number (elTxtTelefono2.value);
	var dFechaInicio= elTxtFechaInicio.value;

	registrar(sNombre,nTelefono,nTelefono2,dFechaInicio);

	return false;
}


function registrar(psNombre,pnTelefono,pnTelefono2,pdFechaInicio){

	if ( aIdProveedor.length != 0) {
     aIdProveedor.push( aIdProveedor.length + 1);
  }
  else {
     aIdProveedor.push(1);
  }


	/*almacenar los valores en cada uno de los arreglos correspondientes*/

	aNombre.push(psNombre);
	aTelefono.push(pnTelefono);
	aTelefono2.push(pnTelefono2);
	aFechaInicio.push(pdFechaInicio);
	aIdTienda.push(JSON.parse(sessionStorage.getItem("sesion_id_tienda")));

	localStorage.setItem('id_proveedor_CU10',JSON.stringify(aIdProveedor));
	localStorage.setItem('nombre_proveedor_CU10',JSON.stringify(aNombre));
	localStorage.setItem('numero_telefono_CU10',JSON.stringify(aTelefono));
	localStorage.setItem('numero_telefono2_CU10',JSON.stringify(aTelefono2));
	localStorage.setItem('fecha_inicio_CU10',JSON.stringify(aFechaInicio));
	localStorage.setItem('id_tienda_CU10',JSON.stringify(aIdTienda));

	swal({
    title: "La información fue ingresada correctamente",
    text: "Los datos del proveedor han sido actualizados.",
		type: "success",
		showCancelButton: false,
		confirmButtonColor: "green",
		confirmButtonText: "Continuar",
		closeOnConfirm: false
	}/*,
		function(isConfirm){
			window.location = "iniciarSesion.html";
		}*/);

}
