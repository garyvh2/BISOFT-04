/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.

*******************************************************************************/
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
	crearLista(svNombreLista, dvFechaLista);
		/*Se returna false para evitar la recarga de la pagina */
	return false;
}

/*******************************************************************************
  Se registran los datos ingresados, se toma el valor de los input para nombre de lista y fecha de lista
*******************************************************************************/
function crearLista (psNombreLista, pdFechaLista) {
	/*******************************************************************************
	  Se da push a los arrays con los datos
	*******************************************************************************/
		/*Se autogenera el id */
	var id = 0;
	if ( aIdLista.length != 0) {
		var idPrueba = 1;
		while (id == 0) {
			var Existe = false;
			for (var i = 0; i < aIdLista.length; i++) {
				if (idPrueba == aIdLista[i]) {
					Existe = true;
				}
			}
			if (Existe == true) {
				idPrueba++;
			} else {
				id = idPrueba;
			}
		}
   aIdLista.push( id);
  }
  else {
     aIdLista.push(1);
  }
		/*Se da push al valor obtenido del formulario*/
	aNombreLista.push(psNombreLista);
		/*Se da push al valor obtenido del formulario*/
	aFechaLista.push(pdFechaLista);

		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('id_lista',			JSON.stringify(aIdLista));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('nombre_lista',	JSON.stringify(aNombreLista));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('fecha_lista',		JSON.stringify(aFechaLista));

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
