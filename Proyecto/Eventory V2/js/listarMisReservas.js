/****************************************************************************
  Autor: Alejandro Castillo
  Fecha de creacion: 10/08/2016
  Fecha de modificacion: 10/08/2016

  EVENTORY APP
  2016

  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.

*****************************************************************************/

llenarLista();

function llenarLista (){

  var peticion = $.ajax({
              url: "services/listarReservas.php",
              type: "POST",
              data: {

              },
              contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
              dataType: 'json',

              success: function(response){

                var length = response.length;
                var elUlListaReservas = document.querySelector("#ListaMisListas");
                for (var i = 0; i < length; i++) {

                    var elLink = document.createElement('a');
                    elLink.setAttribute("onclick", "CargarLista(this.value)");
                    elLink.value = response[i]['id'];
                    var elLiReserva = document.createElement('li');

                    //Codigo de reserva
                    var elCodigoReserva = document.createElement('h3');
                    var txtCodigoReserva = document.createTextNode("Su código es " + response[i]['id']);
                    elCodigoReserva.appendChild(txtCodigoReserva);

                    //cantidad reservada
                    var elCantidadProducto = document.createElement('h4');
                    var txtCantidadReservada = document.createTextNode("Cantidad reservada " + response[i]['cantidad']);
                    elCantidadProducto.appendChild(txtCantidadReservada);

                    var idReserva=response[i]['id'];


                    var elEstadoReservaActual = document.createElement('h3');
                    var elNombreEvento = document.createElement('h2');
                    var elNombreProducto = document.createElement('h3');
                    var elFechaEvento = document.createElement('h4');
                    var divEstado = document.createElement('div');

                    var peticion2 = $.ajax({
                                url: "services/selectEstadoReserva.php",
                                type: "POST",
                                data: {
                                  'id_reserva' : idReserva
                                },
                                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                                dataType: 'json',

                                success: function(data){



                                 var EstadoReservaActual;
                                 if (data[0]['estado_reserva']==1) {
                                     divEstado.style.backgroundImage = "url(imgs/wait.png)";
                                     EstadoReservaActual = "Su reserva se encuentra activa";
                                 } else if (data[0]['estado_reserva']==0) {
                                     divEstado.style.backgroundImage = "url(imgs/error.png)";
                                     EstadoReservaActual = "La fecha del evento ha pasado";
                                 }



                                 var txtEstadoReservaActual = document.createTextNode(EstadoReservaActual);
                                 elEstadoReservaActual.appendChild(txtEstadoReservaActual);

                                 var txtNombreEvento = document.createTextNode(data[0]['nombre_evento']);
                                 elNombreEvento.appendChild(txtNombreEvento);

                                 var txtNombreProducto = document.createTextNode("El producto es " + data[0]['nombre_producto']);
                                 elNombreProducto.appendChild(txtNombreProducto);

                                 var txtFechaEvento = document.createTextNode("Fecha del evento: " + data[0]['fecha_evento']);
                                 elFechaEvento.appendChild(txtFechaEvento);

                                },
                                error: function(request, error) {
                                  alert(error);
                                }
                              });

                        elLiReserva.appendChild(elNombreEvento);
                        elLiReserva.appendChild(elNombreProducto);
                        elLiReserva.appendChild(divEstado);
                        elLiReserva.appendChild(elEstadoReservaActual);
                        elLiReserva.appendChild(elCodigoReserva);
                        elLiReserva.appendChild(elFechaEvento);
                        elLiReserva.appendChild(elCantidadProducto);

                        elLink.appendChild(elLiReserva);
                        elUlListaReservas.appendChild(elLink);

                    }
                  },
                  error: function(request, error) {
                    alert(error);
                  }
                });
}

function CargarLista (idEvento) {
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
            window.location = "buscarListasAdmin.html?idEvento=" + idEvento;
          }else {
            window.location = "buscarListas.html?idEvento=" + idEvento;
          }
      },
      error: function(request, error) {
          alert(error);
      }
  });
}
