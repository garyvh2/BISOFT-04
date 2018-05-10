
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


var aId=[];
var aNombre=[];
var aDescripcion=[];
var aPercedero=[];
var aFechaCaducidad=[];
var aIdTienda=[];



if(localStorage.getItem("id_tipo_producto_CU46") !=null){
	aId= JSON.parse(localStorage.getItem('id_tipo_producto_CU46'));
	aNombre= JSON.parse(localStorage.getItem("nombre_producto_CU46"));
	aDescripcion= JSON.parse(localStorage.getItem("descripcion_producto_CU46"));
	aPercedero= JSON.parse(localStorage.getItem("perecedero_producto_CU46"));
	aFechaCaducidad= JSON.parse(localStorage.getItem("fecha_producto_CU46"));
	aIdTienda= JSON.parse(localStorage.getItem("id_tienda_CU46"));
}

function checkboxPerecedero (el) {
  var elFechaCaducidad = document.querySelector('#FechaCaducidad');
  if (el.checked == true) {
    elFechaCaducidad.classList.remove("FechaOculta");
  }
  else {
    elFechaCaducidad.classList.add("FechaOculta");
  }
}


function validar(){
	/*variables para los elemnetos del formulario*/


	var txtNombreProducto=document.querySelector('#txtNombreProducto');
  var txtDescripcionProducto=document.querySelector('#txtDescripcionProducto');
  var txtPerecederoProducto=document.querySelector('#chkPerecedero');
  var txtFechaCaducidad=document.querySelector('#txtFechaCaducidad');



	/*Variables para los valores que esten dentro de cada uno de
	los elementos del formulario*/

	var sNombreProducto=txtNombreProducto.value;
  var sDescripcionProducto=txtDescripcionProducto.value;
  var bPerecederoProducto=txtPerecederoProducto.checked;
  var dFechaCaducidad=txtFechaCaducidad.value;



  registrar(sNombreProducto,sDescripcionProducto,bPerecederoProducto,dFechaCaducidad);
  return false;
}


function registrar(psNombreProducto,psDescripcionProducto,pbPerecederoProducto,pdFechaCaducidad){

	if ( aId.length != 0) {
     aId.push( aId.length + 1);
  }
  else {
     aId.push(1);
  }
  /*almacenar los valores en cada uno de los arreglos correspondientes*/

  aNombre.push(psNombreProducto);
  aDescripcion.push(psDescripcionProducto);
  aPercedero.push(pbPerecederoProducto);
  aFechaCaducidad.push(pdFechaCaducidad);
	aIdTienda.push(JSON.parse(sessionStorage.getItem("sesion_id_tienda")));


	localStorage.setItem('id_tipo_producto_CU46',JSON.stringify(aId));
	localStorage.setItem('nombre_producto_CU46',JSON.stringify(aNombre));
  localStorage.setItem('descripcion_producto_CU46',JSON.stringify(aDescripcion));
	localStorage.setItem('perecedero_producto_CU46',JSON.stringify(aPercedero));
  localStorage.setItem('fecha_producto_CU46',JSON.stringify(aFechaCaducidad));
  localStorage.setItem('id_tienda_CU46',JSON.stringify(aIdTienda));

  swal({
    title: "La información fue ingresada correctamente",
    text: "Los datos del producto han sido actualizados.",
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
