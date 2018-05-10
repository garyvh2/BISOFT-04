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



    /*NOTE se realiza la peticion*/
    var peticion = $.ajax({
        /*NOTE se tiene que crear un procedimiento almacenado que se llame

          listar_nombretabla_por_estado

          de parametro se le envia el estado del cargar lista con el objetivo de obtener los activos e inactivos

          para ese procedimiento tiene que hacer un php propio que se coloca aca

          el data no se TOCAR
        */

        url: "services/selectUsuario.php",
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
                /*NOTE Se crean la celta por cada campo relevante de la tabla de la base de datos
                  Se omiten los datos que son ids de otras tablas */
                var elNombre = document.createElement('td');
                var txtelNombre = document.createTextNode(response[i]['primer_nombre']);

                var elSegundoNombre = document.createElement('td');
                var txtelSegundoNombre = document.createTextNode(response[i]['segundo_nombre']);

                /*NOTE si existe un dato  que sea numerico pero deberia ser un txto se coloca asi */
                var TipoUsuario;
                if (response[i]['tipo'] == 1) {
                  TipoUsuario = "Administrador";
                }
                if (response[i]['tipo'] == 2) {
                  TipoUsuario = "Serv. Al Cliente";
                }
                if (response[i]['tipo'] == 3) {
                  TipoUsuario = "Cajero";
                }
                if (response[i]['tipo'] == 4) {
                  TipoUsuario = "Cliente";
                }
                var elTipoUsuario = document.createElement('td');
                var txtelTipoUsuario = document.createTextNode(TipoUsuario);


                /*NOTE NOTOCAR*/
                var elModificar   = document.createElement('td');
                  elModificar.classList.add("botonesLista");
                  elModificar.value = response[i]['identificacion'];
                  elModificar.setAttribute('onclick', "Modificar(this.value)");
                  var txtModificar  = document.createElement('i');
                    txtModificar.classList.add('fa');
                    txtModificar.classList.add('fa-pencil-square-o');
                    txtModificar.classList.add('fa-2x');
                /*NOTE NOTOCAR*/
                var elEliminar   = document.createElement('td');
                  elEliminar.classList.add("botonesLista");
                  elEliminar.value = response[i]['identificacion'];
                  elEliminar.setAttribute('onclick', "Eliminar(this.value)");
                  var txtEliminar  = document.createElement('i');
                    txtEliminar.classList.add('fa');
                    txtEliminar.classList.add('fa-trash');
                    txtEliminar.classList.add('fa-2x');

                /*NOTE se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                  y finalmente la fila en el tbody*/
                elNombre.appendChild(txtelNombre);
                elFila.appendChild(elNombre);

                elSegundoNombre.appendChild(txtelSegundoNombre);
                elFila.appendChild(elSegundoNombre);

                elTipoUsuario.appendChild(txtelTipoUsuario);
                elFila.appendChild(elTipoUsuario);

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

          /*NOTE se realiza la peticion*/
          var peticion = $.ajax({
              /*NOTE se tiene que crear un procedimiento almacenado que se llame

                listar_nombretabla_por_estado

                de parametro se le envia el estado del cargar lista con el objetivo de obtener los activos e inactivos

                para ese procedimiento tiene que hacer un php propio que se coloca aca

                el data no se TOCAR
              */

              url: "services/selectUsuario.php",
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
                      /*NOTE Se crean la celta por cada campo relevante de la tabla de la base de datos
                        Se omiten los datos que son ids de otras tablas */
                      var elNombre = document.createElement('td');
                      var txtelNombre = document.createTextNode(response[i]['primer_nombre']);

                      var elSegundoNombre = document.createElement('td');
                      var txtelSegundoNombre = document.createTextNode(response[i]['segundo_nombre']);

                      /*NOTE si existe un dato  que sea numerico pero deberia ser un txto se coloca asi */
                      var TipoUsuario;
                      if (response[i]['tipo'] == 1) {
                        TipoUsuario = "Administrador";
                      }
                      if (response[i]['tipo'] == 2) {
                        TipoUsuario = "Serv. Al Cliente";
                      }
                      if (response[i]['tipo'] == 3) {
                        TipoUsuario = "Cajero";
                      }
                      if (response[i]['tipo'] == 4) {
                        TipoUsuario = "Cliente";
                      }
                      var elTipoUsuario = document.createElement('td');
                      var txtelTipoUsuario = document.createTextNode(TipoUsuario);


                      /*NOTE NOTOCAR*/
                      var elModificar   = document.createElement('td');
                        elModificar.classList.add("botonesLista");
                        elModificar.value = response[i]['identificacion'];
                        elModificar.setAttribute('onclick', "Modificar(this.value)");
                        var txtModificar  = document.createElement('i');
                          txtModificar.classList.add('fa');
                          txtModificar.classList.add('fa-pencil-square-o');
                          txtModificar.classList.add('fa-2x');
                      /*NOTE NOTOCAR*/
                      var elEliminar   = document.createElement('td');
                        elEliminar.classList.add("botonesLista");
                        elEliminar.value = response[i]['identificacion'];
                        elEliminar.setAttribute('onclick', "Activar(this.value)");
                        var txtEliminar  = document.createElement('i');
                          txtEliminar.classList.add('fa');
                          txtEliminar.classList.add('fa-check');
                          txtEliminar.classList.add('fa-2x');

                      /*NOTE se realiza el apend de los datos cada nodo en cada celda y cada celda en la fila
                        y finalmente la fila en el tbody*/
                      elNombre.appendChild(txtelNombre);
                      elFila.appendChild(elNombre);

                      elSegundoNombre.appendChild(txtelSegundoNombre);
                      elFila.appendChild(elSegundoNombre);

                      elTipoUsuario.appendChild(txtelTipoUsuario);
                      elFila.appendChild(elTipoUsuario);

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



/*NOTE esta funcion no se tiene que tocar mas que en lo que se menciona en los estatutos
  'BUG'
*/
function FiltrarLista (estado,tipoBusqueda) {
  if (tipoBusqueda == 1) {
    var txtBuscar = document.querySelector("#txtBuscarId");
    /* BUG aca deben mencionar el nombre del espacio en la tabla para el valor significativo a Buscar
      si es usuario se busca identificacion si e sproducto es codigo, pero de no existir uno se coloca
      el id y entonces en la tabla real si se debe mostrar el id de lo contrario nunca se muestra el id autogenerado*/
    //BUG solo se cambia el valor
    var sPorBuscar = "identificacion";
  } else if (tipoBusqueda == 2) {
    var txtBuscar = document.querySelector("#txtBuscarNombre");
    /* BUG aca deben mencionar el nombre del espacio en la tabla para el valor significativo a Buscar
      si es usuario se busca identificacion si e sproducto es codigo, pero de no existir uno se coloca
      el id y entonces en la tabla real si se debe mostrar el id de lo contrario nunca se muestra el id autogenerado*/
    //BUG solo se cambia el valor
    var sPorBuscar = "primer_nombre";
  }
  if (Number(estado) == 1) {
    var elTableBody = document.querySelector('#TablaDeElementos tbody');
    elTableBody.innerHTML = '';
    var elbtnActivo = document.querySelector('#btnActivo');
      elbtnActivo.classList.add("Activo");
    var elbtnInactivo = document.querySelector('#btnInactivo');
      elbtnInactivo.classList.remove("Activo");
    var peticion = $.ajax({
        /*BUG se copia y pega el ajax de CargarLista desde aqui hasta
          donde se debe incluir el llamado al php creado por ustedes
        */

        url: "services/selectUsuario.php",
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

          /* BUG NO TOCAR */
          var nArrayLength = response.length;
          for (var i = 0; i < nArrayLength; i++) {
            var sBuscar     = txtBuscar.value.toLowerCase();
            var sElemento   = cleanUpSpecialChars(response[i][sPorBuscar].toLowerCase());
            if (sElemento.indexOf(sBuscar) > -1) {
                /* BUG aca adentro se copia todo lo que esta dentro del while de CargarLista
                  SOLO LO QUE ESTA DENTRO DEL FOR*/
                var elFila = document.createElement('tr');
                  var elNombre = document.createElement('td');
                  var txtelNombre = document.createTextNode(response[i]['primer_nombre']);

                  var elSegundoNombre = document.createElement('td');
                  var txtelSegundoNombre = document.createTextNode(response[i]['segundo_nombre']);

                  var TipoUsuario;
                  if (response[i]['tipo'] == 1) {
                    TipoUsuario = "Administrador";
                  }
                  if (response[i]['tipo'] == 2) {
                    TipoUsuario = "Serv. Al Cliente";
                  }
                  if (response[i]['tipo'] == 3) {
                    TipoUsuario = "Cajero";
                  }
                  if (response[i]['tipo'] == 4) {
                    TipoUsuario = "Cliente";
                  }
                  var elTipoUsuario = document.createElement('td');
                  var txtelTipoUsuario = document.createTextNode(TipoUsuario);


                  var elModificar   = document.createElement('td');
                    elModificar.classList.add("botonesLista");
                    elModificar.value = response[i]['identificacion'];
                    elModificar.setAttribute('onclick', "Modificar(this.value)");
                    var txtModificar  = document.createElement('i');
                      txtModificar.classList.add('fa');
                      txtModificar.classList.add('fa-pencil-square-o');
                      txtModificar.classList.add('fa-2x');
                  var elEliminar   = document.createElement('td');
                    elEliminar.classList.add("botonesLista");
                    elEliminar.value = response[i]['identificacion'];
                    elEliminar.setAttribute('onclick', "Eliminar(this.value)");
                    var txtEliminar  = document.createElement('i');
                      txtEliminar.classList.add('fa');
                      txtEliminar.classList.add('fa-trash');
                      txtEliminar.classList.add('fa-2x');

                  elNombre.appendChild(txtelNombre);
                  elFila.appendChild(elNombre);

                  elSegundoNombre.appendChild(txtelSegundoNombre);
                  elFila.appendChild(elSegundoNombre);

                  elTipoUsuario.appendChild(txtelTipoUsuario);
                  elFila.appendChild(elTipoUsuario);

                  elModificar.appendChild(txtModificar);
                  elFila.appendChild(elModificar);
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
        /*BUG se copia y pega el ajax de CargarLista desde aqui hasta
          donde se debe incluir el llamado al php creado por ustedes
        */

        url: "services/selectUsuario.php",
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

          /* BUG NO TOCAR */
          var nArrayLength = response.length;
          for (var i = 0; i < nArrayLength; i++) {
            var sBuscar     = txtBuscar.value.toLowerCase();
            var sElemento   = cleanUpSpecialChars(response[i][sPorBuscar].toLowerCase());
            if (sElemento.indexOf(sBuscar) > -1) {
            /* BUG aca adentro se copia todo lo que esta dentro del while de CargarLista
              SOLO LO QUE ESTA DENTRO DEL FOR*/
            var elFila = document.createElement('tr');
              var elNombre = document.createElement('td');
              var txtelNombre = document.createTextNode(response[i]['primer_nombre']);

              var elSegundoNombre = document.createElement('td');
              var txtelSegundoNombre = document.createTextNode(response[i]['segundo_nombre']);

              var TipoUsuario;
              if (response[i]['tipo'] == 1) {
                TipoUsuario = "Administrador";
              }
              if (response[i]['tipo'] == 2) {
                TipoUsuario = "Serv. Al Cliente";
              }
              if (response[i]['tipo'] == 3) {
                TipoUsuario = "Cajero";
              }
              if (response[i]['tipo'] == 4) {
                TipoUsuario = "Cliente";
              }
              var elTipoUsuario = document.createElement('td');
              var txtelTipoUsuario = document.createTextNode(TipoUsuario);


              var elModificar   = document.createElement('td');
                elModificar.classList.add("botonesLista");
                elModificar.value = response[i]['identificacion'];
                elModificar.setAttribute('onclick', "Modificar(this.value)");
                var txtModificar  = document.createElement('i');
                  txtModificar.classList.add('fa');
                  txtModificar.classList.add('fa-pencil-square-o');
                  txtModificar.classList.add('fa-2x');
              var elEliminar   = document.createElement('td');
                elEliminar.classList.add("botonesLista");
                elEliminar.value = response[i]['identificacion'];
                elEliminar.setAttribute('onclick', "Activar(this.value)");
                var txtEliminar  = document.createElement('i');
                  txtEliminar.classList.add('fa');
                  txtEliminar.classList.add('fa-check');
                  txtEliminar.classList.add('fa-2x');

              elNombre.appendChild(txtelNombre);
              elFila.appendChild(elNombre);

              elSegundoNombre.appendChild(txtelSegundoNombre);
              elFila.appendChild(elSegundoNombre);

              elTipoUsuario.appendChild(txtelTipoUsuario);
              elFila.appendChild(elTipoUsuario);

              elModificar.appendChild(txtModificar);
              elFila.appendChild(elModificar);
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
  /*BUG aca se cargan los datos en los campos del seccion #ModificarDatos tabla,
  el ajax funciona de esta forma deben completar los campos haciendo una consulta
  con el id almacenado en la linea
    elModificar.value = response[i]['identificacion']; de este ejemplo
  */
  var peticion = $.ajax({
      url: "services/selectUsuario.php",
      type: "POST",
      data: {},
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      dataType: 'json',
      async: false,
      timeout: 30000,

      success: function(response){
        console.log(response);
        //Cargar datos de cliente
        document.querySelector("#txtPrimerNombre").value          = response[0]['primer_nombre'];
        document.querySelector("#txtSegundoNombre").value         = response[0]['segundo_nombre'];
        document.querySelector("#txtPrimerApellido").value        = response[0]['primer_apellido'];
        document.querySelector("#txtSegundoApellido").value       = response[0]['segundo_apellido'];
        document.querySelector("#txtNacionalidad").value          = response[0]['nacionalidad'];
        document.querySelector("#txtCedula").value                = response[0]['identificacion'];
        document.querySelector("#txtFechaNacimiento").value       = response[0]['fecha_nacimiento'];
        var sGenero                                               = response[0]['genero'];


        var elGenero = document.getElementsByName("GeneroRedondo");
        for(var i=0; i < elGenero.length;i++){
      		if(elGenero[i].value == sGenero){
      			elGenero[i].checked = true;
      		}
      	}

        document.querySelector("#txtTelefonoPrincipal").value     = response[0]['numero_telefono_primario'];
        document.querySelector("#txtTelefonoSecundario").value    = response[0]['numero_telefono_secundario'];

        var elFotoPefil = document.querySelector("#ImagenPerfilUsuario");
        if (elFotoPefil) {
          if (ImageExist(response[0]['foto_perfil'])) {
            elFotoPefil.style.backgroundImage = "url(" + response[0]['foto_perfil'] + ")";
            elFotoPefil.style.backgroundRepeat  = "no-repeat";
            elFotoPefil.style.backgroundSize = "cover";
          }
        }
        document.querySelector("#txtCorreoElectronico").value     = response[0]['correo_electronico'];

      },
      error: function(request, error) {
          alert(error);
      }
  });
}
/*NOTE NO TOCAR */
function Eliminar (idElemento) {
  swal({
		title: "¿Está seguro?",
		text: "Si desactiva este elemento los usuarios no podran accesarlo.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "Si, eliminarlo",
		cancelButtonText: "No, cancelar",
		closeOnConfirm: false
	},
		/*Se muestra un mensaje de exito y se realiza el llamado de los procedimientos necesarios */
	function(){
    EliminarElemento(idElemento);

		swal("Transacción realizada", "El elemento se encuentra deshabilitado.", "success");
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
/*NOTE NO TOCAR */
function Activar (idElemento) {
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
	function(){
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
/*NOTE SI TOCAR */
function Agregar() {
  /*NOTE aca se redirige a la seccion de Agregar dependiendo del elemento */
  window.location = ""; //Se coloca la URL
}

document.querySelector("#ModificarDatos").addEventListener("click", function(el) {
  var elemento = document.querySelector("#ModificarDatos");
  if (el.target == elemento) {
    elemento.style.display = "none";
  }
});

/*NOTE a partir del id del evento se crea un procedimento almacenado con el nombre
  cambiar_estado_"nombre de la tabla" el cual recibe p_id y p_estado
  con el siguente querry update "tabla" set estado = p_estado where id = p_id

  en la funcion del ajax se debe enviar el idElemento ya capturado y el estado que para
  desactivar por defecto es 0
*/
function EliminarElemento (idElemento) {

}
  /*NOTE se deben capturar los datos en variables y hacer una peticion para enviarlos y modificarlos
    los datos que no pueden estar en un input se asumen
  */
function ModificarElemento () {
  var idElemento = localStorage.setItem('idElemento');
  localStorage.clear();
  /*NOTE NO TOCAR
  */
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
/*NOTE a partir del id del evento se crea un procedimento almacenado con el nombre
  cambiar_estado_"nombre de la tabla" el cual recibe p_id y p_estado
  con el siguente querry update "tabla" set estado = p_estado where id = p_id

  en la funcion del ajax se debe enviar el idElemento ya capturado y el estado que para
  activar por defecto es 1
*/
function ActivarElemento (idElemento) {

}
