
var elementoBotonRegistrar = document.querySelector('#btnRegistrar');

elementoBotonRegistrar.addEventListener('click', registrarEditorial);


 function registrarEditorial(){
   var sNombre        = document.querySelector('#txtNombre').value,
       sDirecion      = document.querySelector('#txtDirecion').value,
       nTelefono      = document.querySelector('#txtTelefono').value;
       nAnno          = document.querySelector('#txtAnno').value;
       sRepresentante = document.querySelector('#txtRepresentante').value;


   guardarInformacion(sNombre,sDirecion,nTelefono,nAnno,sRepresentante);

 }

 function guardarInformacion(pNombre,pDirecion,pTelefono,pAnno,pRepresentante){

   var peticion = $.ajax({
       url: "servicios/registrarEditorial.php",
       type: "post",
       data: {
              'nombre' : pNombre,
              'direcion' : pDirecion ,
              'telefono' : pTelefono,
              'anno' : pAnno,
              'representante' :pRepresentante
            },
       dataType: 'json',

       success: function(response){
         llenarTabla();
       },
       error: function(request, error) {
         alert(error);
       }
     });

 }
