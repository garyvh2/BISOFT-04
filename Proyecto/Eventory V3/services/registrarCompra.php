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
  if(isset($_POST['id_reserva'])    &&
     isset($_POST['total'])         &&
     isset($_POST['subtotal'])      &&
     isset($_POST['fecha'])         &&
     isset($_POST['descuento'])     &&
     isset($_POST['impuesto'])      &&
     isset($_POST['cantidad'])      &&
     isset($_POST['estado'])        ){
      /*Se setean los valores obtenidos en variables */
    $id_reserva   = $_POST['id_reserva'];
    $total        = $_POST['total'];
    $subtotal     = $_POST['subtotal'];
    $fecha        = $_POST['fecha'];
    $descuento    = $_POST['descuento'];
    $impuesto     = $_POST['impuesto'];
    $cantidad     = $_POST['cantidad'];
    $estado       = $_POST['estado'];
    $id_tienda    = $_SESSION["id_tienda"];
      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_compra" ."('$id_reserva','$total','$subtotal','$fecha','$descuento','$impuesto','$cantidad','$id_tienda','$estado')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);

  }
?>
