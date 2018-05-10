
function BuscarLista () {

  swal({
    title: "Buscar una lista",
    text: "Ingrese el código que el creador de la lista le envió.",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "Código de lista"
  }, function(inputValue){
    if (inputValue === false)
      return false;
    if (inputValue === "") {
      swal.showInputError("No puede dejar este espacio vacío");
      return false
    }
    var peticion = $.ajax({
      url: "services/checkListaInvitado.php",
      type: "POST",
      data: {
             'id_lista' : inputValue
           },
      dataType: 'json',

      success: function(data){
        if (data[0]['exist'] == 1) {
          window.location = "buscarListasInvitado.html?idLista=" + inputValue + "&idTienda=" + data[0]['id_tienda'];
        } else if (data[0]['exist'] == 2) {
          swal(
            "Error", "El evento ha pasado.", "error");
        } else if (data[0]['exist'] == 3){
          swal(
            "Error", "La lista ingresada se encuentra deshabilitada.", "error");
        } else if (data[0]['exist'] == 4) {
          swal(
            "Error", "El número ingresado pertenece a una lista que no se encuentra disponible.", "error");
        }
      },
      error: function(request, cerror) {
        alert(cerror);
      }
    });

  });
}
