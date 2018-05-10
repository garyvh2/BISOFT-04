
<?php
  require_once 'login.php';
	$conexion = new mysqli($host_name,$user_name,$password,$data_base);

  if($conexion->connect_error)die("Error al conectarse a la base de datos" . $conexion->connect_error);
  $conexion->set_charset("utf8");





  if(isset($_POST['nombre'])    &&
     isset($_POST['direcion'])  &&
     isset($_POST['telefono'])  &&
     isset($_POST['anno'])      &&
     isset($_POST['representante']) ){



		$nombre = $_POST['nombre'];
    $direcion = $_POST['direcion'];
		$editorial = $_POST['editorial'];
    $telefono = $_POST['telefono'];
		$anno = $_POST['anno'];
		$representante = $_POST['representante'];


		$sentencia_sql = "CALL pa_registrar_editoriales" ."('$nombre','$direcion','$telefono','$anno',$representante)";


		$result = $conexion->query($sentencia_sql);

    if(!$result)die("Fallo la conexión " . $conexion->error);

    echo json_encode($result);

  }




?>
