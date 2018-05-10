<!--****************************************************************************
  Autor: Alejandro Castillo
  Fecha de creacion: 01/08/2016
  Fecha de modificacion: 05/08/2016

  EVENTORY APP
  2016

  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.

*****************************************************************************-->

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

  if(isset($_POST['nCedula'])                &&
     isset($_POST['psImagePath'])            &&
     isset($_POST['sPrimerNombre'])          &&
     isset($_POST['sPrimerApellido'])        &&
     isset($_POST['sNacionalidad'])          &&
     isset($_POST['dFechaNacimiento'])       &&
     isset($_POST['sGenero'])                &&
     isset($_POST['sCorreoElectronico'])     &&
     isset($_POST['sContrasena'])            &&
     isset($_POST['nTelefonoPrincipal'])     &&
     isset($_POST['ntipoUsuario'])           ){
      /*Se setean los valores obtenidos en variables */
    $cedula               = $_POST['nCedula'];
    $imagen               = $_POST['psImagePath'];
    $primerNombre         = $_POST['sPrimerNombre'];
    $segundoNombre         = $_POST['sSegundoNombre'];
    $primerApellido       = $_POST['sPrimerApellido'];
    $segundoApellido       = $_POST['sSegundoApellido'];
    $nacionalidad         = $_POST['sNacionalidad'];
    $fechaNacimiento      = $_POST['dFechaNacimiento'];
    $genero               = $_POST['sGenero'];
    $correoElectronico    = $_POST['sCorreoElectronico'];
    $telefonoPrincipal    = $_POST['nTelefonoPrincipal'];
    $telefonoSecundario   = $_POST['nTelefonoSecundario'];
    $contrasena           = $_POST['sContrasena'];
    $tipoUsuario          = $_POST['ntipoUsuario'];
    $estado               = 1;
    $juridico             = $_POST['juridico'];
    $id_tienda            = $_SESSION['id_tienda'];
    if ($tipoUsuario == 4) {
      $id_tienda = 0;
    }

      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_usuario" ."('$cedula','$imagen','$primerNombre','$segundoNombre','$primerApellido',
    '$segundoApellido','$nacionalidad','$fechaNacimiento','$genero','$correoElectronico','$telefonoPrincipal',
    '$telefonoSecundario','$contrasena','$tipoUsuario','$estado','$juridico','$id_tienda')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);

  }
?>
