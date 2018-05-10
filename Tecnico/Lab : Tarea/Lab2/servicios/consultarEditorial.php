
<?php
  
  require_once 'login.php';
	$conexion = new mysqli($host_name,$user_name,$password,$data_base);

  if($conexion->connect_error)die($conexion->error);

  $conexion->set_charset("utf8");
	$sentencia_sql = "CALL pa_listar_editoriales";



	$result = $conexion->query($sentencia_sql);

  if(!$result)die("Fallo la conexión " . $conexion->error);

  $filas = array();


  while($registro = mysqli_fetch_assoc($result)) {

      $filas[] = $registro;

	}


echo json_encode($filas);


?>
