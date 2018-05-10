<?php
  session_start();
  $return;
  if (isset($_SESSION['id_usuario'])) {
    $return = true;
  } else {
    $return = false;
    session_unset();
    session_destroy();
  }
  echo json_encode($return);
?>
