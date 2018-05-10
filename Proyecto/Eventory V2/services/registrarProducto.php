<!--****************************************************************************
  Autor: Daniel Urbina
  Fecha de creacion: 11/08/2016
  Fecha de modificacion: 11/08/2016

  EVENTORY APP
  2016

  Copyright (c) 2016 Copyright EVENTORY All Rights Reserved.
*****************************************************************************-->
<!--****************************************************************************
  Se realiza el proceso de registro de datos
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
  if(isset($_POST['nIdProducto'])             &&
     isset($_POST['sImagePath'])              &&
     isset($_POST['sNombreProducto'])         &&
     isset($_POST['sDescripcionProducto'])    &&
     isset($_POST['nPrecioProductoSinImpuesto'])      &&
     isset($_POST['sMarcaProducto'])          &&
     isset($_POST['nCantidadProducto'])       &&
     isset($_POST['sProvedorProducto'])       &&
     isset($_POST['nTipoProducto'])           ){

      /*Se setean los valores obtenidos en variables */
    $IdProducto           = $_POST['nIdProducto'];
    $ImagePath            = $_POST['sImagePath'];
    $NombreProducto       = $_POST['sNombreProducto'];
    $DescripcionProducto  = $_POST['sDescripcionProducto'];
    $PrecioSinImpuesto    = $_POST['nPrecioProductoSinImpuesto'];
    $MarcaProducto        = $_POST['sMarcaProducto'];
    $ProvedorProducto     = $_POST['sProvedorProducto'];
    $CantidadProducto     = $_POST['nCantidadProducto'];
    $TipoProducto         = $_POST['nTipoProducto'];
    $id_tienda            = $_SESSION["id_tienda"];

      /*Se declara la secuencia de SQL con el llamado al procedimiento almacenado con sus parametros */
    $sentencia_sql = "CALL insert_producto" ."('$IdProducto','$ImagePath','$NombreProducto','$DescripcionProducto','$PrecioSinImpuesto','$MarcaProducto','$CantidadProducto','$ProvedorProducto','$TipoProducto','$id_tienda',1)";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);
      /*Se comprueba que la ejecucion de la secuencia haya sido correcta*/
    if(!$result)die("Fallo la conexión " . $conexion->error);
  }
?>
