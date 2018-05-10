<?php
  session_start();
  session_unset();
  session_destroy();

  $return;
  if (!isset($_SESSION["id_usuario"])) {
    $return = true;
  }else {
    $return = false;
  }
  echo json_encode($return);
 ?>
