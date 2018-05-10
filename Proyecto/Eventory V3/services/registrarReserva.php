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
    /*Se comprueba que las variables necesarias se encuentren seteadas */
  if(isset($_POST['id_producto'])     &&
     isset($_POST['id_lista_evento']) &&
     isset($_POST['cantidad'])        &&
     isset($_POST['estado'])          ){
      /*Se setean los valores obtenidos en variables */
    $id_producto    = $_POST['id_producto'];
    $id_lista       = $_POST['id_lista_evento'];
    $id_usuario     = $_SESSION['id_usuario'];
    $cantidad       = $_POST['cantidad'];
    $estado         = $_POST['estado'];

      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_reserva" ."('$id_producto','$id_lista','$id_usuario','$cantidad','$estado')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);
    $filas = array();
    /*Se recorren los elementos de la coleccion de datos en result */
    while($registro = mysqli_fetch_assoc($result)) {
        /*se inserta cada elemento en filas */
      $filas[] = $registro;
    }
    /*Se Hace un echo del resultado */
    echo json_encode($filas);
  }
?>
