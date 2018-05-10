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
            url: "services/listarConveniosPorEstado.php",
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
                    var elCedJuridicaConvenio = document.createElement('td');
                    var txtelCedJuridicaConvenio = document.createTextNode(response[i]['id_usuario']);

                    var elNombreConvenio = document.createElement('td');
                    var txtelNombreConvenio = document.createTextNode(response[i]['nombre']);

                    var elDescripcionConvenio = document.createElement('td');
                    var txtelDescripcionConvenio = document.createTextNode(response[i]['descripcion']);

                    var elDescuentoConvenio = document.createElement('td');
                    var txtelDescuentoConvenio = document.createTextNode(response[i]['descuento']);

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
                    elCedJuridicaConvenio.appendChild(txtelCedJuridicaConvenio);
                    elFila.appendChild(elCedJuridicaConvenio);

                    elNombreConvenio.appendChild(txtelNombreConvenio);
                    elFila.appendChild(elNombreConvenio);

                    elDescripcionConvenio.appendChild(txtelDescripcionConvenio);
                    elFila.appendChild(elDescripcionConvenio);

                    elDescuentoConvenio.appendChild(txtelDescuentoConvenio);
                    elFila.appendChild(elDescuentoConvenio);

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
            url: "services/listarConveniosPorEstado.php",
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
                    var elCedJuridicaConvenio = document.createElement('td');
                    var txtelCedJuridicaConvenio = document.createTextNode(response[i]['id_usuario']);

                    var elNombreConvenio = document.createElement('td');
                    var txtelNombreConvenio = document.createTextNode(response[i]['nombre']);

                    var elDescripcionConvenio = document.createElement('td');
                    var txtelDescripcionConvenio = document.createTextNode(response[i]['descripcion']);

                    var elDescuentoConvenio = document.createElement('td');
                    var txtelDescuentoConvenio = document.createTextNode(response[i]['descuento']);

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
                    elCedJuridicaConvenio.appendChild(txtelCedJuridicaConvenio);
                    elFila.appendChild(elCedJuridicaConvenio);

                    elNombreConvenio.appendChild(txtelNombreConvenio);
                    elFila.appendChild(elNombreConvenio);

                    elDescripcionConvenio.appendChild(txtelDescripcionConvenio);
                    elFila.appendChild(elDescripcionConvenio);

                    elDescuentoConvenio.appendChild(txtelDescuentoConvenio);
                    elFila.appendChild(elDescuentoConvenio);

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
        var sPorBuscar = "id_usuario";
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
            url: "services/listarConveniosPorEstado.php",
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
                        var elCedJuridicaConvenio = document.createElement('td');
                        var txtelCedJuridicaConvenio = document.createTextNode(response[i]['id_usuario']);

                        var elNombreConvenio = document.createElement('td');
                        var txtelNombreConvenio = document.createTextNode(response[i]['nombre']);

                        var elDescripcionConvenio = document.createElement('td');
                        var txtelDescripcionConvenio = document.createTextNode(response[i]['descripcion']);

                        var elDescuentoConvenio = document.createElement('td');
                        var txtelDescuentoConvenio = document.createTextNode(response[i]['descuento']);

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
                        elCedJuridicaConvenio.appendChild(txtelCedJuridicaConvenio);
                        elFila.appendChild(elCedJuridicaConvenio);

                        elNombreConvenio.appendChild(txtelNombreConvenio);
                        elFila.appendChild(elNombreConvenio);

                        elDescripcionConvenio.appendChild(txtelDescripcionConvenio);
                        elFila.appendChild(elDescripcionConvenio);

                        elDescuentoConvenio.appendChild(txtelDescuentoConvenio);
                        elFila.appendChild(elDescuentoConvenio);

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
            url: "services/listarConveniosPorEstado.php",
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
                        var elCedJuridicaConvenio = document.createElement('td');
                        var txtelCedJuridicaConvenio = document.createTextNode(response[i]['id_usuario']);

                        var elNombreConvenio = document.createElement('td');
                        var txtelNombreConvenio = document.createTextNode(response[i]['nombre']);

                        var elDescripcionConvenio = document.createElement('td');
                        var txtelDescripcionConvenio = document.createTextNode(response[i]['descripcion']);

                        var elDescuentoConvenio = document.createElement('td');
                        var txtelDescuentoConvenio = document.createTextNode(response[i]['descuento']);


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

                        elCedJuridicaConvenio.appendChild(txtelCedJuridicaConvenio);
                        elFila.appendChild(elCedJuridicaConvenio);

                        elNombreConvenio.appendChild(txtelNombreConvenio);
                        elFila.appendChild(elNombreConvenio);

                        elDescripcionConvenio.appendChild(txtelDescripcionConvenio);
                        elFila.appendChild(elDescripcionConvenio);

                        elDescuentoConvenio.appendChild(txtelDescuentoConvenio);
                        elFila.appendChild(elDescuentoConvenio);

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
        url: "services/selectConvenioPorModificar.php",
        type: "POST",
        data: {
            'id_convenio': idElemento
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response) {

            document.querySelector("#txtCedJuridicaConvenio").value = response[0]['id_usuario'];
            document.querySelector("#txtNombreConvenio").value = response[0]['nombre'];
            document.querySelector("#txtDescripcionConvenio").value = response[0]['descripcion'];
            document.querySelector("#txtDescuentoConvenio").value = response[0]['descuento'];

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
            text: "Si activa este elemento los usuarios podran accesarlo.",
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

    window.location = "registrarConvenios.html";
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
        url: "services/cambiarEstadoConvenio.php",
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

    var elTxtCedJuridicaConvenio = document.querySelector('#txtCedJuridicaConvenio');
    var elTxtNombreConvenio = document.querySelector('#txtNombreConvenio');
    var elTxtDescripcionConvenio = document.querySelector('#txtDescripcionConvenio');
    var elTxtDescuentoConvenio = document.querySelector('#txtDescuentoConvenio');


    /*Variables para los valores que esten dentro de cada uno de
    los elementos del formulario*/

    var sCedulaJuridica = Number(elTxtCedJuridicaConvenio.value);
    var sNombreConvenio = elTxtNombreConvenio.value;
    var sDescripcionConvenio = elTxtDescripcionConvenio.value;
    var nDescuento = Number(elTxtDescuentoConvenio.value);


    var peticion2 = $.ajax({
        url: "services/modificarConvenio.php",
        type: "POST",
        data: {
            'idElemento': idElemento,
            'sCedulaJuridica': sCedulaJuridica,
            'sNombre': sNombreConvenio,
            'sDescripcionConvenio': sDescripcionConvenio,
            'nDescuento': nDescuento,
            'estado': estado
        },
        success: function(response) {
            swal({
                title: "La información fue ingresada correctamente",
                text: "Los datos del convenio han sido actualizados.",
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
        url: "services/cambiarEstadoConvenio.php",
        type: "POST",
        data: {
            'id': id,
            'estado': estado

        },
        success: function() {
            swal({
                title: "La información fue ingresada correctamente",
                text: "El convenio se encuentra activado.",
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

cargarComboBox();
function cargarComboBox () {
  var peticion = $.ajax({
      url: "services/listarUsuariosPorJuridicoModificar.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',

      success: function(response){
        var elSelectProvedorProducto = document.querySelector("#txtCedJuridicaConvenio");
        for (var i = 0; i < response.length; i++) {
            var option = document.createElement('option');
              option.setAttribute("value", Number(response[i]['id']));
              var nodoDeTexto = document.createTextNode("(" + response[i]['identificacion'] + ") " + response[i]['primer_nombre'] + " " + response[i]['primer_apellido']);
            option.appendChild(nodoDeTexto);
            elSelectProvedorProducto.appendChild(option);
        }
      },
      error: function(request, error) {
          alert(error);
      }
  });

}
