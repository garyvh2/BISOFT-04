<?php
	require_once 'login.php';
		/*Se declara la conexion con la base de datos */
	$conexion = new mysqli($host_name,$user_name,$password,$data_base);
		/*Si la conexion falla termina la ejecucion */
	if($conexion->connect_error)die($conexion->connect_error);
		/*Se setea la coleccion de caracteres a utf8 */
	$conexion->set_charset("utf8");
		//Se obtiene el path al que se enviaran las imagenes
	if(isset($_POST['correo_electronico'])) {
			//Se obtiene el nombre de la imagen
		$correo = $_POST['correo_electronico'];
			//Se randomiza el nombre para evitar coincidencias
		$pass = rand(1000,1000000);
			//Se une el path con el nombre de la imagen
		$body = "Estimado usuario," .
		"\r\n" . "Hemos recibido una solicitud de cambio de contraseña, adjunto podra encontrar su correo electrónico y su nueva contraseña." .
		"\r\n" . "\r\n" . "Correo: " . $correo .
		"\r\n" .	 "Pass: "		. $pass;

		require_once 'swiftmailer/lib/swift_required.php';
		$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
		  ->setUsername('gvalverdeh@ucenfotec.ac.cr')
		  ->setPassword('mocoloco12');

		$mailer = Swift_Mailer::newInstance($transport);

		$message = Swift_Message::newInstance('Cambiar contraseña')
		  ->setFrom(array('support@eventory.co.cr' => 'Eventory'))
		  ->setTo(array('garyhampton.12@gmail.com' => 'Usuario'))
		  ->setBody($body);

		$result = $mailer->send($message);


		$sentencia_sql = "CALL cambiar_contrasenna" ."('$correo','$pass')";
      /*Se obtiene el resultado y se ejecuta la secuencia de sql en la base de datos*/
    $result = $conexion->query($sentencia_sql);
	}
?>
