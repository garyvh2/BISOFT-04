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

  if(isset($_POST['nCedJuridicaConvenio'])    &&
     isset($_POST['sNombreConvenio'])         &&
     isset($_POST['sDescripcionConvenio'])    &&
     isset($_POST['nDescuentoConvenio'])      ){
      /*Se setean los valores obtenidos en variables */
    $cedJuridicaConvenio       = $_POST['nCedJuridicaConvenio'];
    $nombreConvenio        = $_POST['sNombreConvenio'];
    $descripcionConvenio     = $_POST['sDescripcionConvenio'];
    $descuentoConvenio      = $_POST['nDescuentoConvenio'];
    $id_tienda          = $_SESSION['id_tienda'];

      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_convenio"."('$cedJuridicaConvenio','$nombreConvenio',
    '$descripcionConvenio','$descuentoConvenio','$id_tienda',1)";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);
  }
?>
