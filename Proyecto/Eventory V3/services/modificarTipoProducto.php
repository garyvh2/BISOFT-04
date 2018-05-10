<?php
  session_start();
  require_once 'login.php';
	$conexion = new mysqli($host_name,$user_name,$password,$data_base);

  if($conexion->connect_error)die("Error al conectarse a la base de datos" . $conexion->connect_error);
  $conexion->set_charset("utf8");

  if(isset($_POST['idElemento'])){

    $id                 = $_POST['idElemento'];
		$nombre             = $_POST['nombre'];
		$descripcion        = $_POST['descripcion'];
    $fecha_vencimiento  = $_POST['fecha_vencimiento'];
		$precedero          = $_POST['precedero'];
    $id_tienda          = $_SESSION['id_tienda'];
    $estado             = $_POST['estado'];

		$sentencia_sql      = "CALL update_tipo_producto" ."('$id','$nombre','$descripcion','$precedero','$fecha_vencimiento','$id_tienda','$estado')";

		$result = $conexion->query($sentencia_sql);

  }
?>
