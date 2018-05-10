
elCerrarMenuCantidad = document.querySelector("#CerrarMenuCantidad");
if (elCerrarMenuCantidad) {
  elCerrarMenuCantidad.addEventListener("click", CerrarMenuCantidad);
}





function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var elSearch = document.querySelector("#txtBuscar");
elSearch.addEventListener("keydown", function() {
  llenarLista(getParameterByName('idTienda'));
});

var elementoSelecionado;

llenarLista(getParameterByName('idTienda'));

//Cuando el usuario seleccione una tienda debera almacenar el id en session


function llenarLista (idTienda) {
  var peticion = $.ajax({
            url: "services/listarProductos.php",
            type: "POST",
            data: {
              'id_tienda' : idTienda
            },
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
                    elLink.setAttribute("onclick", "MostrarAgregarcantidad(this.childNodes[0].value, this.childNodes[0])");
                    var elLiProducto = document.createElement('li');
                      elLiProducto.setAttribute("name", response[i]['nombre']);
                      elLiProducto.setAttribute("descripcion", response[i]['descripcion']);
                      var divImagenProducto = document.createElement('div');
                        divImagenProducto.id = "ImagenProducto";

                      var h2NombreProducto = document.createElement('h2');
                        h2NombreProducto.innerHTML = response[i]['nombre'];

                      var h4DescripcionProducto = document.createElement('h4');
                        h4DescripcionProducto.innerHTML = response[i]['descripcion'];

                      var h4PrecioProducto = document.createElement('h4');
                        h4PrecioProducto.innerHTML = "Precio ₡ " + response[i]['precio_unitario'];


                      var peticion2 = $.ajax({
                            url: "services/listarCantidadProducto.php",
                            type: "POST",
                            data: {
                              'id_lista'    : getParameterByName('idLista'),
                              'id_producto' : response[i]['id']
                            },
                            async: false,
                            timeout: 30000,
                            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                            dataType: 'json',

                            success: function(response){
                              if (Number(response) > 0) {
                                elLiProducto.setAttribute('cantidad', response);
                              }
                            },
                            error: function(request, error) {
                               alert(error);
                            }
                      });
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
                  var sBuscar = elSearch.value.toLowerCase();
                  var sNombre       = cleanUpSpecialChars(response[i]['nombre'].toLowerCase());
                  var sDescripcion  = cleanUpSpecialChars(response[i]['descripcion'].toLowerCase());
                  if (sNombre.indexOf(sBuscar) > -1 || sDescripcion.indexOf(sBuscar) > -1) {
                    var elLink = document.createElement('a');
                      elLink.setAttribute("onclick", "MostrarAgregarcantidad(this.childNodes[0].value, this.childNodes[0])");
                      var elLiProducto = document.createElement('li');
                        elLiProducto.setAttribute("name", response[i]['nombre']);
                        elLiProducto.setAttribute("descripcion", response[i]['descripcion']);
                        var divImagenProducto = document.createElement('div');
                          divImagenProducto.id = "ImagenProducto";

                        var h2NombreProducto = document.createElement('h2');
                          h2NombreProducto.innerHTML = response[i]['nombre'];

                        var h4DescripcionProducto = document.createElement('h4');
                          h4DescripcionProducto.innerHTML = response[i]['descripcion'];

                        var h4PrecioProducto = document.createElement('h4');
                          h4PrecioProducto.innerHTML = "Precio ₡ " + response[i]['precio_unitario'];


                        var peticion2 = $.ajax({
                              url: "services/listarCantidadProducto.php",
                              type: "POST",
                              data: {
                                'id_lista'    : getParameterByName('idLista'),
                                'id_producto' : response[i]['id']
                              },
                              async: false,
                              timeout: 30000,
                              contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                              dataType: 'json',

                              success: function(response){
                                if (Number(response) > 0) {
                                  elLiProducto.setAttribute('cantidad', response);
                                }
                              },
                              error: function(request, error) {
                                 alert(error);
                              }
                        });
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
var MenuAgregarCantidadAbierto = 0;
function CerrarMenuCantidad () {
  var elMenuDeCantidad = document.querySelector("#MenuDeCantidad");
  elMenuDeCantidad.classList.remove("MenuDeCantidadActivo");
  elMenuDeCantidad.classList.add("MenuDeCantidadInactivo");
  MenuAgregarCantidadAbierto = 0;
}
function MostrarAgregarcantidad (idProducto, el) {
  var elMenuDeCantidad = document.querySelector("#MenuDeCantidad");
  elementoSelecionado = el;
  if (MenuAgregarCantidadAbierto == 0) {
    elMenuDeCantidad.classList.remove("MenuDeCantidadInactivo");
    elMenuDeCantidad.classList.add("MenuDeCantidadActivo");
    MenuAgregarCantidadAbierto = 1;

    if (el.getAttribute("cantidad") == undefined) {
      elcantidad.value = 0;
    } else {
      elcantidad.value = el.getAttribute("cantidad");
    }
    CargarInformacionMenuCantidad(idProducto, el);
  } else {
    elMenuDeCantidad.classList.remove("MenuDeCantidadActivo");
    elMenuDeCantidad.classList.add("MenuDeCantidadInactivo");
    setTimeout(function(){
      elMenuDeCantidad.classList.remove("MenuDeCantidadInactivo");
      elMenuDeCantidad.classList.add("MenuDeCantidadActivo");
      if (el.getAttribute("cantidad") == undefined) {
        elcantidad.value = 0;
      } else {
        elcantidad.value = el.getAttribute("cantidad");
      }
      MenuAgregarCantidadAbierto = 1;
      CargarInformacionMenuCantidad(idProducto, el);
    },1200);
  }

}
function CargarInformacionMenuCantidad (idProducto, el) {
  var elNombreProducto = document.querySelector("#NombreProducto");
  var elDescripcionProducto = document.querySelector("#DescripcionProducto");
  var elAgregarALista = document.querySelector("#AgregarALista");
  var elImageMenuCantidad = document.querySelector("#ImageMenuCantidad");


  elImageMenuCantidad.setAttribute("style", el.firstChild.getAttribute("style"));
  elNombreProducto.innerHTML = el.getAttribute("name");
  elDescripcionProducto.innerHTML = el.getAttribute("descripcion");
}



var elrestar = document.querySelector("#restar");
var elcantidad = document.querySelector("#cantidad");
var elsumar = document.querySelector("#sumar");
var elAgregarALista = document.querySelector("#AgregarALista");
var elContinuar = document.querySelector("#Continuar");

elAgregarALista.addEventListener("click", AgregarALista);
elsumar.addEventListener("click", Sumar);
elrestar.addEventListener("click", Restar);
elContinuar.addEventListener("click", Continuar);
function Restar () {
  if (elcantidad.value != 0) {
    elcantidad.value = Number(elcantidad.value) - 1;
  }

}
function Sumar () {
  elcantidad.value = Number(elcantidad.value) + 1;
}
function AgregarALista () {
  if (elcantidad.value != 0 ) {
    elementoSelecionado.setAttribute("cantidad", elcantidad.value);
  } else {
    elementoSelecionado.removeAttribute("cantidad");
  }
  CerrarMenuCantidad();
}



function Continuar (){

  var elProductosEnTienda = document.querySelectorAll('#ListaDeProductos a li');

  var bFalla = false;
  var Cantidades = [];
  var ErrorName = [];

    elProductosEnTienda.forEach(function(item, index){
      if(Number(item.getAttribute("cantidad")) > 0){
      var PeticionListas = $.ajax({
            url: "services/agregarProductosALista.php",
            type: "POST",
            data: {
              'id_producto' : item.value,
              'cantidad'    : item.getAttribute("cantidad"),
              'estado'      : 1,
              'id_lista'    : getParameterByName("idLista")
            },
            async: false,
            timeout: 30000,
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){
              console.log(response);
              if (Number(response['result']) == 0) {
                bFalla = true;
                Cantidades.push(response['cantidad_min']);
                ErrorName.push(response['nombre_producto']);
              }
            },
            error: function(request, error) {
               alert(error);
            }
      });
    }
  });


    //Si falla no se puede modificar
    if (bFalla == true) {
      var array_result = [];
      for (var i = 0; i < ErrorName.length; i++) {
        array_result.push(ErrorName[i] + " (Cantidad mínima " + Cantidades[i] + ")");
      }

      if (array_result.length < 2) {
        swal("Error", "El producto " + array_result + " ya ha sido regalado o reservado por lo que no puede ser modificado.", "error");
      } else {
        swal("Error", "Los productos " + array_result + " ya han sido regalados o reservados por lo que no pueden ser modificados.", "error");
      }
    //Si no falla se inserta y actualizan los datos
    } else {
      swal({
        title: "Artículos agregados correctamente",
        text: "Ha completado la creación de la lista. Su código es #" + getParameterByName("idLista") + " (puede encontrarlo en el menú 'Mis listas' y compartirlo con sus invitados)",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "green",
        confirmButtonText: "Continuar",
        closeOnConfirm: false
      },
        function(isConfirm){
          if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
            window.location = "listarMisListas.html";
          } else {
            window.location = "listarMisListasAdmin.html";
          }

        });
    }
}
