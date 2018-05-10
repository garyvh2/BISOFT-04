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
  var txtISBN             = document.querySelector('#txtISBN');
  var txtTitulo           = document.querySelector('#txtTitulo');
  var txtAutor            = document.querySelector('#txtAutor');
  var cbxEditorial        = document.querySelector('#cbxEditorial');
  var txtAnnoPublicacion  = document.querySelector('#txtAnnoPublicacion');
  var txtGenero  = document.querySelector('#txtGenero');


  /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

  var nISBN       = Number(txtISBN.value);
  var sTitulo     = txtTitulo.value;
  var sAutor      = txtAutor.value;
  var nEditorial  = Number(cbxEditorial.value);
  var nAnno       = Number(txtAnnoPublicacion.value);
  var sGenero     = txtGenero.value;

  registrar(nISBN, sTitulo,sAutor,nEditorial,nAnno,sGenero);


  return false;
}

function registrar(pnISBN, psTitulo,psAutor,pnEditorial,pnAnno,psGenero){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/
  var peticion = $.ajax({
    url: "services/registrarLibro.php",
    type: "POST",
    data: {
      'pnISBN'        : pnISBN,
      'psTitulo'      : psTitulo,
      'psAutor'       : psAutor,
      'pnEditorial'   : pnEditorial,
      'pnAnno'        : pnAnno,
      'psGenero'      : psGenero
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
      url: "services/listarEditoriales.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,


      success: function(response){

        var elSelectProvedorProducto = document.querySelector("#cbxEditorial");
        for (var i = 0; i < response.length; i++) {
            var option = document.createElement('option');
              option.setAttribute("value", Number(response[i]['id']));
              var nodoDeTexto = document.createTextNode(response[i]['nombre']);
            option.appendChild(nodoDeTexto);
            elSelectProvedorProducto.appendChild(option);
        }


      },
      error: function(request, error) {
          alert(error);
      }
  });
}
