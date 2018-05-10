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

  if(isset($_POST['sNombreEvento']) &&
     isset($_POST['dFechaEvento'])  &&
     isset($_POST['nTipoEvento'])   ){

    /*Se setean los valores obtenidos en variables */
    $nombreEvento =$_POST['sNombreEvento'];
    $fechaEvento  =$_POST['dFechaEvento'];
    $envio        =$_POST['bEnvio'];
    $latitud      =$_POST['nLatitud'];
    $longitud     =$_POST['nLongitud'];
    $id_asociado  =$_SESSION["id_usuario"];
    $tipoEvento   =$_POST['nTipoEvento'];
    $id_tienda    =$_SESSION["id_tienda"];
    $estado       =$_POST["nEstado"];
    
    


      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_lista_evento" ."('$nombreEvento','$fechaEvento','$envio','$latitud','$longitud','$id_asociado','$tipoEvento','$id_tienda','$estado')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);
      /*Se comprueba que la ejecucion de la secuencia haya sido correcta*/
    if(!$result)die("Fallo la conexión " . $conexion->error);
      /*Se Hace un echo del resultado */
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
