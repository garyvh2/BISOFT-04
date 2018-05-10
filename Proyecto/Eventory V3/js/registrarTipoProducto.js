



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
  if (txtPerecederoProducto.checked == true) {
    var bPerecederoProducto= 1;
  } else {
    var bPerecederoProducto= 0;
  }
  var dFechaCaducidad=txtFechaCaducidad.value;



  registrar(sNombreProducto,sDescripcionProducto,bPerecederoProducto,dFechaCaducidad);
  return false;
}

	function registrar(psNombreProducto, psDescripcionProducto,pbPerecederoProducto,dFechaCaducidad){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/
  var peticion = $.ajax({
    url: "services/registrarTipoProducto.php",
    type: "POST",
    data: {
      'psNombreProducto'        : psNombreProducto,
      'psDescripcionProducto'   :     psDescripcionProducto,
      'pbPerecederoProducto'           : pbPerecederoProducto,
      'pdFechaCaducidad'           : dFechaCaducidad

    },
    success: function(response) {
      swal({
        title: "La información fue ingresada correctamente",
        text: "Los datos del tipo de producto han sido ingresados.",
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
