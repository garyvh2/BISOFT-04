
var id = getUrlVars()["id"],
    btnModificar = document.querySelector('#btnModificar');

obtenerEditorial(id);

btnModificar.addEventListener('click',modificar);

function modificar(){
  var sNombre        =  document.querySelector('#txtNombre').value,
      sDireccion     = document.querySelector('#txtDireccion').value,
      nTelefono      = document.querySelector('#txtTelefono').value,
      nAnno          = document.querySelector('#txtAnno').value,
      sRepresentante = document.querySelector('#txtRepresentante').value;

    guardarInformacion(id,sNombre,sDireccion,nTelefono,nAnno,sRepresentante);
}

function obtenerEditorial(pid){
  $.ajax({
            url: "servicios/buscarEditorial.php",
            type: "post",
            data: {
                    'id':pid
                   },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){
              document.querySelector('#txtNombre').value = response[0]['nombre'];
              document.querySelector('#txtDireccion').value = response[0]['direccion'];
              document.querySelector('#txtTelefono').value = response[0]['telefono'];
              document.querySelector('#txtAnno').value = response[0]['anno'];
              document.querySelector('#txtRepresentante').value = response[0]['representante'];
            },
            error: function(request, error) {
                alert(error);
            }
  });
}

function guardarInformacion(pId,pNombre,pDireccion,pTelefono,pAnno,pRepresentante){
  $.ajax({
            url: "servicios/modificarEditoral.php",
            type: "post",
            data: {
                    'id':            pId,
                    'nombre':        pNombre,
                    'direccion':     pDireccion,
                    'telefono':      pTelefono,
                    'anno':          pAnno,
                    'representante': pRepresentante
                   },
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: 'json',

            success: function(response){
                window.location.href = 'registrarEditorial.html';
            },
            error: function(request, error) {
                alert(error);
            }
  });
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}
