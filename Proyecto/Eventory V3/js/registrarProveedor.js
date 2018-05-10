

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



function registrar(psNombre, pnTelefono1,pnTelefono2,pdFechaInicio){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/
  var peticion = $.ajax({
    url: "services/registrarProveedor.php",
    type: "POST",
    data: {
      'psNombreProveedor'        : psNombre,
      'pnTelefono1'   : 		pnTelefono1,
      'pnTelefono2'           : pnTelefono2,
      'pdFechaInicio'           : pdFechaInicio,
      'pnEstado'			:1
    },
    success: function(response) {
      swal({
        title: "La información fue ingresada correctamente",
        text: "Los datos del tipo de evento han sido ingresados.",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "green",
        confirmButtonText: "Continuar",
        closeOnConfirm: false
      });
     $( '#Form' ).each(function(){
        this.reset();
     });
    },
    error: function(request, cerror) {
      alert(cerror);
    }
  });
}
