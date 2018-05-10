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


function llenarLista(idTienda) {
    var peticion = $.ajax({
        url: "services/listarProductosAdmin.php",
        type: "POST",
        data: {},
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',

        success: function(response) {
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
                    var sBuscar = elSearch.value.toLowerCase();
                    var sNombre = cleanUpSpecialChars(response[i]['nombre'].toLowerCase());
                    var sDescripcion = cleanUpSpecialChars(response[i]['descripcion'].toLowerCase());
                    if (sNombre.indexOf(sBuscar) > -1 || sDescripcion.indexOf(sBuscar) > -1) {
                        var elLink = document.createElement('a');
                        elLink.setAttribute("onclick", "MostrarAgregarcantidad(this.childNodes[0].value, this.childNodes[0])");
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
var MenuAgregarCantidadAbierto = 0;

function CerrarMenuCantidad() {
    var elMenuDeCantidad = document.querySelector("#MenuDeCantidad");
    elMenuDeCantidad.classList.remove("MenuDeCantidadActivo");
    elMenuDeCantidad.classList.add("MenuDeCantidadInactivo");
    MenuAgregarCantidadAbierto = 0;
}

function MostrarAgregarcantidad(idProducto, el) {
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
        setTimeout(function() {
            elMenuDeCantidad.classList.remove("MenuDeCantidadInactivo");
            elMenuDeCantidad.classList.add("MenuDeCantidadActivo");
            if (el.getAttribute("cantidad") == undefined) {
                elcantidad.value = 0;
            } else {
                elcantidad.value = el.getAttribute("cantidad");
            }
            MenuAgregarCantidadAbierto = 1;
            CargarInformacionMenuCantidad(idProducto, el);
        }, 1200);
    }

}

function CargarInformacionMenuCantidad(idProducto, el) {
    var elNombreProducto = document.querySelector("#NombreProducto");
    var elDescripcionProducto = document.querySelector("#DescripcionProducto");
    var elAgregarALista = document.querySelector("#AgregarALista");
    elAgregarALista.setAttribute('id_producto', idProducto);
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

function Restar() {
    if (elcantidad.value != 0) {
        elcantidad.value = Number(elcantidad.value) - 1;
    }

}

function Sumar() {
    elcantidad.value = Number(elcantidad.value) + 1;
}

function AgregarALista() {
    var elSearch = document.querySelector("#txtBuscar");
    elSearch.value = "";
    llenarLista(getParameterByName('idTienda'));
    if (elcantidad.value != 0) {
        elementoSelecionado.setAttribute("cantidad", elcantidad.value);
        var peticion = $.ajax({
            url: "services/agregarInventario.php",
            type: "POST",
            data: {
                'id_producto': elAgregarALista.getAttribute('id_producto'),
                'cantidad': elcantidad.value
            },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",

            success: function() {
                CerrarMenuCantidad();
                swal({
                    title: "La información fue ingresada correctamente",
                    text: "La cantidad en inventario de este producto ha sido actualizada.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "green",
                    confirmButtonText: "Continuar",
                    closeOnConfirm: false
                });
            },
            error: function(request, error) {
                alert(error);
            }
        });
    } else {
        elementoSelecionado.removeAttribute("cantidad");
    }
}