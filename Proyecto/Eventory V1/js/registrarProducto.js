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

/*Creación de los arreglos*/
var aIdTienda = [];
var aIdProducto = [];
var aNombreProducto = [];
var aDescripcionProducto = [];
var aPrecioProductoSinImpuesto = [];
var aMarcaProducto = [];
var aProvedorProducto = [];
var aCantidadProducto = [];
var aTipoProducto = [];
var aEstadoProducto = [];
var aImagenProducto = [];

/* Almacenar los valores en cada uno de los arreglos correspondientes */
/*******************************************************

    Declaracion de elementos

*******************************************************/

if(localStorage.getItem('ids_producto_CU6') != null){

aIdTienda = JSON.parse(localStorage.getItem('ids_tienda_CU6'));
aIdProducto = JSON.parse(localStorage.getItem('ids_producto_CU6'));
aNombreProducto = JSON.parse(localStorage.getItem('nombre_producto_CU6'));
aDescripcionProducto = JSON.parse(localStorage.getItem('descripcion_producto_CU6'));
aPrecioProductoSinImpuesto = JSON.parse(localStorage.getItem('precio_producto_sin_impuesto_CU6'));
aMarcaProducto = JSON.parse(localStorage.getItem('marca_producto_CU6'));
aProvedorProducto = JSON.parse(localStorage.getItem('provedor_producto_CU6'));
aCantidadProducto = JSON.parse(localStorage.getItem('cantidad_producto_CU6'));
aTipoProducto = JSON.parse(localStorage.getItem('tipo_producto_CU6'));
aEstadoProducto= JSON.parse(localStorage.getItem('estado_producto_CU6'));
aImagenProducto= JSON.parse(localStorage.getItem('imagen_producto_CU6'));

}

cargarComboBox ();

function cargarComboBox () {
  //Proveedores
  if(localStorage.getItem("id_proveedor_CU10") !=null){
  	var aIdProveedor= JSON.parse(localStorage.getItem('id_proveedor_CU10'));
  	var aNombreProveedor= JSON.parse(localStorage.getItem("nombre_proveedor_CU10"));
  	var aTelefonoProveedor= JSON.parse(localStorage.getItem("numero_telefono_CU10"));
  	var aTelefono2Proveedor= JSON.parse(localStorage.getItem("numero_telefono2_CU10"));
  	var aFechaInicioProveedor= JSON.parse(localStorage.getItem("fecha_inicio_CU10"));
  	var aIdTiendaProveedor = JSON.parse(localStorage.getItem('id_tienda_CU10'));

    var nLength = aIdProveedor.length
  }
  var elSelectProvedorProducto = document.querySelector("#txtProvedorProducto");
  for (var i = 0; i < nLength; i++) {
    if (aIdTiendaProveedor[i] == JSON.parse(sessionStorage.getItem("sesion_id_tienda"))){
      var option = document.createElement('option');
        option.setAttribute("value", aIdProveedor[i]);
        var nodoDeTexto = document.createTextNode(aNombreProveedor[i]);
      option.appendChild(nodoDeTexto);
      elSelectProvedorProducto.appendChild(option);
    }
  }

  //Tipos de producto
  //Proveedores
  if(localStorage.getItem("id_tipo_producto_CU46") !=null){
  	var aIdTipoProducto= JSON.parse(localStorage.getItem('id_tipo_producto_CU46'));
  	var aNombreTipoProducto= JSON.parse(localStorage.getItem("nombre_producto_CU46"));
  	var aDescripcionTipoProducto= JSON.parse(localStorage.getItem("descripcion_producto_CU46"));
  	var aPercederoTipoProducto= JSON.parse(localStorage.getItem("perecedero_producto_CU46"));
  	var aFechaCaducidadTipoProducto= JSON.parse(localStorage.getItem("fecha_producto_CU46"));
  	var aIdTiendaTipoProducto= JSON.parse(localStorage.getItem("id_tienda_CU46"));

    var nLength = aIdTipoProducto.length
  }
  var elSelectTipoProducto = document.querySelector("#txtTipoProducto");
  for (var i = 0; i < nLength; i++) {
    if (aIdTiendaTipoProducto[i] == JSON.parse(sessionStorage.getItem("sesion_id_tienda"))){
      var option = document.createElement('option');
        option.setAttribute("value", aIdTipoProducto[i]);
        var nodoDeTexto = document.createTextNode(aNombreTipoProducto[i]);
      option.appendChild(nodoDeTexto);
      elSelectTipoProducto.appendChild(option);
    }
  }
}

function validar(){
  /*Variables para los elementos del formulario*/
  var txtIdProducto = document.querySelector('#txtIdProducto');
  var txtNombreProducto = document.querySelector('#txtNombreProducto');
  var txtDescripcionProducto = document.querySelector('#txtDescripcionProducto');
  var txtPrecioProductoSinImpuesto = document.querySelector('#txtPrecioSinImpuesto');
  var txtMarcaProducto = document.querySelector('#txtMarcaProducto');
  var txtProvedorProducto = document.querySelector('#txtProvedorProducto');
  var txtCantidadProducto = document.querySelector('#txtCantidadProducto');
  var txtTipoProducto = document.querySelector('#txtTipoProducto');

  /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

  var nIdProducto = Number(txtIdProducto.value);
  var sNombreProducto = txtNombreProducto.value;
  var sDescripcionProducto = txtDescripcionProducto.value;
  var nPrecioProductoSinImpuesto = Number(txtPrecioSinImpuesto.value);
  var sMarcaProducto = txtMarcaProducto.value;
  var sProvedorProducto = Number(txtProvedorProducto.value);
  var nCantidadProducto = Number(txtCantidadProducto.value);
  var nTipoProducto = Number(txtTipoProducto.value);

  var idLength = aIdProducto.length;
  var CorreoLibre = 1;
	for (var i = 0; i < idLength; i++) {
		if (aIdProducto[i] == nIdProducto) {
			CorreoLibre = 0;
		}
	}
	if (CorreoLibre == 1) {
    registrar(nIdProducto,sNombreProducto, sDescripcionProducto,nPrecioProductoSinImpuesto,sMarcaProducto,sProvedorProducto,nCantidadProducto,nTipoProducto);

	}

	else {
		swal({
			title: "Error!",
			text: "Este código ya se encuentra registrado.",
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

function registrar(pnIdProducto, psNombreProducto, psDescripcionProducto, pnPrecioProductoSinImpuesto,psMarcaProducto,psProvedorProducto,pnCantidadProducto,pnTipoProducto){
  /*Almacenar los valores en cada uno de los arreglos correspondientes*/

  aIdTienda.push(JSON.parse(sessionStorage.getItem("sesion_id_tienda")));
  aIdProducto.push(pnIdProducto);
  aNombreProducto.push(psNombreProducto);
  aDescripcionProducto.push(psDescripcionProducto);
  aPrecioProductoSinImpuesto.push(pnPrecioProductoSinImpuesto);
  aMarcaProducto.push(psMarcaProducto);
  aProvedorProducto.push(psProvedorProducto);
  aCantidadProducto.push(pnCantidadProducto);
  aTipoProducto.push(pnTipoProducto);
  aEstadoProducto.push(1);
  aImagenProducto.push(imgBase64);

  /*Convertir los arreglos a texto para poderlos almacenar en el localstorage*/
  localStorage.setItem('ids_tienda_CU6',                    JSON.stringify(aIdTienda));
  localStorage.setItem('ids_producto_CU6',                  JSON.stringify(aIdProducto));
  localStorage.setItem('nombre_producto_CU6',               JSON.stringify(aNombreProducto));
  localStorage.setItem('descripcion_producto_CU6',          JSON.stringify(aDescripcionProducto));
  localStorage.setItem('precio_producto_sin_impuesto_CU6',  JSON.stringify(aPrecioProductoSinImpuesto));
  localStorage.setItem('marca_producto_CU6',                JSON.stringify(aMarcaProducto));
  localStorage.setItem('provedor_producto_CU6',             JSON.stringify(aProvedorProducto));
  localStorage.setItem('cantidad_producto_CU6',             JSON.stringify(aCantidadProducto));
  localStorage.setItem('tipo_producto_CU6',                 JSON.stringify(aTipoProducto));
  localStorage.setItem('estado_producto_CU6',               JSON.stringify(aEstadoProducto));
  try {
    localStorage.setItem('imagen_producto_CU6',               JSON.stringify(aImagenProducto));
  } catch (e) {
    console.log(e);
  }

  swal({
    title: "La información fue ingresada correctamente",
    text: "Los datos del producto han sido actualizdos.",
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
