var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var today = yyyy + '-' + mm + '-' + dd;

llenarLista();

//Cuando el usuario seleccione una tienda debera almacenar el id en session

function llenarLista() {
    var peticion = $.ajax({
        url: "services/listarMisListas.php",
        type: "POST",
        data: {},
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        success: function(response) {

            var elUlListaTiendas = document.querySelector("#ListaMisListas");
            var FechaHoy = new Date(today.replace(/-/g, '\/'));

            var arrayLength = response.length;

            for (var i = 0; i < arrayLength; i++) {

                var elLink = document.createElement('a');
                elLink.value=response[i]['id'];
                elLink.setAttribute("onclick", "CargarLista(this.value)");
                var elLiTienda = document.createElement('li');
                //Titulo del evento
                var elNombreEvento = document.createElement('h2');
                var txtNombreEvento = document.createTextNode(response[i]['nombre']);
                elNombreEvento.appendChild(txtNombreEvento);
                //Estado del evento
                var elEstadoEvento = document.createElement('div');
                var FechaEventoIntacta = response[i]['fecha_evento'];
                var FechaEvento = new Date(FechaEventoIntacta.replace(/-/g, '\/'));


                var TextoEstadoEvento;

                if (FechaHoy <= FechaEvento) {
                    if (response[i]['estado'] == 0) {
                        elEstadoEvento.style.backgroundImage = "url(imgs/wait.png)";
                        TextoEstadoEvento = "Su lista se encuentra en proceso";
                    } else if (response[i]['estado'] == 1) {
                        elEstadoEvento.style.backgroundImage = "url(imgs/success.png)";
                        TextoEstadoEvento = "Su lista se encuentra activa";
                    }
                } else {
                    elEstadoEvento.style.backgroundImage = "url(imgs/error.png)";
                    TextoEstadoEvento = "La fecha del evento ha pasado";
                    response[i]['estado'] = 2;
                }
                //Codigo de lista
                var elCodigoEvento = document.createElement('h3');
                var txtCodigoEvento = document.createTextNode("Su codigo es " + response[i]['id']);
                elCodigoEvento.appendChild(txtCodigoEvento);
                //Estado de lista texto
                var elEstadoEventoTexto = document.createElement('h4');
                var txtEstadoEventoTexto = document.createTextNode(TextoEstadoEvento);
                elEstadoEventoTexto.appendChild(txtEstadoEventoTexto);
                //Fecha evento
                var elFechaEvento = document.createElement('h4');
                var txtFechaEvento = document.createTextNode("La fecha del evento es " + FechaEventoIntacta);
                elFechaEvento.appendChild(txtFechaEvento);

                elLiTienda.appendChild(elNombreEvento);
                elLiTienda.appendChild(elEstadoEvento);
                elLiTienda.appendChild(elCodigoEvento);
                elLiTienda.appendChild(elEstadoEventoTexto);
                elLiTienda.appendChild(elFechaEvento);

                elLink.appendChild(elLiTienda);

                elUlListaTiendas.appendChild(elLink);
            }
        },
        error: function(request, error) {
            alert(error);
        }
    });
}

function CargarLista(idEvento) {
    var peticion = $.ajax({
        url: "services/selectUsuario.php",
        type: "POST",
        data: {},
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response) {
            if (Number(response[0]['tipo']) != 4) {
                window.location = "modificarListaEventoAdmin.html?idEvento=" + idEvento;;
            } else {
                window.location = "modificarListaEvento.html?idEvento=" + idEvento;
            }
        },
        error: function(request, error) {
            alert(error);
        }
    });
}

function CrearLista() {

    if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
        window.location = "listarTiendas.html";
    } else {
        window.location = "listarTiendasAdmin.html";
    }
}
