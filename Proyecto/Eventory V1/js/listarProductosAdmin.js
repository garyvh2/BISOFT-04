
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




elFotoPefil = document.querySelector("#BotonMenuUsuario div");
elFotoPefil.style.backgroundImage = "url(" + sessionStorage.getItem("sesion_foto_perfil") + ")";
elFotoPefil.style.backgroundRepeat  = "no-repeat";

var elNombreUsuario = document.querySelector("#BotonMenuUsuario h2");
elNombreUsuario.innerHTML = sessionStorage.getItem("sesion_primer_nombre") + " " + sessionStorage.getItem("sesion_primer_apellido");






var elementoSelecionado;

llenarLista(JSON.parse(sessionStorage.getItem("sesion_id_tienda")));

//Cuando el usuario seleccione una tienda debera almacenar el id en session


function llenarLista (IdTienda) {
  var elUlListaProductos = document.querySelector("#ListaDeProductos");
  var elImagenProducto = document.querySelector("#ImageMenuCantidad");



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
        var elLiProducto = document.createElement('li');
          var divImagenProducto = document.createElement('div');
            divImagenProducto.id = "ImagenProducto";

          var h2NombreProducto = document.createElement('h2');
            h2NombreProducto.innerHTML = aNombreProducto[i];

          var h4DescripcionProducto = document.createElement('h4');
            h4DescripcionProducto.innerHTML = aDescripcionProducto[i];

          var h4PrecioProducto = document.createElement('h4');
            h4PrecioProducto.innerHTML = "Precio ₡ " + aPrecioProductoSinImpuesto[i];

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
