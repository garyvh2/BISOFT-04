function validar(vThis){
  /*Variables para los elementos del formulario*/
  var txtNombreEvento = document.querySelector('#txtNombreEvento');
  var txtDescripcionEvento = document.querySelector('#txtDescripcionEvento');
  var txtDescuento = document.querySelector('#txtDescuento');


  /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

  var sNombreEvento = txtNombreEvento.value;
  var sDescripcionEvento = txtDescripcionEvento.value;
  var nDescuento = Number(txtDescuento.value);
  var sImagePath;

  /*****************************************************************************
    Se realiza la subida de la imagen
  *****************************************************************************/
  var peticion = $.ajax({
    url					: "services/imageUploader.php?path=../imgs/uploads/tipo_evento/", //Se envia el path como paremetro para el envio de la imagen
    type				: "POST",
    data				: new FormData(vThis),
    contentType	: false,
    cache				: false,
    processData	:	false,
    async: false,
    timeout: 30000,

    success: function(data) {
      sImagePath = data.replace('../','');
    },
    error: function(request, cerror) {
      alert(cerror);
    }
  });

  registrar(sNombreEvento, sDescripcionEvento,nDescuento,sImagePath);


  return false;
}

function registrar(psNombreEvento, psDescripcionEvento, pnDescuento, psImagePath){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/
  var peticion = $.ajax({
    url: "services/registrarTipoEvento.php",
    type: "POST",
    data: {
      'psNombreEvento'        : psNombreEvento,
      'psDescripcionEvento'   : psDescripcionEvento,
      'pnDescuento'           : pnDescuento,
      'psImagePath'           : psImagePath
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
