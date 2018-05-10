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
var aIdEvento = [];
var aNombreEvento = [];
var aDescripcionEvento = [];
var aDescuento = [];
var aImagenEvento = [];
var aEstadoEvento = [];
var aIdTienda = [];

/* Almacenar los valores en cada uno de los arreglos correspondientes */
/*******************************************************

    Declaracion de elementos

*******************************************************/

if(localStorage.getItem('id_evento_CU7') != null){

aIdEvento = JSON.parse(localStorage.getItem('id_evento_CU7'));
aNombreEvento = JSON.parse(localStorage.getItem('nombre_evento_CU7'));
aDescripcionEvento = JSON.parse(localStorage.getItem('descripcion_evento_CU7'));
aDescuento = JSON.parse(localStorage.getItem('descuento_CU7'));
aImagenEvento= JSON.parse(localStorage.getItem('imagen_evento_CU7'));
aEstadoEvento= JSON.parse(localStorage.getItem('estado_evento_CU7'));
aIdTienda= JSON.parse(localStorage.getItem('id_tienda_CU7'));

}

function validar(){
  /*Variables para los elementos del formulario*/
  var txtNombreEvento = document.querySelector('#txtNombreEvento');
  var txtDescripcionEvento = document.querySelector('#txtDescripcionEvento');
  var txtDescuento = document.querySelector('#txtDescuento');


  /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

  var sNombreEvento = txtNombreEvento.value;
  var sDescripcionEvento = txtDescripcionEvento.value;
  var nDescuento = Number(txtDescuento.value);



  registrar(sNombreEvento, sDescripcionEvento,nDescuento);



  return false;
}

function registrar(psNombreEvento, psDescripcionEvento, pnDescuento){
  /*Almacenar los valores en cada uno de los arreglos correspondientes*/

 /*PARA QUE ES ESTA VARIABLE aIdEvento.push(JSON.parse(sessionStorage.getItem("sesion_id_tienda")));*/
   if ( aIdEvento.length != 0) {
      aIdEvento.push( aIdEvento.length + 1);
   }
   else {
      aIdEvento.push(1);
   }
  aNombreEvento.push(psNombreEvento);
  aDescripcionEvento.push(psDescripcionEvento);
  aDescuento.push(pnDescuento);
  aEstadoEvento.push(1);
  aImagenEvento.push(imgBase64);
  aIdTienda.push(JSON.parse(sessionStorage.getItem("sesion_id_tienda")));

  /*Convertir los arreglos a texto para poderlos almacenar en el localstorage*/
  localStorage.setItem('id_evento_CU7',                   JSON.stringify(aIdEvento));
  localStorage.setItem('nombre_evento_CU7',               JSON.stringify(aNombreEvento));
  localStorage.setItem('descripcion_evento_CU7',          JSON.stringify(aDescripcionEvento));
  localStorage.setItem('descuento_CU7',                   JSON.stringify(aDescuento));
  localStorage.setItem('imagen_evento_CU7',               JSON.stringify(aImagenEvento));
  localStorage.setItem('estado_evento_CU7',               JSON.stringify(aEstadoEvento));
  localStorage.setItem('id_tienda_CU7',                   JSON.stringify(aIdTienda));

  swal({
    title: "La información fue ingresada correctamente",
    text: "Los datos del evento han sido actualizados.",
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
