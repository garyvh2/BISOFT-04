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
  if(isset($_POST['nCedula'])               &&
     isset($_POST['sNombre'])               &&
     isset($_POST['sApellido'])             &&
     isset($_POST['nTelefono'])             &&
     isset($_POST['dFechaNacimiento'])      &&
     isset($_POST['sCorreoElectronico'])    &&
     isset($_POST['sContrasena'])           &&
     isset($_POST['sGenero'])               &&
     isset($_POST['sPais'])                 &&
     isset($_POST['sImagePath'])            ){
      /*Se setean los valores obtenidos en variables */
    $id             = $_SESSION["id_usuario"];
    $cedula         = $_POST['nCedula'];
    $image_path     = $_POST['sImagePath'];
    $nombre         = $_POST['sNombre'];
    $nombre2        = $_POST['sSegundoNombre'];
    $apellido       = $_POST['sApellido'];
    $apellido2      = $_POST['sSegundoApellido'];
    $pais           = $_POST['sPais'];
    $fecha          = $_POST['dFechaNacimiento'];
    $genero         = $_POST['sGenero'];
    $correo         = $_POST['sCorreoElectronico'];
    $telefono       = $_POST['nTelefono'];
    $telefono2      = $_POST['nTelefono2'];
    $contrasena     = $_POST['sContrasena'];
    $tipo           = $_SESSION["tipo_usuario"];
    $estado         = 1;
    if ($tipo == 4 || $tipo == "4") {
      $id_tienda    = 0;
    } else {
      $id_tienda    = $_SESSION["id_tienda"];
    }
      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL update_usuario" ."('$id','$cedula','$image_path','$nombre','$nombre2','$apellido','$apellido2','$pais','$fecha','$genero','$correo','$telefono','$telefono2','$contrasena','$tipo','$estado','$id_tienda')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);

  }
?>
