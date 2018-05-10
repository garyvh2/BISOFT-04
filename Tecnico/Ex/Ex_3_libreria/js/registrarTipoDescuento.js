/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.

*******************************************************************************/
function validar(){
  /*Variables para los elementos del formulario*/
  var txtNombre     = document.querySelector('#txtNombre');
  var txtDescuento     = document.querySelector('#txtDescuento');


  /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

  var sNombre     = txtNombre.value;
  var nDescuento       = Number(txtDescuento.value);


  registrar(sNombre, nDescuento);


  return false;
}

function registrar(psNombre, pnDescuento){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/
  var peticion = $.ajax({
    url: "services/registrarTipoDescuento.php",
    type: "POST",
    data: {
      'psNombre'        : psNombre,
      'pnDescuento'      : pnDescuento
    },
    success: function() {
      swal({
        title: "La información fue ingresada correctamente",
        text: "Los datos del libro han sido ingresados.",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "green",
        confirmButtonText: "Continuar",
        closeOnConfirm: false
      });
    },
    error: function(request, cerror) {
      alert(cerror);
    }
  });
}
