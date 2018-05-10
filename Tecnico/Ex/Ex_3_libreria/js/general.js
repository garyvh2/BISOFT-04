/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.

*******************************************************************************/
/*******************************************************************************
  Se setea la propiedad de oninvalid para los formularios
*******************************************************************************/
CambiarValidacion();
function CambiarValidacion () {
  var input     = document.querySelectorAll("input");
  var select    = document.querySelectorAll("select");


  input.forEach(function(item, index){
    if(item.getAttribute("required") == ""){
      item.setAttribute("oninvalid", "MensajeInvalido(this)");
    }
    if(item.getAttribute("type") == "number"){
      item.setAttribute("min", "0");
    }
    if (item.getAttribute("name") == "anno") {
      var currentTime = new Date();
      var year = currentTime.getFullYear();
      item.setAttribute('max', year);
    }
  });
  select.forEach(function(item, index){
    var optionNull = document.createElement('option');
    optionNull.value = "";
    item.insertBefore(optionNull, item.firstChild);
    item.value = "";
    optionNull.innerHTML = "Escoja una opción";
    item.setAttribute("required", "");
    item.setAttribute("oninvalid", "MensajeInvalido(this)");

  });
}
/*******************************************************************************
  Se cambian los mensajes por defecto de error, se envia el elemento como parametro
*******************************************************************************/
function MensajeInvalido(textbox) {
  if (textbox.value == '') {
      textbox.setCustomValidity('Por favor, complete este campo');
      textbox.classList.add('ErrorValidacion');
  }
  else if(textbox.validity.typeMismatch){
      textbox.setCustomValidity('Por favor, ingrese un correo electrónico válido');
      textbox.classList.add('ErrorValidacion');
  }
  else if (textbox.validity.rangeUnderflow) {
      textbox.setCustomValidity("La cantidad ingresada debe ser mayor que 0");
      textbox.classList.add('ErrorValidacion');
  }
  else if (textbox.validity.rangeOverflow) {
      textbox.setCustomValidity("La cantidad ingresada debe ser menor o igual a " + textbox.getAttribute('max'));
      textbox.classList.add('ErrorValidacion');
  }
  else {
      textbox.setCustomValidity('');
  }
  return true;
}
/*******************************************************************************
  Se cargan los datos quemados
*******************************************************************************/
DatosQuemados();
function DatosQuemados () {
  /*******************************************************************************
    Se confirma que no se hayan cargado antes
  *******************************************************************************/
  if (localStorage.getItem('datos_cargados') == null) {
      /*Se setea el valor para saber que ya fue cargado */
  	localStorage.setItem('datos_cargados',		true);
    /*******************************************************************************
      Se agregan los datos
    *******************************************************************************/
    /*Se agregan los datos de listas */
      /*Array de id lista */
    var aIdLista=  [1,2,3,4,5,6];
      /*Array de nombre lista */
    var aNombreLista= ["Lista walmart","Salida a la playa","Paseo de vacaciones","Entrada a clases","Día de la madre","Cumpleaños profe monestel"];
      /*Array de fecha lista */
    var aFechaLista= ["2017-08-05","2016-07-28","2017-04-25","2017-06-12","2016-01-25","2016-04-18"];

      /*Se insertan los valores en en localStorage*/
  	localStorage.setItem('id_lista',			JSON.stringify(aIdLista));
  		/*Se insertan los valores en en localStorage*/
  	localStorage.setItem('nombre_lista',	JSON.stringify(aNombreLista));
  		/*Se insertan los valores en en localStorage*/
  	localStorage.setItem('fecha_lista',		JSON.stringify(aFechaLista));

    /*Se agregan los datos de articulos en lista */
      /*Array de tipo articulo */
    var aId	= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
      /*Array de tipo articulo */
    var aTipoArticulo	= [/*1*/"Alimentos","Alimentos","Alimentos",/*2*/"Alimentos","Salud","Alimentos",/*3*/"Alimentos","Salud", "Salud","Alimentos",/*4*/"Oficina","Oficina","Oficina","Oficina","Belleza","Belleza","Belleza","Varios","Varios","Varios"];
      /*Array de articulo */
    var aArticulo			= ["Tronaditas", "Carne de res", "Jugo de naranja","Carne de res","Jabón","Jugo de naranja","Tronaditas","Antigripales", "Vitaminas","Galletas","Tijeras", "Trituradora", "Lápices de color", "Caja de aluminio","Contorno", "Colorete", "Base","Figurita de acción del Dios y señor todo poderoso Velkoz el ojo del vacío", "Vasos plásticos", "Cd de Justin Bieber"];
      /*Array de cantidad articulo */
    var aCantidad			= [11,32,34,42,52,63,71,58,9,10,131,14,13,14,45,36,37,78,29,40];
      /*Array de cantidad articulo */
    var aIdLista			= [1,1,1,2,2,2,3,3,3,3,4,4,4,4,5,5,5,6,6,6];

      /*Se insertan los valores en en localStorage*/
    localStorage.setItem('id_articulo_lista',		JSON.stringify(aId));
      /*Se insertan los valores en en localStorage*/
    localStorage.setItem('tipo_articulo',				JSON.stringify(aTipoArticulo));
      /*Se insertan los valores en en localStorage*/
    localStorage.setItem('articulo',						JSON.stringify(aArticulo));
      /*Se insertan los valores en en localStorage*/
    localStorage.setItem('cantidad_articulo',		JSON.stringify(aCantidad));
      /*Se insertan los valores en en localStorage*/
    localStorage.setItem('id_lista_articulo',		JSON.stringify(aIdLista));
  }
}
