CargarLista(1);
function CargarLista (estado) {
  if (Number(estado) == 1) {
    /*NOTE se carga el tbody de la tabla */
    var elTableBody = document.querySelector('#TablaDeElementos tbody');
    elTableBody.innerHTML = '';
    /*NOTE se cambia el estado de los botones NO TOCAR*/
    var elbtnActivo = document.querySelector('#btnActivo');
      elbtnActivo.classList.add("Activo");
    var elbtnInactivo = document.querySelector('#btnInactivo');
      elbtnInactivo.classList.remove("Activo");

    var peticion = $.ajax({

        url: "services/listarTipoProductoPorEstado.php",
        type: "POST",
        data: {
          'estado' : estado
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response){

          var nArrayLength = response.length;

          for (var i = 0; i < nArrayLength; i++) {

                /*NOTE se crea la fila*/
                var elFila = document.createElement('tr');

                var elCodigo = document.createElement('td');
                var txtelCodigo = document.createTextNode(response[i]['id']);

                var elNombre = document.createElement('td');
                var txtelNombre = document.createTextNode(response[i]['nombre']);

                var elDescripcion = document.createElement('td');
                var txtelDescripcion = document.createTextNode(response[i]['descripcion']);

                var elFechaVencimiento = document.createElement('td');
                var txtelFechaVencimiento = document.createTextNode(response[i]['fecha_vencimiento']);

                /*NOTE si existe un dato que sea numerico pero deberia ser un txto se coloca asi */
                var precedero;
                if (response[i]['precedero'] == 1) {
                  precedero = "Si";
                }
                if (response[i]['precedero'] == 0) {
                  precedero = "No";
                }

                var elPrecedero = document.createElement('td');
                var txtelPrecedero = document.createTextNode(precedero);

                  /*NOTE NOTOCAR*/
                var elModificar   = document.createElement('td');
                  elModificar.classList.add("botonesLista");
                  elModificar.value = response[i]['id'];
                  elModificar.setAttribute('onclick', "Modificar(this.value)");
                var txtModificar  = document.createElement('i');
                  txtModificar.classList.add('fa');
                  txtModificar.classList.add('fa-pencil-square-o');
                  txtModificar.classList.add('fa-2x');
                  /*NOTE NOTOCAR*/
                var elEliminar   = document.createElement('td');
                  elEliminar.classList.add("botonesLista");
                  elEliminar.value = response[i]['id'];
                  elEliminar.setAttribute('onclick', "Eliminar(this.value)");
                var txtEliminar  = document.createElement('i');
                  txtEliminar.classList.add('fa');
                  txtEliminar.classList.add('fa-trash');
                  txtEliminar.classList.add('fa-2x');
                /*NOTE se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                  y finalmente la fila en el tbody*/
                  elCodigo.appendChild(txtelCodigo);
                  elFila.appendChild(elCodigo);

                  elNombre.appendChild(txtelNombre);
                  elFila.appendChild(elNombre);

                  elDescripcion.appendChild(txtelDescripcion);
                  elFila.appendChild(elDescripcion);


                  elPrecedero.appendChild(txtelPrecedero);
                  elFila.appendChild(elPrecedero);

                  elFechaVencimiento.appendChild(txtelFechaVencimiento);
                  elFila.appendChild(elFechaVencimiento);


                  /*NOTE NOTOCAR*/
                  elModificar.appendChild(txtModificar);
                  elFila.appendChild(elModificar);

                  /*NOTE NOTOCAR*/
                  elEliminar.appendChild(txtEliminar);
                  elFila.appendChild(elEliminar);
                  elTableBody.appendChild(elFila);

          }
        },
        error: function(request, error) {
            alert(error);
        }
    });
  }else {

        /*NOTE se carga el tbody de la tabla */
        var elTableBody = document.querySelector('#TablaDeElementos tbody');
        elTableBody.innerHTML = '';
        /*NOTE se cambia el estado de los botones */
        var elbtnActivo = document.querySelector('#btnActivo');
          elbtnActivo.classList.remove("Activo");
        var elbtnInactivo = document.querySelector('#btnInactivo');
          elbtnInactivo.classList.add("Activo");

          /*NOTE se realiza la peticion*      DUDA   -----*/
          var peticion = $.ajax({
              /*NOTE se tiene que crear un procedimiento almacenado que se llame
                listar_nombretabla_por_estado, de parametro se le envia el estado del cargar lista - con el objetivo de obtener los activos e inactivos
                para ese procedimiento tiene que hacer un php propio que se coloca aca
                el data no se TOCA
              */

              url: "services/listarTipoProductoPorEstado.php",
              type: "POST",
              data: {
                'estado' : estado
              },
              contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
              dataType: 'json',
              async: false,
              timeout: 30000,

              success: function(response){

                          var nArrayLength = response.length;

                          for (var i = 0; i < nArrayLength; i++) {

                                /*NOTE se crea la fila*/
                                var elFila = document.createElement('tr');

                                var elCodigo = document.createElement('td');
                                var txtelCodigo = document.createTextNode(response[i]['id']);

                                var elNombre = document.createElement('td');
                                var txtelNombre = document.createTextNode(response[i]['nombre']);

                                var elDescripcion = document.createElement('td');
                                var txtelDescripcion = document.createTextNode(response[i]['descripcion']);

                                var elFechaVencimiento = document.createElement('td');
                                var txtelFechaVencimiento = document.createTextNode(response[i]['fecha_vencimiento']);

                                /*NOTE si existe un dato que sea numerico pero deberia ser un txto se coloca asi */
                                var precedero;
                                if (response[i]['precedero'] == 1) {
                                  precedero = "Si";
                                }
                                if (response[i]['precedero'] == 0) {
                                  precedero = "No";
                                }

                                var elPrecedero = document.createElement('td');
                                var txtelPrecedero = document.createTextNode(precedero);



                        /*NOTE NOTOCAR*/
                      var elModificar   = document.createElement('td');
                        elModificar.classList.add("botonesLista");
                        elModificar.value = response[i]['id'];
                        elModificar.setAttribute('onclick', "Modificar(this.value)");
                        var txtModificar  = document.createElement('i');
                        txtModificar.classList.add('fa');
                        txtModificar.classList.add('fa-pencil-square-o');
                        txtModificar.classList.add('fa-2x');
                        /*NOTE NOTOCAR*/
                      var elEliminar   = document.createElement('td');
                        elEliminar.classList.add("botonesLista");
                        elEliminar.value = response[i]['id'];
                        elEliminar.setAttribute('onclick', "Activar(this.value)");
                      var txtEliminar  = document.createElement('i');
                        txtEliminar.classList.add('fa');
                        txtEliminar.classList.add('fa-check');
                        txtEliminar.classList.add('fa-2x');

                        /*NOTE se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                          y finalmente la fila en el tbody*/
                          elCodigo.appendChild(txtelCodigo);
                          elFila.appendChild(elCodigo);

                          elNombre.appendChild(txtelNombre);
                          elFila.appendChild(elNombre);

                          elDescripcion.appendChild(txtelDescripcion);
                          elFila.appendChild(elDescripcion);


                          elPrecedero.appendChild(txtelPrecedero);
                          elFila.appendChild(elPrecedero);

                          elFechaVencimiento.appendChild(txtelFechaVencimiento);
                          elFila.appendChild(elFechaVencimiento);



                        /*NOTE NOTOCAR*/
                        elModificar.appendChild(txtModificar);
                        elFila.appendChild(elModificar);
                        /*NOTE NOTOCAR*/
                        elEliminar.appendChild(txtEliminar);
                        elFila.appendChild(elEliminar);

                        elTableBody.appendChild(elFila);
                }
              },
              error: function(request, error) {
                  alert(error);
              }
          });
    }
}

/*NOTE NO TOCAR */
var txtBuscarId = document.querySelector("#txtBuscarId");
txtBuscarId.addEventListener("keyup", function() {
  var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
  txtBuscarNombre.value = "";
  //Si esta vacio se carga de manera normal
  if (this.value == "") {
    var elbtnActivo = document.querySelector('#btnActivo');
    var elbtnInactivo = document.querySelector('#btnInactivo');

    if (elbtnActivo.classList == "Activo") {
      CargarLista(1);
    } else if (elbtnInactivo.classList == "Activo") {
      CargarLista(0);
    }
  //De lo contrario se filtra
  } else {
    var elbtnActivo = document.querySelector('#btnActivo');
    var elbtnInactivo = document.querySelector('#btnInactivo');

    if (elbtnActivo.classList == "Activo") {
      FiltrarLista(1,1);
    } else if (elbtnInactivo.classList == "Activo") {
      FiltrarLista(0,1);
    }
  }
});
/*NOTE NO TOCAR */
var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
txtBuscarNombre.addEventListener("keyup", function() {
  var txtBuscarId = document.querySelector("#txtBuscarId");
  txtBuscarId.value = "";/* se obtiene el input de texto y dependiendo en su valor, se carga la lista de alguna forma*/
  var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
  //Si esta vacio se carga de manera normal
  if (txtBuscarNombre.value == "") {
    var elbtnActivo = document.querySelector('#btnActivo');
    var elbtnInactivo = document.querySelector('#btnInactivo');

    if (elbtnActivo.classList == "Activo") {
      CargarLista(1);
    } else if (elbtnInactivo.classList == "Activo") {
      CargarLista(0);
    }
  //De lo contrario se filtra
  } else {
    var elbtnActivo = document.querySelector('#btnActivo');
    var elbtnInactivo = document.querySelector('#btnInactivo');

    if (elbtnActivo.classList == "Activo") {
      FiltrarLista(1,2);
    } else if (elbtnInactivo.classList == "Activo") {
      FiltrarLista(0,2);
    }
  }
});


function FiltrarLista (estado,tipoBusqueda) {
  if (tipoBusqueda == 1) {
    var txtBuscar = document.querySelector("#txtBuscarId");

    var sPorBuscar = "id";
  } else if (tipoBusqueda == 2) {
    var txtBuscar = document.querySelector("#txtBuscarNombre");

    var sPorBuscar = "nombre";
  }
  if (Number(estado) == 1) {
    var elTableBody = document.querySelector('#TablaDeElementos tbody');
    elTableBody.innerHTML = '';
    var elbtnActivo = document.querySelector('#btnActivo');
      elbtnActivo.classList.add("Activo");
    var elbtnInactivo = document.querySelector('#btnInactivo');
      elbtnInactivo.classList.remove("Activo");

    var peticion = $.ajax({
        url: "services/listarTipoProductoPorEstado.php",
        type: "POST",
        data: {
          'estado' : estado
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,
        /* BUG hasta aca */
        success: function(response){

          var nArrayLength = response.length;
          for (var i = 0; i < nArrayLength; i++) {
            var sBuscar     = txtBuscar.value.toLowerCase();
            var sElemento   = cleanUpSpecialChars(response[i][sPorBuscar].toLowerCase());
            if (sElemento.indexOf(sBuscar) > -1) {
              /*NOTE se crea la fila*/
              var elFila = document.createElement('tr');

              var elCodigo = document.createElement('td');
              var txtelCodigo = document.createTextNode(response[i]['id']);

              var elNombre = document.createElement('td');
              var txtelNombre = document.createTextNode(response[i]['nombre']);

              var elDescripcion = document.createElement('td');
              var txtelDescripcion = document.createTextNode(response[i]['descripcion']);

              var elFechaVencimiento = document.createElement('td');
              var txtelFechaVencimiento = document.createTextNode(response[i]['fecha_vencimiento']);

              /*NOTE si existe un dato que sea numerico pero deberia ser un txto se coloca asi */
              var precedero;
              if (response[i]['precedero'] == 1) {
                precedero = "Si";
              }
              if (response[i]['precedero'] == 0) {
                precedero = "No";
              }

              var elPrecedero = document.createElement('td');
              var txtelPrecedero = document.createTextNode(precedero);

                /*NOTE NOTOCAR*/
              var elModificar   = document.createElement('td');
                elModificar.classList.add("botonesLista");
                elModificar.value = response[i]['id'];
                elModificar.setAttribute('onclick', "Modificar(this.value)");
              var txtModificar  = document.createElement('i');
                txtModificar.classList.add('fa');
                txtModificar.classList.add('fa-pencil-square-o');
                txtModificar.classList.add('fa-2x');
                /*NOTE NOTOCAR*/
              var elEliminar   = document.createElement('td');
                elEliminar.classList.add("botonesLista");
                elEliminar.value = response[i]['id'];
                elEliminar.setAttribute('onclick', "Eliminar(this.value)");
              var txtEliminar  = document.createElement('i');
                txtEliminar.classList.add('fa');
                txtEliminar.classList.add('fa-trash');
                txtEliminar.classList.add('fa-2x');
              /*NOTE se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                y finalmente la fila en el tbody*/
                elCodigo.appendChild(txtelCodigo);
                elFila.appendChild(elCodigo);

                elNombre.appendChild(txtelNombre);
                elFila.appendChild(elNombre);

                elDescripcion.appendChild(txtelDescripcion);
                elFila.appendChild(elDescripcion);


                elPrecedero.appendChild(txtelPrecedero);
                elFila.appendChild(elPrecedero);

                elFechaVencimiento.appendChild(txtelFechaVencimiento);
                elFila.appendChild(elFechaVencimiento);


                /*NOTE NOTOCAR*/
                elModificar.appendChild(txtModificar);
                elFila.appendChild(elModificar);

                /*NOTE NOTOCAR*/
                elEliminar.appendChild(txtEliminar);
                elFila.appendChild(elEliminar);
                elTableBody.appendChild(elFila);

            }
          }
        },
        error: function(request, error) {
            alert(error);
        }
    });
  } else {
    var elTableBody = document.querySelector('#TablaDeElementos tbody');
    elTableBody.innerHTML = '';
    var elbtnActivo = document.querySelector('#btnActivo');
      elbtnActivo.classList.remove("Activo");
    var elbtnInactivo = document.querySelector('#btnInactivo');
      elbtnInactivo.classList.add("Activo");
    var peticion = $.ajax({

        url: "services/listarTipoProductoPorEstado.php",
        type: "POST",
        data: {
          'estado' : estado
        },
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: 'json',
        async: false,
        timeout: 30000,

        success: function(response){

          var nArrayLength = response.length;
          for (var i = 0; i < nArrayLength; i++) {
            var sBuscar     = txtBuscar.value.toLowerCase();
            var sElemento   = cleanUpSpecialChars(response[i][sPorBuscar].toLowerCase());
            if (sElemento.indexOf(sBuscar) > -1) {
              /* BUG ojojojoj aca adentro se copia todo lo que esta dentro del while de Cargar SOLO LO QUE ESTA DENTRO DEL FOR*/


                    /*NOTE se crea la fila*/
                    var elFila = document.createElement('tr');

                    var elCodigo = document.createElement('td');
                    var txtelCodigo = document.createTextNode(response[i]['id']);

                    var elNombre = document.createElement('td');
                    var txtelNombre = document.createTextNode(response[i]['nombre']);

                    var elDescripcion = document.createElement('td');
                    var txtelDescripcion = document.createTextNode(response[i]['descripcion']);

                    var elFechaVencimiento = document.createElement('td');
                    var txtelFechaVencimiento = document.createTextNode(response[i]['fecha_vencimiento']);

                    /*NOTE si existe un dato que sea numerico pero deberia ser un txto se coloca asi */
                    var precedero;
                    if (response[i]['precedero'] == 1) {
                      precedero = "Si";
                    }
                    if (response[i]['precedero'] == 0) {
                      precedero = "No";
                    }

                    var elPrecedero = document.createElement('td');
                    var txtelPrecedero = document.createTextNode(precedero);



            /*NOTE NOTOCAR*/
          var elModificar   = document.createElement('td');
            elModificar.classList.add("botonesLista");
            elModificar.value = response[i]['id'];
            elModificar.setAttribute('onclick', "Modificar(this.value)");
            var txtModificar  = document.createElement('i');
            txtModificar.classList.add('fa');
            txtModificar.classList.add('fa-pencil-square-o');
            txtModificar.classList.add('fa-2x');
            /*NOTE NOTOCAR*/
          var elEliminar   = document.createElement('td');
            elEliminar.classList.add("botonesLista");
            elEliminar.value = response[i]['id'];
            elEliminar.setAttribute('onclick', "Activar(this.value)");
          var txtEliminar  = document.createElement('i');
            txtEliminar.classList.add('fa');
            txtEliminar.classList.add('fa-check');
            txtEliminar.classList.add('fa-2x');

            /*NOTE se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
              y finalmente la fila en el tbody*/
              elCodigo.appendChild(txtelCodigo);
              elFila.appendChild(elCodigo);

              elNombre.appendChild(txtelNombre);
              elFila.appendChild(elNombre);

              elDescripcion.appendChild(txtelDescripcion);
              elFila.appendChild(elDescripcion);


              elPrecedero.appendChild(txtelPrecedero);
              elFila.appendChild(elPrecedero);

              elFechaVencimiento.appendChild(txtelFechaVencimiento);
              elFila.appendChild(elFechaVencimiento);



            /*NOTE NOTOCAR*/
            elModificar.appendChild(txtModificar);
            elFila.appendChild(elModificar);
            /*NOTE NOTOCAR*/
            elEliminar.appendChild(txtEliminar);
            elFila.appendChild(elEliminar);

            elTableBody.appendChild(elFila);
            }
          }
        },
        error: function(request, error) {
            alert(error);
        }
    });

  }
}


/*NOTE NO TOCAR */
function Modificar (idElemento) {
  document.querySelector("#ModificarDatos").style.display = "block";
  localStorage.clear();
  localStorage.setItem('idElemento', idElemento);

  var peticion = $.ajax({
      url: "services/selectTipoProductoPorModificar.php",
      type: "POST",
      data: {
        'id_tipo_producto' : idElemento
      },
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,

      success: function(response){
        //Cargar datos de cliente

        document.querySelector("#txtNombreProducto").value                      = response[0]['nombre'];
        document.querySelector("#txtDescripcionProducto").value                 = response[0]['descripcion'];
        document.querySelector("#txtFechaVencimiento").value          = response[0]['fecha_vencimiento'];

        if (response[0]['precedero'] == 1) {
          document.querySelector("#chkPerecedero").checked = true;
        }
        if (response[0]['precedero'] == 0) {
          document.querySelector("#chkPerecedero").checked = false;
        }

      },
      error: function(request, error) {
          alert(error);
      }
  });

  return false;
}

function checkboxPerecedero (el) {
  var elFechaCaducidad = document.querySelector('#FechaCaducidad');
  if (el.checked == true) {
    elFechaCaducidad.classList.remove("FechaOculta");
  }
  else {
    elFechaCaducidad.classList.add("FechaOculta");
  }
}

/*NOTE NO TOCAR */
function Eliminar(idElemento) {
    swal({
            title: "¿Está seguro?",
            text: "Si desactiva este tipo de producto los usuarios no podran accesarlo.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, eliminarlo",
            cancelButtonText: "No, cancelar",
            closeOnConfirm: false
        },
        /*Se muestra un mensaje de exito y se realiza el llamado de los procedimientos necesarios */
        function() {
            EliminarElemento(idElemento);

            swal("Transacción realizada", "El tipo de producto se encuentra deshabilitado.", "success");
            var txtBuscarId = document.querySelector("#txtBuscarId");
            txtBuscarId.value = "";
            var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
            txtBuscarNombre.value = "";
            var elbtnActivo = document.querySelector('#btnActivo');
            var elbtnInactivo = document.querySelector('#btnInactivo');
            if (elbtnActivo.classList == "Activo") {
                CargarLista(1);
            } else if (elbtnInactivo.classList == "Activo") {
                CargarLista(0);
            }
        });
}

		/*Se muestra un mensaje de exito y se realiza el llamado de los procedimientos necesarios */
function Activar(idElemento) {
  swal({
          title: "¿Está seguro?",
          text: "Si activa este elemento los usuarios podran accesarlo.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Si, habilitarlo",
          cancelButtonText: "No, cancelar",
          closeOnConfirm: false
      },
      /*Se muestra un mensaje de exito y se realiza el llamado de los procedimientos necesarios */
      function() {
          ActivarElemento(idElemento);

          swal("Transacción realizada", "El elemento se encuentra habilitado.", "success");
          var txtBuscarId = document.querySelector("#txtBuscarId");
          txtBuscarId.value = "";
          var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
          txtBuscarNombre.value = "";
          var elbtnActivo = document.querySelector('#btnActivo');
          var elbtnInactivo = document.querySelector('#btnInactivo');
          if (elbtnActivo.classList == "Activo") {
              CargarLista(1);
          } else if (elbtnInactivo.classList == "Activo") {
              CargarLista(0);
          }
    });
}

function Agregar() {
  /*NOTE aca se redirige a la seccion de Agregar dependiendo del elemento */
  window.location = "registrarTipoProducto.html"; //Se coloca la URL
}

document.querySelector("#ModificarDatos").addEventListener("click", function(el) {
  var elemento = document.querySelector("#ModificarDatos");
  if (el.target == elemento) {
    elemento.style.display = "none";
  }
});


function EliminarElemento (idElemento) {
    var estado = 0;
    var id = idElemento;
    var peticion = $.ajax({
        url: "services/cambiarEstadoTipoProducto.php",
        type: "POST",
        data: {
            'id': id,
            'estado': estado
        },
        async: false,
        timeout: 30000,
        success: function() {
            swal({
                title: "La información fue ingresada correctamente",
                text: "El usuario se encuentra inactivo.",
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
    var elbtnActivo = document.querySelector('#btnActivo');
    var elbtnInactivo = document.querySelector('#btnInactivo');
    if (elbtnActivo.classList == "Activo") {
        CargarLista(1);
    } else if (elbtnInactivo.classList == "Activo") {
        CargarLista(0);
    }
    return false;
}


function ModificarElemento (vThis) {
    var idElemento = localStorage.getItem('idElemento');
    localStorage.clear();

    var elbtnActivo = document.querySelector('#btnActivo');
    var elbtnInactivo = document.querySelector('#btnInactivo');
    if (elbtnActivo.classList == "Activo") {
        var estado = 1;
    } else if (elbtnInactivo.classList == "Activo") {
        var estado = 0;
    }

    var elTxtNombre             = document.querySelector("#txtNombreProducto");
    var elTxtDescripcion         = document.querySelector("#txtDescripcionProducto");
    var elchkPrecedero           = document.querySelector("#chkPerecedero");
    var elTxtFechaVencimiento    = document.querySelector("#txtFechaVencimiento");

    var sNombre = elTxtNombre.value;
    var sDescripcion = elTxtDescripcion.value;
    if (elchkPrecedero.checked == true) {
      var bPerecederoProducto= 1;
    } else {
      var bPerecederoProducto= 0;
    }
    var dFechaVencimiento = elTxtFechaVencimiento.value;

    var peticion2 = $.ajax({
        url: "services/modificarTipoProducto.php",
        type: "POST",
        data: {
            'idElemento': idElemento,
            'nombre': sNombre,
            'descripcion': sDescripcion,
            'fecha_vencimiento': dFechaVencimiento,
            'precedero': bPerecederoProducto,
            'estado' : estado
        },
        success: function(response) {
            swal({
                title: "La información fue ingresada correctamente",
                text: "Los datos del tipo de producto han sido actualizados.",
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

    var txtBuscarId = document.querySelector("#txtBuscarId");
      txtBuscarId.value = "";
      var txtBuscarNombre = document.querySelector("#txtBuscarNombre");
      txtBuscarNombre.value = "";
      var elbtnActivo = document.querySelector('#btnActivo');
      var elbtnInactivo = document.querySelector('#btnInactivo');
      if (elbtnActivo.classList == "Activo") {
          CargarLista(1);
      } else if (elbtnInactivo.classList == "Activo") {
          CargarLista(0);
      }
      var elemento = document.querySelector("#ModificarDatos");
      elemento.style.display = "none";
      return false;

}

  function ActivarElemento(idElemento) {
      var estado = 1;

      var peticion = $.ajax({
          url: "services/cambiarEstadoTipoProducto.php",
          type: "POST",
          data: {
              'id'    : idElemento,
              'estado': estado
          },
          success: function() {
              swal({
                  title: "La información fue ingresada correctamente",
                  text: "El tipo de producto se encuentra activado.",
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
      var elbtnActivo = document.querySelector('#btnActivo');
      var elbtnInactivo = document.querySelector('#btnInactivo');
      if (elbtnActivo.classList == "Activo") {
          CargarLista(1);
      } else if (elbtnInactivo.classList == "Activo") {
          CargarLista(0);
      }
    return false;
}
