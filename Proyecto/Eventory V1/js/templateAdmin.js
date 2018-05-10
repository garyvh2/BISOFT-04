
CambiarValidacion();
function CambiarValidacion () {
  var input     = document.querySelectorAll("input");
  var select    = document.querySelectorAll("select");

  input.forEach(function(item, index){
    if(item.getAttribute("required") == ""){
      item.setAttribute("oninvalid", "MensajeInvalido(this)");
    }
  });
	select.forEach(function(item, index){
		var optionNull = document.createElement('option');
		optionNull.value = "";
    item.insertBefore(optionNull, item.firstChild);
    item.value = "";
		optionNull.innerHTML = "Escoja una opción";
    item.setAttribute("required", "");
    item.setAttribute("oninvalid", "MensajeInvalido(this)");

  });
}

function MensajeInvalido(textbox) {

    if (textbox.value == '') {
        textbox.setCustomValidity('Por favor, complete este campo');
    }
    else if(textbox.validity.typeMismatch){
        textbox.setCustomValidity('Por favor, ingrese un correo electrónico válido');
    }
    else {
        textbox.setCustomValidity('');
    }
    return true;
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




var elBotonMenuUsuario = document.querySelector('#BotonMenuUsuario');
if (elBotonMenuUsuario) {
elBotonMenuUsuario.addEventListener('click', MenuUsuarioActivar);
}

var elBotonRegresarArriba = document.querySelector('#IrArriba');
if (elBotonRegresarArriba) {

  elBotonRegresarArriba.addEventListener('click', VolverArriba);
}

var inputs = document.querySelectorAll( '.SubirAchivo' );
Array.prototype.forEach.call( inputs, function( input )
{
  var label	 = input.nextElementSibling,
    labelVal = label.innerHTML;

  input.addEventListener( 'change', function( e )
  {
    var fileName = '';
    if( this.files && this.files.length > 1 )
      fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    else
      fileName = e.target.value.split( '\\' ).pop();

    if( fileName )
      label.querySelector( 'span' ).innerHTML = fileName;
    else
      label.innerHTML = labelVal;
  });

  // Firefox bug fix
  input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
  input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
});


$("input[type='text']").on('focus blur', function(){
     $(this).parent().toggleClass('is_focused');
})

function Validar (elValue, elLabel) {

  if (elValue != '') {
    elLabel.classList.add('LabelActivo');
  }
  else {
    elLabel.classList.remove('LabelActivo');
  }
}

function VolverArriba () {
  var scrollStep = -window.scrollY / (500 / 15),
      scrollInterval = setInterval(function(){
      if ( window.scrollY != 0 ) {
          window.scrollBy( 0, scrollStep );
      }
      else clearInterval(scrollInterval);
  },15);
}
function MenuLateralActivo (ele) {

    var elSubMenusLaterales = document.querySelectorAll(".SubMenuLateral");
    [].forEach.call(elSubMenusLaterales, function(ele) {
        ele.classList.remove("SubMenuLateraActivo");
    });
    var elBotonMenusLaterales = document.querySelectorAll(".BotonMenuLateral");
    [].forEach.call(elBotonMenusLaterales, function(ele) {
        ele.classList.remove("BotonMenuLateraActivo");
    });

    var elBotonMenuLateral = document.querySelector('#' + ele + ' .BotonMenuLateral');
    elBotonMenuLateral.classList.add('BotonMenuLateraActivo');

    var elBotonSubMenuLateral = document.querySelector('#' + ele + ' .SubMenuLateral');
    elBotonSubMenuLateral.classList.add('SubMenuLateraActivo');
    MenuLateralActivoVar = 1;

}


var MenuUsuarioActivo = 0;
function MenuUsuarioActivar () {
  var elListaMenuUsuario = document.querySelector('#MenuUsuario ul');
  var elBotonMenuUsuario = document.querySelector('#BotonMenuUsuario');
  var elFlecha = document.querySelector('#Flecha');
  if (MenuUsuarioActivo == 0) {
    elListaMenuUsuario.style.display = "block";
    elBotonMenuUsuario.style.background = "#45494e";
    elFlecha.classList.remove('RotarArriba');
    elFlecha.classList.add('RotarAbajo');
    MenuUsuarioActivo = 1;
  }
  else {
    elListaMenuUsuario.style.display = "none";
    elBotonMenuUsuario.style.background = "#34383d";
    elFlecha.classList.remove('RotarAbajo');
    elFlecha.classList.add('RotarArriba');
    MenuUsuarioActivo = 0;
  }
}
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
}
var today = yyyy+'-'+mm+'-'+dd;
function BuscarLista () {

  swal({
    title: "Buscar una lista",
    text: "Ingrese el código que el creador de la lista le envió.",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "Código de lista"
  }, function(inputValue){
    if (inputValue === false)
      return false;
    if (inputValue === "") {
      swal.showInputError("No puede dejar este espacio vacío");
      return false
    }
    var FechaHoy = new Date(today.replace(/-/g, '\/'));


    var aIdListaEvento = JSON.parse(localStorage.getItem('id_lista_evento_CU8'));
    var aEstadoListaEvento = JSON.parse(localStorage.getItem('estado_lista_evento'));
    var aFechaEvento=         JSON.parse(localStorage.getItem('fecha_evento_CU8')); //Se agrega en un formulario

    var listaExiste = false;
    for (var i = 0; i < aIdListaEvento.length; i++) {
      if (inputValue == aIdListaEvento[i]) {
        var FechaEvento = new Date(aFechaEvento[i].replace(/-/g, '\/'));
        if (FechaHoy <= FechaEvento) {
          if (aEstadoListaEvento[i] == 0) {
            listaExiste = false;
          } else if (aEstadoListaEvento[i] == 1) {
            listaExiste = true;
          }
        } else {
          listaExiste = false;
          aEstadoListaEvento[i] = 2;
          localStorage.setItem('estado_lista_evento', JSON.stringify(aEstadoListaEvento));
        }
      }
    }
    if (listaExiste == true) {
      window.location = "buscarListasAdmin.html?idEvento=" + inputValue;
    } else {
      swal(
        "Error", "El número ingresado no coincide con ninguna lista, o la misma aún no está habilitada.", "error");
    }
  });
}
var elPago = document.querySelector('#Cajero ul a');
if (elPago) {
  elPago.removeAttribute('href');
  elPago.setAttribute('onclick', 'RealizarCompra()');
}

function RealizarCompra () {

  swal({
    title: "Realizar una compra",
    text: "Ingrese el código reserva proveído por el sistema.",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "Código de reserva"
  }, function(inputValue){
    if (inputValue === false)
      return false;
    if (inputValue === "") {
      swal.showInputError("No puede dejar este espacio vacío");
      return false
    }
    var IdReserva          = [];
    var IdProductoReserva  = [];
    var IdListaReserva     = [];
    var IdUsuarioReserva   = [];
    var CantidadReserva    = [];
    var EstadoReserva    = [];
    if (localStorage.getItem('id_reserva') != null) {
      IdReserva=          JSON.parse(localStorage.getItem('id_reserva'));
      IdProductoReserva=  JSON.parse(localStorage.getItem('id_producto_reserva'));
      IdListaReserva=     JSON.parse(localStorage.getItem('id_lista_reserva'));
      IdUsuarioReserva=    JSON.parse(localStorage.getItem('id_usuario_reserva'));
      CantidadReserva=    JSON.parse(localStorage.getItem('cantidad_reserva'));
      EstadoReserva=    JSON.parse(localStorage.getItem('estado_reserva'));
    }
    if(localStorage.getItem("id_lista_evento_CU8") !=null){
      var aIdListaEvento=       JSON.parse(localStorage.getItem('id_lista_evento_CU8')); //Se auto genera
      var aIdTiendaLista=       JSON.parse(localStorage.getItem('id_tienda_evento_CU8')); //Se escoge en una lista
    }

    var reservaExiste = false;
    for (var i = 0; i < IdReserva.length; i++) {
      var idtiendaListaEvento;
      for (var e = 0; e < aIdListaEvento.length; e++) {
        if (aIdListaEvento[e] = IdListaReserva[i]) {
          idtiendaListaEvento = aIdTiendaLista[e];
          break;
        }
      }
      if (idtiendaListaEvento == sessionStorage.getItem('sesion_id_tienda')) {
        if (inputValue == IdReserva[i]) {
          if (EstadoReserva[i] == 1) {
            reservaExiste = true;
            break;
          }
        }
      }
    }
    if (reservaExiste == true) {
      window.location = "factura.html?idReserva=" + inputValue;
    } else {
      swal(
        "Error", "El número ingresado no coincide con ninguna reserva, o la misma aún no está habilitada.", "error");
    }
  });
}

BotonesUsuarios();
function BotonesUsuarios () {
  var elCajero = document.querySelector("#Cajero");
  var elServicio = document.querySelector("#Servicio");
  var elInventario = document.querySelector("#Inventario");
  var elProveedores = document.querySelector("#Proveedores");
  var elReportes = document.querySelector("#Reportes");
  var elConfiguracion = document.querySelector("#Configuracion");
  if (sessionStorage.getItem("sesion_tipo_usuario") == 2) {
    elCajero.style.display = "none";
    elInventario.style.display = "none";
    elProveedores.style.display = "none";
    elReportes.style.display = "none";
  } else if (sessionStorage.getItem("sesion_tipo_usuario") == 3) {
    elServicio.style.display = "none";
    elInventario.style.display = "none";
    elProveedores.style.display = "none";
    elReportes.style.display = "none";
    elConfiguracion.style.display = "none";
  }
}
