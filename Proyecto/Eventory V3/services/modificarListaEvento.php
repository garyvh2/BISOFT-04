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
  if(isset($_POST['id_lista'])        &&
     isset($_POST['sNombreEvento'])   &&
     isset($_POST['dFechaEvento'])    &&
     isset($_POST['bEnvio'])          &&
     isset($_POST['nTipoEvento'])     &&
     isset($_POST['nLatitud'])        &&
     isset($_POST['nLongitud'])       &&
     isset($_POST['nEstado'])         ){
      /*Se setean los valores obtenidos en variables */
    $id_evento    = $_POST['id_lista'];
    $nombre       = $_POST['sNombreEvento'];
    $fecha        = $_POST['dFechaEvento'];
    $envio        = $_POST['bEnvio'];
    $tipo_evento  = $_POST['nTipoEvento'];
    $latitud      = $_POST['nLatitud'];
    $longitud     = $_POST['nLongitud'];
    $id_asociado  = $_SESSION["id_usuario"];
    $id_tienda    = $_SESSION["id_tienda"];
    $estado       = $_POST['nEstado'];
      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL update_lista_evento" ."('$id_evento','$nombre','$fecha','$envio','$latitud','$longitud','$id_asociado','$tipo_evento','$id_tienda','$estado')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);

  }
?>
