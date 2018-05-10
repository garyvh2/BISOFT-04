function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var today = yyyy+'-'+mm+'-'+dd;
    document.querySelector("#txtFechaEvento").setAttribute("min", today);
    document.querySelector("#txtFechaEvento").setAttribute("max", "");


//Se declara la latitud y longitud global
var nLatitud, nLongitud, sDireccion, gmMarcador, gmMapa, gmVentanaInformacion;
//Funcion llamada por API para inicializar el mapa
function funcionInicializarMapa() {
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
            minZoom: 16,
            //Se deshabilita el uso de stree view
            streetViewControl: false,
            //Se deshabilita el control del tipo de mapa
            mapTypeControl: false
        }
        //Se agregan las opciones al mapa
    gmMapa.setOptions(gmOpcionesMapa);
    //Se setea un marcador con una ubicacion por defecto
    gmMarcador = new google.maps.Marker({
        //Se agrega la posicion en San Jose
        position: new google.maps.LatLng(9.935, -84.092),
        animation: google.maps.Animation.DROP
            //Se habilita el arratre del marcador
    });
    //Se coloca el marcador en el mapa
    gmMarcador.setMap(gmMapa);
    //Se obtiene una latitud y longitud por defecto
    nLatitud = gmMarcador.position.lat();
    nLongitud = gmMarcador.position.lng();

    var gmContenido = '<h2>Ubique el lugar donde se realizara su evento</h2>';
    var gmVentanaInformacion = new google.maps.InfoWindow({
        content: gmContenido
    });
    gmVentanaInformacion.open(gmMapa, gmMarcador);

    //Se agrega un evento para cuando se realiza un click en el mapa, de manera que el marcador se mueva a esa ubicacion
    google.maps.event.addListener(gmMapa, 'click', function(event) {
        var gmNuevoMarcador = new google.maps.Marker({
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

        geocoder.geocode({
            'location': event.latLng
        }, function(results, status) {

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
    var mapa = document.getElementById('mapWrapper');
    if (el.checked == true) {
        mapa.classList.remove("MapaOculto");
    } else {
        mapa.classList.add("MapaOculto");
    }
}


function validar() {
    /*variables para los elemnetos del formulario*/

    var txtNombreEvento = document.querySelector('#txtNombreEvento');
    var txtFechaEvento = document.querySelector('#txtFechaEvento');
    var txtTipoEvento = document.querySelector('#txtTipoEvento');
    var chkEnvio = document.querySelector('#chkEnvio');

    /*Variables para los valores que esten dentro de cada uno de
    los elementos del formulario*/

    var sNombreEvento = txtNombreEvento.value;
    var dFechaEvento = txtFechaEvento.value;
    var nTipoEvento = txtTipoEvento.value;
    var bEnvio = chkEnvio.checked;

    if (bEnvio == true) {
        bEnvio = 1;
    } else {
        bEnvio = 0;
    }

    registrar(sNombreEvento, dFechaEvento, bEnvio, nLatitud, nLongitud, nTipoEvento);
    return false;
}



cargarComboBox(getParameterByName('idTienda'));

function cargarComboBox(idTienda) {
    var tipoEventos = document.getElementById("txtTipoEvento");
    $.ajax({
        url: "services/listarTiposEventos.php",
        type: "POST",
        data: {
            'id_tienda': idTienda
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,


        success: function(response) {
            var elUlListaTipoEventos = document.querySelector("#txtTipoEvento");
            var arrayLength = response.length;
            for (var i = 0; i < arrayLength; i++) {
                var option = document.createElement('option');
                option.setAttribute("value", response[i]['id']);
                var nodoDeTexto = document.createTextNode(response[i]['nombre']);
                option.appendChild(nodoDeTexto);
                tipoEventos.appendChild(option);
            }

        },
        error: function(response) {
            alert('error');
        }
    });
    var TipoEvento = getParameterByName('eventoTienda');
    tipoEventos.value = TipoEvento;
}

function registrar(psNombreEvento, pdFechaEvento, pbEnvio, pnLatitud, pnLongitud, pnTipoEvento) {
    var estado = 0;

    var peticion = $.ajax({
        url: "services/registrarListaEvento.php",
        type: "POST",
        data: {
            'sNombreEvento': psNombreEvento,
            'dFechaEvento': pdFechaEvento,
            'bEnvio': pbEnvio,
            'nLatitud': pnLatitud,
            'nLongitud': pnLongitud,
            'nTipoEvento': pnTipoEvento,
            'nEstado': estado,
            'id_tienda':getParameterByName('idTienda')
        },

        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',

        success: function(response) {

            swal({
                    title: "La información fue ingresada correctamente",
                    text: "Los datos de la lista han sido ingresados.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "green",
                    confirmButtonText: "Continuar",
                    closeOnConfirm: false
                },
                function(isConfirm) {
                    var peticion = $.ajax({
                      url: "services/selectUsuario.php",
                      type: "POST",
                      data: {},
                      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                      dataType: 'json',
                      async: false,
                      timeout: 30000,

                      success: function(response){
                          if (Number(response[0]['tipo']) != 4){
                            window.location = "listarProductosListaAdmin.html?idTienda=" + getParameterByName('idTienda') + '&idLista=' + response[0]['id_lista'];
                          }else {
                            window.location = "listarProductos.html?idTienda=" + getParameterByName('idTienda') + '&idLista=' + response[0]['id_lista'];
                          }
                      },
                      error: function(request, error) {
                          alert(error);
                      }
                  });

                  $( '#Form' ).each(function(){
                     this.reset();
                  });
                });
        },
        error: function(request, error) {
            alert(error);
        }
    });
}
