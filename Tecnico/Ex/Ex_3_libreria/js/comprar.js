/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.

*******************************************************************************/
localStorage.clear();
function validar(){
  /*Variables para los elementos del formulario*/
  var cbxLibro             = document.querySelector('#cbxLibro');
  var cbxVersionLibro      = document.querySelector('#cbxVersionLibro');
  var txtCantidad      = document.querySelector('#txtCantidad');


  /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/
  var sNombreLibro    = cbxLibro.options[cbxLibro.selectedIndex].innerHTML;
  var nIdVersion      = Number(cbxVersionLibro.value);
  var sNombreVersion  = cbxVersionLibro.options[cbxVersionLibro.selectedIndex].innerHTML;
  var nCantidad       = Number(txtCantidad.value);
  var nValor          = cbxVersionLibro.options[cbxVersionLibro.selectedIndex].getAttribute('valor');


  registrar(sNombreLibro, nIdVersion,sNombreVersion,nCantidad,nValor);


  return false;
}

function registrar(psNombreLibro, pnIdVersion,psNombreVersion,pnCantidad,pnValor){
  /*****************************************************************************
    Se realiza la subida de la informacion a la base de datos
  *****************************************************************************/
  var TablaCompras = document.querySelector("#TablaCompras tbody");
  var fila = document.createElement('tr');
  fila.setAttribute("value", pnIdVersion);
  fila.setAttribute("cantidad", pnCantidad);
  fila.setAttribute("valor", pnValor);
    var CeldaNombreLibro    = document.createElement('td');
      CeldaNombreLibro.innerHTML = psNombreLibro;
    var CeldaNombreVersion  = document.createElement('td');
      CeldaNombreVersion.innerHTML = psNombreVersion;
    var CeldaCantidad       = document.createElement('td');
      CeldaCantidad.innerHTML = pnCantidad;
    var CeldaValor          = document.createElement('td');
      CeldaValor.innerHTML = "₡" + pnValor;
    fila.appendChild(CeldaNombreLibro);
    fila.appendChild(CeldaNombreVersion);
    fila.appendChild(CeldaCantidad);
    fila.appendChild(CeldaValor);
    TablaCompras.appendChild(fila);

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

        var elSelectProvedorProducto = document.querySelector("#cbxLibro");
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
  var peticion = $.ajax({
      url: "services/listarDescuentos.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,


      success: function(response){

        var elSelectProvedorProducto = document.querySelector("#cbxTipoDescuento");
        for (var i = 0; i < response.length; i++) {
            var option = document.createElement('option');
              option.setAttribute("value", Number(response[i]['procentaje']));
              option.setAttribute("id", Number(response[i]['id']));
              var nodoDeTexto = document.createTextNode(response[i]['nombre'] + " (" + response[i]['procentaje'] + "%)");
            option.appendChild(nodoDeTexto);
            elSelectProvedorProducto.appendChild(option);
        }


      },
      error: function(request, error) {
          alert(error);
      }
  });
}
function CargarArticulos (id_libro, vThis) {
	vThis.classList.remove('ErrorValidacion');
  var cbxVersionLibro = document.querySelector('#cbxVersionLibro');
		/*Se resetean los valroes a vacio */
	cbxVersionLibro.innerHTML = "";
		/*Se resetean el valor por defecto */
	var optionNull = document.createElement('option');
		optionNull.value = "";
		optionNull.innerHTML = "Escoja una opción";
			/*Se inserta como el primer valor y se setea al item como valor vacio por defecto */
		cbxVersionLibro.insertBefore(optionNull, cbxVersionLibro.firstChild);
		cbxVersionLibro.value = "";
  var peticion = $.ajax({
      url: "services/listarTipoLibrosPorLibro.php",
      type: "POST",
      data: {
        'id_libro'  : id_libro
      },
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,


      success: function(response){

        for (var i = 0; i < response.length; i++) {
            var option = document.createElement('option');
              option.setAttribute("value", Number(response[i]['id']));
              var nodoDeTexto = document.createTextNode(response[i]['nombre']);
            option.setAttribute('valor', response[i]['valor']);
            option.appendChild(nodoDeTexto);
            cbxVersionLibro.appendChild(option);
        }


      },
      error: function(request, error) {
          alert(error);
      }
  });

}
function comprar() {
  var TablaCompras = document.querySelector("#TablaCompras tbody");
  if (TablaCompras.innerHTML == "") {
    swal({
			title: "Error",
			text: "Debe ingresar algún elemento a la lista.",
			type: "error",
			showCancelButton: false,
			confirmButtonColor: "red",
			confirmButtonText: "Continuar",
			closeOnConfirm: false
		});
  } else {
    var cbxTipoDescuento = document.querySelector("#cbxTipoDescuento");
    localStorage.setItem("Productos", TablaCompras.outerHTML);
    localStorage.setItem("Descuento", cbxTipoDescuento.value);
    localStorage.setItem("id_descuento", cbxTipoDescuento.options[cbxTipoDescuento.selectedIndex].getAttribute('id'));
    window.location = "factura.html";
  }
  return false;
}
