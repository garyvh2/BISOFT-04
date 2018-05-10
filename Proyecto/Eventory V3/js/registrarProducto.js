
function validar(vThis){
  var peticion = $.ajax({
          url: "services/checkProducto.php",
          type: "POST",
          data: {
            'nIdProducto' : document.querySelector('#txtIdProducto').value
          },
          contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
          dataType: 'json',

          success: function(response){
            if (Number(response[0]['exist']) == 1) {
              swal({
                title: "Error!",
                text: "El código de producto ya se encuentra registrado.",
                type: "error",
                showCancelButton: false,
                confirmButtonColor: "red",
                confirmButtonText: "Continuar",
                closeOnConfirm: false
              });
            } else {
              /*Variables para los elementos del formulario*/
              var txtIdProducto = document.querySelector('#txtIdProducto');
              var txtNombreProducto = document.querySelector('#txtNombreProducto');
              var txtDescripcionProducto = document.querySelector('#txtDescripcionProducto');
              var txtPrecioProductoSinImpuesto = document.querySelector('#txtPrecioSinImpuesto');
              var txtMarcaProducto = document.querySelector('#txtMarcaProducto');
              var txtProvedorProducto = document.querySelector('#txtProvedorProducto');
              var txtCantidadProducto = document.querySelector('#txtCantidadProducto');
              var txtTipoProducto = document.querySelector('#txtTipoProducto');

              /*Variables para los valores que están dentro de cada uno de los elementos del formulario*/

              var nIdProducto = Number(txtIdProducto.value);
              var sNombreProducto = txtNombreProducto.value;
              var sDescripcionProducto = txtDescripcionProducto.value;
              var nPrecioProductoSinImpuesto = Number(txtPrecioSinImpuesto.value);
              var sMarcaProducto = txtMarcaProducto.value;
              var sProvedorProducto = Number(txtProvedorProducto.value);
              var nCantidadProducto = Number(txtCantidadProducto.value);
              var nTipoProducto = Number(txtTipoProducto.value);

              var sImagePath;

              var peticion = $.ajax({
              url					: "services/imageUploader.php?path=../imgs/uploads/foto_producto/",  //Se envia el path como paremetro para el envio de la imagen
              type				: "POST",
              data				: new FormData(vThis),
              contentType	: false,
              cache				: false,
              processData	:	false,
              async: false,
              timeout: 30000,

              success: function(data) {
                sImagePath = data.replace('../','');
              },
              error: function(request, cerror) {
                alert(cerror);
              }

            });
              registrar(nIdProducto,sImagePath,sNombreProducto,sDescripcionProducto,nPrecioProductoSinImpuesto,sMarcaProducto,sProvedorProducto,nCantidadProducto,nTipoProducto);
        }
      },
      error: function(request, error) {
          alert(error);
      }
  });
  return false;

}
  function registrar(pnIdProducto,sImagePath,psNombreProducto,psDescripcionProducto,pnPrecioProductoSinImpuesto,psMarcaProducto,psProvedorProducto,pnCantidadProducto,pnTipoProducto){
    /*Almacenar los valores en cada uno de los arreglos correspondientes
  aIdTienda.push(JSON.parse(sessionStorage.getItem("sesion_id_tienda")));
*/

  var peticion = $.ajax({
              url: "services/registrarProducto.php",
              type: "post",
              data: {
                     'nIdProducto': pnIdProducto,
                     'sImagePath': sImagePath,
                     'sNombreProducto': psNombreProducto,
                     'sDescripcionProducto':psDescripcionProducto,
                     'nPrecioProductoSinImpuesto':pnPrecioProductoSinImpuesto,
                     'sMarcaProducto':psMarcaProducto,
                     'sProvedorProducto':psProvedorProducto,
                     'nCantidadProducto':pnCantidadProducto,
                     'nTipoProducto':pnTipoProducto,
            },
            //  dataType: 'json',

            success: function(response){
          swal({
            title: "Los datos del producto han sido ingresados",
            text: "Los datos del producto han sido ingresados.",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "green",
            confirmButtonText: "Continuar",
            closeOnConfirm: false
          });

             $( '#Form' ).each(function(){
                this.reset();
             });
            },
        error: function(request, error) {
                alert(error);
        }
    });
}

cargarComboBox ();

function cargarComboBox () {

var peticion = $.ajax({
          url: "services/listarProveedoresPorTienda.php",
          type: "POST",
          data: {},
          contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
          dataType: 'json',

          success: function(response){

          var nLength = response.length;

          var elSelectProvedorProducto = document.querySelector("#txtProvedorProducto");
          for (var i = 0; i < nLength; i++) {

          var option = document.createElement('option');
          option.setAttribute("value",response[i]['id']);
          var nodoDeTexto = document.createTextNode(response[i]['nombre']);
          option.appendChild(nodoDeTexto);

          elSelectProvedorProducto.appendChild(option);
          }
        },
                error: function(request, error) {
                    alert(error);
                }
        });

  //Tipos de producto

  var peticion = $.ajax({

            url: "services/listarTiposDeProductoPorTienda.php",
            type: "POST",
            data: {},
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){

            var nLength = response.length;

            var elSelectTipoDeProducto = document.querySelector("#txtTipoProducto");
            for (var i = 0; i < nLength; i++) {

            var option = document.createElement('option');
            option.setAttribute("value",response[i]['id']);
            var nodoDeTexto = document.createTextNode(response[i]['nombre']);
            option.appendChild(nodoDeTexto);

            elSelectTipoDeProducto.appendChild(option);
                      }
          },
                    error: function(request, error) {
                      alert(error);
                  }
          });
}
