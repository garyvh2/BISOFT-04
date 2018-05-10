/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.

*******************************************************************************/
/*******************************************************************************
  Se Setean los valores por default para los combo box
*******************************************************************************/
  /*Array de tipos de aTiposArticulos */
var aTiposArticulos = ["Alimentos", "Salud", "Belleza", "Oficina", "Varios"];
  /*Array de tipo alimento */
var aAlimentos 			=	["Tronaditas", "Carne de res", "Jugo de naranja", "Galletas", "Patatas con chistorra"];
  /*Array de tipo salud */
var aSalud 					=	["Jabón", "Antigripales", "Vitaminas", "Calcio", "Parche de nicotina"];
  /*Array de tipo belleza */
var aBelleza 				=	["Contorno", "Colorete", "Base", "Hidratante Biotherme", "Crema de belleza Torres"];
  /*Array de tipo oficina */
var aOficina 				=	["Basurero", "Tijeras", "Trituradora", "Lápices de color", "Caja de aluminio"];
  /*Array de tipo varios */
var aVarios 				=	["Figurita de acción del Dios y señor todo poderoso Velkoz el ojo del vacío", "Vasos plásticos", "Papel Albal", "Cd de Justin Bieber", "Bombillo"];
/*******************************************************************************
  Se optienen los elementos select a los cuales ser les cargaran los elementos de los arrays anteriores
*******************************************************************************/
	/*Se obtiene el combo box de tipo de articulo */
var elcbxTipoArticulo = document.querySelector('#cbxTipoArticulo');
	/*Se obtiene el combo box de articulo */
var elcbxArticulo = document.querySelector('#cbxArticulo');
/*******************************************************************************
  Se insertan los valores en tipo articulo
*******************************************************************************/
CargarTipoArticulos();
function CargarTipoArticulos () {
	/*******************************************************************************
	  Se ejecuta una funcion en un forEach que recibe los parametros del item y su indice
	*******************************************************************************/
	aTiposArticulos.forEach(function(item, index){
			/*Se crea el option */
		var elOption = document.createElement('option');
				/*Se insertan los valores y texto a mostrar */
				elOption.value = item;
				elOption.innerHTML = item;
		elcbxTipoArticulo.appendChild(elOption);
	});
}
/*******************************************************************************
  Se insertan los valores en articulo que recibe los parametros del tipo de articulo y el elemento como tal
*******************************************************************************/
function CargarArticulos (tipo, vThis) {
	vThis.classList.remove('ErrorValidacion');
		/*Se resetean los valroes a vacio */
	elcbxArticulo.innerHTML = "";
		/*Se resetean el valor por defecto */
	var optionNull = document.createElement('option');
		optionNull.value = "";
		optionNull.innerHTML = "Escoja una opción";
			/*Se inserta como el primer valor y se setea al item como valor vacio por defecto */
		elcbxArticulo.insertBefore(optionNull, elcbxArticulo.firstChild);
		elcbxArticulo.value = "";

		/*Se setean los valroes segun el tipo */
	if (tipo == 'Alimentos') {
		/*******************************************************************************
		  Se ejecuta una funcion en un forEach que recibe los parametros del item y su indice
		*******************************************************************************/
		aAlimentos.forEach(function(item, index){
				/*Se crea el option */
			var elOption = document.createElement('option');
					/*Se insertan los valores y texto a mostrar */
					elOption.value = item;
					elOption.innerHTML = item;
			elcbxArticulo.appendChild(elOption);
		});
		/*Se setean los valroes segun el tipo */
	} else if (tipo == 'Salud') {
		/*******************************************************************************
		  Se ejecuta una funcion en un forEach que recibe los parametros del item y su indice
		*******************************************************************************/
		aSalud.forEach(function(item, index){
				/*Se crea el option */
			var elOption = document.createElement('option');
					/*Se insertan los valores y texto a mostrar */
					elOption.value = item;
					elOption.innerHTML = item;
			elcbxArticulo.appendChild(elOption);
		});
		/*Se setean los valroes segun el tipo */
	} else if (tipo == 'Belleza') {
		/*******************************************************************************
		  Se ejecuta una funcion en un forEach que recibe los parametros del item y su indice
		*******************************************************************************/
		aBelleza.forEach(function(item, index){
				/*Se crea el option */
			var elOption = document.createElement('option');
					/*Se insertan los valores y texto a mostrar */
					elOption.value = item;
					elOption.innerHTML = item;
			elcbxArticulo.appendChild(elOption);
		});
		/*Se setean los valroes segun el tipo */
	} else if (tipo == 'Oficina') {
		/*******************************************************************************
		  Se ejecuta una funcion en un forEach que recibe los parametros del item y su indice
		*******************************************************************************/
		aOficina.forEach(function(item, index){
				/*Se crea el option */
			var elOption = document.createElement('option');
					/*Se insertan los valores y texto a mostrar */
					elOption.value = item;
					elOption.innerHTML = item;
			elcbxArticulo.appendChild(elOption);
		});
		/*Se setean los valroes segun el tipo */
	} else if (tipo == 'Varios') {
		/*******************************************************************************
		  Se ejecuta una funcion en un forEach que recibe los parametros del item y su indice
		*******************************************************************************/
		aVarios.forEach(function(item, index){
				/*Se crea el option */
			var elOption = document.createElement('option');
					/*Se insertan los valores y texto a mostrar */
					elOption.value = item;
					elOption.innerHTML = item;
			elcbxArticulo.appendChild(elOption);
		});
	}
}

/*******************************************************************************
  Se realiza la declaracion de los array y la extraccion de los valores existentes desde el localStorage
*******************************************************************************/
  /*Array de tipo articulo */
var aId	= [];
  /*Array de tipo articulo */
var aTipoArticulo	= [];
  /*Array de articulo */
var aArticulo			= [];
  /*Array de cantidad articulo */
var aCantidad			= [];
  /*Array de cantidad articulo */
var aIdLista			= [];

/*Se recupera del local storage los valores de los usuarios */
if(localStorage.getItem('id_articulo_lista') != null){
		/*Array de cantidad articulo */
	aId 			= JSON.parse(localStorage.getItem('id_articulo_lista'));
    /*Valores de id lista */
	aTipoArticulo	= JSON.parse(localStorage.getItem('tipo_articulo'));
    /*Valores de nombre lista */
	aArticulo 		= JSON.parse(localStorage.getItem('articulo'));
    /*Valores de fecha lista */
	aCantidad  		= JSON.parse(localStorage.getItem('cantidad_articulo'));
	  /*Array de cantidad articulo */
	aIdLista 			= JSON.parse(localStorage.getItem('id_lista_articulo'));
}
/*******************************************************************************
  Se realiza la validacion de los datos ingresados
*******************************************************************************/
function validar () {
	/*******************************************************************************
	  Se obtienen los elementos del html
	*******************************************************************************/
		/*Elemento de cantidad de articulo */
  var eltxtCantidad = document.querySelector('#txtCantidad');
	/*******************************************************************************
	  Se obtienen los valores de los elementos del html
	*******************************************************************************/
		/*Valor de articulo*/
	var svelcbxArticulo	=	elcbxArticulo.value;
		/*Valor de tipo articulo */
	var svelcbxTipoArticulo	=	elcbxTipoArticulo.value;
		/*Valor de cantidad*/
	var sveltxtCantidad	=	eltxtCantidad.value;

	/*******************************************************************************
	  Se ejecuta la funcion para registrar la lsita
	*******************************************************************************/
	agregarArticulo(svelcbxArticulo, svelcbxTipoArticulo, sveltxtCantidad);
		/*Se returna false para evitar la recarga de la pagina */
	return false;
}
/*******************************************************************************
  Funcion para obtener parametros desde la url a traves del su nombre
*******************************************************************************/
function obtenerParametroDeURL(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/*******************************************************************************
  Se registran los datos ingresados, se envia el valor del combo box de articulo, tipo de articulo y el valor del input de cantidad
*******************************************************************************/
function agregarArticulo (psvelcbxArticulo, psvelcbxTipoArticulo, psveltxtCantidad) {
	/*******************************************************************************
	  Se da push a los arrays con los datos
	*******************************************************************************/
		/*Se autogenera el id */
	var id = 0;
	if ( aId.length != 0) {
		var idPrueba = 1;
		while (id == 0) {
			var Existe = false;
			for (var i = 0; i < aId.length; i++) {
				if (idPrueba == aId[i]) {
					Existe = true;
				}
			}
			if (Existe == true) {
				idPrueba++;
			} else {
				id = idPrueba;
			}
		}
	 aId.push( id);
	}
	else {
		 aId.push(1);
	}
		/*Se da push al valor obtenido del formulario*/
	aTipoArticulo.push(psvelcbxTipoArticulo);
		/*Se da push al valor obtenido del formulario*/
	aArticulo.push(psvelcbxArticulo);
		/*Se da push al valor obtenido del formulario*/
	aCantidad.push(psveltxtCantidad);
		/*Se da push al valor obtenido del formulario*/
	aIdLista.push(obtenerParametroDeURL('idLista'));

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




		/*Se muestra un mensaje de exito */
	swal({
    title: "La información fue ingresada correctamente",
    text: "Los datos de la lista han sido ingresados.",
		type: "success",
		showCancelButton: false,
		timer: 5000,
		confirmButtonColor: "green",
		confirmButtonText: "Continuar",
		closeOnConfirm: false
	});


}
