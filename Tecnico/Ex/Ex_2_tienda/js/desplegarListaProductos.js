/*******************************************************************************
  Autor: Gary A. Valverde Hampton
  Fecha de creacion: 26/07/2016
  Fecha de modificacion: 26/07/2016

  Proyecto de desarrollo 1 - Examen 2 parte tecnica
  2016

  Copyright (c) 2016 Copyright Gary A. Valverde Hampton All Rights Reserved.


*******************************************************************************/
/*******************************************************************************
  Funcion para obtener parametros desde la url a travez su nombre
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
CargarLista();
/*******************************************************************************
  Se realiza la carga de los datos de la lista
*******************************************************************************/
function CargarLista () {
		/*Se obtiene el cuerpo de la lista */
	var elTablaListasTbody = document.querySelector('#TablaListasProducto tbody');
		elTablaListasTbody.innerHTML = "";
		/*Se obtiene el largo de la lista */
	var nLength = aId.length;
		/*Se obtiene el id de la lista por medio de la URL */
	var nzIdLista = obtenerParametroDeURL('idLista');
		/*Se crean los elementos */
	for (var i = 0; i < nLength; i++) {
		if (aIdLista[i] == nzIdLista) {
				/*Se crea la fila */
			var elFila = document.createElement('tr');
					/*Se crean la celda */
				var elCeldaArticulo = document.createElement('td');
					elCeldaArticulo.innerHTML = aArticulo[i];
					/*Se crean la celda */
				var elCeldaTipoArticulo = document.createElement('td');
					elCeldaTipoArticulo.innerHTML = aTipoArticulo[i];
					/*Se crean la celda */
				var elCeldaCantidad = document.createElement('td');
					elCeldaCantidad.innerHTML = aCantidad[i];


			elFila.appendChild(elCeldaArticulo);
			elFila.appendChild(elCeldaTipoArticulo);
			elFila.appendChild(elCeldaCantidad);

			elTablaListasTbody.appendChild(elFila);
		}
	}
}
