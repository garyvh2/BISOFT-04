<?php
  session_start();
  /*Se obtienen los datos de conexion */
  require_once 'login.php';
  /*Se declara la conexion con la base de datos */
  $conexion = new mysqli($host_name,$user_name,$password,$data_base);
  /*Si la conexion falla termina la ejecucion */
  if($conexion->connect_error)die($conexion->connect_error);
  /*Se setea la coleccion de caracteres a utf8 */
  $conexion->set_charset("utf8");
  $id_tienda = $_SESSION['id_tienda'];
  /*Se comprueba que las variables necesarias se encuentren seteadas */
  $sentencia_sql = "CALL listar_usuarios_por_juridico" . "('$id_tienda')";
  /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
  $result = $conexion->query($sentencia_sql);
  /*Se comprueba que la ejecucion de la secuencia haya sido correcta*/
  if(!$result)die("Fallo la conexión " . $conexion->error);
  /*Se declara un array */
  $filas = array();
  /*Se recorren los elementos de la coleccion de datos en result */
  while($registro = mysqli_fetch_assoc($result)) {
      /*se inserta cada elemento en filas */
    $filas[] = $registro;
  /*Se Hace un echo del resultado */
  }
  echo json_encode($filas);
?>
