/****************************************************************************
  Autor: Diego Mendez Leon
  Fecha de creacion: 13/08/2016
  Fecha de modificacion: /08/2016
  EVENTORY APP
  2016
  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.
*****************************************************************************/
var elchkEnvio = document.querySelector("#chkEnvio");
checkboxEnvio(elchkEnvio);

//Se declara la latitud y longitud global
var nLatitud, nLongitud, sDireccion, gmMarcador, gmMapa, gmVentanaInformacion;
//Funcion llamada por API para inicializar el mapa
function funcionInicializarMapa(latitud, longitud) {
    document.querySelector('#mapa').style.pointerEvents = 'none';
    //Se crea una instancia para el mapa
    gmMapa = new google.maps.Map(document.querySelector('#mapa'), {
        //Se establece el zoom
        zoom: 16,
        //Se centra el mapa a una ubicacion
        center: new google.maps.LatLng(9.935, -84.092),
        //Se establece el tipo del mapa
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    //Se agregan opciones al mapa
    var gmOpcionesMapa = {
        //Se establece el zoom maximo
        maxZoom: 20,
        //Se establece el zoom minimo
        minZoom: 14,
        //Se deshabilita el uso de stree view
        streetViewControl: false,
        //Se deshabilita el control del tipo de mapa
        mapTypeControl: false
    }

    nLatitud = latitud;
    nLongitud = longitud;

    //Se agregan las opciones al mapa
    gmMapa.setOptions(gmOpcionesMapa);
    //Se setea un marcador con una ubicacion por defecto
    gmMarcador = new google.maps.Marker({
        //Se agrega la posicion en San Jose
        position: new google.maps.LatLng(nLatitud, nLongitud) //,
            //Se habilita el arratre del marcador
            //draggable: true
    });
    //Se centra el mapa en la posicion del marcador
    gmMapa.setCenter(gmMarcador.position);
    //Se coloca el marcador en el mapa
    gmMarcador.setMap(gmMapa);
    //Se obtiene una latitud y longitud por defecto
    nLatitud = gmMarcador.position.lat();
    nLongitud = gmMarcador.position.lng();
    //Se agrega un evento para cuando se realiza un click en el mapa, de manera que el marcador se mueva a esa ubicacion
    google.maps.event.addListener(gmMapa, 'click', function(event) {
        gmNuevoMarcador = new google.maps.Marker({
            //Se establece la posicion del marcador
            position: event.latLng,
            //Se establece el mapa donde se ubicara el marcador
            map: gmMapa,
            //Se establece la animacion del marcador
            animation: google.maps.Animation.DROP
        });
        //Si no existe un marcador se le asigna el valor del actual sino entonces es actualizado
        if (gmMarcador != undefined) {
            gmMarcador.setMap(null);
        }
        gmMarcador = gmNuevoMarcador;
        var geocoder = new google.maps.Geocoder;

        geocoder.geocode({ 'location': event.latLng }, function(results, status) {

            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var gmContenido = '<h2>' + results[1].formatted_address + '</h2>' + '<p>' + event.latLng + '</p>';
                    var gmVentanaInformacion = new google.maps.InfoWindow({
                        content: gmContenido
                    });
                    gmVentanaInformacion.open(gmMapa, gmMarcador);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
        //Se almacena la latitud en una variable
        nLatitud = event.latLng.lat();
        //Se almacena la longitud en una variable
        nLongitud = event.latLng.lng();
    });
}

function checkboxEnvio(el) {
    var elFechaCaducidad = document.querySelector('#mapWrapper');
    if (el.checked == true) {
        elFechaCaducidad.classList.remove("MapaOculto");
    } else {
        elFechaCaducidad.classList.add("MapaOculto");
    }
}

cargarComboBox();

function cargarComboBox() {

    var nIdListaEvento = getParameterByName("idEvento");
    var peticion = $.ajax({
        url: "services/selectLista.php",
        type: "POST",
        data: {
            'id_lista': nIdListaEvento
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,


        success: function(response) {


            var nIdTienda = response[0]['id_tienda'];
            var peticion2 = $.ajax({
                url: "services/listarTiposEventos.php",
                type: "POST",
                data: {
                    'id_tienda': nIdTienda
                },
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                dataType: 'json',
                success: function(response) {
                    var elSelectProvedorProducto = document.querySelector("#txtTipoEvento");
                    for (var i = 0; i < response.length; i++) {
                        var option = document.createElement('option');
                        option.setAttribute("value", Number(response[i]['id']));
                        var nodoDeTexto = document.createTextNode(response[i]['nombre']);
                        option.appendChild(nodoDeTexto);
                        elSelectProvedorProducto.appendChild(option);
                    }
                },
                error: function(request, error) {
                    alert(error);
                    alert('cargarComboBox');
                }
            });


        },
        error: function(request, error) {
            alert(error);
            alert('cargarComboBox');

        }
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



function CargarInformacion() {
    var nIdListaEvento = getParameterByName("idEvento");

    var peticion = $.ajax({
        url: "services/selectLista.php",
        type: "POST",
        data: {
            'id_lista': nIdListaEvento
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',

        async: false,
        timeout: 30000,
        success: function(response) {

            var txtNombreEvento = document.querySelector('#txtNombreEvento');
            var txtFechaEvento = document.querySelector('#txtFechaEvento');
            var txtTipoEvento = document.querySelector('#txtTipoEvento');
            var chkEnvio = document.querySelector('#chkEnvio');
            txtNombreEvento.value = response[0]['nombre'];
            txtFechaEvento.value = response[0]['fecha_evento'];
            txtTipoEvento.value = Number(response[0]['id_tipo_evento']);
            if (Number(response[0]['envio']) == 0) {
                chkEnvio.checked = false;
            } else {
                chkEnvio.checked = true;
            }
            checkboxEnvio(chkEnvio);
            
            var chkActivar = document.querySelector('#chkActivar');
            if (Number(response[0]['estado']) == 1) {
                chkActivar.checked = true;
            } else {
                chkActivar.checked = false;
            }
            funcionInicializarMapa(response[0]['latitud'], response[0]['longitud']);
            CargarDatosDeUsuario();
        },
        error: function(request, error) {
            alert(error);
        }
    });
    var peticion2 = $.ajax({
        url: "services/listarProductosEnLista.php",
        type: "POST",
        data: {
            'id_lista': nIdListaEvento
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',

        success: function(response) {

            //Productos en tienda
            var elTablaListaDeProductosTBody = document.querySelector("#TablaListaDeProductos tbody");
            elTablaListaDeProductosTBody.innerHTML = "";


            nLength = response.length;
            for (var i = 0; i < nLength; i++) {
                var elFila = document.createElement('tr');
                var ProductoEnLista = response[i]['id_producto'];

                var elCeldaCodigoProducto = document.createElement('td');
                var txtCodigoProducto = document.createTextNode(response[i]['id_producto']);
                var elCeldaEstadoProducto = document.createElement('td');
                if (Number(response[i]['estado']) == 1) {
                    var txtEstadoProducto = document.createTextNode('No obsequiado');
                } else if (Number(response[i]['estado']) == 2) {
                    var txtEstadoProducto = document.createTextNode('Reservado');
                } else if (Number(response[i]['estado']) == 3) {
                    var txtEstadoProducto = document.createTextNode('Regalado');
                }
                var elCeldaCantidadProducto = document.createElement('td');
                var txtCantidadProducto = document.createTextNode(response[i]['cantidad']);
                //Dentro de for
                var elCeldaNombreProducto = document.createElement('td');
                var txtNombreProducto;
                var elCeldaMarcaProducto = document.createElement('td');
                var txtMarcaProducto;
                var elCeldaPrecioProducto = document.createElement('td');
                var txtPrecioProducto;


                txtNombreProducto = document.createTextNode(response[i]['nombre_producto']);
                txtMarcaProducto = document.createTextNode(response[i]['marca_producto']);
                txtPrecioProducto = document.createTextNode("₡" + response[i]['precio_producto']);

                elCeldaCodigoProducto.appendChild(txtCodigoProducto);
                elCeldaEstadoProducto.appendChild(txtEstadoProducto);
                elCeldaCantidadProducto.appendChild(txtCantidadProducto);
                elCeldaNombreProducto.appendChild(txtNombreProducto);
                elCeldaMarcaProducto.appendChild(txtMarcaProducto);
                elCeldaPrecioProducto.appendChild(txtPrecioProducto);

                elFila.appendChild(elCeldaCodigoProducto);
                elFila.appendChild(elCeldaNombreProducto);
                elFila.appendChild(elCeldaMarcaProducto);
                elFila.appendChild(elCeldaPrecioProducto);
                elFila.appendChild(elCeldaCantidadProducto);
                elFila.appendChild(elCeldaEstadoProducto);

                elTablaListaDeProductosTBody.appendChild(elFila);
            }
        },
        error: function(request, error) {
            alert(error);
        }
    });
    var peticion3 = $.ajax({
        url: "services/selectUsuarioPorLista.php",
        type: "POST",
        data: {
            'id_lista': nIdListaEvento
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response){
        var txtPrimerNombre     = document.querySelector('#txtPrimerNombre');
        var txtPrimerApellido   = document.querySelector('#txtPrimerApellido');
        var txtCedula           = document.querySelector('#txtCedula');
        var txtGenero           = document.querySelector('#txtGenero');
        var txtTelefonoPrincipal    = document.querySelector('#txtTelefonoPrincipal');
        var txtTelefonoSecundario   = document.querySelector('#txtTelefonoSecundario');
        var txtCorreoElectronico    = document.querySelector('#txtCorreoElectronico');

        /*Variables para los valores que esten dentro de cada uno de los elementos del formulario*/
        txtPrimerNombre.value       = response[0]['primer_nombre'];
        txtPrimerApellido.value     = response[0]['primer_apellido'];
        txtCedula.value             = response[0]['identificacion'];
        txtTelefonoPrincipal.value  = response[0]['numero_telefono_primario'];
        txtTelefonoSecundario.value = response[0]['numero_telefono_secundario'];
        txtCorreoElectronico.value  = response[0]['correo_electronico'];
        txtGenero.value             = response[0]['genero']; /*no queda claro como pasar el genero*/

      },

        error: function(request, error) {
            alert(error);
        }
    });

}

function ActivarLista() {
    var chkActivar = document.querySelector('#chkActivar');

    if (chkActivar.checked == true) {
        var estado = 1;
    } else {
        var estado = 0;
    }


    var idEvento = getParameterByName('idEvento')
    var peticion = $.ajax({
        url: "services/updateEstadoLista.php",
        type: "POST",
        data: {
            'id_lista': idEvento,
            'nEstado': estado
        },

        success: function() {
            swal({
                    title: "La información fue ingresada correctamente",
                    text: "La lista se encuentra activada.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "green",
                    confirmButtonText: "Continuar",
                    closeOnConfirm: false
                },
                function(isConfirm) {
                    window.location = "activarListas.html";
                });
        },
        error: function(request, error) {
            alert(error);
        }

    });
    return false;
}
