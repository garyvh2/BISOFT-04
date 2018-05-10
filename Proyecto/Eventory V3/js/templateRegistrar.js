function formatoDeContrasenna(string){
  return /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/g.test(string); // $& means the whole matched string
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
var invalid = 0;
function Scroll(){
  setTimeout(function(){
      var error =  document.querySelectorAll(".error");
      $.scrollTo(error[0], 500, {
        offset: -$(window).height() /2
      });
      console.log(error);
      console.log(error[0]);
  }, 1);
  setTimeout(function(){
    invalid = 0;
  }, 10);
}
function MensajeInvalido(textbox) {
      console.log(invalid);
      if (invalid == 0) {
        Scroll();
        invalid = 1;
      }
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
          textbox.setCustomValidity("La cantidad ingresada debe ser menor que " + textbox.getAttribute('max'));
          textbox.classList.add('error');
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

function VolverArriba () {
  var scrollStep = -window.scrollY / (500 / 15),
      scrollInterval = setInterval(function(){
      if ( window.scrollY != 0 ) {
          window.scrollBy( 0, scrollStep );
      }
      else clearInterval(scrollInterval);
  },15);
}
var elBotonRegresarArriba = document.querySelector('#IrArriba');
if (elBotonRegresarArriba) {

  elBotonRegresarArriba.addEventListener('click', VolverArriba());
}
