/****************************************************************************
  Autor: Alejandro Castillo
  Fecha de creacion: 19/07/2016
  Fecha de modificacion: 1/08/2016

  EVENTORY APP
  2016

  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.

*****************************************************************************/
var TipoUsuarios = document.getElementsByName("tipoUsuario");
TipoUsuarios.forEach(function(item, index){
  item.addEventListener("change", function(){
    var  chkJuridico         = document.querySelector("#chkJuridico");
    if (item.checked == true) {
      if (item.value != 4) {
        chkJuridico.checked = false;
        chkJuridico.disabled = true;
        checkboxJuridico(chkJuridico);
      } else {
        chkJuridico.checked = false;
        chkJuridico.disabled = false;
        checkboxJuridico(chkJuridico);
      }
    }
  });

});

function checkboxJuridico (el) {
  if (el.checked == true) {
    var txtPrimerNombre       = ReturnElement(document.querySelector('#txtPrimerNombre').parentNode.childNodes, "LABEL");
    txtPrimerNombre.innerHTML = "Nombre de empresa";

    var txtSegundoNombre      = document.querySelector('#txtSegundoNombre');
    txtSegundoNombre.parentNode.style.opacity  = ".4";
    txtSegundoNombre.setAttribute("readonly", "");
    txtSegundoNombre.value= " ";
    ReturnElement(document.querySelector('#txtSegundoNombre').parentNode.childNodes, "LABEL").classList.add("LabelActivo");

    var txtPrimerApellido     = document.querySelector('#txtPrimerApellido');
    txtPrimerApellido.parentNode.style.opacity  = ".4";
    txtPrimerApellido.setAttribute("readonly", "");
    txtPrimerApellido.value= " ";
    ReturnElement(document.querySelector('#txtPrimerApellido').parentNode.childNodes, "LABEL").classList.add("LabelActivo");

    var txtSegundoApellido    = document.querySelector('#txtSegundoApellido');
    txtSegundoApellido.parentNode.style.opacity  = ".4";
    txtSegundoApellido.setAttribute("readonly", "");
    txtSegundoApellido.value= " ";
    ReturnElement(document.querySelector('#txtSegundoApellido').parentNode.childNodes, "LABEL").classList.add("LabelActivo");

    var txtNacionalidad       = ReturnElement(document.querySelector('#txtNacionalidad').parentNode.childNodes, "LABEL");
    txtNacionalidad.innerHTML = "Origen";

    var txtCedula             = ReturnElement(document.querySelector('#txtCedula').parentNode.childNodes, "LABEL");
    txtCedula.innerHTML = "Cédula jurídica";

    var txtFechaNacimiento    = ReturnElement(document.querySelector('#txtFechaNacimiento').parentNode.childNodes, "LABEL");
    txtFechaNacimiento.innerHTML = "Fecha de inauguración";

    var txtInternegero    = document.querySelector('#txtInternegero');
    txtInternegero.parentNode.style.opacity  = ".4";
    txtInternegero.disabled = true;
    var txtMujer          = document.querySelector('#txtMujer');
    txtMujer.parentNode.style.opacity  = ".4";
    txtMujer.disabled = true;
    var txtHombre         = document.querySelector('#txtHombre');
    txtHombre.parentNode.childNodes[5].classList = "fa fa-building fa-2x";
    ReturnElement(document.querySelector('#txtHombre').parentNode.childNodes, "H4").innerHTML = "Empresa";



    var SubirFoto             = ReturnElement(document.querySelector('#SubirFoto').parentNode.childNodes);
  } else {
    var txtPrimerNombre       = ReturnElement(document.querySelector('#txtPrimerNombre').parentNode.childNodes, "LABEL");
    txtPrimerNombre.innerHTML = "Nombre";

    var txtSegundoNombre      = document.querySelector('#txtSegundoNombre');
    txtSegundoNombre.parentNode.style.opacity  = "1";
    txtSegundoNombre.removeAttribute("readonly", "");
    txtSegundoNombre.value= "";
    ReturnElement(document.querySelector('#txtSegundoNombre').parentNode.childNodes, "LABEL").classList.remove("LabelActivo");

    var txtPrimerApellido     = document.querySelector('#txtPrimerApellido');
    txtPrimerApellido.parentNode.style.opacity  = "1";
    txtPrimerApellido.removeAttribute("readonly", "");
    txtPrimerApellido.value= "";
    ReturnElement(document.querySelector('#txtPrimerApellido').parentNode.childNodes, "LABEL").classList.remove("LabelActivo");

    var txtSegundoApellido    = document.querySelector('#txtSegundoApellido');
    txtSegundoApellido.parentNode.style.opacity  = "1";
    txtSegundoApellido.removeAttribute("readonly", "");
    txtSegundoApellido.value= "";
    ReturnElement(document.querySelector('#txtSegundoApellido').parentNode.childNodes, "LABEL").classList.remove("LabelActivo");

    var txtNacionalidad       = ReturnElement(document.querySelector('#txtNacionalidad').parentNode.childNodes, "LABEL");
    txtNacionalidad.innerHTML = "País de origen";

    var txtCedula             = ReturnElement(document.querySelector('#txtCedula').parentNode.childNodes, "LABEL");
    txtCedula.innerHTML = "Número de identificación";

    var txtFechaNacimiento    = ReturnElement(document.querySelector('#txtFechaNacimiento').parentNode.childNodes, "LABEL");
    txtFechaNacimiento.innerHTML = "Fecha de nacimiento";

    var txtInternegero    = document.querySelector('#txtInternegero');
    txtInternegero.parentNode.style.opacity  = "1";
    txtInternegero.disabled = false;
    var txtMujer          = document.querySelector('#txtMujer');
    txtMujer.parentNode.style.opacity  = "1";
    txtMujer.disabled = false;
    var txtHombre         = document.querySelector('#txtHombre');
    txtHombre.parentNode.childNodes[5].classList = "fa fa-mars fa-2x";
    ReturnElement(document.querySelector('#txtHombre').parentNode.childNodes, "H4").innerHTML = "Hombre";

    var SubirFoto             = ReturnElement(document.querySelector('#SubirFoto').parentNode.childNodes, "LABEL");
  }
}
function ReturnElement(childNodes,element) {
  var length = childNodes.length;
  for (var i = 0; i < length; i++) {
    if (childNodes[i].nodeName == element) {
      return childNodes[i];
    }
  }
}


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
      		if (formatoDeContrasenna(sContrasena) == true) {
               var peticion = $.ajax({
                   url: "services/checkCorreoNuevo.php",
                   type: "POST",
                   data: {
                     'sCorreoElectronico' : sCorreoElectronico
                   },
                   contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                   dataType: 'json',

                   success: function(response){
                     if (Number(response[0]['disponible'])== 1) {
                 			registrar(nCedula,sImagePath,sPrimerNombre,sSegundoNombre,sPrimerApellido,sSegundoApellido,sNacionalidad,dFechaNacimiento,sGenero,sCorreoElectronico,nTelefonoPrincipal,nTelefonoSecundario,sContrasena,ntipoUsuario,juridico);

                     } else {
                       swal({
                 				title: "Error",
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
      				title: "Error",
      				text: "La contraseña no cumple con el formato adecuado (De 8 a 15 caracteres, incluyendo al menos una mayúscula, una minúscula y un número excluyendo caracteres especiales).",
      				type: "error",
      				showCancelButton: false,
      				confirmButtonColor: "red",
      				confirmButtonText: "Continuar",
      				closeOnConfirm: false
      			});
      		}
        	} else {
        		swal({
        			title: "Error",
        			text: "Las contraseñas no coinciden.",
        			type: "error",
        			showCancelButton: false,
        			confirmButtonColor: "red",
        			confirmButtonText: "Continuar",
        			closeOnConfirm: false
        		});
        	}
      checkboxJuridico(elcbxJuridico);
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
          $( '#Form' ).each(function(){
             this.reset();
          });
         },
         error: function(request,cerror) {
           alert(cerror);
         }
       });
   }
