<?php
    /*Se obtienen los datos de conexion */
  require_once 'login.php';
    /*Se declara la conexion con la base de datos */
  $conexion = new mysqli($host_name,$user_name,$password,$data_base);
    /*Si la conexion falla termina la ejecucion */
  if($conexion->connect_error)die($conexion->connect_error);
    /*Se setea la coleccion de caracteres a utf8 */
  $conexion->set_charset("utf8");
    /*Se comprueba que las variables necesarias se encuentren seteadas */

  if(isset($_POST['nCedula'])             &&
     isset($_POST['sImagePath'])          &&
     isset($_POST['sPrimerNombre'])       &&
     isset($_POST['sPrimerApellido'])     &&
     isset($_POST['sPais'])               &&
     isset($_POST['dFechaNacimiento'])    &&
     isset($_POST['sGenero'])             &&
     isset($_POST['sCorreoElectronico'])  &&
     isset($_POST['nTelefono'])           &&
     isset($_POST['sContrasena'])         &&
     isset($_POST['nTipoUsuario'])        &&
     isset($_POST['nEstado']))            {
      /*Se setean los valores obtenidos en variables */
    $cedula            = $_POST['nCedula'];
    $image             = $_POST['sImagePath'];
    $primerNombre      = $_POST['sPrimerNombre'];
    $segundoNombre     = $_POST['sSegundoNombre'];
    $primerApellido    = $_POST['sPrimerApellido'];
    $segundoApellido   = $_POST['sSegundoApellido'];
    $pais              = $_POST['sPais'];
    $fechaNacimiento   = $_POST['dFechaNacimiento'];
    $genero            = $_POST['sGenero'];
    $correoElectronico = $_POST['sCorreoElectronico'];
    $telefono          = $_POST['nTelefono'];
    $telefono2         = $_POST['nTelefono2'];
    $contrasena        = $_POST['sContrasena'];
    $tipoUsuario       = $_POST['nTipoUsuario'];
    $estado            = $_POST['nEstado'];
    $juridico          = $_POST['nJuridico'];
    $idTienda          = $_POST['nIdTienda'];

      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_usuario" ."('$cedula','$image','$primerNombre','$segundoNombre','$primerApellido','$segundoApellido','$pais','$fechaNacimiento','$genero','$correoElectronico','$telefono','$telefono2','$contrasena','$tipoUsuario','$estado','$juridico','$idTienda')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);
      /*Se comprueba que la ejecucion de la secuencia haya sido correcta*/
    if(!$result)die("Fallo la conexión " . $conexion->error);
      /*Se Hace un echo del resultado */
    $id_admin;
    /*Se recorren los elementos de la coleccion de datos en result */
    while($registro = mysqli_fetch_assoc($result)) {
        /*se inserta cada elemento en filas */
      $id_admin = $registro['id_admin'];
    }
    /*Se Hace un echo del resultado */
    echo json_encode((int)$id_admin);
  }
?>
