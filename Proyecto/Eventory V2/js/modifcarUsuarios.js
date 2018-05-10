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
            url: "services/listarUsuariosPorEstado.php",
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
                    var elIdentificacion = document.createElement('td');
                    var txtelIdentificacion = document.createTextNode(response[i]['identificacion']);

                    var elPrimerNombre = document.createElement('td');
                    var txtelPrimerNombre = document.createTextNode(response[i]['primer_nombre']);

                    var elPrimerApellido = document.createElement('td');
                    var txtelPrimerApellido = document.createTextNode(response[i]['primer_apellido']);

                    var elCorreoElectronico = document.createElement('td');
                    var txtelCorreoElectronico = document.createTextNode(response[i]['correo_electronico']);

                    var elNumeroTelefonicoPrincipal = document.createElement('td');
                    var txtelNumeroTelefonicoPrincipal = document.createTextNode(response[i]['numero_telefono_primario']);
                    /*NOTE si existe un dato  que sea numerico pero deberia ser un txto se coloca asi */
                    var TipoUsuario;
                    if (response[i]['tipo'] == 1) {
                        TipoUsuario = "Administrador";
                    }
                    if (response[i]['tipo'] == 2) {
                        TipoUsuario = "Serv. Al Cliente";
                    }
                    if (response[i]['tipo'] == 3) {
                        TipoUsuario = "Cajero";
                    }

                    var elTipoUsuario = document.createElement('td');
                    var txtelTipoUsuario = document.createTextNode(TipoUsuario);


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
                    elIdentificacion.appendChild(txtelIdentificacion);
                    elFila.appendChild(elIdentificacion);

                    elPrimerNombre.appendChild(txtelPrimerNombre);
                    elFila.appendChild(elPrimerNombre);

                    elPrimerApellido.appendChild(txtelPrimerApellido);
                    elFila.appendChild(elPrimerApellido);

                    elCorreoElectronico.appendChild(txtelCorreoElectronico);
                    elFila.appendChild(elCorreoElectronico);

                    elNumeroTelefonicoPrincipal.appendChild(txtelNumeroTelefonicoPrincipal);
                    elFila.appendChild(elNumeroTelefonicoPrincipal);

                    elTipoUsuario.appendChild(txtelTipoUsuario);
                    elFila.appendChild(elTipoUsuario);

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
            url: "services/listarUsuariosPorEstado.php",
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
                    var elIdentificacion = document.createElement('td');
                    var txtelIdentificacion = document.createTextNode(response[i]['identificacion']);

                    var elPrimerNombre = document.createElement('td');
                    var txtelPrimerNombre = document.createTextNode(response[i]['primer_nombre']);

                    var elPrimerApellido = document.createElement('td');
                    var txtelPrimerApellido = document.createTextNode(response[i]['primer_apellido']);

                    var elCorreoElectronico = document.createElement('td');
                    var txtelCorreoElectronico = document.createTextNode(response[i]['correo_electronico']);

                    var elNumeroTelefonicoPrincipal = document.createElement('td');
                    var txtelNumeroTelefonicoPrincipal = document.createTextNode(response[i]['numero_telefono_primario']);
                    /*NOTE si existe un dato  que sea numerico pero deberia ser un txto se coloca asi */
                    var TipoUsuario;
                    if (response[i]['tipo'] == 1) {
                        TipoUsuario = "Administrador";
                    }
                    if (response[i]['tipo'] == 2) {
                        TipoUsuario = "Serv. Al Cliente";
                    }
                    if (response[i]['tipo'] == 3) {
                        TipoUsuario = "Cajero";
                    }

                    var elTipoUsuario = document.createElement('td');
                    var txtelTipoUsuario = document.createTextNode(TipoUsuario);


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
                    elIdentificacion.appendChild(txtelIdentificacion);
                    elFila.appendChild(elIdentificacion);

                    elPrimerNombre.appendChild(txtelPrimerNombre);
                    elFila.appendChild(elPrimerNombre);

                    elPrimerApellido.appendChild(txtelPrimerApellido);
                    elFila.appendChild(elPrimerApellido);

                    elCorreoElectronico.appendChild(txtelCorreoElectronico);
                    elFila.appendChild(elCorreoElectronico);

                    elNumeroTelefonicoPrincipal.appendChild(txtelNumeroTelefonicoPrincipal);
                    elFila.appendChild(elNumeroTelefonicoPrincipal);

                    elTipoUsuario.appendChild(txtelTipoUsuario);
                    elFila.appendChild(elTipoUsuario);

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
        var sPorBuscar = "identificacion";
    } else if (tipoBusqueda == 2) {
        var txtBuscar = document.querySelector("#txtBuscarNombre");
        var sPorBuscar = "primer_nombre";
    }
    if (Number(estado) == 1) {
        var elTableBody = document.querySelector('#TablaDeElementos tbody');
        elTableBody.innerHTML = '';
        var elbtnActivo = document.querySelector('#btnActivo');
        elbtnActivo.classList.add("Activo");
        var elbtnInactivo = document.querySelector('#btnInactivo');
        elbtnInactivo.classList.remove("Activo");

        var peticion = $.ajax({
            url: "services/listarUsuariosPorEstado.php",
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
                        var elIdentificacion = document.createElement('td');
                        var txtelIdentificacion = document.createTextNode(response[i]['identificacion']);

                        var elPrimerNombre = document.createElement('td');
                        var txtelPrimerNombre = document.createTextNode(response[i]['primer_nombre']);

                        var elPrimerApellido = document.createElement('td');
                        var txtelPrimerApellido = document.createTextNode(response[i]['primer_apellido']);

                        var elCorreoElectronico = document.createElement('td');
                        var txtelCorreoElectronico = document.createTextNode(response[i]['correo_electronico']);

                        var elNumeroTelefonicoPrincipal = document.createElement('td');
                        var txtelNumeroTelefonicoPrincipal = document.createTextNode(response[i]['numero_telefono_primario']);

                        /*Se extraen los datos numericos y se pasan a texto*/
                        var TipoUsuario;
                        if (response[i]['tipo'] == 1) {
                            TipoUsuario = "Administrador";
                        }
                        if (response[i]['tipo'] == 2) {
                            TipoUsuario = "Serv. Al Cliente";
                        }
                        if (response[i]['tipo'] == 3) {
                            TipoUsuario = "Cajero";
                        }

                        var elTipoUsuario = document.createElement('td');
                        var txtelTipoUsuario = document.createTextNode(TipoUsuario);


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
                        elIdentificacion.appendChild(txtelIdentificacion);
                        elFila.appendChild(elIdentificacion);

                        elPrimerNombre.appendChild(txtelPrimerNombre);
                        elFila.appendChild(elPrimerNombre);

                        elPrimerApellido.appendChild(txtelPrimerApellido);
                        elFila.appendChild(elPrimerApellido);

                        elCorreoElectronico.appendChild(txtelCorreoElectronico);
                        elFila.appendChild(elCorreoElectronico);

                        elNumeroTelefonicoPrincipal.appendChild(txtelNumeroTelefonicoPrincipal);
                        elFila.appendChild(elNumeroTelefonicoPrincipal);

                        elTipoUsuario.appendChild(txtelTipoUsuario);
                        elFila.appendChild(elTipoUsuario);

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
            url: "services/listarUsuariosPorEstado.php",
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
                        var elIdentificacion = document.createElement('td');
                        var txtelIdentificacion = document.createTextNode(response[i]['identificacion']);

                        var elPrimerNombre = document.createElement('td');
                        var txtelPrimerNombre = document.createTextNode(response[i]['primer_nombre']);

                        var elPrimerApellido = document.createElement('td');
                        var txtelPrimerApellido = document.createTextNode(response[i]['primer_apellido']);

                        var elCorreoElectronico = document.createElement('td');
                        var txtelCorreoElectronico = document.createTextNode(response[i]['correo_electronico']);

                        var elNumeroTelefonicoPrincipal = document.createElement('td');
                        var txtelNumeroTelefonicoPrincipal = document.createTextNode(response[i]['numero_telefono_primario']);

                        /*Se extraen los datos numericos y se pasan a texto*/
                        var TipoUsuario;
                        if (response[i]['tipo'] == 1) {
                            TipoUsuario = "Administrador";
                        }
                        if (response[i]['tipo'] == 2) {
                            TipoUsuario = "Serv. Al Cliente";
                        }
                        if (response[i]['tipo'] == 3) {
                            TipoUsuario = "Cajero";
                        }

                        var elTipoUsuario = document.createElement('td');
                        var txtelTipoUsuario = document.createTextNode(TipoUsuario);


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

                        elIdentificacion.appendChild(txtelIdentificacion);
                        elFila.appendChild(elIdentificacion);

                        elPrimerNombre.appendChild(txtelPrimerNombre);
                        elFila.appendChild(elPrimerNombre);

                        elPrimerApellido.appendChild(txtelPrimerApellido);
                        elFila.appendChild(elPrimerApellido);

                        elCorreoElectronico.appendChild(txtelCorreoElectronico);
                        elFila.appendChild(elCorreoElectronico);

                        elNumeroTelefonicoPrincipal.appendChild(txtelNumeroTelefonicoPrincipal);
                        elFila.appendChild(elNumeroTelefonicoPrincipal);

                        elTipoUsuario.appendChild(txtelTipoUsuario);
                        elFila.appendChild(elTipoUsuario);

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
        url: "services/selectUsuarioPorModificar.php",
        type: "POST",
        data: {
            'id_usuario': idElemento
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response) {

            //Cargar datos de cliente
            document.querySelector("#txtPrimerNombre").value = response[0]['primer_nombre'];
            document.querySelector("#txtSegundoNombre").value = response[0]['segundo_nombre'];
            document.querySelector("#txtPrimerApellido").value = response[0]['primer_apellido'];
            document.querySelector("#txtSegundoApellido").value = response[0]['segundo_apellido'];
            document.querySelector("#txtNacionalidad").value = response[0]['nacionalidad'];
            document.querySelector("#txtCedula").value = response[0]['identificacion'];
            document.querySelector("#txtFechaNacimiento").value = response[0]['fecha_nacimiento'];
            var sGenero = response[0]['genero'];
            var tipo = response[0]['tipo'];

            var chkTipo  = document.getElementsByName("tipoUsuario");
            for (var i = 0; i < chkTipo.length; i++) {
                if (chkTipo[i].value == tipo) {
                    chkTipo[i].checked = true;
                }
            }

            var elGenero = document.getElementsByName("genero");
            for (var i = 0; i < elGenero.length; i++) {
                if (elGenero[i].value == sGenero) {
                    elGenero[i].checked = true;
                }
            }
            if (response[0]['juridico'] == 1) {
                document.querySelector("#chkJuridico").checked = true;
            } else {
                document.querySelector("#chkJuridico").checked = false;
            }
            document.querySelector("#txtTelefonoPrincipal").value = response[0]['numero_telefono_primario'];
            document.querySelector("#txtTelefonoSecundario").value = response[0]['numero_telefono_secundario'];

            var elFotoPefil = document.querySelector("#ImagenPerfilUsuario");
            if (elFotoPefil) {
                if (ImageExist(response[0]['foto_perfil'])) {
                    elFotoPefil.style.backgroundImage = "url(" + response[0]['foto_perfil'] + ")";
                    elFotoPefil.style.backgroundRepeat = "no-repeat";
                    elFotoPefil.style.backgroundSize = "cover";
                }
            }
            document.querySelector("#txtCorreoElectronico").value = response[0]['correo_electronico'];

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

    window.location = "registroUsuariosPorAdministrador.html";
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
        url: "services/cambiarEstadoUsuario.php",
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
            console.log(id);
            console.log(estado);
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
    if (document.querySelector("#chkJuridico").checked == true) {
        var juridico = 1;
    } else {
        var juridico = 0;
    }
    /*variables para los elemnetos del formulario*/
    var elTxtCedula = document.querySelector('#txtCedula');
    var elTxtNombre = document.querySelector('#txtPrimerNombre');
    var elTxtSegundoNombre = document.querySelector('#txtSegundoNombre');
    var elTxtApellido = document.querySelector('#txtPrimerApellido');
    var elTxtSegundoApellido = document.querySelector('#txtSegundoApellido');
    var elTxtNacionalidad = document.querySelector('#txtNacionalidad');
    var elTxtTelefono = document.querySelector('#txtTelefonoPrincipal');
    var elTxtTelefono2 = document.querySelector('#txtTelefonoSecundario');
    var elTxtFechaNacimiento = document.querySelector('#txtFechaNacimiento');
    var elTxtCorreoElectronico = document.querySelector('#txtCorreoElectronico');
    var elTxtContrasena = document.querySelector('#txtContrasena');
    var elTxtConfirmarContrasena = document.querySelector('#txtContrasena2');
    var elTxtGenero = document.getElementsByName('genero');
    var elRadioBtnTipoUsuario=document.getElementsByName('tipoUsuario');

    /*Variables para los valores que esten dentro de cada uno de
    los elementos del formulario*/
    var nCedula = Number(elTxtCedula.value);
    var sNombre = elTxtNombre.value;
    var sSegundoNombre = elTxtSegundoNombre.value;
    var sApellido = elTxtApellido.value;
    var sSegundoApellido = elTxtSegundoApellido.value;
    var nTelefono = Number(elTxtTelefono.value);
    var nTelefono2 = Number(elTxtTelefono2.value);
    var dFechaNacimiento = elTxtFechaNacimiento.value;
    var sCorreoElectronico = (elTxtCorreoElectronico.value);
    var sContrasena = elTxtContrasena.value;
    var sConfirmarContrasena = elTxtConfirmarContrasena.value;
    var sPais = elTxtNacionalidad.value;
    var sImagePath;

    /*****************************************************************************
    Se realiza la subida de la imagen
    *****************************************************************************/
    var peticion = $.ajax({
        url: "services/imageUploader.php?path=../imgs/uploads/foto_perfil/", //Se envia el path como paremetro para el envio de la imagen
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

    for (var i = 0; i < elTxtGenero.length; i++) {
        if (elTxtGenero[i].checked) {
            var sGenero = elTxtGenero[i].value;
        }
    }
    for (var i = 0; i < elRadioBtnTipoUsuario.length; i++) {
        if (elRadioBtnTipoUsuario[i].checked){
            var ntipoUsuario = Number(elRadioBtnTipoUsuario[i].value);
            break;
        }
    }
    if (sContrasena == sConfirmarContrasena) {
        var peticion = $.ajax({
            url: "services/checkCorreoModificar.php",
            type: "POST",
            data: {
                'sCorreoElectronico'    : sCorreoElectronico,
                'id_usuario'            : idElemento
            },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',
            async: false,
            timeout: 50000,

            success: function(response){
                console.log(response);
                if (Number(response[0]['disponible'] == 1) ) {
                    var peticion2 = $.ajax({
                        url: "services/modificarUsuarios.php",
                        type: "POST",
                        data: {
                            'idElemento': idElemento,
                            'nCedula': nCedula,
                            'sNombre': sNombre,
                            'sSegundoNombre': sSegundoNombre,
                            'sApellido': sApellido,
                            'sSegundoApellido': sSegundoApellido,
                            'nTelefono': nTelefono,
                            'nTelefono2': nTelefono2,
                            'dFechaNacimiento': dFechaNacimiento,
                            'sCorreoElectronico': sCorreoElectronico,
                            'sContrasena': sContrasena,
                            'sGenero': sGenero,
                            'sPais': sPais,
                            'estado':estado,
                            'sImagePath': sImagePath,
                            'tipo_usuario':ntipoUsuario,
                            'estado':estado,
                            'juridico':juridico
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
                } else {
                    swal({
                        title: "Error!",
                        text: "Este correo electrónico ya se encuentra registrado.",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "red",
                        confirmButtonText: "Continuar",
                        closeOnConfirm: false
                    });
                }
            },
            error: function(request, error) {
                alert(error);
            }
        });
    } else {
        swal({
            title: "Error!",
            text: "Las contraseñas no coinciden.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "red",
            confirmButtonText: "Continuar",
            closeOnConfirm: false
        }/*,
        function(isConfirm){
        window.location = "registrarTiendas.html";
    }*/);
}
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
        url: "services/cambiarEstadoUsuario.php",
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
