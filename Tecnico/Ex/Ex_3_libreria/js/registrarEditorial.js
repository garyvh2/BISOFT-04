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
  var txtCedula  = document.querySelector('#txtCedula');
  var txtNombre             = document.querySelector('#txtNombre');
  var txtDireccion           = document.querySelector('#txtDireccion');
  var txtTelefono            = document.querySelector('#txtTelefono');
  var txtAnnoCreacion        = document.querySelector('#txtAnnoCreacion');
  var txtRepresentante  = document.querySelector('#txtRepresentante');


  /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

  var nCedula = Number(txtCedula.value);
  var sNombre       = txtNombre.value;
  var sDireccion     = txtDireccion.value;
  var sTelefono      = txtTelefono.value;
  var nAnno       = Number(txtAnnoCreacion.value);
  var sRepresentante  = txtRepresentante.value;


  registrar(nCedula,sNombre, sDireccion,sTelefono,nAnno,sRepresentante);


  return false;
}

function registrar(pnCedula,psNombre, psDireccion,psTelefono,pnAnno,psRepresentante){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/
  var peticion = $.ajax({
    url: "services/registrarEditorial.php",
    type: "POST",
    data: {
      'pnCedula'        : pnCedula,
      'psNombre'        : psNombre,
      'psDireccion'      : psDireccion,
      'psTelefono'       : psTelefono,
      'pnAnno'   : pnAnno,
      'psRepresentante'        : psRepresentante
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
