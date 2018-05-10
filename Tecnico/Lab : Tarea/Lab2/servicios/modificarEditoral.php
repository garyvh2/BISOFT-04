
<?php
  require_once 'login.php';
	$conexion = new mysqli($host_name,$user_name,$password,$data_base);

  if($conexion->connect_error)die("Error al conectarse a la base de datos" . $conexion->connect_error);
  $conexion->set_charset("utf8");

  if(isset($_POST['id'])        &&
     isset($_POST['nombre'])    &&
     isset($_POST['direccion'])  &&
     isset($_POST['telefono'])  &&
     isset($_POST['anno'])      &&
     isset($_POST['representante']) ){

    $id   = $_POST['id'];
    $nombre = $_POST['nombre'];
    $direcion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $anno = $_POST['anno'];
    $representante = $_POST['representante'];


		$sentencia_sql = "CALL pa_modificar_editorial" ."('$id','$nombre','$direcion','$telefono','$anno','$representante')";


		$result = $conexion->query($sentencia_sql);

    if(!$result)die("Fallo la conexión " . $conexion->error);

    echo json_encode($result);

  }




?>
