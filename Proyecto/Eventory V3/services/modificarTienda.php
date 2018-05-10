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

  if(isset($_POST['nIdAdmin'])){


    /*Se setean los valores obtenidos en variables */
    $cedula            = $_POST['nCedula'];
    $logoTienda        = $_POST['sLogoTienda'];
    $nombreTienda      = $_POST['sNombre'];
    $telefonoTienda    = $_POST['nTelefono'];
    $correoElectronico = $_POST['sCorreo'];
    $provincia         = $_POST['sProvincia'];
    $canton            = $_POST['sCanton'];
    $distrito          = $_POST['sDistrito'];
    $impuestoVenta     = $_POST['nImpuestoVenta'];
    $tipoTienda        = $_POST['sTipo'];
    $latitud           = $_POST['nLatitud'];
    $longitud          = $_POST['nLongitud'];
    $estado            = $_POST['nEstado'];
    $id_tienda         = $_SESSION["id_tienda"];



      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL update_tienda" ."('$id_tienda','$cedula','$logoTienda','$nombreTienda','$telefonoTienda','$correoElectronico','$provincia','$canton','$distrito','$impuestoVenta','$tipoTienda','$latitud','$longitud','$estado')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);
      /*Se comprueba que la ejecucion de la secuencia haya sido correcta*/
    if(!$result)die("Fallo la conexión " . $conexion->error);
      /*Se Hace un echo del resultado */
      //echo json_encode($result);*/
  }
?>