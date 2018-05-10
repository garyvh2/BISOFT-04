<?php
  session_start();
  session_unset();
  session_destroy();
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
  if(isset($_POST['psCorreo'])      &&
     isset($_POST['psContrasena']) ){
      /*Se setean los valores obtenidos en variables */
      $correo   = $_POST['psCorreo'];
      $pass     = $_POST['psContrasena'];
        /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
      $sentencia_sql = "CALL iniciar_sesion" ."('$correo','$pass')";
        /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
      $result = $conexion->query($sentencia_sql);
        /*Se comprueba que la ejecucion de la secuencia haya sido correcta*/
      if(!$result)die("Fallo la conexión " . $conexion->error);
        /*Se declara un array */
      $id_usuario   = 0;
      $tipo_usuario = 0;
      $id_tienda    = 0;
        /*Se recorren los elementos de la coleccion de datos en result */
      while($registro = mysqli_fetch_assoc($result)) {
            /*se inserta cada elemento en filas */
          $id_usuario   = $registro['id_usuario'];
          $tipo_usuario = $registro['tipo_usuario'];
          $id_tienda    = $registro['id_tienda'];
      }
  }
  if ($tipo_usuario != 4) {
    $_SESSION["id_usuario"]   = $id_usuario;
    $_SESSION["tipo_usuario"] = $tipo_usuario;
    $_SESSION["id_tienda"]    = $id_tienda;
  } else {
    $_SESSION["id_usuario"]   = $id_usuario;
    $_SESSION["tipo_usuario"] = $tipo_usuario;
  }
  echo json_encode($tipo_usuario);
?>
