function formatoDeContrasenna(string){
  return /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/g.test(string); // $& means the whole matched string
}
function cleanUpSpecialChars(s) {
  if (s.normalize != undefined) {
      s = s.normalize ("NFKD");
  }
  return s.replace (/[\u0300-\u036F]/g, "");

}

ComprobarSesion();
function ComprobarSesion () {
  var peticion = $.ajax({
    url					: "services/sessionExists.php", //Se envia el path como paremetro para el envio de la imagen
    type				: "POST",
    data				: {

    },
    contentType	: false,
    cache				: false,
    processData	:	false,
    async: false,
    timeout: 30000,

    success: function(data) {
      if (data == "false") {
        window.location = "iniciarSesion.html";
      } else {
        CargarDatosDeUsuario();
      }
    },
    error: function(request, cerror) {
      alert(cerror);
    }
  });
}
function CerrarSesion () {
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
      if (data == "true") {
        window.location = "iniciarSesion.html";
      }
    },
    error: function(request, cerror) {
      alert(cerror);
    }
  });
}

CambiarValidacion();
function CambiarValidacion () {
  var input     = document.querySelectorAll("input");
  var select    = document.querySelectorAll("select");


  input.forEach(function(item, index){
    if(item.getAttribute("required") == ""){
      item.setAttribute("oninvalid", "MensajeInvalido(this)");
      if (item.getAttribute("type") != "date") {
        item.setAttribute("onfocusout", item.getAttribute("onfocusout") + "; this.setCustomValidity('');");
      }
      item.parentElement.classList.add('required');
    }
    if(item.getAttribute("type") == "number"){
      item.setAttribute("min", "0");
    }
    if(item.getAttribute("type") == "date"){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

                var yyyy = today.getFullYear() -18;
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        var today = yyyy+'-'+mm+'-'+dd;
        item.setAttribute("max", today);
        item.setAttribute("min", "1900-01-01");
    }
    item.setAttribute("onchange", "this.classList.remove('error');");
  });
	select.forEach(function(item, index){
		var optionNull = document.createElement('option');
		optionNull.value = "";
    item.insertBefore(optionNull, item.firstChild);
    item.value = "";
		optionNull.innerHTML = "Escoja una opción";
    item.setAttribute("required", "");
    item.parentElement.classList.add('required');
    item.setAttribute("oninvalid", "MensajeInvalido(this)");
    item.setAttribute("onfocusout", item.getAttribute("onfocusout") + "; this.setCustomValidity('');");
    item.setAttribute("onchange", "this.classList.remove('error');");

  });
}
function ImageExist(url)
{
   var img = new Image();
   img.src = url;
   return img.height != 0;
}
function CargarDatosDeUsuario(){
  var elFotoPefil = document.querySelector("#BotonMenuUsuario div");
  if (elFotoPefil) {
    var peticion = $.ajax({
        url: "services/selectUsuario.php",
        type: "POST",
        data: {},
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response){
          var elCajero = document.querySelector("#Cajero");
          var elServicio = document.querySelector("#Servicio");
          var elInventario = document.querySelector("#Inventario");
          var elProveedores = document.querySelector("#Proveedores");
          var elReportes = document.querySelector("#Reportes");
          var elConfiguracion = document.querySelector("#Configuracion");


          var elFotoPefil = document.querySelector("#BotonMenuUsuario div");
          if (elFotoPefil) {
            if (ImageExist(response[0]['foto_perfil'])) {
              elFotoPefil.style.backgroundImage = "url(" + response[0]['foto_perfil'] + ")";
              elFotoPefil.style.backgroundRepeat  = "no-repeat";
              elFotoPefil.style.backgroundSize = "cover";
            }
          }
          var elTipoUsuarioInformacionPerfil = document.querySelector("#TipoUsuarioInformacionPerfil");
          if (elTipoUsuarioInformacionPerfil) {
            var tipoUsuario;


            if (Number(response[0]['tipo']) == 2){
              elCajero.style.display = "none";
              elInventario.style.display = "none";
              elProveedores.style.display = "none";
              tipoUsuario = "Serv. al cliente";
              elConfiguracion.style.display = "none";
            }
            if (Number(response[0]['tipo']) == 3){
              tipoUsuario = "Cajero";
              elServicio.style.display = "none";
              elInventario.style.display = "none";
              elProveedores.style.display = "none";
              elConfiguracion.style.display = "none";
            }
            if (Number(response[0]['tipo']) == 1){
              tipoUsuario = "Administrador";
            }
            elTipoUsuarioInformacionPerfil.innerHTML = tipoUsuario;
          }

          var elNombreUsuario = document.querySelector("#BotonMenuUsuario h2");
          if (elNombreUsuario) {
            elNombreUsuario.innerHTML = response[0]['primer_nombre'] + " " + response[0]['primer_apellido'];
          }

          if (Number(response[0]['tipo']) != 4) {
            var peticion2 = $.ajax({
                url: "services/selectTienda.php",
                type: "POST",
                data: {},
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                dataType: 'json',
                async: false,
                timeout: 30000,

                success: function(response){
                  var elFotoPerfilInformacion = document.querySelector("#Foto");

                  if (elFotoPerfilInformacion) {
                    if (ImageExist(response[0]['logo_tienda'])) {
                      elFotoPerfilInformacion.style.backgroundColor = "#fff";
                      elFotoPerfilInformacion.style.backgroundImage = "url(" + response[0]['logo_tienda'] + ")";
                      elFotoPerfilInformacion.style.backgroundRepeat  = "no-repeat";
                      elFotoPerfilInformacion.style.backgroundSize  = "50px";
                    }
                  }

                  var elTiendaInformacionPerfil = document.querySelector("#TiendaInformacionPerfil");
                  if (elTiendaInformacionPerfil) {
                    elTiendaInformacionPerfil.innerHTML = response[0]['nombre'];
                  }
                },
                error: function(request, error) {
                    alert(error);
                }
            });
          }
        },
        error: function(request, error) {
            alert(error);
        }
    });
  }
}

function IrAlPerfil () {
  var peticion = $.ajax({
      url: "services/selectUsuario.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,

      success: function(response){
          if (Number(response[0]['tipo']) != 4){
            window.location='perfilUsuario.html';
          }else {
            window.location='perfilCliente.html';
          }
      },
      error: function(request, error) {
          alert(error);
      }
  });
}
var invalid = 0;
function Scroll(){
  setTimeout(function(){
      var error =  document.querySelectorAll(".error");
      $.scrollTo(error[0], 500, {
        offset: -$(window).height() /2
      });
  }, 1);
  setTimeout(function(){
    invalid = 0;
  }, 10);
}
function MensajeInvalido(textbox) {
      if (textbox.value == '') {
          textbox.setCustomValidity('Por favor, complete este campo');
          textbox.classList.add('error');
      }
      else if(textbox.validity.typeMismatch){
          textbox.setCustomValidity('Por favor, ingrese un correo electrónico válido');
          textbox.classList.add('error');
      }
      else if (textbox.validity.rangeUnderflow) {
          textbox.setCustomValidity("La cantidad ingresada debe ser mayor que " + textbox.getAttribute('min'));
          textbox.classList.add('error');
      }
      else if (textbox.validity.rangeOverflow) {
        if (textbox.getAttribute("type") == "date") {
          textbox.setCustomValidity("Debe ser mayor de edad para poder registrarse");
          textbox.classList.add('error');
        } else {
          textbox.setCustomValidity("La cantidad ingresada debe ser menor que " + textbox.getAttribute('max'));
          textbox.classList.add('error');
        }
      }
      else {
          textbox.setCustomValidity('');
      }
      if (invalid == 0) {
        Scroll();
        invalid = 1;
      }


    return true;
}

var elBotonMenuUsuario = document.querySelector('#BotonMenuUsuario');
if (elBotonMenuUsuario) {
elBotonMenuUsuario.addEventListener('click', MenuUsuarioActivar);
}

var elBotonRegresarArriba = document.querySelector('#IrArriba');
if (elBotonRegresarArriba) {

  elBotonRegresarArriba.addEventListener('click', VolverArriba);
}


//Muestra el nombre en el input de archivos
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
//Habilita la animacion del label de los inputs
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
    var peticion = $.ajax({
      url: "services/checkLista.php",
      type: "POST",
      data: {
             'id_lista' : inputValue
           },
      dataType: 'json',

      success: function(data){
        if (data == 1) {
          window.location = "buscarListasAdmin.html?idLista=" + inputValue;
        } else if (data == 2) {
          swal(
            "Error", "El evento ha pasado.", "error");
        } else if (data == 3){
          swal(
            "Error", "La lista ingresada se encuentra deshabilitada.", "error");
        } else if (data == 4) {
          swal(
            "Error", "El número ingresado pertenece a una lista que no se encuentra disponible.", "error");
        }
      },
      error: function(request, cerror) {
        alert(cerror);
      }
    });

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
    var peticion = $.ajax({
      url					: "services/checkReserva.php", //Se envia el path como paremetro para el envio de la imagen
      type				: "POST",
      data				: {
        'id_reserva' : inputValue
      },
      async: false,
      timeout: 30000,
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',

      success: function(data) {
        if (data == 1) {
          window.location = "factura.html?idReserva=" + inputValue;
        } else if (data == 0) {
          swal(
            "Error", "El número ingresado no pertenece a esta tienda.", "error");
        } else if (data == 2){
          swal(
            "Error", "El número ingresado pertenece a una reserva que se encuentra deshabilitada.", "error");
        } else if (data == 3) {
          swal(
            "Error", "El número ingresado pertenece a una lista que no se encuentra disponible.", "error");
        } else if (data == 4) {
          swal(
            "Error", "El evento ha pasado.", "error");
        }
      },
      error: function(request, cerror) {
        alert(cerror);
      }
    });
  });
}
