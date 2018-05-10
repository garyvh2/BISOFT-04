
function CerrarSesion () {
  sessionStorage.clear();
  window.location='iniciarSesion.html';
}
function IrAlPerfil () {
  if (sessionStorage.getItem("sesion_tipo_usuario") == 4) {
    window.location='perfilCliente.html';
  } else {
    window.location='perfilUsuario.html';
  }
}



elCerrarMenuCantidad = document.querySelector("#CerrarMenuCantidad");
elCerrarMenuCantidad.addEventListener("click", CerrarMenuCantidad);

elFotoPefil = document.querySelector("#BotonMenuUsuario div");
elFotoPefil.style.backgroundImage = "url(" + sessionStorage.getItem("sesion_foto_perfil") + ")";
elFotoPefil.style.backgroundRepeat  = "no-repeat";

var elNombreUsuario = document.querySelector("#BotonMenuUsuario h2");
elNombreUsuario.innerHTML = sessionStorage.getItem("sesion_primer_nombre") + " " + sessionStorage.getItem("sesion_primer_apellido");



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



var elementoSelecionado;

llenarLista(getParameterByName('idTienda'));

//Cuando el usuario seleccione una tienda debera almacenar el id en session


function llenarLista (IdTienda) {
  var elUlListaProductos = document.querySelector("#ListaDeProductos");
  var elImagenProducto = document.querySelector("#ImageMenuCantidad");
  //var sIdEvento = item.getAttribute("cantidad");

  var IdProductoEnLista=[];
  var CantidadProductoEnLista=[];
  var EstadoProductoEnLista=[];
  var IdListaDeProductosEvento=[];

  if (localStorage.getItem('id_producto_en_lista') != null) {
    IdProductoEnLista= JSON.parse(localStorage.getItem('id_producto_en_lista'));
    CantidadProductoEnLista= JSON.parse(localStorage.getItem('cantidad_producto_en_lista'));
    EstadoProductoEnLista=JSON.parse(localStorage.getItem('estado_producto_en_lista'));
    IdListaDeProductosEvento= JSON.parse(localStorage.getItem('id_lista_de_productos_evento'));
  }



  var aIdTienda = JSON.parse(localStorage.getItem('ids_tienda_CU6'));
  var aIdProducto = JSON.parse(localStorage.getItem('ids_producto_CU6'));
  var aNombreProducto = JSON.parse(localStorage.getItem('nombre_producto_CU6'));
  var aDescripcionProducto = JSON.parse(localStorage.getItem('descripcion_producto_CU6'));
  var aPrecioProductoSinImpuesto = JSON.parse(localStorage.getItem('precio_producto_sin_impuesto_CU6'))
  var aMarcaProducto = JSON.parse(localStorage.getItem('marca_producto_CU6'));
  var aProvedorProducto = JSON.parse(localStorage.getItem('provedor_producto_CU6'));
  var aCantidadProducto = JSON.parse(localStorage.getItem('cantidad_producto_CU6'));
  var aTipoProducto = JSON.parse(localStorage.getItem('tipo_producto_CU6'));
  var aEstadoProducto = JSON.parse(localStorage.getItem('estado_producto_CU6'));
  var aImagenProducto = JSON.parse(localStorage.getItem('imagen_producto_CU6'));

  var arrayLength = aIdTienda.length;

  for (var i = 0; i < arrayLength; i++) {
    if (aIdTienda[i] == IdTienda) {
      var elLink = document.createElement('a');
        elLink.setAttribute("onclick", "MostrarAgregarcantidad(this.childNodes[0].value, this.childNodes[0])");
        var elLiProducto = document.createElement('li');
          elLiProducto.setAttribute("name", aNombreProducto[i]);
          elLiProducto.setAttribute("descripcion", aDescripcionProducto[i]);
          var divImagenProducto = document.createElement('div');
            divImagenProducto.id = "ImagenProducto";

          var h2NombreProducto = document.createElement('h2');
            h2NombreProducto.innerHTML = aNombreProducto[i];

          var h4DescripcionProducto = document.createElement('h4');
            h4DescripcionProducto.innerHTML = aDescripcionProducto[i];

          var h4PrecioProducto = document.createElement('h4');
            h4PrecioProducto.innerHTML = "Precio ₡ " + aPrecioProductoSinImpuesto[i];


          for (var e = 0; e < IdProductoEnLista.length; e++) {
            if (IdListaDeProductosEvento[e] == getParameterByName("idLista")) {
              if (IdProductoEnLista[e] == aIdProducto[i]) {
                if (CantidadProductoEnLista[e] > 0) {
                  elLiProducto.setAttribute('cantidad', CantidadProductoEnLista[e]);
                }
              }
            }
          }
          if (aImagenProducto[i] != null) {
            divImagenProducto.style.backgroundImage = "url(" + String(aImagenProducto[i]) + ")";
          }
          elLiProducto.appendChild(divImagenProducto);
          elLiProducto.appendChild(h2NombreProducto);
          elLiProducto.appendChild(h4DescripcionProducto);
          elLiProducto.appendChild(h4PrecioProducto);

          elLink.appendChild(elLiProducto);

          elUlListaProductos.appendChild(elLink);
          elLiProducto.value = aIdProducto[i];

    }
  }
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
var IdProductoEnLista=[];
var CantidadProductoEnLista=[];
var EstadoProductoEnLista=[];
var IdListaDeProductosEvento=[];

if (localStorage.getItem('id_producto_en_lista') != null) {
  IdProductoEnLista= JSON.parse(localStorage.getItem('id_producto_en_lista'));
  CantidadProductoEnLista= JSON.parse(localStorage.getItem('cantidad_producto_en_lista'));
  EstadoProductoEnLista=JSON.parse(localStorage.getItem('estado_producto_en_lista'));
  IdListaDeProductosEvento= JSON.parse(localStorage.getItem('id_lista_de_productos_evento'));
}


function Continuar (){
  var elProductosEnTienda = document.querySelectorAll('#ListaDeProductos a li');
  var bFalla = false;
  var ErrorName = [];
  elProductosEnTienda.forEach(function(item, index){
    if(Number(item.getAttribute("cantidad")) > 0){

      var bExiste = false;
      for (var i = 0; i < IdListaDeProductosEvento.length; i++) {
        if (IdListaDeProductosEvento[i] == getParameterByName("idLista")) {
          if (IdProductoEnLista[i] == item.value) {
            if (item.getAttribute("cantidad") > CantidadProductoEnLista[i]) {
              CantidadProductoEnLista[i] = item.getAttribute("cantidad");
              EstadoProductoEnLista[i] = "No obsequiado";
              bExiste = true;

              if(localStorage.getItem("id_lista_evento_CU8") !=null){
                var aIdListaEvento=       JSON.parse(localStorage.getItem('id_lista_evento_CU8')); //Se auto genera
                var aEstadoListaEventos = JSON.parse(localStorage.getItem('estado_lista_evento'));
              }

              for (var c = 0; c < aIdListaEvento.length; c++) {
                if (aIdListaEvento[c] == IdListaDeProductosEvento[i]) {
                  aEstadoListaEventos[c] = 0;
                }
              }
              localStorage.setItem('estado_lista_evento',JSON.stringify(aEstadoListaEventos));
            } else if (item.getAttribute("cantidad") == CantidadProductoEnLista[i]) {
              bExiste = true;
              break;
            } else if (item.getAttribute('cantidad') < CantidadProductoEnLista[i]) {
              if (EstadoProductoEnLista[i] == "No obsequiado") {
                var IdReserva          = [];
                var IdProductoReserva  = [];
                var IdListaReserva     = [];
                var IdUsuarioReserva   = [];
                var CantidadReserva    = [];
                var EstadoReserva      = [];
                if (localStorage.getItem('id_reserva') != null) {
                  IdReserva=          JSON.parse(localStorage.getItem('id_reserva'));
                  IdProductoReserva=  JSON.parse(localStorage.getItem('id_producto_reserva'));
                  IdListaReserva=     JSON.parse(localStorage.getItem('id_lista_reserva'));
                  IdUsuarioReserva=   JSON.parse(localStorage.getItem('id_usuario_reserva'));
                  CantidadReserva=    JSON.parse(localStorage.getItem('cantidad_reserva'));
                  EstadoReserva=      JSON.parse(localStorage.getItem('estado_reserva'));
                }

              } else if (EstadoProductoEnLista[i] == "Regalado") {
                var aIdProducto = JSON.parse(localStorage.getItem('ids_producto_CU6'));
                var aNombreProducto = JSON.parse(localStorage.getItem('nombre_producto_CU6'));
                for (var e = 0; e < aIdProducto.length; e++) {
                  if (aIdProducto[e] == IdProductoEnLista[i]) {
                    ErrorName.push(aNombreProducto[e]);
                  }
                }
                bFalla = true;
                bExiste = null;
                break;
              } else if (EstadoProductoEnLista[i] == "Reservado") {
                var aIdProducto = JSON.parse(localStorage.getItem('ids_producto_CU6'));
                var aNombreProducto = JSON.parse(localStorage.getItem('nombre_producto_CU6'));
                for (var e = 0; e < aIdProducto.length; e++) {
                  if (aIdProducto[e] == IdProductoEnLista[i]) {
                    ErrorName.push(aNombreProducto[e]);
                  }
                }
                bFalla = true;
                bExiste = null;
                break;
              }
            }
            break;
          }
        }
      }
      if (bExiste == false) {
         IdProductoEnLista.push(item.value);
         CantidadProductoEnLista.push(item.getAttribute("cantidad"));
         EstadoProductoEnLista.push("No obsequiado");
         IdListaDeProductosEvento.push(getParameterByName("idLista"));

         if(localStorage.getItem("id_lista_evento_CU8") !=null){
           var aIdListaEvento=       JSON.parse(localStorage.getItem('id_lista_evento_CU8')); //Se auto genera
           var aEstadoListaEventos = JSON.parse(localStorage.getItem('estado_lista_evento'));
         }

         for (var c = 0; c < aIdListaEvento.length; c++) {
           if (aIdListaEvento[c] == IdListaDeProductosEvento[i]) {
             aEstadoListaEventos[c] = 0;
           }
         }
         localStorage.setItem('estado_lista_evento',JSON.stringify(aEstadoListaEventos));

      } else if (bExiste == null) {

      }
    }
  });
  if (bFalla == true) {
    if (ErrorName.length < 2) {
      swal("Error", "El producto " + ErrorName + " ya ha sido regalado o reservado por lo que no puede ser modificado.", "error");
    } else {
      swal("Error", "Los productos " + ErrorName + " ya han sido regalados o reservados por lo que no pueden ser modificados.", "error");
    }
  } else {
    localStorage.setItem('id_producto_en_lista',JSON.stringify(IdProductoEnLista));
    localStorage.setItem('cantidad_producto_en_lista',JSON.stringify(CantidadProductoEnLista));
    localStorage.setItem('estado_producto_en_lista',JSON.stringify(EstadoProductoEnLista));
    localStorage.setItem('id_lista_de_productos_evento',JSON.stringify(IdListaDeProductosEvento));

    swal({
      title: "Artículos agregados correctamente",
      text: "Ha completado la creación de la lista. Su código es " + getParameterByName("idLista") + " (puede encontrarlo en el menú 'Mis listas' y compartirlo con sus invitados)",
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
