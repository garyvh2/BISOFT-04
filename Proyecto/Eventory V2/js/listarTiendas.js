






llenarLista();

//Cuando el usuario seleccione una tienda debera almacenar el id en session
function AvoidRedirect (vThis) {
    var href = vThis.href;
    vThis.href = "";
}
function llenarLista () {
  var peticion = $.ajax({
            url: "services/listarTiendas.php",
            type: "POST",
            data: {},
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){
                /*Se obtiene la lista de tiendas */
              var elUlListaTiendas = document.querySelector("#ListaDeTiendas");
                /*se calcula la longitud del array */
              var arrayLength = response.length;

              for (var i = 0; i < arrayLength; i++) {
                  var elLink = document.createElement('a');
                    elLink.setAttribute("onclick", "IrATienda(this.value);");
                    elLink.value = response[i]['id'];
                    var elLiTienda = document.createElement('li');

                      var divImagen = document.createElement('div');
                      divImagen.id = 'ImagenMapa';
                      if (response[i]['logo_tienda'] != null) {
                        divImagen.style.backgroundImage = "url(" + String(response[i]['logo_tienda']) + ")";
                      }
                      elLiTienda.appendChild(divImagen);

                      var elH2Nombre = document.createElement('h2');
                      elH2Nombre.innerHTML = response[i]['nombre'];

                      var elH3Direccion = document.createElement('h4');
                      elH3Direccion.innerHTML = response[i]['distrito'] + ", " + response[i]['canton'] + ", " + response[i]['provincia'];


                      var elH3Correo = document.createElement('h4');
                      elH3Correo.innerHTML = response[i]['correo_electronico'];
                      var elH3Telefono = document.createElement('h4');
                      elH3Telefono.innerHTML = "Tel: " + response[i]['numero_telefono'];

                      if (arrayLength == 1) {
                        elLink.style.display = 'block';
                        elLink.style.textAlign = 'center';
                      }


                      elLiTienda.appendChild(divImagen);
                      elLiTienda.appendChild(elH2Nombre);
                      elLiTienda.appendChild(elH3Direccion);
                      elLiTienda.appendChild(elH3Correo);
                      elLiTienda.appendChild(elH3Telefono);
                      elLink.appendChild(elLiTienda);

                      elUlListaTiendas.appendChild(elLink);
              }

           },
           error: function(request, error) {
               alert(error);
           }
    });
}
function IrATienda (idTienda) {
  if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
    window.location = "listarTiposEvento.html?idTienda=" + idTienda;
  } else {
    window.location = "listarTiposEventoAdmin.html?idTienda=" + idTienda;
  }

}
