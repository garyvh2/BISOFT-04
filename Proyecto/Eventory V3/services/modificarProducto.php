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

  if(isset($_POST['idElemento'])){
      /*Se setean los valores obtenidos en variables */
    $id                 = $_POST['idElemento'];
    $id_producto            = $_POST['id_producto'];
    $nombre         = $_POST['nombre'];
    $descripcion            = $_POST['descripcion'];
    $precio_unitario     = $_POST['precio_unitario'];
    $marca          = $_POST['marca'];
    $cantidad   = $_POST['ncantidad'];
    $id_tipo_producto              = $_POST['id_tipo_producto'];
    $id_proveedor   = $_POST['id_proveedor'];
    $estado            = $_POST['estado'];
    $sImagePath = $_POST['sImagePath'];
    $id_tienda = $_SESSION['id_tienda'];

      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL update_producto" ."('$id','$id_producto','$sImagePath','$nombre','$descripcion','$precio_unitario','$marca','$cantidad','$id_proveedor','$id_tipo_producto','$id_tienda','$estado')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);

  }
?>
