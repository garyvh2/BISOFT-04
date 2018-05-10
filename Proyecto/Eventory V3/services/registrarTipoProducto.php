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
  if(isset($_POST['psNombreProducto'])      &&
     isset($_POST['psDescripcionProducto']) &&
     isset($_POST['pbPerecederoProducto'])         &&
     isset($_POST['pdFechaCaducidad'])         ){
      /*Se setean los valores obtenidos en variables */
    $nombre      = $_POST['psNombreProducto'];
    $descripcion  = $_POST['psDescripcionProducto'];
    $perecedero    = $_POST['pbPerecederoProducto'];
    $fecha_caducidad       = $_POST['pdFechaCaducidad'];
    $estado      = 1;
    $id_tienda  = $_SESSION['id_tienda'];
      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_tipo_producto" ."('$nombre','$descripcion','$perecedero','$fecha_caducidad','$id_tienda','$estado')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);

  }
?>
