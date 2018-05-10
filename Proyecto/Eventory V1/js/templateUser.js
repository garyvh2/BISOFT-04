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
		item.appendChild(optionNull);
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
        textbox.setCustomValidity('Por favor ingrese un correo electrónico válido');
    }
    else {
        textbox.setCustomValidity('');
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
function MenuLateralActivo (el) {

    var elSubMenusLaterales = document.querySelectorAll(".SubMenuLateral");
    [].forEach.call(elSubMenusLaterales, function(ele) {
        ele.classList.remove("SubMenuLateraActivo");
    });
    var elBotonMenusLaterales = document.querySelectorAll(".BotonMenuLateral");
    [].forEach.call(elBotonMenusLaterales, function(ele) {
        ele.classList.remove("BotonMenuLateraActivo");
    });

    var elBotonMenuLateral = document.querySelector('#' + el + ' .BotonMenuLateral');
    elBotonMenuLateral.classList.add('BotonMenuLateraActivo');

    var elBotonSubMenuLateral = document.querySelector('#' + el + ' .SubMenuLateral');
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

function BuscarLista () {
  if (sessionStorage.length == 0) {
    swal({
      title: "Buscar una lista.",
      text: "Digite el código que el creador de la lista le envió.",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Código de lista"
    }, function(inputValue){
      if (inputValue === false)
        return false;
      if (inputValue === "") {
        swal.showInputError("Debe digitar algo!");
        return false;
      }
      var aIdListaEvento = JSON.parse(localStorage.getItem('id_lista_evento_CU8'));
      var aEstadoListaEvento = JSON.parse(localStorage.getItem('estado_lista_evento'));
      var listaExiste = false;
      for (var i = 0; i < aIdListaEvento.length; i++) {
        if (inputValue == aIdListaEvento[i]) {
          if (aEstadoListaEvento[i] == 1) {
            listaExiste = true;
          }
        }
      }
      if (listaExiste == true) {
        window.location = "buscarListasInvitado.html?idEvento=" + inputValue;
      } else {
        swal("Error", "El número ingresado no coincide con ninguna lista, o la misma aún no está habilitada.", "error");
      }
    });
  } else {
    swal({      title: "Buscar una lista.",
      text: "Digite el código que el creador de la lista le envió.",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Código de lista"
    }, function(inputValue){
      if (inputValue === false)
        return false;
      if (inputValue === "") {
        swal.showInputError("Debe digitar algo!");
        return false;
      }
      var aIdListaEvento = JSON.parse(localStorage.getItem('id_lista_evento_CU8'));
      var aEstadoListaEvento = JSON.parse(localStorage.getItem('estado_lista_evento'));
      var listaExiste = false;
      for (var i = 0; i < aIdListaEvento.length; i++) {
        if (inputValue == aIdListaEvento[i]) {
          if (aEstadoListaEvento[i] == 1) {
            listaExiste = true;
          }
        }
      }
      if (listaExiste == true) {
        window.location = "buscarListas.html?idEvento=" + inputValue;
      } else {
        swal("Error", "El número ingresado no coincide con ninguna lista, o la misma aún no está habilitada.", "error");
      }
    });
  }
}
