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
  if(isset($_POST['total'])          &&
     isset($_POST['subtotal'])        &&
     isset($_POST['descuento'])     &&
     isset($_POST['comprador'])          ){
      /*Se setean los valores obtenidos en variables */
    $total      = $_POST['total'];
    $subtotal     = $_POST['subtotal'];
    $descuento  = $_POST['descuento'];
    $comprador       = $_POST['comprador'];
      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_compra" ."('$descuento','$total','$subtotal','$comprador')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);

  }
?>
