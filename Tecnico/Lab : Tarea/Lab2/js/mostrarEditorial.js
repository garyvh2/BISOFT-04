llenarTabla();

function llenarTabla(){

  var peticion = $.ajax({
            url: "servicios/consultarEditorial.php",
            type: "post",
            data: {

                   },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){
              var tbody = document.querySelector('#tblEditoriales tbody');

              tbody.innerHTML = '';


              var nCantidadLibros = response.length;

              for(var i = 0; i < nCantidadLibros; i++ ){

                var fila = document.createElement('tr');

                var celdaNombre        = document.createElement('td'),
                    celdaDireccion     = document.createElement('td'),
                    celdaTelefono      = document.createElement('td'),
                    celdaAnno          = document.createElement('td'),
                    celdaRepresentante = document.createElement('td');
                    celdaModificar     = document.createElement('td'),
                    enlaceModificar    = document.createElement('a');

                    celdaModificar.setAttribute('class', 'btnModificar');
                    celdaModificar.setAttribute('id',response[i]['id'])

                    enlaceModificar.href = 'modificarEditorial.html?id' + '=' + response[i]['id'];

                var nodoTextoNombre = document.createTextNode(response[i]['nombre']),
                    nodoTextoDireccion = document.createTextNode(response[i]['direccion']),
                    nodoTextoTelefono = document.createTextNode(response[i]['telefono']),
                    nodoTextoAnno = document.createTextNode(response[i]['anno']),
                    nodoTextoRepresentante = document.createTextNode(response[i]['representante']),
                    nodoTextoModificar = document.createTextNode('Modificar');


                celdaNombre.appendChild(nodoTextoNombre);
                celdaDireccion.appendChild(nodoTextoDireccion);
                celdaTelefono.appendChild(nodoTextoTelefono);
                celdaAnno.appendChild(nodoTextoAnno);
                celdaRepresentante.appendChild(nodoTextoRepresentante);
                enlaceModificar.appendChild(nodoTextoModificar);
                celdaModificar.appendChild(enlaceModificar);

                fila.appendChild(celdaNombre);
                fila.appendChild(celdaDireccion);
                fila.appendChild(celdaTelefono);
                fila.appendChild(celdaAnno);
                fila.appendChild(celdaRepresentante);
                fila.appendChild(celdaModificar);

                tbody.appendChild(fila);
              }
            },
            error: function(request, error) {
                alert(error);
            }
  });
}
