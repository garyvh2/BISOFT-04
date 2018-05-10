llenarTabla();


function llenarTabla(){
  var tbody = document.querySelector('#tblProveedores tbody');
  tbody.innerHTML = '';


  var aId = JSON.parse(localStorage.getItem('id_proveedor_CU10'));
  var aNombre = JSON.parse(localStorage.getItem('nombre_proveedor_CU10'));
  var aTelefono = JSON.parse(localStorage.getItem('numero_telefono_CU10'));
  var aTelefono2 = JSON.parse(localStorage.getItem('numero_telefono2_CU10'));
  var aFechaInicio = JSON.parse(localStorage.getItem('fecha_inicio_CU10'));
  

  var nTamannoArreglos = aId.length;

  for(var i = 0; i < nTamannoArreglos; i++){
    /*Crea una fila por cada tienda registrada*/
    var fila = document.createElement('tr');

    /*Crea una celda para el id*/
    var celdaId = document.createElement('td');
    /* Se crea el nodo de texto para la celda de id*/
    var nodoTextoId = document.createTextNode(aId[i]);
    /*Se agrega el nodo a la celda*/
    celdaId.appendChild(nodoTextoId);
    /*Se agrega la celda a la fila*/
    fila.appendChild(celdaId);


    var celdaNombre = document.createElement('td');
    var nodoTextoNombre = document.createTextNode(aNombre[i]);
    celdaNombre.appendChild(nodoTextoNombre);
    fila.appendChild(celdaNombre);

    var celdaTelefono = document.createElement('td');
    var nodoTextoTelefono = document.createTextNode(aTelefono[i]);
    celdaTelefono.appendChild(nodoTextoTelefono);
    fila.appendChild(celdaTelefono);

    var celdaTelefono2 = document.createElement('td');
    var nodoTextoTelefono2 = document.createTextNode(aTelefono2[i]);
    celdaTelefono2.appendChild(nodoTextoTelefono2);
    fila.appendChild(celdaTelefono2);

    var celdaFechasInicio = document.createElement('td');
    var nodoFechasInicio = document.createTextNode(aFechaInicio[i]);
    celdaFechasInicio.appendChild(nodoFechasInicio);
    fila.appendChild(celdaFechasInicio);

    


    /*Se agrega la fila al tbody*/
    tbody.appendChild(fila);


  }

}

