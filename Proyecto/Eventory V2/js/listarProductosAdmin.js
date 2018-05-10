var elSearch = document.querySelector("#txtBuscar");
elSearch.addEventListener("keydown", function() {
  llenarLista();
});


//Cuando el usuario seleccione una tienda debera almacenar el id en session
llenarLista();
function llenarLista () {
  var peticion = $.ajax({
            url: "services/listarProductosAdmin.php",
            type: "POST",
            data: {},
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){
              var elUlListaProductos = document.querySelector("#ListaDeProductos");

              elUlListaProductos.innerHTML = "";
              var elSearch = document.querySelector("#txtBuscar");

              var arrayLength = response.length;
              if (elSearch.value == "") {
                for (var i = 0; i < arrayLength; i++) {
                  var elLink = document.createElement('a');
                    var elLiProducto = document.createElement('li');
                      elLiProducto.setAttribute("name", response[i]['nombre']);
                      elLiProducto.setAttribute("descripcion", response[i]['descripcion']);
                        elLiProducto.setAttribute('cantidad', response[i]['cantidad']);
                      var divImagenProducto = document.createElement('div');
                        divImagenProducto.id = "ImagenProducto";

                      var h2NombreProducto = document.createElement('h2');
                        h2NombreProducto.innerHTML = response[i]['nombre'];

                      var h4DescripcionProducto = document.createElement('h4');
                        h4DescripcionProducto.innerHTML = response[i]['descripcion'];

                      var h4PrecioProducto = document.createElement('h4');
                        h4PrecioProducto.innerHTML = "Precio ₡ " + response[i]['precio_unitario'];


                      if (response[i]['foto_producto'] != null) {
                        divImagenProducto.style.backgroundImage = "url(" + String(response[i]['foto_producto']) + ")";
                      }
                      elLiProducto.appendChild(divImagenProducto);
                      elLiProducto.appendChild(h2NombreProducto);
                      elLiProducto.appendChild(h4DescripcionProducto);
                      elLiProducto.appendChild(h4PrecioProducto);

                      elLink.appendChild(elLiProducto);

                      elUlListaProductos.appendChild(elLink);
                      elLiProducto.value = response[i]['id'];
                  }

                } else {
                  for (var i = 0; i < arrayLength; i++) {
                    var sBuscar       = elSearch.value.toLowerCase();
                    var sNombre       = cleanUpSpecialChars(response[i]['nombre'].toLowerCase());
                    var sDescripcion  = cleanUpSpecialChars(response[i]['descripcion'].toLowerCase());
                    console.log(sNombre.indexOf(sBuscar) + " " + sDescripcion.indexOf(sBuscar));
                    if (sNombre.indexOf(sBuscar) > -1 || sDescripcion.indexOf(sBuscar) > -1) {
                        var elLink = document.createElement('a');
                          var elLiProducto = document.createElement('li');
                            elLiProducto.setAttribute("name", response[i]['nombre']);
                            elLiProducto.setAttribute("descripcion", response[i]['descripcion']);
                              elLiProducto.setAttribute('cantidad', response[i]['cantidad']);
                            var divImagenProducto = document.createElement('div');
                              divImagenProducto.id = "ImagenProducto";

                            var h2NombreProducto = document.createElement('h2');
                              h2NombreProducto.innerHTML = response[i]['nombre'];

                            var h4DescripcionProducto = document.createElement('h4');
                              h4DescripcionProducto.innerHTML = response[i]['descripcion'];

                            var h4PrecioProducto = document.createElement('h4');
                              h4PrecioProducto.innerHTML = "Precio ₡ " + response[i]['precio_unitario'];


                            if (response[i]['foto_producto'] != null) {
                              divImagenProducto.style.backgroundImage = "url(" + String(response[i]['foto_producto']) + ")";
                            }
                            elLiProducto.appendChild(divImagenProducto);
                            elLiProducto.appendChild(h2NombreProducto);
                            elLiProducto.appendChild(h4DescripcionProducto);
                            elLiProducto.appendChild(h4PrecioProducto);

                            elLink.appendChild(elLiProducto);

                            elUlListaProductos.appendChild(elLink);
                            elLiProducto.value = response[i]['id'];
                    }
                }
              }
           },
           error: function(request, error) {
               alert(error);
           }
    });

}
