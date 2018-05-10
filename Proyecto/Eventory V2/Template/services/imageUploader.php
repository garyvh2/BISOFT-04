<?php
		//Se obtiene el path al que se enviaran las imagenes
	$path = $_REQUEST['path'];

	if(isset($_FILES['SubirFoto'])) {
			//Se obtiene el nombre de la imagen
		$img = $_FILES['SubirFoto']['name'];
			//Se obtiene la imagen
		$tmp = $_FILES['SubirFoto']['tmp_name'];

			//Se randomiza el nombre para evitar coincidencias
		$final_image = rand(1000,1000000).$img;
			//Se une el path con el nombre de la imagen
		$path = $path.strtolower($final_image);
		move_uploaded_file($tmp,$path);

		echo $path;
	}

?>
