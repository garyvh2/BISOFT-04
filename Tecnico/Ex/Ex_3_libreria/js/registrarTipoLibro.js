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
  var cbxLibros     = document.querySelector('#cbxLibros');
  var txtNombre     = document.querySelector('#txtNombre');
  var txtValor      = document.querySelector('#txtValor');


  /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

  var nIdLibro       = Number(cbxLibros.value);
  var sNombreVersion     = txtNombre.value;
  var nValorVersion      = txtValor.value;


  registrar(nIdLibro, sNombreVersion,nValorVersion);


  return false;
}

function registrar(pnIdLibro, psNombreVersion,pnValorVersion){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/
  var peticion = $.ajax({
    url: "services/registrarTipoLibro.php",
    type: "POST",
    data: {
      'pnIdLibro'        : pnIdLibro,
      'psNombreVersion'      : psNombreVersion,
      'pnValorVersion'       : pnValorVersion
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

cargarComboBox();
function cargarComboBox () {
  var peticion = $.ajax({
      url: "services/listarLibros.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,


      success: function(response){

        var elSelectProvedorProducto = document.querySelector("#cbxLibros");
        for (var i = 0; i < response.length; i++) {
            var option = document.createElement('option');
              option.setAttribute("value", Number(response[i]['id']));
              var nodoDeTexto = document.createTextNode(response[i]['titulo']);
            option.appendChild(nodoDeTexto);
            elSelectProvedorProducto.appendChild(option);
        }


      },
      error: function(request, error) {
          alert(error);
      }
  });
}
