/****************************************************************************
  Autor: Alejandro Castillo
  Fecha de creacion: 19/07/2016
  Fecha de modificacion: 1/08/2016

  EVENTORY APP
  2016

  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.

*****************************************************************************/


   function validar(vThis){
  /*Variables para los elementos del formulario*/
     	var elTxtPrimerNombre=document.querySelector('#txtPrimerNombre'),
     	 elTxtSegundoNombre=document.querySelector('#txtSegundoNombre'),
     	 elTxtPrimerApellido=document.querySelector('#txtPrimerApellido'),
        elTxtSegundoApellido=document.querySelector('#txtSegundoApellido'),
        elTxtNacionalidad=document.querySelector('#txtNacionalidad'),
        elTxtCedula=document.querySelector('#txtCedula'),
        elTxtFechaNacimiento=document.querySelector('#txtFechaNacimiento'),
        elTxtGenero=document.getElementsByName('GeneroRedondo'),
        elTxtTelefonoPrincipal=document.querySelector('#txtTelefonoPrincipal'),
        elTxtTelefonoSecundario=document.querySelector('#txtTelefonoSecundario'),
        elTxtCorreoElectronico=document.querySelector('#txtCorreoElectronico'),
        elTxtContrasena=document.querySelector('#txtContrasena'),
        elTxtContrasena2=document.querySelector('#txtContrasena2'),
        elRadioBtnTipoUsuario=document.getElementsByName('tipoUsuario');
      var  elcbxJuridico         = document.querySelector("#chkJuridico");

       /*Variables para los valores que estan dentro de cada uno de los elementos del formulario*/

       var sPrimerNombre = elTxtPrimerNombre.value,
        sSegundoNombre = elTxtSegundoNombre.value,
        sPrimerApellido = elTxtPrimerApellido.value,
        sSegundoApellido = elTxtSegundoApellido.value,
        sNacionalidad = elTxtNacionalidad.value,
        nCedula = Number(elTxtCedula.value),
        dFechaNacimiento = txtFechaNacimiento.value,
        nTelefonoPrincipal = Number(elTxtTelefonoPrincipal.value),
        nTelefonoSecundario = Number(elTxtTelefonoSecundario.value),
        sCorreoElectronico = elTxtCorreoElectronico.value,
        sContrasena = elTxtContrasena.value,
        sContrasena2 = elTxtContrasena2.value;
        if (elcbxJuridico.checked == true) {
           var juridico = 1;
        } else {
           var juridico = 0;
        }
        var sImagePath;

        /*****************************************************************************
          Se realiza la subida de la imagen
        *****************************************************************************/
        $.ajax({
        	    url			: "services/imageUploader.php?path=../imgs/uploads/foto_perfil/",
        	    type		: "POST",
        	    data		: new FormData(vThis),
        	    contentType	: false,
        	    cache		: false,
        	    processData	: false,
        	    async: false,
        	    timeout: 30000,

        	 	success: function(data) {
        	      sImagePath = data.replace('../','');
        	    },
        	    error: function(request, cerror) {
        	      alert(cerror);
        	    }
          	});

        for (var i = 0; i < elRadioBtnTipoUsuario.length; i++) {
          if (elRadioBtnTipoUsuario[i].checked){
              var ntipoUsuario = Number(elRadioBtnTipoUsuario[i].value);
              break;
          }
        }
        for (var i = 0; i < elTxtGenero.length; i++) {
          if (elTxtGenero[i].checked){
              var sGenero = elTxtGenero[i].value;
              break;
          }
        }


        	if (sContrasena == sContrasena2) {
            var peticion = $.ajax({
                url: "services/checkCorreoNuevo.php",
                type: "POST",
                data: {
                  'sCorreoElectronico' : sCorreoElectronico
                },
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                dataType: 'json',

                success: function(response){
                  console.log(response);
                  if (Number(response[0]['disponible'])== 1) {
              			registrar(nCedula,sImagePath,sPrimerNombre,sSegundoNombre,sPrimerApellido,sSegundoApellido,sNacionalidad,dFechaNacimiento,sGenero,sCorreoElectronico,nTelefonoPrincipal,nTelefonoSecundario,sContrasena,ntipoUsuario,juridico);

                  } else {
                    swal({
              				title: "Error!",
              				text: "Este correo electrónico ya se encuentra registrado.",
              				type: "error",
              				showCancelButton: false,
              				confirmButtonColor: "red",
              				confirmButtonText: "Continuar",
              				closeOnConfirm: false
              			});
                  }
                },
                error: function(request, error) {
                    alert(error);
                }
            });
        	} else {
        		swal({
        			title: "Error!",
        			text: "Las contraseñas no coinciden.",
        			type: "error",
        			showCancelButton: false,
        			confirmButtonColor: "red",
        			confirmButtonText: "Continuar",
        			closeOnConfirm: false
        		});
        	}
   		return false;
   }

   function registrar(pnCedula,psImagePath,psPrimerNombre,psSegundoNombre,psPrimerApellido,psSegundoApellido,psNacionalidad,
     pdFechaNacimiento,psGenero,psCorreoElectronico,pnTelefonoPrincipal,pnTelefonoSecundario,psContrasena,pntipoUsuario,juridico){
       /*****************************************************************************
         Se realiza la subida de la informacion a la base de datos
       *****************************************************************************/

       var peticion = $.ajax({
         url: "services/registrarUsuariosPorAdmin.php",
         type: "POST",
         data: {
                'nCedula'           : pnCedula,
                'psImagePath'       : psImagePath,
                'sPrimerNombre'     : psPrimerNombre,
                'sSegundoNombre'    : psSegundoNombre,
                'sPrimerApellido'   : psPrimerApellido,
                'sSegundoApellido'  : psSegundoApellido,
                'sNacionalidad'     : psNacionalidad,
                'dFechaNacimiento'  : pdFechaNacimiento,
                'sGenero'           : psGenero,
                'sCorreoElectronico': psCorreoElectronico,
                'nTelefonoPrincipal': pnTelefonoPrincipal,
                'nTelefonoSecundario' : pnTelefonoSecundario,
                'sContrasena'       : psContrasena,
                'ntipoUsuario'      : pntipoUsuario,
                'juridico'          : juridico
              },
         success: function(){
           swal({
             title: "La información fue ingresada correctamente",
             text: "Los datos del perfil han sido actualizados.",
             type: "success",
             showCancelButton: false,
             confirmButtonColor: "green",
             confirmButtonText: "Continuar",
             closeOnConfirm: false
          });
         },
         error: function(request,cerror) {
           alert(cerror);
         }
       });
   }
