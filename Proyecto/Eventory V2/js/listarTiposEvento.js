/****************************************************************************
  Autor: Alejandro Castillo
  Fecha de creacion: 19/07/2016
  Fecha de modificacion: 07/08/2016

  EVENTORY APP
  2016

  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.

*****************************************************************************/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

llenarLista();

function llenarLista () {
      var peticion = $.ajax({
            url: "services/listarTiposEventos.php",
            type: "POST",
            data: {
              'id_tienda' : getParameterByName("idTienda")
            },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){

            var elUlListaEventos = document.querySelector("#ListaDeTiposEvento");

            var arrayLength = response.length;

            for (var i = 0; i < arrayLength; i++) {
                var elLink = document.createElement('a');
                  elLink.setAttribute("onclick", "IrARegistrar(this.value)");
                  elLink.value = response[i]['id'];
                  var elLiEvento = document.createElement('li');
                  var elImagenEvento = document.createElement('div');
                    if (response[i]['imagen_evento'] != null) {
                      elImagenEvento.style.backgroundImage = "url(" + response[i]['imagen_evento'] + ")";
                    }
                    elImagenEvento.id = 'ImagenEvento';

                    var elH2NombreEvento = document.createElement('h2');
                    elH2NombreEvento.innerHTML = response[i]['nombre'];

                    var elH4DescripcionEvento = document.createElement('h4');
                    elH4DescripcionEvento.innerHTML = response[i]['descripcion'];

                    elLiEvento.appendChild(elImagenEvento);
                    elLiEvento.appendChild(elH2NombreEvento);
                    elLiEvento.appendChild(elH4DescripcionEvento);

                    elLink.appendChild(elLiEvento);

                    elUlListaEventos.appendChild(elLink);

            }
          },
          error: function(request, error) {
              alert(error);
          }
    });
  }
  function IrARegistrar (idEvento) {
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
              window.location = "registrarListaEventoAdmin.html?eventoTienda=" + idEvento + "&idTienda=" + getParameterByName('idTienda');
            }else {
              window.location = "registrarListaEvento.html?eventoTienda=" + idEvento + "&idTienda=" + getParameterByName('idTienda');
            }
        },
        error: function(request, error) {
            alert(error);
        }
    });

  }
