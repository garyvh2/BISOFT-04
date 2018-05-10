CambiarValidacion();
function CambiarValidacion () {
  var input     = document.querySelectorAll("input");
  var select    = document.querySelectorAll("select");


  input.forEach(function(item, index){
    if(item.getAttribute("required") == ""){
      item.setAttribute("oninvalid", "MensajeInvalido(this)");
    }
    if(item.getAttribute("type") == "number"){
      item.setAttribute("min", "0");
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
    else if (textbox.validity.rangeUnderflow) {
        textbox.setCustomValidity("La cantidad ingresada debe ser mayor que 0");
    }
    else if (textbox.validity.rangeOverflow) {
        textbox.setCustomValidity("La cantidad ingresada debe ser menor que " + textbox.getAttribute('max'));
    }
    else {
        textbox.setCustomValidity('');
    }
    return true;
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
