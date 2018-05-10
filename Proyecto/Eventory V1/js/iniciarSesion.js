elCorreoElectronico=document.querySelector('#correoElectronico');
elContrasena=document.querySelector('#contrasena');

elBotonIniciarSesion = document.querySelector("#IniciarSesion");
elBotonIniciarSesion.addEventListener("click", IniciarSesion);

sessionStorage.clear();

//Se declaran los array para los valores a obtener de cada usuario
var aSesionNombre=  [];
var aSesionNombre2= [];
var aSesionApellido= [];
var aSesionApellido2= [];
var aSesionNacionalidad= [];
var aSesionNumeroIdentificacion= [];
var aSesionNacimiento= [];
var aSesionGenero= [];
var aSesionTelefono = [];
var aSesionTelefono2= [];
var aSesionCorreoElectronico= [];
var aSesionContrasena= [];
var	aSesionTipo= [];
var aSesionEstado= [];
var aSesionIdTienda= [];
var aFotoPerfil= [];

//Se recupera del local storage los valores de los usuarios
if(localStorage.getItem('primer_nombre') != null){
	aSesionNombre = 								JSON.parse(localStorage.getItem('primer_nombre'));
	aSesionNombre2 = 								JSON.parse(localStorage.getItem('segundo_nombre'));
	aSesionApellido = 							JSON.parse(localStorage.getItem('primer_apellido'));
	aSesionApellido2 = 							JSON.parse(localStorage.getItem('segundo_apellido'));
	aSesionTelefono = 							JSON.parse(localStorage.getItem('numero_telefono'));
	aSesionTelefono2 = 							JSON.parse(localStorage.getItem('numero_telefono2'));
	aSesionNacionalidad = 					JSON.parse(localStorage.getItem('nacionalidad'));
	aSesionNumeroIdentificacion = 	JSON.parse(localStorage.getItem('numero_identificacion'));
	aSesionNacimiento = 						JSON.parse(localStorage.getItem('fecha_nacimiento'));
	aSesionGenero = 								JSON.parse(localStorage.getItem('genero'));
	aSesionCorreoElectronico = 			JSON.parse(localStorage.getItem('correo_electronico'));
	aSesionContrasena = 						JSON.parse(localStorage.getItem('contrasena'));
	//aSesionFotoPerfil = JSON.parse(localStorage.getItem('foto_pefil'));
 	aSesionTipoUsuario = 						JSON.parse(localStorage.getItem('tipo_usuario'));
	aSesionIdTienda = 							JSON.parse(localStorage.getItem('id_tienda'));
	aFotoPerfil = 									JSON.parse(localStorage.getItem('foto_perfil'));
	aSesionEstado = 								JSON.parse(localStorage.getItem('estado_usuario'));
}



function IniciarSesion () {
	//Se obtienen los valores de los input de texto
	var sCorreoElectronico=elCorreoElectronico.value;
	var sContrasena =elContrasena.value;

	//Se declaran las variables donde se almacenaran los valores de los usuarios
	var sSesionNombre;
	var sSesionNombre2;
	var sSesionApellido;
	var sSesionApellido2;
	var sSesionNacionalidad;
	var nSesionIdentificacion;
	var sSesionNacimiento;
	var sSesionGenero;
	var nSesionTelefono;
	var nSesionTelefono2;
	var sSesionCorreoElectronico;
	var sSesionContrasena;
	var nSesionTipo;
	var nSesionEstado;
	var nSesionIdTienda;
	var imgFotoPerfil;


	//Se obtiene la cantidad de usuarios
	var length=aSesionCorreoElectronico.length;


	var bError = false;
	for (var i = 0; i < length; i++) {
		//Se comprueba que la contrasena coincida
		if (aSesionContrasena[i]==sContrasena) {
			//Se comprueba que el correo electronico coincida
			if (aSesionCorreoElectronico[i]==sCorreoElectronico) {
				//Se comprueba que el usuario no este desactivado
				if(aSesionEstado!=0){
					sSesionNombre  = aSesionNombre[i];
					sSesionNombre2   = aSesionNombre2[i];
					sSesionApellido  = aSesionApellido[i];
					sSesionApellido2  = aSesionApellido2[i];
					sSesionNacionalidad = aSesionNacionalidad[i];
					nSesionIdentificacion = aSesionNumeroIdentificacion[i];
					sSesionNacimiento  = aSesionNacimiento[i];
					sSesionGenero  = aSesionGenero[i];
					nSesionTelefono =aSesionTelefono [i];
					nSesionTelefono2   = aSesionTelefono2[i];
					sSesionCorreoElectronico  = aSesionCorreoElectronico[i];
					sSesionContrasena  = aSesionContrasena[i];
					nSesionTipo = aSesionTipoUsuario[i];
					nSesionEstado = aSesionEstado[i];
					nSesionIdTienda  = aSesionIdTienda[i];
					imgFotoPerfil = aFotoPerfil[i];

					bError = true;
					break;
				} else {
					bError = false;
				}
			} else {
				bError = false;
			}
		} else {
			bError = false;
		}
	}
	if (bError == true) {
		if (nSesionTipo == 4) {
			window.location = "listarMisListas.html";
		} else {
			window.location = "listarMisListasAdmin.html";
		}
	} else {
		swal({
			title: "¡Error!",
			text: "La contraseña o el correo electrónico son incorrectos",
			type: "error",
			showCancelButton: false,
			confirmButtonColor: "red",
			confirmButtonText: "Continuar",
			closeOnConfirm: false
		});
	}

	var  aIdTiendas              = [];
	var  aNombreTiendas          = [];
	var  aTelefonoTiendas        = [];
	var  aCorreoTiendas          = [];
	var  aProvinciaTiendas       = [];
	var  aCantonTiendas          = [];
	var  aDistritoTiendas        = [];
	var  aImpuestoVentasTiendas  = [];
	var  aImpuestoValorTiendas   = [];
	var  aTipoTiendas            = [];
	var  aLatitudTiendas         = [];
	var  aLongitudTiendas        = [];
	var  aEstadoTiendas          = [];
	var  aIdAdministrador        = [];
	var  aLogoTienda			       = [];

	if(localStorage.getItem('id_tiendas_CU5').length != null) {
	   aIdTiendas =              JSON.parse(localStorage.getItem('id_tiendas_CU5'));
	   aNombreTiendas =          JSON.parse(localStorage.getItem('nombre_tiendas_CU5'));
	   aTelefonoTiendas =        JSON.parse(localStorage.getItem('telefono_tiendas_CU5'));
	   aCorreoTiendas =          JSON.parse(localStorage.getItem('correo_tiendas_CU5'));
	   aProvinciaTiendas =       JSON.parse(localStorage.getItem('provincia_tiendas_CU5'));
	   aCantonTiendas =          JSON.parse(localStorage.getItem('canton_tiendas_CU5'));
	   aDistritoTiendas =        JSON.parse(localStorage.getItem('distrito_tiendas_CU5'));
	   aImpuestoVentasTiendas =  JSON.parse(localStorage.getItem('impuesto_venta_tiendas_CU5'));
	   aImpuestoValorTiendas =   JSON.parse(localStorage.getItem('impuesto_valor_tiendas_CU5'));
	   aTipoTiendas =            JSON.parse(localStorage.getItem('tipo_tiendas_CU5'));
	   aLatitudTiendas=          JSON.parse(localStorage.getItem('latitud_tiendas_CU5'));
	   aLongitudTiendas=         JSON.parse(localStorage.getItem('longitud_tiendas_CU5'));
	   aEstadoTiendas=           JSON.parse(localStorage.getItem('estado_tiendas_CU5'));
	   aIdAdministrador=         JSON.parse(localStorage.getItem('id_administrador_CU5'));
		 aLogoTienda=         		 JSON.parse(localStorage.getItem('logo_tienda_CU5'));
	}
	var nSesionIdTiendas;
	var sSesionNombreTiendas;
	var nSesionTelefonoTiendas;
	var sSesionCorreoTiendas;
	var sSesionProvinciaTiendas;
	var sSesionCantonTiendas;
	var sSesionDistritoTiendas;
	var nSesionImpuestoVentasTiendas;
	var nSesionImpuestoValorTiendas;
	var sSesionTipoTiendas;
	var nSesionLatitudTiendas;
	var nSesionLongitudTiendas;
	var nSesionEstadoTiendas;
	var nSesionIdAdministrador;
	var imgLogoTienda;


	 if (nSesionTipo==1) {
	 	for (var i = 0; i < aIdTiendas.length; i++) {
	 		if (nSesionIdentificacion == aIdAdministrador[i]) {

	 			nSesionIdTienda=   aIdTiendas[i];
				sSesionNombreTiendas=   aNombreTiendas[i];
				nSesionTelefonoTiendas=   aTelefonoTiendas[i];
				sSesionCorreoTiendas=   aCorreoTiendas[i];
				sSesionProvinciaTiendas=   aProvinciaTiendas[i];
				sSesionCantonTiendas=   aCantonTiendas[i];
				sSesionDistritoTiendas=   aDistritoTiendas[i];
				nSesionImpuestoVentasTiendas=   aImpuestoVentasTiendas[i];
				nSesionImpuestoValorTiendas=   aImpuestoValorTiendas[i];
				sSesionTipoTiendas    =   aTipoTiendas[i];
				nSesionLatitudTiendas =   aLatitudTiendas[i];
				nSesionLongitudTiendas=   aLongitudTiendas[i];
				nSesionEstadoTiendas  =   aEstadoTiendas[i];
				nSesionIdAdministrador =  aIdAdministrador[i];
				imgLogoTienda = aLogoTienda[i];



	 		}
	 	}
	 }else{
			if (nSesionTipo != 4) {
			 	for (var i = 0; i < aIdTiendas.length; i++) {
			 		if (nSesionIdTienda == aIdTiendas[i]) {

			 			nSesionIdTienda=   aIdTiendas[i];
						sSesionNombreTiendas=   aNombreTiendas[i];
						nSesionTelefonoTiendas=   aTelefonoTiendas[i];
						sSesionCorreoTiendas=   aCorreoTiendas[i];
						sSesionProvinciaTiendas=   aProvinciaTiendas[i];
						sSesionCantonTiendas=   aCantonTiendas[i];
						sSesionDistritoTiendas=   aDistritoTiendas[i];
						nSesionImpuestoVentasTiendas=   aImpuestoVentasTiendas[i];
						nSesionImpuestoValorTiendas=   aImpuestoValorTiendas[i];
						sSesionTipoTiendas    =   aTipoTiendas[i];
						nSesionLatitudTiendas =   aLatitudTiendas[i];
						nSesionLongitudTiendas=   aLongitudTiendas[i];
						nSesionEstadoTiendas  =   aEstadoTiendas[i];
						nSesionIdAdministrador =  aIdAdministrador[i];
						imgLogoTienda	= aLogoTienda[i];
			 		}
			 	}
			}
	 }

		sessionStorage.setItem('sesion_cedula_cliente',nSesionIdentificacion);
		sessionStorage.setItem('sesion_primer_nombre',sSesionNombre);
		sessionStorage.setItem('sesion_segundo_nombre',sSesionNombre2);
		sessionStorage.setItem('sesion_primer_apellido',sSesionApellido);
		sessionStorage.setItem('sesion_segundo_apellido',sSesionApellido2);
		sessionStorage.setItem('sesion_numero_telefono',nSesionTelefono);
		sessionStorage.setItem('sesion_numero_telefono2',nSesionTelefono2);
		sessionStorage.setItem('sesion_fecha_nacimiento',sSesionNacimiento);
		sessionStorage.setItem('sesion_correo_electronico',sSesionCorreoElectronico);
		sessionStorage.setItem('sesion_contrasena',sSesionContrasena);
		sessionStorage.setItem('sesion_genero',sSesionGenero);
		sessionStorage.setItem('sesion_nacionalidad',sSesionNacionalidad);
		sessionStorage.setItem('sesion_tipo_usuario',nSesionTipo);
		sessionStorage.setItem('sesion_estado_usuario',nSesionEstado);
		sessionStorage.setItem('sesion_foto_perfil',imgFotoPerfil);

		if (nSesionTipo != 4) {
			sessionStorage.setItem('sesion_id_tienda' ,           			 nSesionIdTienda);
			sessionStorage.setItem('sesion_nombre_tiendas_CU5',          sSesionNombreTiendas);
			sessionStorage.setItem('sesion_telefono_tiendas_CU5',        nSesionTelefonoTiendas);
			sessionStorage.setItem('sesion_correo_tiendas_CU5',          sSesionCorreoTiendas);
			sessionStorage.setItem('sesion_provincia_tiendas_CU5',       sSesionProvinciaTiendas);
			sessionStorage.setItem('sesion_canton_tiendas_CU5',          sSesionCantonTiendas);
			sessionStorage.setItem('sesion_distrito_tiendas_CU5',        sSesionDistritoTiendas);
			sessionStorage.setItem('sesion_impuesto_venta_tiendas_CU5',  nSesionImpuestoVentasTiendas);
			sessionStorage.setItem('sesion_impuesto_valor_tiendas_CU5',  nSesionImpuestoValorTiendas);
			sessionStorage.setItem('sesion_tipo_tiendas_CU5',            sSesionTipoTiendas);
			sessionStorage.setItem('sesion_latitud_tiendas_CU5',         nSesionLatitudTiendas);
			sessionStorage.setItem('sesion_longitud_tiendas_CU5',        nSesionLongitudTiendas);
			sessionStorage.setItem('sesion_estado_tiendas_CU5',          nSesionEstadoTiendas);
			sessionStorage.setItem('sesion_id_administrador_CU5',        nSesionIdAdministrador );
			sessionStorage.setItem('sesion_logo_tienda_CU5',        		 imgLogoTienda);
		}

// hacer sessionStorage de las tiendas
}
