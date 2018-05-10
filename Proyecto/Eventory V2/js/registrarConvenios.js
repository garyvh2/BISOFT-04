
/****************************************************************************
  Autor: Alejandro Castillo
  Fecha de creacion: 14/07/2016
  Fecha de modificacion: 1/08/2016

  EVENTORY APP
  2016

  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.

*****************************************************************************/


cargarComboBox();
function cargarComboBox () {
  var peticion = $.ajax({
      url: "services/listarUsuariosPorJuridico.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',

      success: function(response){
        var elSelectProvedorProducto = document.querySelector("#txtCedJuridicaConvenio");
        for (var i = 0; i < response.length; i++) {
            var option = document.createElement('option');
              option.setAttribute("value", Number(response[i]['id']));
              var nodoDeTexto = document.createTextNode("(" + response[i]['identificacion'] + ") " + response[i]['primer_nombre'] + " " + response[i]['primer_apellido']);
            option.appendChild(nodoDeTexto);
            elSelectProvedorProducto.appendChild(option);
        }
      },
      error: function(request, error) {
          alert(error);
      }
  });

}
function validar(){
  /*Variables para los elementos del formulario*/
  var elCedJuridicaConvenio=document.querySelector('#txtCedJuridicaConvenio'),
  elNombreConvenio=document.querySelector('#txtNombreConvenio'),
  elDescripcionConvenio=document.querySelector('#txtDescripcionConvenio'),
  elDescuentoConvenio=document.querySelector('#txtDescuentoConvenio');
/*Variables para los valores que están dentro de cada uno de los elementos del formulario*/
  var nCedJuridicaConvenio=Number(elCedJuridicaConvenio.value),
  sNombreConvenio=elNombreConvenio.value,
  sDescripcionConvenio=elDescripcionConvenio.value,
  nDescuentoConvenio=Number(elDescuentoConvenio.value);

  registrarConvenio(nCedJuridicaConvenio,sNombreConvenio,sDescripcionConvenio,nDescuentoConvenio);
  return false;
}

function registrarConvenio(pnCedJuridicaConvenio,psNombreConvenio,psDescripcionConvenio,pnDescuentoConvenio){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/

  var peticion = $.ajax({
    url: "services/registrarConvenios.php",
    type: "POST",
    data: {
           'nCedJuridicaConvenio' : pnCedJuridicaConvenio,
           'sNombreConvenio'      : psNombreConvenio,
           'sDescripcionConvenio' : psDescripcionConvenio,
           'nDescuentoConvenio'   : pnDescuentoConvenio
         },
    //dataType: 'json',

    success: function(response){
      swal({
        title: "La información fue ingresada correctamente",
        text: "Los datos del convenio han sido actualizados.",
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
