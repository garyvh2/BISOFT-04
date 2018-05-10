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
  if(isset($_POST['pnCedula'])        &&
     isset($_POST['psNombre'])          &&
     isset($_POST['psDireccion'])        &&
     isset($_POST['psTelefono'])        &&
     isset($_POST['pnAnno'])        &&
     isset($_POST['psRepresentante'])          ){
      /*Se setean los valores obtenidos en variables */
    $cedula   = $_POST['pnCedula'];
    $nombre   = $_POST['psNombre'];
    $direccion     = $_POST['psDireccion'];
    $telefono      = $_POST['psTelefono'];
    $anno     = $_POST['pnAnno'];
    $representate      = $_POST['psRepresentante'];
      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_editorial" ."('$nombre','$direccion','$telefono','$anno','$representate','$cedula')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);

  }
?>
