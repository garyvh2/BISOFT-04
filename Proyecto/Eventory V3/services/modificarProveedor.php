<?php
  session_start();
  require_once 'login.php';
	$conexion = new mysqli($host_name,$user_name,$password,$data_base);

  if($conexion->connect_error)die("Error al conectarse a la base de datos" . $conexion->connect_error);
  $conexion->set_charset("utf8");

  if(isset($_POST['sNombre'])       &&
     isset($_POST['nTelefono'])     &&
     isset($_POST['nTelefono2'])    &&
     isset($_POST['dFechaInicio'])  ){



		$nombre = $_POST['sNombre'];
		$telefono1 = $_POST['nTelefono'];
		$telefono2 = $_POST['nTelefono2'];
		$fecha_inicio = $_POST['dFechaInicio'];
		$estado = $_POST['estado'];
		$id_tienda = $_SESSION['id_tienda'];
		$idElemento = $_POST['idElemento'];



		$sentencia_sql = "CALL update_proveedor" ."('$idElemento','$nombre','$telefono1','$telefono2','$fecha_inicio','$id_tienda','$estado')";


		$result = $conexion->query($sentencia_sql);

    if(!$result)die("Fallo la conexión " . $conexion->error);

    echo json_encode($result);

  }




?>
