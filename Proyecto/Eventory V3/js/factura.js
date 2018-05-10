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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


llenarFactura();
//Cuando el usuario seleccione una tienda debera almacenar el id en session
function llenarFactura () {
  var elFechaFactura = document.querySelector('#FechaFactura');
  elFechaFactura.innerHTML = today;
  var peticionTienda = $.ajax({
      url: "services/selectTienda.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,

      success: function(response){
        //Cargar datos de tienda
        var elFotoPefil = document.querySelector("#LogoEmpresa");
        if (elFotoPefil) {
          elFotoPefil.style.backgroundImage = "url(" + response[0]['logo_tienda'] + ")";
          elFotoPefil.style.backgroundRepeat  = "no-repeat";
          elFotoPefil.style.backgroundSize = "contain";
        }
        document.querySelector("#NombreEmpresa").innerHTML      = response[0]['nombre'];
        document.querySelector("#DireccionEmpresa").innerHTML   = response[0]['distrito'] + ", " + response[0]['canton'] + ", " + response[0]['provincia'];
        document.querySelector("#TelefonoEmpresa").innerHTML    = response[0]['numero_telefono'];
        document.querySelector("#CedulaEmpresa").innerHTML      = response[0]['identificacion'];
        document.querySelector("#IVFactura").innerHTML          = response[0]['impuesto_ventas'];
      },
      error: function(request, error) {
          alert(error);
      }
  });
  var peticionUser = $.ajax({
      url: "services/selectUsuario.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,

      success: function(response){
        //Cargar datos de cliente
        document.querySelector("#IdUsuarioFactura").innerHTML          = response[0]['primer_nombre'] + " " + response[0]['primer_apellido'];
        var tipoUsuario;
        if (Number(response[0]['tipo']) == 2){
          tipoUsuario = "Serv. al cliente";
        }
        if (Number(response[0]['tipo']) == 3){
          tipoUsuario = "Cajero";
        }
        if (Number(response[0]['tipo']) == 1){
          tipoUsuario = "Administrador";
        }
        document.querySelector("#RolUsuarioFactura").innerHTML = tipoUsuario;
      },
      error: function(request, error) {
          alert(error);
      }
  });
  var peticionFactura = $.ajax({
            url: "services/llenarFactura.php",
            type: "POST",
            data: {
              'id_reserva'  : getParameterByName('idReserva')
            },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){
              document.querySelector('#NumeroDeFactura').innerHTML = response[0]['id_factura'];
              document.querySelector('#NumeroDeFactura2').innerHTML = response[0]['id_factura'];
              document.querySelector('#ReservacionFactura').innerHTML = getParameterByName('idReserva');
              document.querySelector('#CompradorFactura').innerHTML = response[0]['nombre_asociado'];
              document.querySelector('#DescuentoFactura').innerHTML = response[0]['descuento'];

              var table = document.querySelector('#Items tbody');
              var fila = document.createElement('tr');

                var celdaNombre         = document.createElement('td');
                var celdaDescripcion    = document.createElement('td');
                var celdaPrecio         = document.createElement('td');
                var celdaCantidad       = document.createElement('td');
                var celdaTotal       = document.createElement('td');

                celdaNombre.innerHTML       = response[0]['nombre'];
                celdaDescripcion.innerHTML  = response[0]['descripcion'];
                celdaPrecio.innerHTML       = "₡" + response[0]['precio_unitario'];
                celdaCantidad.innerHTML     = response[0]['cantidad'];
                  celdaCantidad.id          = 'celdaCantidad';
                celdaTotal.innerHTML        = "₡" + (Number(response[0]['precio_unitario']) * Number(response[0]['cantidad']));


              fila.appendChild(celdaNombre);
              fila.appendChild(celdaDescripcion);
              fila.appendChild(celdaPrecio);
              fila.appendChild(celdaCantidad);
              fila.appendChild(celdaTotal);

              table.appendChild(fila);

              var subTotal          = Number(response[0]['precio_unitario']) * Number(response[0]['cantidad']);
              var descuento         = subTotal * (Number(response[0]['descuento']) / 100);
              var impuestoDeVentas  = subTotal * (Number(document.querySelector('#IVFactura').innerHTML) / 100);
              var total             = subTotal + impuestoDeVentas - descuento;

              document.querySelector('#SubTotalFactura').innerHTML          = "₡" + ~~subTotal;
              document.querySelector('#DescuentoFacturaTotal').innerHTML    = "₡" + ~~descuento;
              document.querySelector('#IVFacturaTotal').innerHTML           = "₡" + ~~impuestoDeVentas;
              document.querySelector('#TotalFactura').innerHTML             = "₡" + ~~total;
            },
            error: function(request, error) {
              alert(error);
            }
    });
}
function Aceptar () {
  window.print();
  setTimeout(function () {
    window.close();

    var total           = Number(document.querySelector('#TotalFactura').innerHTML.replace("₡",""));
    var subtotal        = Number(document.querySelector('#SubTotalFactura').innerHTML.replace("₡",""));
    var fecha           = today;
    var descuento       = Number(document.querySelector('#DescuentoFacturaTotal').innerHTML.replace("₡",""));
    var impuesto        = Number(document.querySelector('#IVFacturaTotal').innerHTML.replace("₡",""));
    var cantidad        = Number(document.querySelector('#celdaCantidad').innerHTML);



    var peticion = $.ajax({
              url: "services/registrarCompra.php",
              type: "POST",
              data: {
                'id_reserva'  : getParameterByName('idReserva'),
                'total'       : total,
                'subtotal'    : subtotal,
                'fecha'       : fecha,
                'descuento'   : descuento,
                'impuesto'    : impuesto,
                'cantidad'    : cantidad,
                'estado'      : 1
              },
              success: function(response){
                window.history.back();
              },
              error: function(request, error) {
                alert(error);
              }
      });
  }, 100);
}
