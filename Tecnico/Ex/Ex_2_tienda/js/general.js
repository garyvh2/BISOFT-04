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
    /*Se obtienen todos los input en el html */
  var input     = document.querySelectorAll("input");
    /*Se obtienen todos los select en el html */
  var select    = document.querySelectorAll("select");
  	/*******************************************************************************
  	  Se ejecuta una funcion en un forEach que recibe los parametros del item y su indice
  	*******************************************************************************/
    /*Por cada uno de los elementos input se le agrega la propiedad oninvalid */
  input.forEach(function(item, index){
      /*Si el espacio esta seteado como requerido se agrega on invalid */
    if(item.getAttribute("required") == ""){
        /*Se agrega la propiedad on invalid que llama a la funcion MensajeInvalido */
      item.setAttribute("oninvalid", "MensajeInvalido(this)");
    }
  });
  	/*******************************************************************************
  	  Se ejecuta una funcion en un forEach que recibe los parametros del item y su indice
  	*******************************************************************************/
    /*por cada select se agrega la opcion por deafult y oninvalid */
	select.forEach(function(item, index){
      /*Se crea el elemento de opcion y se setea el valor en vacio */
		var optionNull = document.createElement('option');
		optionNull.value = "";
      /*Se inserta como el primer valor y se setea al item como valor vacio por defecto */
    item.insertBefore(optionNull, item.firstChild);
    item.value = "";
      /*Se agrega al nombre de la opcion */
		optionNull.innerHTML = "Escoja una opción";
      /*Se seta la propiedad de required para todo select */
    item.setAttribute("required", "");
      /*Se setea el llamado de la funion MensajeInvalido en caso de formato invalido */
    item.setAttribute("oninvalid", "MensajeInvalido(this)");

  });
}
/*******************************************************************************
  Se cambian los mensajes por defecto de error, se envia el elemento como parametro
*******************************************************************************/
function MensajeInvalido(el) {
      /*Si es espacio esta vacio se solicita que se complete */
    if (el.value == '') {
      el.setCustomValidity('Por favor, complete este campo');
      el.classList.add('ErrorValidacion');
    }
      /*Si el formato es invalido se solicita correguirlo */
    else if(el.validity.typeMismatch){
      el.setCustomValidity('Por favor ingrese un correo electrónico válido');
      el.classList.add('ErrorValidacion');
    }
      /*De lo contrario no existe un error */
    else {
      el.setCustomValidity('');
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
