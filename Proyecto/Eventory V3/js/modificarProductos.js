CargarLista(1);

function CargarLista(estado) {
    if (Number(estado) == 1) {
        var elTableBody = document.querySelector('#TablaDeElementos tbody');
        elTableBody.innerHTML = '';
        var elbtnActivo = document.querySelector('#btnActivo');
        elbtnActivo.classList.add("Activo");
        var elbtnInactivo = document.querySelector('#btnInactivo');
        elbtnInactivo.classList.remove("Activo");

        var peticion = $.ajax({
            url: "services/listarProductosPorEstado.php",
            type: "POST",
            data: {
                'estado': estado
            },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',
            async: false,
            timeout: 30000,

            success: function(response) {

                var nArrayLength = response.length;

                for (var i = 0; i < nArrayLength; i++) {

                    /*Se crea la fila*/
                    var elFila = document.createElement('tr');
                    /*Se crean la celta por cada campo relevante de la tabla de la base de datos*/

                    var elCodigoProducto  = document.createElement('td');
                    var txtelCodigoProducto = document.createTextNode(response[i]['id_producto']);

                    var eltxtNombreProducto = document.createElement('td');
                    var txteltxtNombreProducto = document.createTextNode(response[i]['nombre']);

                    var eltxtDescripcionProducto = document.createElement('td');
                    var txteltxtDescripcionProducto = document.createTextNode(response[i]['descripcion']);

                    var elPrecioSinImpuesto = document.createElement('td');
                    var txtelPrecioSinImpuesto = document.createTextNode(response[i]['precio_unitario']);

                    var elMarcaProducto = document.createElement('td');
                    var txtelMarcaProducto = document.createTextNode(response[i]['marca']);

                    var elCantidad = document.createElement('td');
                    var txtelCantidad = document.createTextNode(response[i]['cantidad']);

                    var elidproveedor = document.createElement('td');
                    var txtidproveedor = document.createTextNode(response[i]['id_proveedor']);

                    var elidtipo = document.createElement('td');
                    var txtelidtipo = document.createTextNode(response[i]['id_proveedor']);

                    /*NOTE NOTOCAR*/
                    var elModificar = document.createElement('td');
                    elModificar.classList.add("botonesLista");
                    elModificar.value = response[i]['id'];
                    elModificar.setAttribute('onclick', "Modificar(this.value)");
                    var txtModificar = document.createElement('i');
                    txtModificar.classList.add('fa');
                    txtModificar.classList.add('fa-pencil-square-o');
                    txtModificar.classList.add('fa-2x');
                    /*NOTE NOTOCAR*/
                    var elEliminar = document.createElement('td');
                    elEliminar.classList.add("botonesLista");
                    elEliminar.value = response[i]['id'];
                    elEliminar.setAttribute('onclick', "Eliminar(this.value)");
                    var txtEliminar = document.createElement('i');
                    txtEliminar.classList.add('fa');
                    txtEliminar.classList.add('fa-trash');
                    txtEliminar.classList.add('fa-2x');

                    /*Se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                      y finalmente la fila en el tbody*/
                    elCodigoProducto.appendChild(txtelCodigoProducto);
                    elFila.appendChild(elCodigoProducto);

                    eltxtNombreProducto.appendChild(txteltxtNombreProducto);
                    elFila.appendChild(eltxtNombreProducto);

                    eltxtDescripcionProducto.appendChild(txteltxtDescripcionProducto);
                    elFila.appendChild(eltxtDescripcionProducto);

                    elPrecioSinImpuesto.appendChild(txtelPrecioSinImpuesto);
                    elFila.appendChild(elPrecioSinImpuesto);

                    elMarcaProducto.appendChild(txtelMarcaProducto);
                    elFila.appendChild(elMarcaProducto);

                    elCantidad.appendChild(txtelCantidad);
                    elFila.appendChild(elCantidad);

                    elidproveedor.appendChild(txtidproveedor);
                    elFila.appendChild(elidproveedor);

                    elidtipo.appendChild(txtelidtipo);
                    elFila.appendChild(elidtipo);


                    /*NOTE NOTOCAR*/
                    elModificar.appendChild(txtModificar);
                    elFila.appendChild(elModificar);
                    /*NOTE NOTOCAR*/
                    elEliminar.appendChild(txtEliminar);
                    elFila.appendChild(elEliminar);

                    elTableBody.appendChild(elFila);

                }
            },
            error: function(request, error) {
                alert(error);
            }
        });
    } else {

        /*Se carga el tbody de la tabla */
        var elTableBody = document.querySelector('#TablaDeElementos tbody');
        elTableBody.innerHTML = '';
        /*Se cambia el estado de los botones */
        var elbtnActivo = document.querySelector('#btnActivo');
        elbtnActivo.classList.remove("Activo");
        var elbtnInactivo = document.querySelector('#btnInactivo');
        elbtnInactivo.classList.add("Activo");

        var peticion = $.ajax({
            url: "services/listarProductosPorEstado.php",
            type: "POST",
            data: {
                'estado': estado
            },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',
            async: false,
            timeout: 30000,

            success: function(response) {

                var nArrayLength = response.length;

                for (var i = 0; i < nArrayLength; i++) {

                    /*Se crea la fila*/
                    var elFila = document.createElement('tr');
                    /*Se crean la celta por cada campo relevante de la tabla de la base de datos*/

                    var elCodigoProducto  = document.createElement('td');
                    var txtelCodigoProducto = document.createTextNode(response[i]['id_producto']);

                    var eltxtNombreProducto = document.createElement('td');
                    var txteltxtNombreProducto = document.createTextNode(response[i]['nombre']);

                    var eltxtDescripcionProducto = document.createElement('td');
                    var txteltxtDescripcionProducto = document.createTextNode(response[i]['descripcion']);

                    var elPrecioSinImpuesto = document.createElement('td');
                    var txtelPrecioSinImpuesto = document.createTextNode(response[i]['precio_unitario']);

                    var elMarcaProducto = document.createElement('td');
                    var txtelMarcaProducto = document.createTextNode(response[i]['marca']);

                    var elCantidad = document.createElement('td');
                    var txtelCantidad = document.createTextNode(response[i]['cantidad']);

                    var elidproveedor = document.createElement('td');
                    var txtidproveedor = document.createTextNode(response[i]['id_proveedor']);

                    var elidtipo = document.createElement('td');
                    var txtelidtipo = document.createTextNode(response[i]['id_proveedor']);

                    /*NOTE NOTOCAR*/
                    var elModificar = document.createElement('td');
                    elModificar.classList.add("botonesLista");
                    elModificar.value = response[i]['id'];
                    elModificar.setAttribute('onclick', "Modificar(this.value)");
                    var txtModificar = document.createElement('i');
                    txtModificar.classList.add('fa');
                    txtModificar.classList.add('fa-pencil-square-o');
                    txtModificar.classList.add('fa-2x');
                    /*NOTE NOTOCAR*/
                    var elEliminar = document.createElement('td');
                    elEliminar.classList.add("botonesLista");
                    elEliminar.value = response[i]['id'];
                    elEliminar.setAttribute('onclick', "Activar(this.value)");
                    var txtEliminar = document.createElement('i');
                    txtEliminar.classList.add('fa');
                    txtEliminar.classList.add('fa-check');
                    txtEliminar.classList.add('fa-2x');

                    /*Se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                      y finalmente la fila en el tbody*/
                      elCodigoProducto.appendChild(txtelCodigoProducto);
                      elFila.appendChild(elCodigoProducto);

                      eltxtNombreProducto.appendChild(txteltxtNombreProducto);
                      elFila.appendChild(eltxtNombreProducto);

                      eltxtDescripcionProducto.appendChild(txteltxtDescripcionProducto);
                      elFila.appendChild(eltxtDescripcionProducto);

                      elPrecioSinImpuesto.appendChild(txtelPrecioSinImpuesto);
                      elFila.appendChild(elPrecioSinImpuesto);

                      elMarcaProducto.appendChild(txtelMarcaProducto);
                      elFila.appendChild(elMarcaProducto);

                      elCantidad.appendChild(txtelCantidad);
                      elFila.appendChild(elCantidad);

                      elidproveedor.appendChild(txtidproveedor);
                      elFila.appendChild(elidproveedor);

                      elidtipo.appendChild(txtelidtipo);
                      elFila.appendChild(elidtipo);


                    /*NOTE NOTOCAR*/
                    elModificar.appendChild(txtModificar);
                    elFila.appendChild(elModificar);
                    /*NOTE NOTOCAR*/
                    elEliminar.appendChild(txtEliminar);
                    elFila.appendChild(elEliminar);

                    elTableBody.appendChild(elFila);

                }
            },
            error: function(request, error) {
                alert(error);
            }
        });

    }
}

/*Buscar por id */
var txtBuscarId = document.querySelector("#txtBuscarId");
txtBuscarId.addEventListener("keyup", function() {
    var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
    txtBuscarNombre.value = "";
    //Si esta vacio se carga de manera normal
    if (this.value == "") {
        var elbtnActivo = document.querySelector('#btnActivo');
        var elbtnInactivo = document.querySelector('#btnInactivo');

        if (elbtnActivo.classList == "Activo") {
            CargarLista(1);
        } else if (elbtnInactivo.classList == "Activo") {
            CargarLista(0);
        }
        //De lo contrario se filtra
    } else {
        var elbtnActivo = document.querySelector('#btnActivo');
        var elbtnInactivo = document.querySelector('#btnInactivo');

        if (elbtnActivo.classList == "Activo") {
            FiltrarLista(1, 1);
        } else if (elbtnInactivo.classList == "Activo") {
            FiltrarLista(0, 1);
        }
    }
});
/*Buscar por nombre */
var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
txtBuscarNombre.addEventListener("keyup", function() {
    var txtBuscarId = document.querySelector("#txtBuscarId");
    txtBuscarId.value = ""; /* se obtiene el input de texto y dependiendo en su valor, se carga la lista de alguna forma*/
    var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
    //Si esta vacio se carga de manera normal
    if (txtBuscarNombre.value == "") {
        var elbtnActivo = document.querySelector('#btnActivo');
        var elbtnInactivo = document.querySelector('#btnInactivo');

        if (elbtnActivo.classList == "Activo") {
            CargarLista(1);
        } else if (elbtnInactivo.classList == "Activo") {
            CargarLista(0);
        }
        //De lo contrario se filtra
    } else {
        var elbtnActivo = document.querySelector('#btnActivo');
        var elbtnInactivo = document.querySelector('#btnInactivo');

        if (elbtnActivo.classList == "Activo") {
            FiltrarLista(1, 2);
        } else if (elbtnInactivo.classList == "Activo") {
            FiltrarLista(0, 2);
        }
    }
});


/*Funcion Filtrar listas*/
function FiltrarLista(estado, tipoBusqueda) {
    if (tipoBusqueda == 1) {
        var txtBuscar = document.querySelector("#txtBuscarId");
        var sPorBuscar = "id_producto";
    } else if (tipoBusqueda == 2) {
        var txtBuscar = document.querySelector("#txtBuscarNombre");
        var sPorBuscar = "nombre";
    }
    if (Number(estado) == 1) {
        var elTableBody = document.querySelector('#TablaDeElementos tbody');
        elTableBody.innerHTML = '';
        var elbtnActivo = document.querySelector('#btnActivo');
        elbtnActivo.classList.add("Activo");
        var elbtnInactivo = document.querySelector('#btnInactivo');
        elbtnInactivo.classList.remove("Activo");

        var peticion = $.ajax({
            url: "services/listarProductosPorEstado.php",
            type: "POST",
            data: {
                'estado': estado
            },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',
            async: false,
            timeout: 30000,

            success: function(response) {

                var nArrayLength = response.length;

                for (var i = 0; i < nArrayLength; i++) {
                    var sBuscar = txtBuscar.value.toLowerCase();
                    var sElemento = cleanUpSpecialChars(response[i][sPorBuscar].toLowerCase());
                    if (sElemento.indexOf(sBuscar) > -1) {

                    /*Se crea la fila*/
                    var elFila = document.createElement('tr');
                    /*Se crean la celta por cada campo relevante de la tabla de la base de datos*/

                    var elCodigoProducto  = document.createElement('td');
                    var txtelCodigoProducto = document.createTextNode(response[i]['id_producto']);

                    var eltxtNombreProducto = document.createElement('td');
                    var txteltxtNombreProducto = document.createTextNode(response[i]['nombre']);

                    var eltxtDescripcionProducto = document.createElement('td');
                    var txteltxtDescripcionProducto = document.createTextNode(response[i]['descripcion']);

                    var elPrecioSinImpuesto = document.createElement('td');
                    var txtelPrecioSinImpuesto = document.createTextNode(response[i]['precio_unitario']);

                    var elMarcaProducto = document.createElement('td');
                    var txtelMarcaProducto = document.createTextNode(response[i]['marca']);

                    var elCantidad = document.createElement('td');
                    var txtelCantidad = document.createTextNode(response[i]['cantidad']);

                    var elidproveedor = document.createElement('td');
                    var txtidproveedor = document.createTextNode(response[i]['id_proveedor']);

                    var elidtipo = document.createElement('td');
                    var txtelidtipo = document.createTextNode(response[i]['id_proveedor']);

                    /*NOTE NOTOCAR*/
                    var elModificar = document.createElement('td');
                    elModificar.classList.add("botonesLista");
                    elModificar.value = response[i]['id'];
                    elModificar.setAttribute('onclick', "Modificar(this.value)");
                    var txtModificar = document.createElement('i');
                    txtModificar.classList.add('fa');
                    txtModificar.classList.add('fa-pencil-square-o');
                    txtModificar.classList.add('fa-2x');
                    /*NOTE NOTOCAR*/
                    var elEliminar = document.createElement('td');
                    elEliminar.classList.add("botonesLista");
                    elEliminar.value = response[i]['id'];
                    elEliminar.setAttribute('onclick', "Eliminar(this.value)");
                    var txtEliminar = document.createElement('i');
                    txtEliminar.classList.add('fa');
                    txtEliminar.classList.add('fa-trash');
                    txtEliminar.classList.add('fa-2x');

                    /*Se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                      y finalmente la fila en el tbody*/
                    elCodigoProducto.appendChild(txtelCodigoProducto);
                    elFila.appendChild(elCodigoProducto);

                    eltxtNombreProducto.appendChild(txteltxtNombreProducto);
                    elFila.appendChild(eltxtNombreProducto);

                    eltxtDescripcionProducto.appendChild(txteltxtDescripcionProducto);
                    elFila.appendChild(eltxtDescripcionProducto);

                    elPrecioSinImpuesto.appendChild(txtelPrecioSinImpuesto);
                    elFila.appendChild(elPrecioSinImpuesto);

                    elMarcaProducto.appendChild(txtelMarcaProducto);
                    elFila.appendChild(elMarcaProducto);

                    elCantidad.appendChild(txtelCantidad);
                    elFila.appendChild(elCantidad);

                    elidproveedor.appendChild(txtidproveedor);
                    elFila.appendChild(elidproveedor);

                    elidtipo.appendChild(txtelidtipo);
                    elFila.appendChild(elidtipo);


                    /*NOTE NOTOCAR*/
                    elModificar.appendChild(txtModificar);
                    elFila.appendChild(elModificar);
                    /*NOTE NOTOCAR*/
                    elEliminar.appendChild(txtEliminar);
                    elFila.appendChild(elEliminar);

                    elTableBody.appendChild(elFila);
                }

                }
            },
            error: function(request, error) {
                alert(error);
            }
        });
    } else {
        var elTableBody = document.querySelector('#TablaDeElementos tbody');
        elTableBody.innerHTML = '';
        var elbtnActivo = document.querySelector('#btnActivo');
        elbtnActivo.classList.remove("Activo");
        var elbtnInactivo = document.querySelector('#btnInactivo');
        elbtnInactivo.classList.add("Activo");

        var peticion = $.ajax({
            url: "services/listarProductosPorEstado.php",
            type: "POST",
            data: {
                'estado': estado
            },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',
            async: false,
            timeout: 30000,

            success: function(response) {

                var nArrayLength = response.length;

                for (var i = 0; i < nArrayLength; i++) {
                    var sBuscar = txtBuscar.value.toLowerCase();
                    var sElemento = cleanUpSpecialChars(response[i][sPorBuscar].toLowerCase());
                    if (sElemento.indexOf(sBuscar) > -1) {

                    /*Se crea la fila*/
                    var elFila = document.createElement('tr');
                    /*Se crean la celta por cada campo relevante de la tabla de la base de datos*/

                    var elCodigoProducto  = document.createElement('td');
                    var txtelCodigoProducto = document.createTextNode(response[i]['id_producto']);

                    var eltxtNombreProducto = document.createElement('td');
                    var txteltxtNombreProducto = document.createTextNode(response[i]['nombre']);

                    var eltxtDescripcionProducto = document.createElement('td');
                    var txteltxtDescripcionProducto = document.createTextNode(response[i]['descripcion']);

                    var elPrecioSinImpuesto = document.createElement('td');
                    var txtelPrecioSinImpuesto = document.createTextNode(response[i]['precio_unitario']);

                    var elMarcaProducto = document.createElement('td');
                    var txtelMarcaProducto = document.createTextNode(response[i]['marca']);

                    var elCantidad = document.createElement('td');
                    var txtelCantidad = document.createTextNode(response[i]['cantidad']);

                    var elidproveedor = document.createElement('td');
                    var txtidproveedor = document.createTextNode(response[i]['id_proveedor']);

                    var elidtipo = document.createElement('td');
                    var txtelidtipo = document.createTextNode(response[i]['id_proveedor']);

                    /*NOTE NOTOCAR*/
                    var elModificar = document.createElement('td');
                    elModificar.classList.add("botonesLista");
                    elModificar.value = response[i]['id'];
                    elModificar.setAttribute('onclick', "Modificar(this.value)");
                    var txtModificar = document.createElement('i');
                    txtModificar.classList.add('fa');
                    txtModificar.classList.add('fa-pencil-square-o');
                    txtModificar.classList.add('fa-2x');
                    /*NOTE NOTOCAR*/
                    var elEliminar = document.createElement('td');
                    elEliminar.classList.add("botonesLista");
                    elEliminar.value = response[i]['id'];
                    elEliminar.setAttribute('onclick', "Activar(this.value)");
                    var txtEliminar = document.createElement('i');
                    txtEliminar.classList.add('fa');
                    txtEliminar.classList.add('fa-check');
                    txtEliminar.classList.add('fa-2x');

                    /*Se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                      y finalmente la fila en el tbody*/
                      elCodigoProducto.appendChild(txtelCodigoProducto);
                      elFila.appendChild(elCodigoProducto);

                      eltxtNombreProducto.appendChild(txteltxtNombreProducto);
                      elFila.appendChild(eltxtNombreProducto);

                      eltxtDescripcionProducto.appendChild(txteltxtDescripcionProducto);
                      elFila.appendChild(eltxtDescripcionProducto);

                      elPrecioSinImpuesto.appendChild(txtelPrecioSinImpuesto);
                      elFila.appendChild(elPrecioSinImpuesto);

                      elMarcaProducto.appendChild(txtelMarcaProducto);
                      elFila.appendChild(elMarcaProducto);

                      elCantidad.appendChild(txtelCantidad);
                      elFila.appendChild(elCantidad);

                      elidproveedor.appendChild(txtidproveedor);
                      elFila.appendChild(elidproveedor);

                      elidtipo.appendChild(txtelidtipo);
                      elFila.appendChild(elidtipo);


                    /*NOTE NOTOCAR*/
                    elModificar.appendChild(txtModificar);
                    elFila.appendChild(elModificar);
                    /*NOTE NOTOCAR*/
                    elEliminar.appendChild(txtEliminar);
                    elFila.appendChild(elEliminar);

                    elTableBody.appendChild(elFila);
                }
                }
            },
            error: function(request, error) {
                alert(error);
            }
        });
    }
}

/*NOTE NO TOCAR */
function Modificar(idElemento) {
    document.querySelector("#ModificarDatos").style.display = "block";
    localStorage.clear();
    localStorage.setItem('idElemento', idElemento);
    /*BUG aca se cargan los datos en los campos del seccion #ModificarDatos tabla,
    el ajax funciona de esta forma deben completar los campos haciendo una consulta
    con el id almacenado en la linea
      elModificar.value = response[i]['identificacion']; de este ejemplo
    */
    var peticion = $.ajax({
        url: "services/selectProductoPorModificar.php",
        type: "POST",
        data: {
            'id_producto': idElemento
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response) {

            //Cargar datos de cliente
            document.querySelector("#txtIdProducto").value = response[0]['id_producto'];
            document.querySelector("#txtNombreProducto").value = response[0]['nombre'];
            document.querySelector("#txtDescripcionProducto").value = response[0]['descripcion'];
            document.querySelector("#txtPrecioSinImpuesto").value = response[0]['precio_unitario'];
            document.querySelector("#txtMarcaProducto").value = response[0]['marca'];
            document.querySelector("#txtCantidadProducto").value = response[0]['cantidad'];
            document.querySelector("#txtProvedorProducto").value = response[0]['id_proveedor'];
            document.querySelector("#txtTipoProducto").value = response[0]['id_tipo'];

        },
        error: function(request, error) {
            alert(error);
        }
    });

    return false;
}

function Eliminar(idElemento) {
    swal({
            title: "¿Está seguro?",
            text: "Si desactiva este producto los usuarios no podrán adquirirlo.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, eliminarlo",
            cancelButtonText: "No, cancelar",
            closeOnConfirm: false
        },
        /*Se muestra un mensaje de exito y se realiza el llamado de los procedimientos necesarios */
        function() {
            EliminarElemento(idElemento);

            swal("Transacción realizada", "El elemento se encuentra deshabilitado.", "success");
            var txtBuscarId = document.querySelector("#txtBuscarId");
            txtBuscarId.value = "";
            var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
            txtBuscarNombre.value = "";
            var elbtnActivo = document.querySelector('#btnActivo');
            var elbtnInactivo = document.querySelector('#btnInactivo');
            if (elbtnActivo.classList == "Activo") {
                CargarLista(1);
            } else if (elbtnInactivo.classList == "Activo") {
                CargarLista(0);
            }
        });
}

function Activar(idElemento) {
    swal({
            title: "¿Está seguro?",
            text: "Si activa este elemento los usuarios podran adquirirlo.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, habilitarlo",
            cancelButtonText: "No, cancelar",
            closeOnConfirm: false
        },
        /*Se muestra un mensaje de exito y se realiza el llamado de los procedimientos necesarios */
        function() {
            ActivarElemento(idElemento);

            swal("Transacción realizada", "El elemento se encuentra habilitado.", "success");
            var txtBuscarId = document.querySelector("#txtBuscarId");
            txtBuscarId.value = "";
            var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
            txtBuscarNombre.value = "";
            var elbtnActivo = document.querySelector('#btnActivo');
            var elbtnInactivo = document.querySelector('#btnInactivo');
            if (elbtnActivo.classList == "Activo") {
                CargarLista(1);
            } else if (elbtnInactivo.classList == "Activo") {
                CargarLista(0);
            }
        });
}

function Agregar() {

    window.location = "registrarProducto.html";
}

document.querySelector("#ModificarDatos").addEventListener("click", function(el) {
    var elemento = document.querySelector("#ModificarDatos");
    if (el.target == elemento) {
        elemento.style.display = "none";
    }
});

function EliminarElemento(idElemento) {
    var estado = 0;
    var id = idElemento;
    var peticion = $.ajax({
        url: "services/cambiarEstadoProducto.php",
        type: "POST",
        data: {
            'id': id,
            'estado': estado
        },
        success: function() {
            swal({
                title: "La información fue ingresada correctamente",
                text: "El usuario se encuentra inactivo.",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "green",
                confirmButtonText: "Continuar",
                closeOnConfirm: false
            });
        },
        error: function(request, error) {
            alert(error);

        }
    });
    return false;
}

/*NOTE se deben capturar los datos en variables y hacer una peticion para enviarlos y modificarlos
  los datos que no pueden estar en un input se asumen
*/
function ModificarElemento(vThis) {
    var idElemento = localStorage.getItem('idElemento');
    localStorage.clear();

    var elbtnActivo = document.querySelector('#btnActivo');
    var elbtnInactivo = document.querySelector('#btnInactivo');
    if (elbtnActivo.classList == "Activo") {
        var estado = 1;
    } else if (elbtnInactivo.classList == "Activo") {
        var estado = 0;
    }
    /*variables para los elemnetos del formulario*/
    var eltxtIdProducto = document.querySelector('#txtIdProducto');
    var eltxtNombreProducto = document.querySelector('#txtNombreProducto');
    var eltxtDescripcionProducto = document.querySelector('#txtDescripcionProducto');
    var eltxtPrecioSinImpuesto = document.querySelector('#txtPrecioSinImpuesto');
    var eltxtMarcaProducto = document.querySelector('#txtMarcaProducto');
    var eltxtCantidadProducto = document.querySelector('#txtCantidadProducto');
    var eltxtTipoProducto = document.querySelector('#txtTipoProducto');
    var eltxtProveedor = document.querySelector('#txtProvedorProducto');

    var sImagePath;
    /*****************************************************************************
      Se realiza la subida de la imagen
    *****************************************************************************/
    var peticion = $.ajax({
        url: "services/imageUploader.php?path=../imgs/uploads/foto_producto/", //Se envia el path como paremetro para el envio de la imagen
        type: "POST",
        data: new FormData(vThis),
        contentType: false,
        cache: false,
        processData: false,
        async: false,
        timeout: 30000,

        success: function(data) {
            sImagePath = data.replace('../', '');
        },
        error: function(request, cerror) {
            alert(cerror);
        }
    });



        var peticion2 = $.ajax({
            url: "services/modificarProducto.php",
            type: "POST",
            data: {
                'idElemento': idElemento,
                'id_producto': eltxtIdProducto.value,
                'nombre': eltxtNombreProducto.value,
                'descripcion': eltxtDescripcionProducto.value,
                'precio_unitario': eltxtPrecioSinImpuesto.value,
                'marca': eltxtMarcaProducto.value,
                'ncantidad': eltxtCantidadProducto.value,
                'id_tipo_producto': eltxtTipoProducto.value,
                'id_proveedor': eltxtProveedor.value,
                'estado': estado,
                'sImagePath': sImagePath
            },

            success: function(response) {
                swal({
                    title: "La información fue ingresada correctamente",
                    text: "Los datos del perfil han sido actualizados.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "green",
                    confirmButtonText: "Continuar",
                    closeOnConfirm: false
                });
            },
            error: function(request, error) {
                alert(error);
            }
        });


    var txtBuscarId = document.querySelector("#txtBuscarId");
    txtBuscarId.value = "";
    var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
    txtBuscarNombre.value = "";
    var elbtnActivo = document.querySelector('#btnActivo');
    var elbtnInactivo = document.querySelector('#btnInactivo');
    if (elbtnActivo.classList == "Activo") {
        CargarLista(1);
    } else if (elbtnInactivo.classList == "Activo") {
        CargarLista(0);
    }
    var elemento = document.querySelector("#ModificarDatos");
    elemento.style.display = "none";
    return false;
}

function ActivarElemento(idElemento) {
    var estado = 1;
    var id = idElemento;
    var peticion = $.ajax({
        url: "services/cambiarEstadoProducto.php",
        type: "POST",
        data: {
            'id': id,
            'estado': estado

        },
        success: function() {
            swal({
                title: "La información fue ingresada correctamente",
                text: "El usuario se encuentra activada.",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "green",
                confirmButtonText: "Continuar",
                closeOnConfirm: false
            });
        },
        error: function(request, error) {
            alert(error);
        }
    });

    return false;
}



cargarComboBox ();

function cargarComboBox () {

var peticion = $.ajax({
          url: "services/listarProveedoresPorTienda.php",
          type: "POST",
          data: {},
          contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
          dataType: 'json',

          success: function(response){

          var nLength = response.length;

          var elSelectProvedorProducto = document.querySelector("#txtProvedorProducto");
          for (var i = 0; i < nLength; i++) {

          var option = document.createElement('option');
          option.setAttribute("value",response[i]['id']);
          var nodoDeTexto = document.createTextNode(response[i]['nombre']);
          option.appendChild(nodoDeTexto);

          elSelectProvedorProducto.appendChild(option);
          }
        },
                error: function(request, error) {
                    alert(error);
                }
        });

  //Tipos de producto

  var peticion = $.ajax({

            url: "services/listarTiposDeProductoPorTienda.php",
            type: "POST",
            data: {},
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){

            var nLength = response.length;

            var elSelectTipoDeProducto = document.querySelector("#txtTipoProducto");
            for (var i = 0; i < nLength; i++) {

            var option = document.createElement('option');
            option.setAttribute("value",response[i]['id']);
            var nodoDeTexto = document.createTextNode(response[i]['nombre']);
            option.appendChild(nodoDeTexto);

            elSelectTipoDeProducto.appendChild(option);
                      }
          },
                    error: function(request, error) {
                      alert(error);
                  }
          });
}
