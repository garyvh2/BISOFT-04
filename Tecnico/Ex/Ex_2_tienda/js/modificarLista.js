/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.

*******************************************************************************/
/*******************************************************************************
  Funcion para obtener parametros desde la url a travez de su nombre
*******************************************************************************/
function obtenerParametroDeURL(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/*******************************************************************************
  Se realiza la declaracion de los array y la extraccion de los valores existentes desde el localStorage
*******************************************************************************/
  /*Array de id lista */
var aIdLista=  [];
  /*Array de nombre lista */
var aNombreLista= [];
  /*Array de fecha lista */
var aFechaLista= [];

/*Se recupera del local storage los valores de los usuarios */
if(localStorage.getItem('id_lista') != null){
    /*Valores de id lista */
	aIdLista     = JSON.parse(localStorage.getItem('id_lista'));
    /*Valores de nombre lista */
	aNombreLista = JSON.parse(localStorage.getItem('nombre_lista'));
    /*Valores de fecha lista */
	aFechaLista  = JSON.parse(localStorage.getItem('fecha_lista'));
}
/*******************************************************************************
  Se cargan los datos previos
*******************************************************************************/
CargarDatos();
function CargarDatos() {
	/*******************************************************************************
	  Se obtienen los elementos del html
	*******************************************************************************/
		/*Elemento de nombre de lista */
  var elNombreLista = document.querySelector('#txtNombreLista');
		/*Elemento de fecha de lista */
  var elFechaLista  = document.querySelector('#txtFechaLista');
	/*******************************************************************************
	  Se obtienen los valores iniciales
	*******************************************************************************/
		/*Se obtiene el id de la lista desde la URL */
	var nzIdLista = obtenerParametroDeURL('idLista');
		/*Se obtiene la cantidad de listas */
	var nzLenght = aIdLista.length;
	/*******************************************************************************
	  Se obtienen los datos desde el localStorage y se setan en los elementos input
	******************************************************************************/
	for (var i = 0; i < nzLenght; i++) {
		if (aIdLista[i] == nzIdLista) {
			elNombreLista.value = aNombreLista[i];
			elFechaLista.value = aFechaLista[i];
			break;
		}
	}

}
/*******************************************************************************
  Se realiza la validacion de los datos ingresados
*******************************************************************************/
function validar () {
	/*******************************************************************************
	  Se obtienen los elementos del html
	*******************************************************************************/
		/*Elemento de nombre de lista */
  var elNombreLista = document.querySelector('#txtNombreLista');
		/*Elemento de fecha de lista */
  var elFechaLista  = document.querySelector('#txtFechaLista');
	/*******************************************************************************
	  Se obtienen los valores de los elementos del html
	*******************************************************************************/
		/*Valor de nombre de lista */
	var svNombreLista	=	elNombreLista.value;
		/*Valor de fecha de lista */
	var dvFechaLista	=	elFechaLista.value;

	/*******************************************************************************
	  Se ejecuta la funcion para registrar la lsita
	*******************************************************************************/
	modificarLista(svNombreLista, dvFechaLista);
		/*Se returna false para evitar la recarga de la pagina */
	return false;
}

/*******************************************************************************
  Se registran los datos ingresados, se envia el nombre de lista y fecha de la lista
*******************************************************************************/
function modificarLista (psNombreLista, pdFechaLista) {
	/*******************************************************************************
	  Se obtienen los valores iniciales
	*******************************************************************************/
		/*Se obtiene el id de la lista desde la URL */
	var nzIdLista = obtenerParametroDeURL('idLista');
		/*Se obtiene la cantidad de listas */
	var nzLenght = aIdLista.length;
	/*******************************************************************************
	  Se obtienen los datos desde el localStorage y se setan en los elementos input
	******************************************************************************/
	for (var i = 0; i < nzLenght; i++) {
		if (aIdLista[i] == nzIdLista) {
			aNombreLista[i] = psNombreLista;
			aFechaLista[i] 	= pdFechaLista;
			break;
		}
	}

		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('id_lista',			JSON.stringify(aIdLista));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('nombre_lista',	JSON.stringify(aNombreLista));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('fecha_lista',		JSON.stringify(aFechaLista));



		/*Se muestra un mensaje de exito */
	swal({
    title: "La información fue ingresada correctamente",
    text: "Los datos de la lista han sido modificados.",
		type: "success",
		showCancelButton: false,
		timer: 5000,
		confirmButtonColor: "green",
		confirmButtonText: "Continuar",
		closeOnConfirm: false
	});


}
