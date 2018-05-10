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
            url: "services/listarTiposEventoPorEstado.php",
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
                    var elId = document.createElement('td');
                    var txtelId = document.createTextNode(response[i]['id']);

                    var elNombreEvento = document.createElement('td');
                    var txtelNombreEvento = document.createTextNode(response[i]['nombre']);

                    var elDescripcionEvento = document.createElement('td');
                    var txtelDescripcionEvento = document.createTextNode(response[i]['descripcion']);

                    var elDescuentoEvento = document.createElement('td');
                    var txtelDescuentoEvento = document.createTextNode(response[i]['descuento']);

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
                                              elId.appendChild(txtelId);
                                              elFila.appendChild(elId);


                    elNombreEvento.appendChild(txtelNombreEvento);
                    elFila.appendChild(elNombreEvento);

                    elDescripcionEvento.appendChild(txtelDescripcionEvento);
                    elFila.appendChild(elDescripcionEvento);

                    elDescuentoEvento.appendChild(txtelDescuentoEvento);
                    elFila.appendChild(elDescuentoEvento);

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
            url: "services/listarTiposEventoPorEstado.php",
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

                    var elFila = document.createElement('tr');
                    /*Se crean la celta por cada campo relevante de la tabla de la base de datos*/
                    /*Se crean la celta por cada campo relevante de la tabla de la base de datos*/
                    var elId = document.createElement('td');
                    var txtelId = document.createTextNode(response[i]['id']);

                    var elNombreEvento = document.createElement('td');
                    var txtelNombreEvento = document.createTextNode(response[i]['nombre']);

                    var elDescripcionEvento = document.createElement('td');
                    var txtelDescripcionEvento = document.createTextNode(response[i]['descripcion']);

                    var elDescuentoEvento = document.createElement('td');
                    var txtelDescuentoEvento = document.createTextNode(response[i]['descuento']);

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

                    /*Serealiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                      y finalmente la fila en el tbody*/
                                              elId.appendChild(txtelId);
                                              elFila.appendChild(elId);

                      elNombreEvento.appendChild(txtelNombreEvento);
                      elFila.appendChild(elNombreEvento);

                      elDescripcionEvento.appendChild(txtelDescripcionEvento);
                      elFila.appendChild(elDescripcionEvento);

                      elDescuentoEvento.appendChild(txtelDescuentoEvento);
                      elFila.appendChild(elDescuentoEvento);

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
        var sPorBuscar = "id";
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
            url: "services/listarTiposEventoPorEstado.php",
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

                        var elFila = document.createElement('tr');
                        /*Se crean la celta por cada campo relevante de la tabla de la base de datos*/
                        var elId = document.createElement('td');
                        var txtelId = document.createTextNode(response[i]['id']);

                        var elNombreEvento = document.createElement('td');
                        var txtelNombreEvento = document.createTextNode(response[i]['nombre']);

                        var elDescripcionEvento = document.createElement('td');
                        var txtelDescripcionEvento = document.createTextNode(response[i]['descripcion']);

                        var elDescuentoEvento = document.createElement('td');
                        var txtelDescuentoEvento = document.createTextNode(response[i]['descuento']);

                        /*Se crea el boton Modificar*/
                        var elModificar = document.createElement('td');
                        elModificar.classList.add("botonesLista");
                        elModificar.value = response[i]['id'];
                        elModificar.setAttribute('onclick', "Modificar(this.value)");
                        var txtModificar = document.createElement('i');
                        txtModificar.classList.add('fa');
                        txtModificar.classList.add('fa-pencil-square-o');
                        txtModificar.classList.add('fa-2x');
                        /*Se crea el boton eliminar*/
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
                                                  elId.appendChild(txtelId);
                                                  elFila.appendChild(elId);

                          elNombreEvento.appendChild(txtelNombreEvento);
                          elFila.appendChild(elNombreEvento);

                          elDescripcionEvento.appendChild(txtelDescripcionEvento);
                          elFila.appendChild(elDescripcionEvento);

                          elDescuentoEvento.appendChild(txtelDescuentoEvento);
                          elFila.appendChild(elDescuentoEvento);

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
            url: "services/listarTiposEventoPorEstado.php",
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
                        var elFila = document.createElement('tr');
                        /*Se crean la celta por cada campo relevante de la tabla de la base de datos*/
                        var elId = document.createElement('td');
                        var txtelId = document.createTextNode(response[i]['id']);

                        var elNombreEvento = document.createElement('td');
                        var txtelNombreEvento = document.createTextNode(response[i]['nombre']);

                        var elDescripcionEvento = document.createElement('td');
                        var txtelDescripcionEvento = document.createTextNode(response[i]['descripcion']);

                        var elDescuentoEvento = document.createElement('td');
                        var txtelDescuentoEvento = document.createTextNode(response[i]['descuento']);


                        var elModificar = document.createElement('td');
                        elModificar.classList.add("botonesLista");
                        elModificar.value = response[i]['id'];
                        elModificar.setAttribute('onclick', "Modificar(this.value)");
                        var txtModificar = document.createElement('i');
                        txtModificar.classList.add('fa');
                        txtModificar.classList.add('fa-pencil-square-o');
                        txtModificar.classList.add('fa-2x');
                        var elEliminar = document.createElement('td');
                        elEliminar.classList.add("botonesLista");
                        elEliminar.value = response[i]['id'];
                        elEliminar.setAttribute('onclick', "Activar(this.value)");
                        var txtEliminar = document.createElement('i');
                        txtEliminar.classList.add('fa');
                        txtEliminar.classList.add('fa-check');
                        txtEliminar.classList.add('fa-2x');

                        elId.appendChild(txtelId);
                        elFila.appendChild(elId);

                        elNombreEvento.appendChild(txtelNombreEvento);
                        elFila.appendChild(elNombreEvento);

                        elDescripcionEvento.appendChild(txtelDescripcionEvento);
                        elFila.appendChild(elDescripcionEvento);

                        elDescuentoEvento.appendChild(txtelDescuentoEvento);
                        elFila.appendChild(elDescuentoEvento);

                        elModificar.appendChild(txtModificar);
                        elFila.appendChild(elModificar);
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
        url: "services/selectTipoEventoPorModificar.php",
        type: "POST",
        data: {
            'id_tipo_evento': idElemento
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response) {


            document.querySelector("#txtNombreEvento").value = response[0]['nombre'];
            document.querySelector("#txtDescripcionEvento").value = response[0]['descripcion'];
            document.querySelector("#txtDescuento").value = response[0]['descuento'];

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
            text: "Si desactiva este elemento los usuarios no podran accesarlo.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sí, eliminarlo",
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
            text: "Si activa este elemento los usuarios podrán accesarlo.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sí, habilitarlo",
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

    window.location = "registrarTipoEvento.html";
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
        url: "services/cambiarEstadoTipoEvento.php",
        type: "POST",
        data: {
            'id': id,
            'estado': estado
        },
        success: function() {
            swal({
                title: "La información fue ingresada correctamente",
                text: "El tipo de evento se encuentra inactivo.",
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

    var txtNombreEvento = document.querySelector('#txtNombreEvento');
    var txtDescripcionEvento = document.querySelector('#txtDescripcionEvento');
    var txtDescuento = document.querySelector('#txtDescuento');

    /*Variables para los valores que esten dentro de cada uno de
    los elementos del formulario*/

    var sNombreEvento = txtNombreEvento.value;
    var sDescripcionEvento = txtDescripcionEvento.value;
    var nDescuento = Number(txtDescuento.value);
    var sImagePath;

    /*****************************************************************************
      Se realiza la subida de la imagen
    *****************************************************************************/
    var peticion = $.ajax({
      url               : "services/imageUploader.php?path=../imgs/uploads/tipo_evento/", //Se envia el path como paremetro para el envio de la imagen
      type				: "POST",
      data				: new FormData(vThis),
      contentType	: false,
      cache				: false,
      processData	:	false,
      async: false,
      timeout: 30000,

      success: function(data) {
        sImagePath = data.replace('../','');
      },
      error: function(request, cerror) {
        alert(cerror);
      }
    });

    var peticion2 = $.ajax({
        url: "services/modificarTipoEvento.php",
        type: "POST",
        data: {
            'idElemento': idElemento,
            'psNombreEvento': sNombreEvento,
            'psDescripcionEvento': sDescripcionEvento,
            'pnDescuento': nDescuento,
            'psImagePath': sImagePath,
            'estado': estado
        },
        success: function(response) {
            swal({
                title: "La información fue ingresada correctamente",
                text: "Los datos del tipo de evento han sido actualizados.",
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
        url: "services/cambiarEstadoTipoEvento.php",
        type: "POST",
        data: {
            'id': id,
            'estado': estado

        },
        success: function() {
            swal({
                title: "La información fue ingresada correctamente",
                text: "El tipo de evento se encuentra activado.",
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
