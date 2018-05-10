/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.

*******************************************************************************/
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
}
var today = yyyy+'-'+mm+'-'+dd;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


llenarFactura();
//Cuando el usuario seleccione una tienda debera almacenar el id en session
function llenarFactura () {
  //Se coloca la fecha en la factura
  var elFechaFactura = document.querySelector('#FechaFactura');
  elFechaFactura.innerHTML = today;
  //Se obtiene la tabla
  var elItems = document.querySelector("#Items table");
  //Se obtiene la lista desde el localStorage y se coloca en la lista actual
  var libros = localStorage.getItem('Productos');
  elItems.innerHTML = elItems.innerHTML + libros;

  //Se obtienen los items
  var elItemsTbody = document.querySelector("#Items table tbody");
  var listaItems = elItemsTbody.getElementsByTagName('tr');

  var subtotal = 0;
  for (var i = 0; i < listaItems.length; i++) {
    var cantidad  = listaItems[i].getAttribute('cantidad');
    var valor     = listaItems[i].getAttribute('valor').replace("₡","");
    var totalItem = Number(cantidad) * Number(valor);

    var CeldaTotal = document.createElement('td');
    CeldaTotal.innerHTML = "₡" + totalItem;

    listaItems[i].appendChild(CeldaTotal);
    subtotal = subtotal + totalItem;
  }
  document.querySelector("#SubTotalFactura").innerHTML = "₡" + subtotal;
  var descuentoPorcentaje = localStorage.getItem("Descuento");
  document.querySelector("#DescuentoFactura").innerHTML = "₡" + descuentoPorcentaje;

  var totalDescuento = subtotal * (descuentoPorcentaje / 100);
  document.querySelector("#DescuentoFacturaTotal").innerHTML = "₡" + totalDescuento;
  document.querySelector("#TotalFactura").innerHTML = "₡" + (subtotal - totalDescuento);
}

function Aceptar () {
  var CompradorFactura = document.querySelector('#CompradorFactura');
  if (CompradorFactura.value != "") {
    window.print();
    setTimeout(function () {
      window.close();




      var total           = Number(document.querySelector('#TotalFactura').innerHTML.replace("₡",""));
      var subtotal        = Number(document.querySelector('#SubTotalFactura').innerHTML.replace("₡",""));
      var descuento       = Number(localStorage.getItem("id_descuento"));
      var comprador       = document.querySelector('#CompradorFactura').value;

      var peticion = $.ajax({
                url: "services/registrarCompra.php",
                type: "POST",
                data: {
                  'total'       : total,
                  'subtotal'    : subtotal,
                  'descuento'   : descuento,
                  'comprador'   : comprador
                },
                success: function(response){

                  //Se obtienen los items
                  var elItemsTbody = document.querySelector("#Items table tbody");
                  var listaItems = elItemsTbody.getElementsByTagName('tr');
                  for (var i = 0; i < listaItems.length; i++) {
                    var cantidad  = listaItems[i].getAttribute('cantidad');
                    var id        = listaItems[i].getAttribute('value');
                    var peticion = $.ajax({
                              url: "services/registrarListaProductos.php",
                              type: "POST",
                              data: {
                                'id'          : id,
                                'cantidad'    : cantidad
                              },

                              success: function(response){
                              },
                              error: function(request, error) {
                                alert(error);
                              }
                    });
                  }

                  window.history.back();
                },
                error: function(request, error) {
                  alert(error);
                }
        });
    }, 100);
  } else {
    CompradorFactura.focus();
    swal({
      title: "Error",
      text: "Debe ingresar algún nombre de comprador.",
      type: "error",
      showCancelButton: false,
      confirmButtonColor: "red",
      confirmButtonText: "Continuar",
      closeOnConfirm: false
    });
  }
}
