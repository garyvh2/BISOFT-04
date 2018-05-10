/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.

*******************************************************************************/
/*******************************************************************************
  Se obtiene la fecha de hoy
*******************************************************************************/
  /*Se crea un objeto fecha */
var dzHoy = new Date();
  /*Se obtiene el dia */
var dd = dzHoy.getDate();
  /*Se obtiene el mes */
var mm = dzHoy.getMonth()+1; //Enero es 1
  /*Se obtiene el anno */
var yyyy = dzHoy.getFullYear();
  /*Si el dia es menor a 10 se agrega el 0 al inicio */
if(dd<10){
    dd='0'+dd
}
  /*Si el mes es menor a 10 se agrega el 0 al inicio */
if(mm<10){
    mm='0'+mm
}
  /*se obtiene la fecha final con el formato mas adecuado con respecto al obtenido
	 por el input de fecha y la comparacion de ambas */
var dzHoy = yyyy+'-'+mm+'-'+dd;
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
CargarLista();
/*******************************************************************************
  Se realiza la carga de los datos de la lista
*******************************************************************************/
function CargarLista () {
	/*Se recupera del local storage los valores de los usuarios */
	if(localStorage.getItem('id_lista') != null){
	    /*Valores de id lista */
		aIdLista     = JSON.parse(localStorage.getItem('id_lista'));
	    /*Valores de nombre lista */
		aNombreLista = JSON.parse(localStorage.getItem('nombre_lista'));
	    /*Valores de fecha lista */
		aFechaLista  = JSON.parse(localStorage.getItem('fecha_lista'));
	}
		/*Se obtiene el cuerpo de la lista */
	var elTablaListasTbody = document.querySelector('#TablaListas tbody');
		elTablaListasTbody.innerHTML = "";
		/*Se obtiene el largo de la lista */
	var nLength = aIdLista.length;
		/*Se setea la fecha de hoy */
	var FechaHoy = new Date(dzHoy.replace(/-/g, '\/'));

		/*Se crean los elementos */
	for (var i = 0; i < nLength; i++) {
			/*Se crea la fila */
		var elFila = document.createElement('tr');
				/*Se crean la celda */
			var elCeldaNombre = document.createElement('td');
				elCeldaNombre.style.cursor = 'pointer';
				elCeldaNombre.setAttribute('onclick', 'window.location = "desplegarListaProductos.html?idLista=' + aIdLista[i] + '"');
				var elLinkNombre = document.createElement('a');
					elLinkNombre.href = 'desplegarListaProductos.html?idLista=' + aIdLista[i];
					elLinkNombre.innerHTML = aNombreLista[i];
				elCeldaNombre.appendChild(elLinkNombre);
				/*Se crean la celda */
			var elCeldaFecha = document.createElement('td');
				elCeldaFecha.innerHTML = aFechaLista[i];
				/*Se crean la celda */
			var elCeldaEstado = document.createElement('td');
					/*Se formatea la fecha de la lista al igual que la fecha de hoy */
				var FechaLista = new Date(aFechaLista[i].replace(/-/g, '\/'));
				if (FechaHoy <= FechaLista) {
					elCeldaEstado.style.background = '#82E0AA';
					elCeldaEstado.innerHTML = "Activa";
				} else {
					elCeldaEstado.style.background = '#D5DBDB';
					elCeldaEstado.innerHTML = "Inactiva";
				}
				/*Se crean la celda */
			var elCeldaAgregar = document.createElement('td');
				var elLinkAgregar = document.createElement('a');
					elLinkAgregar.href = 'agregarArticulo.html?idLista=' + aIdLista[i];
					elLinkAgregar.innerHTML = 'Agregar artículos';
				elCeldaAgregar.appendChild(elLinkAgregar);
				/*Se crean la celda */
			var elCeldaModificarEliminar = document.createElement('td');
				var elLinkModificar = document.createElement('a');
					elLinkModificar.href = 'modificarLista.html?idLista=' + aIdLista[i];
					elLinkModificar.innerHTML = 'Modificar';
				var elLinkEliminar = document.createElement('a');
					elLinkEliminar.setAttribute('onclick', 'VentanaEliminarLista(' + aIdLista[i] + ')');
					elLinkEliminar.href = '#0';
					elLinkEliminar.innerHTML = 'Eliminar';
				elCeldaModificarEliminar.appendChild(elLinkModificar);
				elCeldaModificarEliminar.innerHTML =  elCeldaModificarEliminar.innerHTML + ' / ';
				elCeldaModificarEliminar.appendChild(elLinkEliminar);
		elFila.appendChild(elCeldaNombre);
		elFila.appendChild(elCeldaFecha);
		elFila.appendChild(elCeldaEstado);
		elFila.appendChild(elCeldaAgregar);
		elFila.appendChild(elCeldaModificarEliminar);

		elTablaListasTbody.appendChild(elFila);
	}
}
/*******************************************************************************
  Se muestra el mensaje de informacion para eliminar una lista, se envia el id de lista como parametro
*******************************************************************************/
function VentanaEliminarLista (idLista) {
	swal({
		title: "¿Está seguro?",
		text: "Si elimina esta lista no podra recuperarla.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "Si, eliminarlo",
		cancelButtonText: "No, cancelar",
		closeOnConfirm: false
	},
		/*Se muestra un mensaje de exito y se realiza el llamado de los procedimientos necesarios */
	function(){
		swal("Transacción realizada", "La lista se encuentra eliminada.", "success");
		EliminarLista(idLista);
		CargarLista();
	});
}
/*Array de tipo articulo */
var aId	= [];
/*Array de tipo articulo */
var aTipoArticulo	= [];
/*Array de articulo */
var aArticulo			= [];
/*Array de cantidad articulo */
var aCantidad			= [];
/*Array de cantidad articulo */
var aIdListaParaArticulo			= [];

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
aIdListaParaArticulo 			= JSON.parse(localStorage.getItem('id_lista_articulo'));
}
/*******************************************************************************
  Se realiza la eliminacion de la lista, se envia el id de la lista como parametro
*******************************************************************************/
function EliminarLista (idLista) {
	/*******************************************************************************
	  Se obtienen los valores iniciales
	*******************************************************************************/
		/*Se obtiene la cantidad de listas */
	var nzLenght = aIdLista.length;
		/*Se declaran los nuevos array */
	var aNuevoIdLista = [];
	var aNuevoNombreLista = [];
	var aNuevoFechaLista = [];

	/*Array de tipo articulo */
	var aNuevoId	= [];
	/*Array de tipo articulo */
	var aNuevoTipoArticulo	= [];
	/*Array de articulo */
	var aNuevoArticulo			= [];
	/*Array de cantidad articulo */
	var aNuevoCantidad			= [];
	/*Array de cantidad articulo */
	var aNuevoIdListaParaArticulo			= [];
	/*******************************************************************************
	  Se obtienen los datos desde el localStorage y se setan en los elementos input
	******************************************************************************/
	for (var i = 0; i < nzLenght; i++) {
		if (aIdLista[i] != idLista) {
			for (var e = 0; e < aId.length; e++) {
				if (aIdListaParaArticulo[e] == aIdLista[i]) {
					aNuevoId.push(aId[e]);
					aNuevoTipoArticulo.push(aTipoArticulo[e]);
					aNuevoArticulo.push(aArticulo[e]);
					aNuevoCantidad.push(aCantidad[e]);
					aNuevoIdListaParaArticulo.push(aIdListaParaArticulo[e]);
				}
			}
			aNuevoIdLista.push(aIdLista[i]);
			aNuevoNombreLista.push(aNombreLista[i]);
			aNuevoFechaLista.push(aFechaLista[i]);
		}
	}
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('id_lista',			JSON.stringify(aNuevoIdLista));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('nombre_lista',	JSON.stringify(aNuevoNombreLista));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('fecha_lista',		JSON.stringify(aNuevoFechaLista));

		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('id_articulo_lista',		JSON.stringify(aNuevoId));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('tipo_articulo',				JSON.stringify(aNuevoTipoArticulo));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('articulo',						JSON.stringify(aNuevoArticulo));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('cantidad_articulo',		JSON.stringify(aNuevoCantidad));
		/*Se insertan los valores en en localStorage*/
	localStorage.setItem('id_lista_articulo',		JSON.stringify(aNuevoIdListaParaArticulo));


}
