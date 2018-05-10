<?php
		session_start();
	  require_once 'login.php';
		$conexion = new mysqli($host_name,$user_name,$password,$data_base);

		if($conexion->connect_error)die($conexion->connect_error);

		$conexion->set_charset("utf8");

		if(isset($_POST['id'])      &&
			 isset($_POST['estado'])){

		$id = $_POST['id'];
		$estado = $_POST['estado'];

		$sentencia_sql ="CALL cambiar_estado_tipo_producto"	."('$id','$estado')";
		$result = $conexion->query($sentencia_sql);
	}
?>
