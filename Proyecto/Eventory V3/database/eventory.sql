-- phpMyAdmin SQL Dump
-- version 4.6.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 20, 2016 at 07:03 AM
-- Server version: 5.5.49-log
-- PHP Version: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventory`
--
CREATE DATABASE IF NOT EXISTS `eventory` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `eventory`;

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `agregar_inventario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `agregar_inventario` (IN `p_id_producto` INT(15), IN `p_cantidad` INT(5))  NO SQL
UPDATE producto SET
	cantidad = p_cantidad
    	WHERE id = p_id_producto$$

DROP PROCEDURE IF EXISTS `buscar_dueno_de_lista`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscar_dueno_de_lista` (IN `p_id_lista_evento` INT(15))  NO SQL
SELECT * FROM usuario WHERE id IN (SELECT id_asociado FROM lista_evento WHERE id = p_id_lista_evento)$$

DROP PROCEDURE IF EXISTS `buscar_lista`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscar_lista` (IN `p_id` INT(15))  NO SQL
IF EXISTS (SELECT * FROM lista_evento WHERE id = p_id AND estado = 1) THEN
	SELECT * FROM lista_evento WHERE id = p_id AND estado = 1;
ELSE
	SELECT 0 AS error;
END IF$$

DROP PROCEDURE IF EXISTS `cambiar_contrasenna`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_contrasenna` (IN `p_correo_electronico` VARCHAR(200), IN `p_contrasena` VARCHAR(50))  NO SQL
UPDATE usuario SET
	contrasena	=  p_contrasena
    	WHERE
        	correo_electronico = p_correo_electronico$$

DROP PROCEDURE IF EXISTS `cambiar_estado_convenio`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_estado_convenio` (IN `p_id` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE convenio SET estado = p_estado WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `cambiar_estado_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_estado_producto` (IN `p_id` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE producto SET
	estado = p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `cambiar_estado_proveedor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_estado_proveedor` (IN `p_id` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE proveedor SET estado = p_estado WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `cambiar_estado_tipo_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_estado_tipo_evento` (IN `p_id` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE tipo_evento SET estado = p_estado WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `cambiar_estado_tipo_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_estado_tipo_producto` (IN `p_id` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE tipo_producto SET estado = p_estado WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `cambiar_estado_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_estado_usuario` (IN `p_id` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE usuario SET estado = p_estado WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `cantidad_producto_lista`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cantidad_producto_lista` (IN `p_id_producto` INT(15), IN `p_id_lista_evento` INT(15))  NO SQL
IF EXISTS (SELECT * FROM producto_lista_evento WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento) THEN
	SELECT cantidad AS cantidad FROM producto_lista_evento WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento ;
ELSE
	SELECT 0 AS cantidad;
END IF$$

DROP PROCEDURE IF EXISTS `check_correo_disponible`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_correo_disponible` (IN `p_correo_electronico` VARCHAR(100), IN `p_id_usuario` INT(15))  NO SQL
IF EXISTS (SELECT correo_electronico from usuario WHERE correo_electronico = p_correo_electronico) THEN

	IF ((SELECT correo_electronico FROM usuario WHERE id = p_id_usuario) = p_correo_electronico) THEN
    	SELECT 1 AS disponible;
    ELSE
    	SELECT 0 AS disponible;
    END IF;
ELSE
	SELECT 1 AS disponible;
END IF$$

DROP PROCEDURE IF EXISTS `check_lista`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_lista` (IN `p_id_lista` INT)  NO SQL
IF (SELECT id FROM lista_evento WHERE id=p_id_lista) THEN
    IF ((SELECT estado FROM lista_evento WHERE id = p_id_lista) = 1) THEN
        IF ((SELECT fecha_evento FROM lista_evento WHERE id = p_id_lista) < CURDATE()) THEN
            SELECT 2 AS exist;
            UPDATE lista_evento SET
              estado = 2
                WHERE id=p_id_lista;

        ELSE
        	SET @id_tienda = 0;
            SELECT id_tienda FROM lista_evento WHERE id = p_id_lista INTO @id_tienda;
           SELECT 1 AS exist, @id_tienda AS id_tienda;
        END IF;

    ELSE
          SELECT 3 AS exist;
    END IF;

ELSE
    SELECT 4 AS exist;
END IF$$

DROP PROCEDURE IF EXISTS `check_nuevo_correo_disponible`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_nuevo_correo_disponible` (IN `p_correo_electronico` VARCHAR(100))  NO SQL
IF EXISTS (SELECT usuario.correo_electronico from usuario WHERE usuario.correo_electronico = p_correo_electronico) THEN
	SELECT 0 AS disponible;
ELSE
	SELECT 1 AS disponible;
END IF$$

DROP PROCEDURE IF EXISTS `check_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_producto` (IN `p_id_producto` INT(15))  NO SQL
IF EXISTS (SELECT * FROM producto WHERE id_producto = p_id_producto) THEN
	SELECT 1 AS exist;
ELSE
	SELECT 0 AS exist;
END IF$$

DROP PROCEDURE IF EXISTS `check_reserva`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_reserva` (IN `p_id_tienda` INT(15), IN `p_id_reserva` INT(15))  NO SQL
IF ((SELECT id_tienda FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva)) = p_id_tienda) THEN
	IF ((SELECT estado FROM reserva WHERE id = p_id_reserva) = 1) THEN
        IF ((SELECT estado FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva)) = 1) THEN
        	IF ((SELECT fecha_evento FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva)) < CURDATE()) THEN
		        SELECT 4 AS exist;   
                UPDATE lista_evento SET
                	estado = 2
                    	WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);
                UPDATE reserva SET
                	estado = 0
                    	WHERE id_lista_evento IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);
            ELSE
            	SELECT 1 AS exist;
            END IF;
        ELSE
        	SELECT 3 AS exist;
        END IF;
    ELSE
    	SELECT 2 AS exist;
    END IF;
ELSE
	SELECT 0 AS exist;
END IF$$

DROP PROCEDURE IF EXISTS `desactivar_compra`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_compra` (IN `p_id` INT(15))  NO SQL
UPDATE compra SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_convenio`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_convenio` (IN `p_id` INT(15))  NO SQL
UPDATE convenio SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_lista_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_lista_evento` (IN `p_id` INT(15))  NO SQL
UPDATE lista_evento SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_producto` (IN `p_id` INT(15))  NO SQL
UPDATE producto SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_producto_lista_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_producto_lista_evento` (IN `p_id` INT(15))  NO SQL
UPDATE producto_lista_evento SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_proveedor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_proveedor` (IN `p_id` INT(15))  NO SQL
UPDATE proveedor SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_reserva`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_reserva` (IN `p_id` INT(15))  NO SQL
UPDATE reserva SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_tienda` (IN `p_id` INT(15))  NO SQL
UPDATE tienda SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_tipo_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_tipo_evento` (IN `p_id` INT(15))  NO SQL
UPDATE tipo_evento SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_tipo_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_tipo_producto` (IN `p_id` INT(15))  NO SQL
UPDATE tipo_producto SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `desactivar_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `desactivar_usuario` (IN `p_id` INT(15))  NO SQL
UPDATE usuario SET
    estado = 0
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `iniciar_sesion`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `iniciar_sesion` (IN `p_correo_electronico` VARCHAR(100), IN `p_contrasena` VARCHAR(25))  NO SQL
IF EXISTS (SELECT * FROM usuario WHERE correo_electronico = p_correo_electronico AND contrasena = p_contrasena) THEN
    IF (SELECT estado FROM usuario WHERE correo_electronico = p_correo_electronico) = 1 THEN
		IF (SELECT tipo FROM usuario WHERE correo_electronico = p_correo_electronico) = 4 THEN
			SELECT id AS id_usuario, tipo AS tipo_usuario FROM usuario WHERE correo_electronico = p_correo_electronico;
        ELSE
        	IF (SELECT tipo FROM usuario WHERE correo_electronico = p_correo_electronico) = 1 THEN
                select
                    usuario.id 	AS id_usuario,
                    usuario.tipo AS tipo_usuario,
                    tienda.id 	AS id_tienda
                from usuario
                inner join tienda
                on usuario.id = tienda.id_administrador AND usuario.correo_electronico = p_correo_electronico;
        	ELSE
                select
                    usuario.id 	AS id_usuario,
                    usuario.tipo AS tipo_usuario,
                    tienda.id 	AS id_tienda
                from usuario
                inner join tienda
                on usuario.id_tienda = tienda.id AND usuario.correo_electronico = p_correo_electronico;
            END IF;
   		END IF;
    ELSE
    	SELECT 0 AS tipo_usuario;
    END IF;
ELSE
    SELECT 0 AS tipo_usuario;
END IF$$

DROP PROCEDURE IF EXISTS `insert_compra`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_compra` (IN `p_id_reserva` INT(15), IN `p_total` INT(10), IN `p_subtotal` INT(10), IN `p_fecha_compra` DATE, IN `p_descuento` INT(5), IN `p_impuesto_ventas` INT(5), IN `p_cantidad` INT(5), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
IF 1 = 1 THEN
    INSERT INTO compra 
        (id_reserva,
         total,
         subtotal,
         fecha_compra,
         descuento,
         impuesto_ventas,
         cantidad,
         id_tienda,
         estado)
            VALUES 
                (p_id_reserva,
                 p_total,
                 p_subtotal,
                 p_fecha_compra,
                 p_descuento,
                 p_impuesto_ventas,
                 p_cantidad,
                 p_id_tienda,
                 p_estado);
	UPDATE reserva SET
    	estado = 2
        	WHERE id = p_id_reserva;
            
    SET @cantidad_reserva 		= 0;
    SET @cantidad_inventario	= 0;
    SET @cantidad_lista			= 0;
    SET @id_producto_reserva	= 0;
    SET @id_lista_evento		= 0;
    
    /*cantidad en esta reserva */
    SELECT 	reserva.cantidad 			INTO @cantidad_reserva 
            	FROM reserva WHERE id = p_id_reserva;
    /*id del producto en esta reserva */
    SELECT 	reserva.id_producto			INTO @id_producto_reserva 
            	FROM reserva WHERE id = p_id_reserva;
    /*id de la lista de evento */
    SELECT	reserva.id_lista_evento 	INTO @id_lista_evento 
    			FROM reserva WHERE id = p_id_reserva;
    /*catidad  en lista */
    SELECT 	producto_lista_evento.cantidad	INTO @cantidad_lista FROM producto_lista_evento WHERE producto_lista_evento.id_producto = @id_producto_reserva AND producto_lista_evento.id_lista_evento = @id_lista_evento;
    /*Selecciona la cantidad en inventario para este producto */     
    SELECT producto.cantidad 	INTO @cantidad_inventario FROM producto WHERE id = @id_producto_reserva;
   	/*Se actualiza la cantidad actual en inventario */
    SET @cantidad_inventario = @cantidad_inventario - @cantidad_reserva;
    UPDATE producto SET
    	cantidad = @cantidad_inventario
        	WHERE id = @id_producto_reserva;
            
    SELECT @cantidad_reservas,@cantidad_solicitada, @cantidad_regalados,@cantidad_reserva,@cantidad_inventario,@cantidad_lista,@id_producto_reserva,@id_lista_evento;

	SET @cantidad_reservas 		= 0;
	SET @cantidad_regalados		= 0;
	SET @cantidad_solicitada	= 0;
	/*Se obtiene la cantidad reservada de un producto */
	SELECT IF(SUM(cantidad) IS NULL,0,SUM(cantidad)) INTO @cantidad_reservas FROM reserva 	WHERE reserva.id_producto = @id_producto_reserva AND reserva.id_lista_evento = @id_lista_evento AND reserva.estado = 1 AND reserva.id <> p_id_reserva;
	/*Se obtiene la cantidad regalada de un producto */
    SELECT IF(SUM(cantidad) IS NULL,0,SUM(cantidad)) INTO @cantidad_regalados FROM compra 	WHERE id_reserva IN (SELECT id FROM reserva WHERE id_producto = @id_producto_reserva AND id_lista_evento = @id_lista_evento);
    
    
    SELECT @cantidad_reservas,@cantidad_solicitada, @cantidad_regalados,@cantidad_reserva,@cantidad_inventario,@cantidad_lista,@id_producto_reserva,@id_lista_evento;
	IF (@cantidad_reservas = 0) THEN
    	IF (@cantidad_regalados = @cantidad_lista) THEN
			UPDATE producto_lista_evento SET
        	    producto_lista_evento.estado		= 3
        	        WHERE id_producto = @id_producto_reserva AND id_lista_evento = @id_lista_evento;
        END IF;
    ELSEIF (@cantidad_regalados = 0) THEN
    	IF (@cantidad_reservas = @cantidad_lista) THEN
        	UPDATE producto_lista_evento SET
            	producto_lista_evento.estado		= 2
                	WHERE id_producto = @id_producto_reserva AND id_lista_evento = @id_lista_evento;
        END IF;
	END IF;
END IF$$

DROP PROCEDURE IF EXISTS `insert_convenio`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_convenio` (IN `p_id_usuario` INT(15), IN `p_nombre` VARCHAR(50), IN `p_descripcion` VARCHAR(200), IN `p_descuento` INT(5), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
INSERT INTO convenio
	(id_usuario,
     nombre,
     descripcion,
     descuento,
     id_tienda,
     estado)
     	VALUES
        	(p_id_usuario,
             p_nombre,
             p_descripcion,
             p_descuento,
             p_id_tienda,
             p_estado)$$

DROP PROCEDURE IF EXISTS `insert_lista_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_lista_evento` (IN `p_nombre` VARCHAR(100), IN `p_fecha_evento` DATE, IN `p_envio` TINYINT(1), IN `p_latitud` FLOAT(12,8), IN `p_longitud` FLOAT(12,8), IN `p_id_asociado` INT(15), IN `p_id_tipo_evento` INT(15), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
IF 1=1 THEN

INSERT INTO lista_evento 
	(nombre,
     fecha_evento,
     envio,
     latitud,
     longitud,
     id_asociado,
     id_tipo_evento,
     id_tienda,
     estado)
     	VALUES 
        	(p_nombre,
             p_fecha_evento,
             p_envio,
             p_latitud,
             p_longitud,
             p_id_asociado,
             p_id_tipo_evento,
             p_id_tienda,
             p_estado);
	SET @id_lista = 0;
    SELECT IF(MAX(id) IS NULL,1,MAX(id)) FROM lista_evento INTO  @id_lista;
    SELECT @id_lista AS id_lista;
END IF$$

DROP PROCEDURE IF EXISTS `insert_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_producto` (IN `p_id_producto` INT(15), IN `p_foto_producto` MEDIUMTEXT, IN `p_nombre` VARCHAR(25), IN `p_descripcion` VARCHAR(250), IN `p_precio_unitario` INT(15), IN `p_marca` VARCHAR(25), IN `p_cantidad` INT(5), IN `p_id_proveedor` INT(15), IN `p_id_tipo` INT(15), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
INSERT INTO producto 
	(id_producto,
     foto_producto,
     nombre,
     descripcion,
     precio_unitario,
     marca,
     cantidad,
     id_proveedor,
     id_tipo,
     id_tienda,
     estado)
     	VALUES 
        	(p_id_producto,
             p_foto_producto,
             p_nombre,
             p_descripcion,
             p_precio_unitario,
             p_marca,
             p_cantidad,
             p_id_proveedor,
             p_id_tipo,
             p_id_tienda,
             p_estado)$$

DROP PROCEDURE IF EXISTS `insert_producto_lista_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_producto_lista_evento` (IN `p_id_producto` INT(15), IN `p_id_lista_evento` INT(15), IN `p_cantidad` INT(5), IN `p_estado` INT(1))  NO SQL
IF EXISTS (SELECT * FROM producto_lista_evento WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento) THEN
	IF ((SELECT cantidad FROM producto_lista_evento WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento) != p_cantidad) THEN
    	IF ((SELECT cantidad FROM producto_lista_evento WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento) > p_cantidad) THEN
        	SET @cantidad_reservas 		= 0;
            SET @cantidad_regalados		= 0;
            SET @cantidad_solicitada	= 0;
            
            SELECT IF(SUM(cantidad) IS NULL,0,SUM(cantidad)) FROM reserva 	WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento AND estado = 1 INTO @cantidad_reservas;
            SELECT IF(SUM(cantidad) IS NULL,0,SUM(cantidad)) FROM compra 	WHERE id_reserva IN (SELECT id FROM reserva WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento) INTO @cantidad_regalados;
            
            IF ((@cantidad_reservas + @cantidad_regalados) > p_cantidad) THEN
            	SET @nombre_producto	= "";
                SELECT nombre FROM producto WHERE id = p_id_producto INTO @nombre_producto;
                SELECT 0 AS result, CAST(@cantidad_reservas + @cantidad_regalados AS DECIMAL(0)) AS cantidad_min, @nombre_producto AS nombre_producto;
            ELSEIF ((@cantidad_reservas + @cantidad_regalados) = p_cantidad) THEN
            	IF (@cantidad_reservas = 0) THEN
                    UPDATE producto_lista_evento SET
                        cantidad 	= p_cantidad,
                        estado		= 3
                            WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento;
                    UPDATE lista_evento SET
                        estado = 0
                           WHERE id = p_id_lista_evento;
                    SELECT 1 AS result;
                ELSE
                    UPDATE producto_lista_evento SET
                        cantidad 	= p_cantidad,
                        estado		= 2
                            WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento;
                    UPDATE lista_evento SET
                        estado = 0
                           WHERE id = p_id_lista_evento;
                    SELECT 1 AS result;
                END IF;
                
                
           	ELSEIF ((@cantidad_reservas + @cantidad_regalados) < p_cantidad) THEN
                UPDATE producto_lista_evento SET
                    cantidad 	= p_cantidad,
                    estado		= 1
                        WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento;
                UPDATE lista_evento SET
                    estado = 0
                       WHERE id = p_id_lista_evento;
                SELECT 1 AS result;
            END IF;
            
        ELSE
       	    UPDATE producto_lista_evento SET
              	cantidad 	= p_cantidad,
               	estado		= 1
               		WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento;
            UPDATE lista_evento SET
                estado = 0
                   WHERE id = p_id_lista_evento;
            SELECT 1 AS result;
        END IF;
    ELSE
    	SELECT 1 AS result;
    END IF;
ELSE
    INSERT INTO producto_lista_evento
        (id_producto,
         id_lista_evento,
         cantidad,
         estado)
            VALUES
                (p_id_producto,
                 p_id_lista_evento,
                 p_cantidad,
                 p_estado);
    UPDATE lista_evento SET
    	estado = 0
        	WHERE id = p_id_lista_evento;
    SELECT 1 AS result;
END IF$$

DROP PROCEDURE IF EXISTS `insert_proveedor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_proveedor` (IN `p_nombre` VARCHAR(25), IN `p_numero_telefono_primario` INT(15), IN `p_numero_telefono_secundario` INT(15), IN `p_fecha_inicio_relacion` DATE, IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
INSERT INTO proveedor 
	(nombre,
     numero_telefono_primario,
     numero_telefono_secundario,
     fecha_inicio_relacion,
     id_tienda,
     estado)
     	VALUES 
        	(p_nombre,
             p_numero_telefono_primario,
             p_numero_telefono_secundario,
             p_fecha_inicio_relacion,
             p_id_tienda,
             p_estado)$$

DROP PROCEDURE IF EXISTS `insert_reserva`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_reserva` (IN `p_id_producto` INT(15), IN `p_id_lista_evento` INT(15), IN `p_id_usuario` INT(15), IN `p_cantidad` INT(5), IN `p_estado` INT(1))  NO SQL
IF 1 = 1 THEN
	INSERT INTO reserva 
		(id_producto,
     	id_lista_evento,
     	id_usuario,
     	cantidad,
     	estado)
     		VALUES 
        		(p_id_producto,
             	p_id_lista_evento,
             	p_id_usuario,
             	p_cantidad,
             	p_estado);
                
                
	SET @cantidad_disponible	 = "";
    SET @cantidad_en_lista		 = "";
    SET @cantidad_reservados	 = "";
    SET @cantidad_regalados		 = "";
    
	SELECT cantidad INTO @cantidad_en_lista 	FROM producto_lista_evento	WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento;
    /*Se obtiene la cantidad de todas las reservas actuales de deste producto para esta lista */
    SELECT IF(SUM(cantidad) IS NULL, 0, SUM(cantidad)) INTO @cantidad_reservados 	FROM reserva				WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento AND estado = 1;
    /*Se obtiene la cantidad de todas las compras realizadas con respecto a las reservas realizadas para este producto en esta lista */
    SELECT IF(SUM(cantidad) IS NULL, 0, SUM(cantidad)) INTO @cantidad_regalados		FROM compra					WHERE id_reserva  IN 
    	(SELECT id FROM reserva WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento AND estado = 0);
	
	SET @cantidad_disponible = @cantidad_en_lista - (@cantidad_reservados + @cantidad_regalados);
    
    IF (@cantidad_disponible = 0) THEN
    	IF (@cantidad_reservados = 0) THEN
        	UPDATE producto_lista_evento SET 
            	estado = 3
                	WHERE id_producto = p_id_producto;
        ELSEIF (@cantidad_regalados = 0) THEN
        	UPDATE producto_lista_evento SET 
            	estado = 2
                	WHERE id_producto = p_id_producto;        
        END IF;
    END IF;
    SELECT MAX(id) as id_reserva FROM reserva;
    
END IF$$

DROP PROCEDURE IF EXISTS `insert_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_tienda` (IN `p_identificacion` INT(15), IN `p_logo_tienda` MEDIUMTEXT, IN `p_nombre` VARCHAR(25), IN `p_numero_telefono` INT(15), IN `p_correo_electronico` VARCHAR(100), IN `p_provincia` VARCHAR(25), IN `p_canton` VARCHAR(25), IN `p_distrito` VARCHAR(25), IN `p_impuesto_ventas` INT(5), IN `p_tipo_tienda` INT(1), IN `p_latitud` FLOAT(12,8), IN `p_longitud` FLOAT(12,8), IN `p_estado` INT(1), IN `p_id_administrador` INT(15))  NO SQL
INSERT INTO tienda 
	(identificacion,
     logo_tienda,
     nombre,
     numero_telefono,
     correo_electronico,
     provincia,
     canton,
     distrito,
     impuesto_ventas,
     tipo_tienda,
     latitud,
     longitud,
     estado,
     id_administrador)
     	VALUES 
        	(p_identificacion,
             p_logo_tienda,
             p_nombre,
             p_numero_telefono,
             p_correo_electronico,
             p_provincia,
             p_canton,
             p_distrito,
             p_impuesto_ventas,
             p_tipo_tienda,
             p_latitud,
             p_longitud,
             p_estado,
             p_id_administrador)$$

DROP PROCEDURE IF EXISTS `insert_tipo_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_tipo_evento` (IN `p_imagen_evento` MEDIUMTEXT, IN `p_nombre` VARCHAR(50), IN `p_descripcion` VARCHAR(250), IN `p_descuento` INT(5), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
INSERT INTO tipo_evento 
	(imagen_evento,
     nombre,
     descripcion,
     descuento,
     id_tienda,
     estado)
     	VALUES 
        	(p_imagen_evento,
             p_nombre,
             p_descripcion,
             p_descuento,
             p_id_tienda,
             p_estado)$$

DROP PROCEDURE IF EXISTS `insert_tipo_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_tipo_producto` (IN `p_nombre` VARCHAR(25), IN `p_descripcion` VARCHAR(250), IN `p_precedero` TINYINT(1), IN `p_fecha_vencimiento` DATE, IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
INSERT INTO tipo_producto 
	(nombre,
     descripcion,
     precedero,
     fecha_vencimiento,
     id_tienda,
     estado)
     	VALUES 
        	(p_nombre,
             p_descripcion,
             p_precedero,
             p_fecha_vencimiento,
             p_id_tienda,
             p_estado)$$

DROP PROCEDURE IF EXISTS `insert_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_usuario` (IN `p_identificacion` INT(15), IN `p_foto_perfil` MEDIUMTEXT, IN `p_primer_nombre` VARCHAR(25), IN `p_segundo_nombre` VARCHAR(25), IN `p_primer_apellido` VARCHAR(25), IN `p_segundo_apellido` VARCHAR(25), IN `p_nacionalidad` VARCHAR(25), IN `p_fecha_nacimiento` DATE, IN `p_genero` VARCHAR(15), IN `p_correo_electronico` VARCHAR(100), IN `p_numero_telefono_primario` INT(15), IN `p_numero_telefono_secundario` INT(15), IN `p_contrasena` VARCHAR(25), IN `p_tipo` INT(1), IN `p_estado` INT(1), IN `p_juridico` INT(1), IN `p_id_tienda` INT(15))  NO SQL
IF (p_tipo = 1) THEN
    INSERT INTO usuario 
        (identificacion,
         foto_perfil,
         primer_nombre,
         segundo_nombre,
         primer_apellido,
         segundo_apellido,
         nacionalidad,
         fecha_nacimiento,
         genero,
         correo_electronico,
         numero_telefono_primario,
         numero_telefono_secundario,
         contrasena,
         tipo,
         estado,
         juridico,
         id_tienda)
            VALUES 
                (p_identificacion,
                 p_foto_perfil,
                 p_primer_nombre,
                 p_segundo_nombre,
                 p_primer_apellido,
                 p_segundo_apellido,
                 p_nacionalidad,
                 p_fecha_nacimiento,
                 p_genero,
                 p_correo_electronico,
                 p_numero_telefono_primario,
                 p_numero_telefono_secundario,
                 p_contrasena,
                 p_tipo,
                 p_estado,
                 p_juridico,
                 p_id_tienda);
	SET @id_admin = 0;
	SELECT MAX(id) INTO @id_admin FROM usuario; 
    SELECT @id_admin AS id_admin;
ELSE

    INSERT INTO usuario 
        (identificacion,
         foto_perfil,
         primer_nombre,
         segundo_nombre,
         primer_apellido,
         segundo_apellido,
         nacionalidad,
         fecha_nacimiento,
         genero,
         correo_electronico,
         numero_telefono_primario,
         numero_telefono_secundario,
         contrasena,
         tipo,
         estado,
         juridico,
         id_tienda)
            VALUES 
                (p_identificacion,
                 p_foto_perfil,
                 p_primer_nombre,
                 p_segundo_nombre,
                 p_primer_apellido,
                 p_segundo_apellido,
                 p_nacionalidad,
                 p_fecha_nacimiento,
                 p_genero,
                 p_correo_electronico,
                 p_numero_telefono_primario,
                 p_numero_telefono_secundario,
                 p_contrasena,
                 p_tipo,
                 p_estado,
                 p_juridico,
                 p_id_tienda);
END IF$$

DROP PROCEDURE IF EXISTS `listar_cantidad_producto_lista`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_cantidad_producto_lista` (IN `p_id_lista_evento` INT(15), IN `p_id_producto` INT(15))  NO SQL
IF EXISTS(SELECT cantidad FROM producto_lista_evento WHERE id_lista_evento = p_id_lista_evento AND id_producto = p_id_producto) THEN 
	SELECT cantidad FROM producto_lista_evento WHERE id_lista_evento = p_id_lista_evento AND id_producto = p_id_producto;
ELSE
	SELECT 0 AS cantidad;
END IF$$

DROP PROCEDURE IF EXISTS `listar_compras_por_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_compras_por_tienda` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM compra WHERE id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_compras_por_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_compras_por_usuario` (IN `p_id_usuario` INT(15))  NO SQL
SELECT * FROM compra WHERE id_reserva IN (SELECT id FROM reserva WHERE id_usuario = p_id_usuario)$$

DROP PROCEDURE IF EXISTS `listar_convenios_por_estado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_convenios_por_estado` (IN `p_estado` INT(1), IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM convenio WHERE estado = p_estado AND id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_listas`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_listas` ()  NO SQL
SELECT * FROM lista_evento$$

DROP PROCEDURE IF EXISTS `listar_listas_por_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_listas_por_tienda` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM lista_evento WHERE id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_listas_por_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_listas_por_usuario` (IN `p_id_asociado` INT(15))  NO SQL
SELECT * FROM lista_evento where id_asociado = p_id_asociado$$

DROP PROCEDURE IF EXISTS `listar_productos_en_listas`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_productos_en_listas` ()  NO SQL
SELECT * FROM producto_lista_evento$$

DROP PROCEDURE IF EXISTS `listar_productos_por_estado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_productos_por_estado` (IN `p_estado` INT(1), IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM producto WHERE estado = p_estado AND id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_productos_por_lista`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_productos_por_lista` (IN `p_id_lista_evento` INT(15))  NO SQL
select
                    producto_lista_evento.*,
                    producto.marca AS marca_producto,
                    producto.nombre AS nombre_producto,
                    producto.precio_unitario AS precio_producto
                from producto_lista_evento
                inner join producto
                on producto_lista_evento.id_producto = producto.id AND producto_lista_evento.id_lista_evento = p_id_lista_evento$$

DROP PROCEDURE IF EXISTS `listar_productos_por_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_productos_por_tienda` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM producto WHERE id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_proveedores_por_estado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_proveedores_por_estado` (IN `p_estado` INT(1), IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM proveedor WHERE estado = p_estado AND id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_proveedores_por_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_proveedores_por_tienda` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM proveedor WHERE id_tienda = p_id_tienda AND estado = 1$$

DROP PROCEDURE IF EXISTS `listar_reservas`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_reservas` ()  NO SQL
SELECT * FROM reserva$$

DROP PROCEDURE IF EXISTS `listar_reservas_por_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_reservas_por_usuario` (IN `p_id_usuario` INT(15))  NO SQL
SELECT * FROM reserva WHERE id_usuario = p_id_usuario$$

DROP PROCEDURE IF EXISTS `listar_tiendas`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_tiendas` ()  NO SQL
SELECT * FROM tienda$$

DROP PROCEDURE IF EXISTS `listar_tipos_evento_por_estado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_tipos_evento_por_estado` (IN `p_estado` INT(1), IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM tipo_evento WHERE estado = p_estado AND id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_tipos_evento_por_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_tipos_evento_por_tienda` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM tipo_evento WHERE id_tienda = p_id_tienda AND estado = 1$$

DROP PROCEDURE IF EXISTS `listar_tipos_producto_por_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_tipos_producto_por_tienda` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM tipo_producto WHERE id_tienda = p_id_tienda AND estado = 1$$

DROP PROCEDURE IF EXISTS `listar_tipo_producto_por_estado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_tipo_producto_por_estado` (IN `p_estado` INT(1), IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM tipo_producto WHERE estado = p_estado AND id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_usuarios_por_estado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_usuarios_por_estado` (IN `p_estado` INT(1), IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM usuario WHERE estado = p_estado  AND tipo != 4 AND id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_usuarios_por_juridico`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_usuarios_por_juridico` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM usuario WHERE juridico = 1 AND id NOT IN (SELECT id_usuario FROM convenio WHERE id_tienda = p_id_tienda)$$

DROP PROCEDURE IF EXISTS `listar_usuarios_por_juridico_modificar`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_usuarios_por_juridico_modificar` ()  NO SQL
SELECT * FROM usuario WHERE juridico = 1$$

DROP PROCEDURE IF EXISTS `select_compra`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_compra` (IN `p_id` INT(15))  NO SQL
SELECT * from compra where id = p_id$$

DROP PROCEDURE IF EXISTS `select_convenio`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_convenio` (IN `p_id` INT(15))  NO SQL
SELECT * from convenio where id = p_id$$

DROP PROCEDURE IF EXISTS `select_datos_reserva`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_datos_reserva` (IN `p_id_producto` INT(15), IN `p_id_lista_evento` INT(15))  NO SQL
IF 1 = 1 THEN
	SET @nombre_producto 	= "";
    SET @path_image			= "";
	SET @precio_producto	= "";
    
    
    SELECT nombre INTO @nombre_producto FROM producto WHERE id = p_id_producto;
    SELECT foto_producto INTO @path_image FROM producto WHERE id = p_id_producto;
    SELECT precio_unitario INTO @precio_producto FROM producto WHERE id = p_id_producto;
                
    SET @cantidad_disponible	 = "";
    SET @cantidad_en_lista		 = "";
    SET @cantidad_reservados	 = "";
    SET @cantidad_regalados		 = "";
    
	SELECT cantidad INTO @cantidad_en_lista 	FROM producto_lista_evento	WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento;
    /*Se obtiene la cantidad de todas las reservas actuales de deste producto para esta lista */
    SELECT IF(SUM(cantidad) IS NULL, 0, SUM(cantidad)) INTO @cantidad_reservados 	FROM reserva				WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento AND estado = 1;
    /*Se obtiene la cantidad de todas las compras realizadas con respecto a las reservas realizadas para este producto en esta lista */
    SELECT IF(SUM(cantidad) IS NULL, 0, SUM(cantidad)) INTO @cantidad_regalados		FROM compra					WHERE id_reserva  IN 
    	(SELECT id FROM reserva WHERE id_producto = p_id_producto AND id_lista_evento = p_id_lista_evento AND estado = 0);
	
	SET @cantidad_disponible = @cantidad_en_lista - (@cantidad_reservados + @cantidad_regalados);

	
	
	SELECT 	@nombre_producto 	AS nombre_producto,
    		@path_image			AS image_path,
            @precio_producto	AS precio_producto,
            @cantidad_disponible AS cantidad_disponible;

END IF$$

DROP PROCEDURE IF EXISTS `select_estado_reserva`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_estado_reserva` (IN `p_id_reserva` INT(15))  NO SQL
IF 1 = 1 THEN

    SET @estado_reserva = 0;
    SET @nombre_producto = "";
    SET @nombre_evento = "";
    SET @fecha_evento = "";
    SET @id_lista	= 0;

    IF ((SELECT estado FROM reserva WHERE id = p_id_reserva) = 1) THEN
        IF ((SELECT estado FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva)) = 1) THEN
          IF ((SELECT fecha_evento FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva)) < CURDATE()) THEN
            SELECT 0 INTO @estado_reserva;
                UPDATE lista_evento SET
                  estado = 2
                    WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);
               UPDATE reserva SET
                  estado = 0
                    WHERE id_lista_evento IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);
          ELSE
            SELECT 1 INTO @estado_reserva;
          END IF;
      ELSE
        SELECT 0 INTO @estado_reserva;
      END IF;
  ELSEIF ((SELECT estado FROM reserva WHERE id = p_id_reserva) = 2) THEN
  	SELECT 2 INTO @estado_reserva;
  ELSE
    SELECT 0 INTO @estado_reserva;
  END IF;
  

  SELECT nombre INTO @nombre_producto FROM producto WHERE id IN (SELECT id_producto FROM reserva WHERE id = p_id_reserva);

  SELECT nombre INTO @nombre_evento FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);
  SELECT fecha_evento INTO @fecha_evento FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);
	
  SELECT id INTO @id_lista FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);

  SELECT @nombre_producto AS nombre_producto,
         @nombre_evento   AS nombre_evento,
         @fecha_evento    AS fecha_evento,
         @id_lista		  AS id_lista,
         @estado_reserva  AS estado_reserva;
END IF$$

DROP PROCEDURE IF EXISTS `select_factura`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_factura` (IN `p_id_reserva` INT(15))  NO SQL
IF 1 = 1 THEN

    SET @id_asociado = 0;
    SET @nombre_asociado = "";
    SET @descuento_convenio = 0;
    SET @descuento_tipo_evento = 0;
    SET @id_factura = 0;
    SET @cantidad = 0;
    
    
    
	/*Se obtiene el id del asociado a la lista */
    SELECT id INTO @id_asociado FROM usuario WHERE id IN
        (SELECT lista_evento.id_asociado FROM lista_evento WHERE id IN
         	(SELECT reserva.id_lista_evento FROM reserva WHERE id = p_id_reserva));

	/*Se obtiene el nombre del asociado */
    SELECT CONCAT(primer_nombre, " ", primer_apellido) INTO @nombre_asociado FROM usuario WHERE id = @id_asociado;
    
    
	/*Se obtiene el descuento por convenio */
    IF ((SELECT juridico FROM usuario WHERE id = @id_asociado) = 1) THEN
        IF EXISTS (SELECT * FROM convenio WHERE id_usuario = @id_asociado) THEN
        	SELECT descuento INTO @descuento_convenio FROM convenio WHERE estado = 1 AND id_usuario = @id_asociado AND id_tienda IN 
            	(SELECT id_tienda FROM lista_evento WHERE id IN
            		(SELECT reserva.id_lista_evento FROM reserva WHERE id = p_id_reserva));
    	END IF;
    END IF;

	/*Se obtiene el descuento por tipo de evento */
    SELECT descuento INTO  @descuento_tipo_evento FROM tipo_evento WHERE id IN
    	(SELECT id_tipo_evento FROM lista_evento WHERE id IN
            (SELECT reserva.id_lista_evento FROM reserva WHERE id = p_id_reserva));

	/*Se obtiene el total de descuento */
    SET @descuento = @descuento_convenio + @descuento_tipo_evento;
    
    /*Se obtiene el id de factura */
    SELECT IF(MAX(id) IS NULL,1,MAX(id) + 1) INTO @id_factura FROM compra;

	/*Se obtiene la cantidad de la reserva */
    SELECT cantidad INTO @cantidad FROM reserva WHERE id = p_id_reserva;
    
    SELECT 	@id_asociado 		AS id_asociado, 
    		@nombre_asociado 	AS nombre_asociado, 
            @descuento 			AS descuento, 
            @cantidad 			AS cantidad, 
            @id_factura			AS id_factura,
            @descuento_convenio	AS descuento_convenio,
            producto.nombre,
            producto.descripcion,
            producto.precio_unitario FROM producto WHERE id IN 
            	(SELECT id_producto FROM reserva WHERE id = p_id_reserva);
END IF$$

DROP PROCEDURE IF EXISTS `select_lista_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_lista_evento` (IN `p_id` INT(15))  NO SQL
SELECT * from lista_evento where id = p_id$$

DROP PROCEDURE IF EXISTS `select_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_producto` (IN `p_id` INT(15))  NO SQL
SELECT * from producto where id = p_id$$

DROP PROCEDURE IF EXISTS `select_producto_lista_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_producto_lista_evento` (IN `p_id` INT(15))  NO SQL
SELECT * FROM producto_lista_evento WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `select_proveedor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_proveedor` (IN `p_id` INT(15))  NO SQL
SELECT * from proveedor where id = p_id$$

DROP PROCEDURE IF EXISTS `select_reserva`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_reserva` (IN `p_id` INT(15))  NO SQL
SELECT * from reserva where id = p_id$$

DROP PROCEDURE IF EXISTS `select_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_tienda` (IN `p_id` INT(15))  NO SQL
SELECT * from tienda where id = p_id$$

DROP PROCEDURE IF EXISTS `select_tipo_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_tipo_evento` (IN `p_id` INT(15))  NO SQL
SELECT * from tipo_evento where id = p_id$$

DROP PROCEDURE IF EXISTS `select_tipo_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_tipo_producto` (IN `p_id` INT(15))  NO SQL
SELECT * from tipo_producto where id = p_id$$

DROP PROCEDURE IF EXISTS `select_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_usuario` (IN `p_id` INT(15))  NO SQL
SELECT * from usuario where id = p_id$$

DROP PROCEDURE IF EXISTS `update_compra`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_compra` (IN `p_id` INT(15), IN `p_id_reserva` INT(15), IN `p_total` INT(10), IN `p_subtotal` INT(10), IN `p_fecha_compra` DATE, IN `p_descuento` INT(5), IN `p_impuesto_ventas` INT(5), IN `p_cantidad` INT(5), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE compra SET
	id_reserva 		= p_id_reserva,
    total 			= p_total,
    subtotal		= p_subtotal,
    fecha_compra	= p_fecha_compra,
    descuento 		= p_descuento,
    impuesto_ventas	= p_impuesto_ventas,
    cantidad		= p_cantidad,
    id_tienda		= p_id_tienda,
    estado			= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_convenio`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_convenio` (IN `p_id` INT(15), IN `p_id_usuario` INT(15), IN `p_nombre` VARCHAR(50), IN `p_descripcion` VARCHAR(200), IN `p_descuento` INT(5), IN `p_id_tienda` INT(14), IN `p_estado` INT(1))  NO SQL
UPDATE convenio SET
	id_usuario 		= p_id_usuario,
    nombre			= p_nombre,
    descripcion		= p_descripcion,
    descuento 		= p_descuento,
    estado			= p_estado,
    id_tienda		= p_id_tienda
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_estado_lista`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_estado_lista` (IN `p_id` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE lista_evento SET
	estado = p_estado
    WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_lista_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_lista_evento` (IN `p_id` INT(15), IN `p_nombre` VARCHAR(100), IN `p_fecha_evento` DATE, IN `p_envio` TINYINT(1), IN `p_latitud` FLOAT(12,8), IN `p_longitud` FLOAT(12,8), IN `p_id_asociado` INT(15), IN `p_id_tipo_evento` INT(15), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE lista_evento SET
	nombre 			= p_nombre,
    fecha_evento 	= p_fecha_evento,
    envio			= p_envio,
    latitud			= p_latitud,
    longitud 		= p_longitud,
    id_asociado		= p_id_asociado,
    id_tipo_evento	= p_id_tipo_evento,
    id_tienda		= p_id_tienda,
    estado			= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_producto` (IN `p_id` INT(15), IN `p_id_producto` INT(15), IN `p_foto_producto` MEDIUMTEXT, IN `p_nombre` VARCHAR(25), IN `p_descripcion` VARCHAR(250), IN `p_precio_unitario` INT(10), IN `p_marca` VARCHAR(25), IN `p_cantidad` INT(5), IN `p_id_proveedor` INT(15), IN `p_id_tipo` INT(15), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE producto SET
	id_producto 	= p_id_producto,
    foto_producto 	= p_foto_producto,
    nombre			= p_nombre,
    descripcion		= p_descripcion,
    precio_unitario	= p_precio_unitario,
    marca			= p_marca,
    cantidad		= p_cantidad,
    id_proveedor	= p_id_proveedor,
    id_tipo			= p_id_tipo,
    id_tienda		= p_id_tienda,
    estado			= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_producto_lista_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_producto_lista_evento` (IN `p_id` INT(15), IN `p_id_producto` INT(15), IN `p_id_lista_evento` INT(15), IN `p_cantidad` INT(5), IN `p_estado` INT(1))  NO SQL
UPDATE reserva SET
    id_producto 			= p_id_producto,
    id_lista_evento			= p_id_producto,
    cantidad				= p_cantidad,
    estado					= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_proveedor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_proveedor` (IN `p_id` INT(15), IN `p_nombre` VARCHAR(25), IN `p_numero_telefono_primario` INT(15), IN `p_numero_telefono_secundario` INT(15), IN `p_fecha_inicio_relacion` DATE, IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE proveedor SET
	nombre 						= p_nombre,
    numero_telefono_primario 	= p_numero_telefono_primario,
    numero_telefono_secundario	= p_numero_telefono_secundario,
    fecha_inicio_relacion		= p_fecha_inicio_relacion,
    id_tienda 					= p_id_tienda,
    estado						= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_reserva`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_reserva` (IN `p_id` INT(15), IN `p_id_producto` INT(15), IN `p_id_lista_evento` INT(15), IN `p_id_usuario` INT(15), IN `p_cantidad` INT(5), IN `p_estado` INT(1))  NO SQL
UPDATE reserva SET
	id_producto 	= p_id_producto,
    id_lista_evento = p_id_lista_evento,
    id_usuario		= p_id_usuario,
    cantidad		= p_cantidad,
    estado			= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_tienda` (IN `p_id` INT(15), IN `p_identificacion` INT(15), IN `p_logo_tienda` MEDIUMTEXT, IN `p_nombre` VARCHAR(25), IN `p_numero_telefono` INT(15), IN `p_correo_electronico` VARCHAR(100), IN `p_provincia` VARCHAR(25), IN `p_canton` VARCHAR(25), IN `p_distrito` VARCHAR(25), IN `p_impuesto_ventas` INT(5), IN `p_tipo_tienda` VARCHAR(50), IN `p_latitud` FLOAT(12,8), IN `p_longitud` FLOAT(12,8), IN `p_estado` INT(1))  NO SQL
UPDATE tienda SET
	identificacion 		= p_identificacion,
    logo_tienda 		= p_logo_tienda,
    nombre				= p_nombre,
    numero_telefono		= p_numero_telefono,
    correo_electronico 	= p_correo_electronico,
    provincia			= p_provincia,
    canton				= p_canton,
    distrito 			= p_distrito,
    impuesto_ventas		= p_impuesto_ventas,
    tipo_tienda 		= p_tipo_tienda,
    latitud				= p_latitud,
    longitud			= p_longitud,
    estado				= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_tipo_evento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_tipo_evento` (IN `p_id` INT(15), IN `p_imagen_evento` MEDIUMTEXT, IN `p_nombre` VARCHAR(50), IN `p_descripcion` VARCHAR(250), IN `p_descuento` INT(5), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE tipo_evento SET
	imagen_evento 	= p_imagen_evento,
    nombre 			= p_nombre,
    descripcion		= p_descripcion,
    descuento		= p_descuento,
    id_tienda		= p_id_tienda,
    estado			= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_tipo_producto`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_tipo_producto` (IN `p_id` INT(15), IN `p_nombre` VARCHAR(25), IN `p_descripcion` VARCHAR(250), IN `p_precedero` TINYINT(1), IN `p_fecha_vencimiento` DATE, IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
UPDATE tipo_producto SET
	nombre 				= p_nombre,
    descripcion 		= p_descripcion,
    precedero			= p_precedero,
    fecha_vencimiento	= p_fecha_vencimiento,
    id_tienda			= p_id_tienda,
    estado				= p_estado
    	WHERE id = p_id$$

DROP PROCEDURE IF EXISTS `update_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_usuario` (IN `p_id` INT(15), IN `p_identificacion` INT(15), IN `p_foto_perfil` MEDIUMTEXT, IN `p_primer_nombre` VARCHAR(25), IN `p_segundo_nombre` VARCHAR(25), IN `p_primer_apellido` VARCHAR(25), IN `p_segundo_apellido` VARCHAR(25), IN `p_nacionalidad` VARCHAR(25), IN `p_fecha_nacimiento` DATE, IN `p_genero` VARCHAR(15), IN `p_correo_electronico` VARCHAR(100), IN `p_numero_telefono_primario` INT(15), IN `p_numero_telefono_secundario` INT(15), IN `p_contrasena` VARCHAR(25), IN `p_tipo` INT(1), IN `p_estado` INT(1), IN `p_id_tienda` INT(15), IN `p_juridico` INT(1))  NO SQL
UPDATE usuario SET
    identificacion 				= p_identificacion,
    foto_perfil					= p_foto_perfil,
    primer_nombre				= p_primer_nombre,
    segundo_nombre				= p_segundo_nombre,
    primer_apellido				= p_primer_apellido,
    segundo_apellido			= p_segundo_apellido,
    nacionalidad				= p_nacionalidad,
    fecha_nacimiento			= p_fecha_nacimiento,
    genero						= p_genero,
    correo_electronico			= p_correo_electronico,
    numero_telefono_primario	= p_numero_telefono_primario,
    numero_telefono_secundario	= p_numero_telefono_secundario,
    contrasena					= p_contrasena,
    tipo						= p_tipo,
    estado						= p_estado,
    id_tienda					= p_id_tienda,
    juridico					= p_juridico
    	WHERE id = p_id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
CREATE TABLE `compra` (
  `id` int(15) NOT NULL,
  `id_reserva` int(15) NOT NULL,
  `total` int(10) NOT NULL,
  `subtotal` int(10) NOT NULL,
  `fecha_compra` date NOT NULL,
  `descuento` int(10) NOT NULL,
  `impuesto_ventas` int(10) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `id_tienda` int(15) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `convenio`
--

DROP TABLE IF EXISTS `convenio`;
CREATE TABLE `convenio` (
  `id` int(15) NOT NULL,
  `id_usuario` int(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `descuento` int(5) NOT NULL,
  `id_tienda` int(15) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `convenio`
--

INSERT INTO `convenio` (`id`, `id_usuario`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(1, 6, 'Sociedad', 'Acuerdo mutuo', 10, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lista_evento`
--

DROP TABLE IF EXISTS `lista_evento`;
CREATE TABLE `lista_evento` (
  `id` int(15) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_evento` date NOT NULL,
  `envio` tinyint(1) NOT NULL,
  `latitud` float(12,8) DEFAULT NULL,
  `longitud` float(12,8) DEFAULT NULL,
  `id_asociado` int(15) NOT NULL,
  `id_tipo_evento` int(15) NOT NULL,
  `id_tienda` int(15) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lista_evento`
--

INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(1, 'Caridad Cenfotec para niños pobres', '2016-11-30', 1, 9.93211842, -84.03103638, 6, 6, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `id` int(15) NOT NULL,
  `id_producto` int(15) NOT NULL,
  `foto_producto` mediumtext NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `precio_unitario` int(15) NOT NULL,
  `marca` varchar(25) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `id_proveedor` int(15) NOT NULL,
  `id_tipo` int(15) NOT NULL,
  `id_tienda` int(15) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(1, 100, 'imgs/uploads/foto_producto/525469ikea1.jpg', 'Sillon negro de cuero', 'Sillon negro de cuero', 150000, 'Ikea', 12, 1, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(2, 101, 'imgs/uploads/foto_producto/679520ikea2.jpg', 'Sofa doble exterior', 'Sofa doble exterior', 300000, 'Ikea', 20, 1, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(3, 102, 'imgs/uploads/foto_producto/659795ikea3.jpg', 'Cojin negro exterior', 'Cojin negro exterior', 15000, 'Ikea', 14, 1, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(4, 103, 'imgs/uploads/foto_producto/242396ikea4.jpg', 'Sofa triple exterior', 'Sofa triple exterior', 360000, 'Ikea', 6, 1, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(5, 104, 'imgs/uploads/foto_producto/746805ikea5.jpg', 'Cojin anaranjado', 'Cojin anaranjado', 20000, 'Ikea', 11, 1, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(6, 105, 'imgs/uploads/foto_producto/891588ikea6.jpg', 'Juego copas de vidrio', 'Juego copas de vidrio', 15000, 'Ikea', 16, 1, 2, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(7, 106, 'imgs/uploads/foto_producto/610894ikea7.jpg', 'vaso de vidrio', 'vaso de vidrio', 5000, 'Ikea', 16, 1, 2, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(8, 107, 'imgs/uploads/foto_producto/794487ikea8.jpg', 'kit de hielo', 'kit de hielo', 2000, 'Ikea', 12, 1, 2, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(9, 108, 'imgs/uploads/foto_producto/157337ikea9.jpg', 'mesa de noche', 'mesa de noche', 40000, 'Ikea', 8, 1, 3, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(10, 109, 'imgs/uploads/foto_producto/233372ikea10.jpg', 'parrilla black mamba', 'parrilla black mamba', 25000, 'Ikea', 16, 1, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(11, 110, 'imgs/uploads/foto_producto/387545ikea11.jpg', 'mesa parrilla exterior', 'mesa parrilla exterior', 500000, 'Ikea', 7, 1, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(12, 111, 'imgs/uploads/foto_producto/818175ikea12.jpg', 'espejo niño', 'espejo niño', 12000, 'Ikea', 12, 1, 4, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(13, 112, 'imgs/uploads/foto_producto/271908ikea13.jpg', 'espejo niña', 'espejo niña', 12000, 'Ikea', 27, 1, 4, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(14, 113, 'imgs/uploads/foto_producto/841681ikea14.jpg', 'cojin tab', 'cojin tab', 7000, 'Ikea', 7, 1, 3, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(15, 114, 'imgs/uploads/foto_producto/618668ikea15.jpg', 'colchon zentel', 'colchon zentel', 100000, 'Ikea', 29, 1, 3, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(16, 115, 'imgs/uploads/foto_producto/707721ikea16.jpg', 'armario ziggs', 'armario ziggs', 200000, 'Ikea', 7, 1, 3, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(17, 116, 'imgs/uploads/foto_producto/408856ikea17.jpg', 'armario desplegable', 'armario desplegable', 300000, 'Ikea', 17, 1, 3, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(18, 117, 'imgs/uploads/foto_producto/97186ikea18.jpg', 'armario panel visor', 'armario panel visor', 1100000, 'Ikea', 16, 1, 3, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(19, 118, 'imgs/uploads/foto_producto/450257ikea19.jpg', 'armario cuarto chic', 'armario cuarto chic', 60000, 'Ikea', 14, 1, 3, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(20, 119, 'imgs/uploads/foto_producto/145661ikea20.jpg', 'mesa de noche', 'mesa de noche', 79000, 'Ikea', 15, 1, 3, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(21, 120, 'imgs/uploads/foto_perfil/402758radio1.jpg', 'mp3', 'mp3', 20000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(22, 121, 'imgs/uploads/foto_producto/420471radio2.jpg', 'ipod nano', 'ipod nano', 100000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(23, 122, 'imgs/uploads/foto_producto/535987radio3.jpg', 'ipod 3', 'ipod 3', 100000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(24, 123, 'imgs/uploads/foto_producto/62126radio4.jpg', 'gopro 1', 'gopro 1', 125000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(25, 124, 'imgs/uploads/foto_producto/843236radio5.jpg', 'gopro hero 3', 'gopro hero 3', 200000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(26, 125, 'imgs/uploads/foto_producto/866193radio6.jpg', 'Cámara Canon', 'Cámara Canon', 500000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(27, 126, 'imgs/uploads/foto_producto/230994radio7.jpg', 'televisor samsung', 'televisor samsung', 1000000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(28, 127, 'imgs/uploads/foto_producto/596626radio8.jpg', 'pantalla LG', 'pantalla LG', 1000000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(29, 128, 'imgs/uploads/foto_producto/724580radio9.jpg', 'microfono sony', 'microfono sony', 43000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(30, 129, 'imgs/uploads/foto_producto/232915radio10.jpg', 'juego minecraft xbox', 'juego minecraft xbox', 26000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(31, 130, 'imgs/uploads/foto_producto/197214radio11.jpg', 'juego street fighter', 'juego street fighter', 28000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(32, 131, 'imgs/uploads/foto_producto/723330radio12.jpg', 'xbox 360', 'xbox 360 consola de video juegos ', 200000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(33, 132, 'imgs/uploads/foto_producto/112277radio13.jpg', 'PS4', 'Fifa 2016 bundle CH-1200', 230000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(34, 133, 'imgs/uploads/foto_producto/737171radio14.jpg', 'micro sd', 'micro sd', 12000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(35, 134, 'imgs/uploads/foto_producto/278554radio15.jpg', 'kingston usb', 'kingston usb 16 GBs', 8000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(36, 135, 'imgs/uploads/foto_producto/411020radio16.jpg', 'Bluetooth radio', 'Adaptador de radio para el automovil con soporte para teléfono', 24000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(37, 136, 'imgs/uploads/foto_producto/598486radio17.jpg', 'cargador de baterias', 'cargador de baterias', 16000, 'Maxtech', 15, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(38, 137, 'imgs/uploads/foto_producto/99991radio18.jpg', 'cagador xbox live', 'cagador xbox live', 16000, 'Maxtech', 9, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(39, 138, 'imgs/uploads/foto_producto/818419radio19.jpg', 'cargador playstation', 'cargador playstation', 26000, 'Maxtech', 9, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(40, 139, 'imgs/uploads/foto_producto/127978radio20.jpg', 'wii U', 'wii U', 300000, 'Maxtech', 12, 2, 5, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(41, 140, 'imgs/uploads/foto_producto/278859target1.jpg', 'camiseta metallica', 'camiseta metallica', 8000, 'Fruitoftheloom', 13, 3, 6, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(42, 141, 'imgs/uploads/foto_producto/537908target2.jpg', 'camiseta star wars', 'camiseta metallicacamiseta star wars', 8000, 'Fruitoftheloom', 13, 3, 6, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(43, 142, 'imgs/uploads/foto_producto/661716target3.jpg', 'camiseta bit8', 'camiseta bit8', 8000, 'Fruitoftheloom', 13, 3, 6, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(44, 143, 'imgs/uploads/foto_producto/841986target4.jpg', 'buzo maxwell', 'buzo maxwell', 8000, 'Fruitoftheloom', 13, 3, 6, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(45, 144, 'imgs/uploads/foto_producto/745555target5.jpg', 'camisa mangas fruit', 'camisa mangas fruit', 8000, 'Fruitoftheloom', 13, 3, 6, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(46, 145, 'imgs/uploads/foto_producto/770951target6.jpg', 'camiseta nirvana', 'camiseta nirvana', 8000, 'Fruitoftheloom', 13, 3, 6, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(47, 146, 'imgs/uploads/foto_producto/151850target7.jpg', 'camiseta dad bod', 'camiseta dad bod', 8000, 'Fruitoftheloom', 13, 3, 6, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(48, 147, 'imgs/uploads/foto_producto/24322target8.jpg', 'camiseta deadpool', 'camiseta deadpool', 8000, 'Fruitoftheloom', 13, 3, 6, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(49, 148, 'imgs/uploads/foto_producto/94229target9.jpg', 'bota newells', 'bota newells', 16000, 'Fruitoftheloom', 54, 3, 7, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(50, 149, 'imgs/uploads/foto_producto/18652target10.jpg', 'zapato newells', 'zapato newells', 16000, 'Fruitoftheloom', 54, 3, 7, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(51, 150, 'imgs/uploads/foto_producto/131728target11.jpg', 'tacon zoo', 'tacon zoo', 16000, 'Fruitoftheloom', 54, 3, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(52, 151, 'imgs/uploads/foto_producto/640771target12.jpg', 'zapatilla rayada', 'zapatilla rayada', 16000, 'Fruitoftheloom', 54, 3, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(53, 152, 'imgs/uploads/foto_producto/916039target13.jpg', 'zapatilla rain forest', 'zapatilla rain forest', 16000, 'Fruitoftheloom', 54, 3, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(54, 153, 'imgs/uploads/foto_producto/997043target14.jpg', 'zapatilla bicis', 'zapatilla bicis', 16000, 'Fruitoftheloom', 54, 3, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(55, 154, 'imgs/uploads/foto_producto/944758target15.jpg', 'zapatilla animal printz', 'zapatilla animal printz', 16000, 'Fruitoftheloom', 54, 3, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(56, 155, 'imgs/uploads/foto_producto/162612target16.jpg', 'zapatilla beige', 'zapatilla beige', 16000, 'Fruitoftheloom', 54, 3, 7, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(57, 156, 'imgs/uploads/foto_producto/307639target17.jpg', 'zapato casual gray', 'zapato casual gray', 16000, 'Fruitoftheloom', 54, 3, 7, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(58, 157, 'imgs/uploads/foto_producto/927655target18.jpg', 'botas hightech', 'botas hightech', 16000, 'Fruitoftheloom', 54, 3, 7, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(59, 158, 'imgs/uploads/foto_producto/436843target19.jpg', 'tennis tryhard', 'tennis tryhard', 16000, 'Fruitoftheloom', 54, 3, 7, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(60, 159, 'imgs/uploads/foto_producto/556627target20.jpg', 'zapatilla blacktal', 'zapatilla blacktal', 16000, 'Fruitoftheloom', 54, 3, 7, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(61, 300, 'imgs/uploads/foto_producto/77126300.jpg', 'Muñeca Descendiente de Au', 'Recomendada para niñas desde los 6 años', 40950, 'Baby Alive', 52, 5, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(62, 301, 'imgs/uploads/foto_producto/292883301.jpg', 'Muñecas Coleccionables De', 'Recomendada para niñas desde los 5 años,', 42525, 'Baby Alive', 36, 5, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(63, 302, 'imgs/uploads/foto_producto/380716302.jpg', 'Teléfonos Teléfonos inter', 'Funciona cómo un teléfono de verdad e incluye sonido de llamada! Monster High, ¡funciona cómo un teléfono de verdad e incluye sonido de llamada ', 85525, 'Mattel', 39, 6, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(64, 303, 'imgs/uploads/foto_producto/573303320.jpg', 'Avión Navy Star', 'Incluye luces y sonido de un avión jet real, mando a distancia con múltiple funciones', 30520, 'Mattel', 34, 6, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(65, 304, 'imgs/uploads/foto_producto/8713303.jpg', 'Lanzador de Cañón Doble N', 'Alcance de hasta 8.5 metros. Perfecto para atacar y mojar a tu contrincante.', 56360, 'Nerf', 34, 7, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(66, 305, 'imgs/uploads/foto_producto/349985305.png', 'Mega Arco Nerf', 'Con  poder de lanzamiento hasta de 30 metros de distancia.', 3652, 'Nerf', 34, 7, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(67, 306, 'imgs/uploads/foto_producto/969879306.jpg', 'Set de carros Hot Wheels ', 'Recomendado para niños desde los 3 años.', 2152, 'Nerf', 34, 7, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(68, 307, 'imgs/uploads/foto_producto/28712307.jpg', 'Pista Split Speeders Hot ', 'Recomendado para niños desde los 4 años.', 6952, 'Hotwheels', 34, 8, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(69, 308, 'imgs/uploads/foto_producto/323004308.jpg', 'Camión de construcción Bu', 'Recomendado para niños desde los 4 años.', 2560, 'Hotwheels', 34, 8, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(70, 309, 'imgs/uploads/foto_producto/729367309.jpg', 'Set de juego Shark Jump', 'Ideal para niños de 3 años en adelante.', 9582, 'Hotwheels', 34, 8, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(71, 310, 'imgs/uploads/foto_producto/426843310.jpg', 'Pista de carros Volcán Ex', 'Lanza hasta 8 carros.', 6375, 'Hotwheels', 34, 8, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(72, 311, 'imgs/uploads/foto_producto/590528311.png', 'Futbolito, ping-pong, hoc', 'Incluye baraja de naipes y pelotas para cada juego.', 3658, 'Mattel', 34, 6, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(73, 312, 'imgs/uploads/foto_producto/184837312.jpg', 'Patines en línea de Spide', 'Incluye patines, casco, coderas y rodilleras.', 9872, 'Hasbro', 34, 9, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(74, 313, 'imgs/uploads/foto_producto/966312313.jpg', 'BB8 a control remoto de S', 'El Despertar de la Fuerza, con sonidos reales como los de la película, fácil de armar y aprender a controlar. Recomendado para niños desde los 5 años.', 4529, 'Hasbro', 34, 9, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(75, 314, 'imgs/uploads/foto_producto/342333314.jpg', 'Drone de 4 hélices ', 'A control remoto y con dirección hacia adelante, atrás, arriba, abajo, derecha e izquierda. Con rotación de 360º.', 5630, 'Rastar', 34, 10, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(76, 315, 'imgs/uploads/foto_producto/182611315.jpg', 'Carruaje Real de Peppa La', 'Set incluye carruaje, caballo real y figuras de los dos personajes. Para niños desde los 3 años.', 9870, 'Lego', 34, 11, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(77, 317, 'imgs/uploads/foto_producto/239835317.jpeg', 'Lego Duplo Frutas y Color', 'Con 384 piezas para armar y crear', 6589, 'Lego', 34, 11, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(78, 318, 'imgs/uploads/foto_producto/280353318.jpg', 'Lego Duplo de Miles del M', 'Con 23 piezas para construir. Recomendado para niños de 2 a 5 años.', 4475, 'Lego', 34, 11, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(79, 319, 'imgs/uploads/foto_producto/560255319.jpeg', 'Lego Speed Estación de Ma', 'Con 332 piezas para construir y armar. Incluye accesorio, carro y figuras Lego.', 6985, 'Lego', 34, 11, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(80, 401, 'imgs/uploads/foto_producto/526262401.png', 'Silla de oficina', 'Silla de oficina de cuero', 120000, 'Highlander', 32, 12, 10, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(81, 402, 'imgs/uploads/foto_producto/609827402.png', 'Proyector', 'Alta resolución', 350000, 'EPSON', 32, 13, 10, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(82, 403, 'imgs/uploads/foto_producto/24993403.png', 'Tablet', '12\' - Gran eficiencia', 124000, 'Samsung', 32, 14, 10, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(83, 404, 'imgs/uploads/foto_producto/573181404.png', 'Escritorio', '4x5 mts - 2 estantes', 170000, 'Highlander', 32, 12, 10, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(84, 405, 'imgs/uploads/foto_producto/557358405.png', 'Organizador de libros', 'Incluye libro', 12000, 'Highlander', 32, 12, 10, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(85, 406, 'imgs/uploads/foto_producto/565316406.png', 'Palmera artificial', 'Importada desde Arabia Saudita', 22000, 'Deco', 32, 15, 11, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(86, 407, 'imgs/uploads/foto_producto/480470407.png', 'Fuente decorativa', 'Importada desde China', 22000, 'Deco', 32, 15, 11, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(87, 408, 'imgs/uploads/foto_producto/332577408.png', 'Fuente decorativa estilo', 'Importada desde China', 48000, 'Deco', 32, 15, 11, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(88, 409, 'imgs/uploads/foto_producto/118222409.png', 'Chimenea', 'Hecha con los mejores materiales', 550000, 'Highlander', 32, 12, 11, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(89, 410, 'imgs/uploads/foto_producto/214470410.png', 'Sillón esquinero', 'Almohadones incluidos', 70000, 'FurnitureX', 32, 16, 11, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(90, 411, 'imgs/uploads/foto_producto/512542411.png', 'Sillón individual', 'Muy cómodo', 80000, 'FurnitureX', 32, 16, 11, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(91, 412, 'imgs/uploads/foto_producto/893905412.png', 'Sillón con apoya brazos', 'Hecho de madera importada de Brasil', 100000, 'FurnitureX', 32, 16, 12, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(92, 413, 'imgs/uploads/foto_producto/176636413.png', 'Sillón familiar', 'Hecho de cuero', 220000, 'FurnitureX', 32, 16, 12, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(93, 414, 'imgs/uploads/foto_producto/150447414.png', 'Mueble estantes', 'Hecho de madera de alta calidad', 110000, 'Coast', 32, 17, 12, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(94, 415, 'imgs/uploads/foto_producto/839242415.png', 'Desktop', 'Memora Ram 8 GB - Procesador Intel', 280000, 'Dell', 32, 18, 13, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(95, 416, 'imgs/uploads/foto_producto/602571416.png', 'PC all in 1', 'Monitor de 24" - incluye componentes', 310000, 'Lenovo', 32, 19, 13, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(96, 417, 'imgs/uploads/foto_producto/201879417.png', 'Monitor curvado', '46" - Resolución de alta definición', 310000, 'HP', 32, 20, 13, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(97, 418, 'imgs/uploads/foto_producto/466903418.png', 'Desktop gamer', 'La mejor PC del mercado', 375000, 'CyberPower', 32, 21, 13, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(98, 419, 'imgs/uploads/foto_producto/680099419.png', 'Monitor de actividad', 'Controla tu actividad física ', 75000, 'Smartech', 32, 22, 13, 5, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(99, 420, 'imgs/uploads/foto_producto/301480420.png', 'SmartWatch', 'Dispositivo de alta eficiencia', 159000, 'Smartech', 32, 22, 13, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `producto_lista_evento`
--

DROP TABLE IF EXISTS `producto_lista_evento`;
CREATE TABLE `producto_lista_evento` (
  `id` int(15) NOT NULL,
  `id_producto` int(15) NOT NULL,
  `id_lista_evento` int(15) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `producto_lista_evento`
--

INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(1, 21, 1, 10, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(2, 22, 1, 2, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(3, 23, 1, 6, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(4, 24, 1, 1, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(5, 25, 1, 3, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(6, 27, 1, 5, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(7, 28, 1, 7, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(8, 30, 1, 6, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(9, 31, 1, 4, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(10, 32, 1, 5, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(11, 33, 1, 4, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(12, 35, 1, 4, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(13, 38, 1, 6, '2');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(14, 39, 1, 6, '2');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(15, 40, 1, 3, '2');

-- --------------------------------------------------------

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor` (
  `id` int(15) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `numero_telefono_primario` int(15) NOT NULL,
  `numero_telefono_secundario` int(15) DEFAULT NULL,
  `fecha_inicio_relacion` date NOT NULL,
  `id_tienda` int(15) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `proveedor`
--

INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(1, 'Ikea', 28884983, 89288918, '2013-01-17', 1, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(2, 'Maxtech', 28839288, 82982828, '2002-11-18', 2, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(3, 'Fruitoftheloom', 25882828, 82882839, '2012-03-12', 3, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(5, 'Baby Alive', 22238122, 88289812, '2014-06-02', 4, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(6, 'Mattel', 22238122, 88289812, '2014-06-02', 4, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(7, 'Nerf', 22238122, 88289812, '2014-06-02', 4, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(8, 'Hotwheels', 22238122, 88289812, '2014-06-02', 4, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(9, 'Hasbro', 22238122, 88289812, '2014-06-02', 4, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(10, 'Rastar', 22238122, 88289812, '2014-06-02', 4, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(11, 'Lego', 22238122, 88289812, '2014-06-02', 4, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(12, 'Highlander', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(13, 'EPSON', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(14, 'Samsung', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(15, 'Deco', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(16, 'FurnitureX', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(17, 'Coast', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(18, 'Dell', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(19, 'Lenovo', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(20, 'HP', 23839883, 81982982, '2007-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(21, 'CyberPower', 27387287, 82898983, '2010-06-14', 5, 1);
INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(22, '0', 22222222, 88888888, '2012-06-12', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
CREATE TABLE `reserva` (
  `id` int(15) NOT NULL,
  `id_producto` int(15) NOT NULL,
  `id_lista_evento` int(15) NOT NULL,
  `id_usuario` int(15) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reserva`
--

INSERT INTO `reserva` (`id`, `id_producto`, `id_lista_evento`, `id_usuario`, `cantidad`, `estado`) VALUES(1, 40, 1, 8, 3, 1);
INSERT INTO `reserva` (`id`, `id_producto`, `id_lista_evento`, `id_usuario`, `cantidad`, `estado`) VALUES(4, 39, 1, 2, 3, 1);
INSERT INTO `reserva` (`id`, `id_producto`, `id_lista_evento`, `id_usuario`, `cantidad`, `estado`) VALUES(5, 39, 1, 2, 3, 1);
INSERT INTO `reserva` (`id`, `id_producto`, `id_lista_evento`, `id_usuario`, `cantidad`, `estado`) VALUES(6, 38, 1, 2, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tienda`
--

DROP TABLE IF EXISTS `tienda`;
CREATE TABLE `tienda` (
  `id` int(15) NOT NULL,
  `identificacion` int(15) NOT NULL,
  `logo_tienda` mediumtext NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `numero_telefono` int(15) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `provincia` varchar(25) NOT NULL,
  `canton` varchar(25) NOT NULL,
  `distrito` varchar(25) NOT NULL,
  `impuesto_ventas` int(5) NOT NULL,
  `tipo_tienda` varchar(25) NOT NULL,
  `latitud` float(12,8) NOT NULL,
  `longitud` float(12,8) NOT NULL,
  `estado` int(1) NOT NULL,
  `id_administrador` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tienda`
--

INSERT INTO `tienda` (`id`, `identificacion`, `logo_tienda`, `nombre`, `numero_telefono`, `correo_electronico`, `provincia`, `canton`, `distrito`, `impuesto_ventas`, `tipo_tienda`, `latitud`, `longitud`, `estado`, `id_administrador`) VALUES(1, 2147483647, 'imgs/uploads/logo_tienda/329559ikealogo.png', 'Ikea', 28382982, 'ikea@ikeacr.com', 'Heredia', 'Heredia', 'San Joaquin', 13, 'Almacen', 10.00545216, -84.15844727, 1, 1);
INSERT INTO `tienda` (`id`, `identificacion`, `logo_tienda`, `nombre`, `numero_telefono`, `correo_electronico`, `provincia`, `canton`, `distrito`, `impuesto_ventas`, `tipo_tienda`, `latitud`, `longitud`, `estado`, `id_administrador`) VALUES(2, 1234, 'imgs/uploads/logo_tienda/1846542000px-target_logo.svg.png', 'RadioShack', 89282918, 'radioshack@rscr.com', 'Cartago', 'Cartago', 'Turrialba', 13, 'Departamental', 9.82756233, -83.81512451, 1, 2);
INSERT INTO `tienda` (`id`, `identificacion`, `logo_tienda`, `nombre`, `numero_telefono`, `correo_electronico`, `provincia`, `canton`, `distrito`, `impuesto_ventas`, `tipo_tienda`, `latitud`, `longitud`, `estado`, `id_administrador`) VALUES(3, 2147483647, 'imgs/uploads/logo_tienda/5060182000px-target_logo.svg.png', 'Target', 28838828, 'target@targetcr.com', 'Cartago', 'Cartago', 'Turrialba', 13, 'Departamental', 9.83864117, -83.86593628, 1, 3);
INSERT INTO `tienda` (`id`, `identificacion`, `logo_tienda`, `nombre`, `numero_telefono`, `correo_electronico`, `provincia`, `canton`, `distrito`, `impuesto_ventas`, `tipo_tienda`, `latitud`, `longitud`, `estado`, `id_administrador`) VALUES(4, 2147483647, 'imgs/uploads/logo_tienda/560682jugueton.png', 'Jugueton', 28473877, 'juguetoncr@cr.com', 'San José', 'San Jose', 'San Sebastian', 13, 'Departamental', 9.91525078, -84.09089661, 1, 4);
INSERT INTO `tienda` (`id`, `identificacion`, `logo_tienda`, `nombre`, `numero_telefono`, `correo_electronico`, `provincia`, `canton`, `distrito`, `impuesto_ventas`, `tipo_tienda`, `latitud`, `longitud`, `estado`, `id_administrador`) VALUES(5, 2147483647, 'imgs/uploads/logo_tienda/528518officedepot.png', 'Office Depot', 27382728, 'officedepot@odcr.com', 'Heredia', 'Heredia', 'San Joaquin', 13, 'Departamental', 9.95224953, -84.11073303, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_evento`
--

DROP TABLE IF EXISTS `tipo_evento`;
CREATE TABLE `tipo_evento` (
  `id` int(15) NOT NULL,
  `imagen_evento` mediumtext NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `descuento` int(5) NOT NULL,
  `id_tienda` int(15) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tipo_evento`
--

INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(1, 'imgs/uploads/tipo_evento/912411mudanza.png', 'Mudanza', 'Mudanza familiar', 5, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(2, 'imgs/uploads/tipo_evento/86485boda.png', 'Boda', 'Fiesta de bodas', 10, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(3, 'imgs/uploads/tipo_evento/392118caridad.png', 'Caridad', 'Evento de beneficencia', 20, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(4, 'imgs/uploads/tipo_evento/723483babyshower.png', 'Baby Shower', 'Baby shower', 10, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(5, 'imgs/uploads/tipo_evento/175721navidad.png', 'Navidad', 'Época navideña', 15, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(6, '25', 'Caridad', 'Evento de beneficencia', 25, 2, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(7, 'imgs/uploads/tipo_evento/466202cumpleanos.png', 'Cumpleaños', 'Fiesta de cumpleaños', 10, 2, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(8, 'imgs/uploads/tipo_evento/588059primeracomunion.png', 'Primera comunión', 'Celebración de primera comunión', 5, 2, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(9, 'imgs/uploads/tipo_evento/616259navidad.png', 'Navidad', 'Época navideña', 15, 2, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(10, 'imgs/uploads/tipo_evento/304712graduacion.png', 'Graduación', 'Fiesta de graduación', 10, 2, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(11, 'imgs/uploads/tipo_evento/109137boda.png', 'Boda', 'Fiesta de bodas', 5, 2, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(12, 'imgs/uploads/tipo_evento/772811halloween.png', 'Halloween', 'Fiesta de halloween', 10, 3, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(13, 'imgs/uploads/tipo_evento/645314navidad.png', 'Navidad', 'Época navideña', 15, 3, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(14, 'imgs/uploads/tipo_evento/209257cumpleanos.png', 'Cumpleaños', 'Fiesta de cumpleaños', 10, 3, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(15, 'imgs/uploads/tipo_evento/740372aniversario.png', 'Aniversario', 'Aniversario', 5, 3, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(16, 'imgs/uploads/tipo_evento/611869caridad.png', 'Caridad', 'Evento de beneficencia', 25, 3, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(17, 'imgs/uploads/tipo_evento/75937fiesta.png', 'Fiesta', 'Fiesta casual', 4, 3, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(18, 'imgs/uploads/tipo_evento/39742315anos.png', 'Fiesta de 15s', 'Mis 15s', 15, 3, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(19, 'imgs/uploads/tipo_evento/333919pascua.png', 'Pascua', 'Celebración de pascua', 10, 3, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(20, 'imgs/uploads/tipo_evento/775920cumpleanos.png', 'Cumpleaños', 'Fiesta de cumpleaños', 5, 4, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(21, 'imgs/uploads/tipo_evento/22310babyshower.png', 'Baby Shower', 'Celebración de baby shower', 5, 4, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(22, 'imgs/uploads/tipo_evento/655374caridad.png', 'Caridad', 'Evento de beneficencia', 30, 4, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(23, 'imgs/uploads/tipo_evento/400533halloween.png', 'Halloween', 'Fiesta de halloween', 15, 4, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(24, 'imgs/uploads/tipo_evento/828968navidad.png', 'Navidad', 'Celebración de navidad', 10, 4, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(25, 'imgs/uploads/tipo_evento/122673primeracomunion.png', 'Primera comunión', 'Celebración de comunión', 7, 4, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(26, 'imgs/uploads/tipo_evento/668423graduacion.png', 'Graduación', 'Evento de graduación', 12, 4, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(27, 'imgs/uploads/tipo_evento/636503pascua.png', 'Pascua', 'Día de pascua', 4, 4, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(28, 'imgs/uploads/tipo_evento/303431graduacion.png', 'Graduación', 'Celebración de graduación', 5, 5, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(29, 'imgs/uploads/tipo_evento/375411caridad.png', 'Caridad', 'Evento de beneficencia', 25, 5, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(30, 'imgs/uploads/tipo_evento/962867navidad.png', 'Navidad', 'Fiesta de navidad', 10, 5, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(31, 'imgs/uploads/tipo_evento/107308cumpleanos.png', 'Cumpleaños', 'Fiesta de cumpleaños', 5, 5, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(32, 'imgs/uploads/tipo_evento/866711primeracomunion.png', 'Primera comunión', 'Fiesta de primera comunión', 5, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_producto`
--

DROP TABLE IF EXISTS `tipo_producto`;
CREATE TABLE `tipo_producto` (
  `id` int(15) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `precedero` tinyint(1) NOT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `id_tienda` int(15) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tipo_producto`
--

INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(1, 'Mueble exteriores', 'Mueble perfecto para exteriores', 0, '0000-00-00', 1, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(2, 'Utensilios', 'Utensilios diversos', 0, '0000-00-00', 1, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(3, 'Mueble interiores', 'Mueble perfecto para el hogar', 0, '0000-00-00', 1, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(4, 'Decoracion', 'Elemento de decoracion', 0, '0000-00-00', 1, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(5, 'Electrónicos', 'Aparatos electrónicos', 0, '0000-00-00', 2, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(6, 'Ropa hombre', 'Ropa masculina', 0, '0000-00-00', 3, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(7, 'Calzado hombre', 'Ropa masculina', 0, '0000-00-00', 3, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(8, 'Calzado mujer', 'Ropa masculina', 0, '0000-00-00', 3, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(9, 'Juguete', 'Articulo infantil', 0, '0000-00-00', 4, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(10, 'Oficina', 'Articulo de Oficina', 0, '0000-00-00', 5, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(11, 'Decoración', 'Articulo de Decoración', 0, '0000-00-00', 5, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(12, 'Muebles', 'Articulo de Muebles', 0, '0000-00-00', 5, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(13, 'Tecnología', 'Articulo de Tecnología', 0, '0000-00-00', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(15) NOT NULL,
  `identificacion` int(15) NOT NULL,
  `foto_perfil` mediumtext NOT NULL,
  `primer_nombre` varchar(25) NOT NULL,
  `segundo_nombre` varchar(25) DEFAULT NULL,
  `primer_apellido` varchar(25) NOT NULL,
  `segundo_apellido` varchar(25) DEFAULT NULL,
  `nacionalidad` varchar(25) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` varchar(15) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `numero_telefono_primario` int(15) NOT NULL,
  `numero_telefono_secundario` int(15) DEFAULT NULL,
  `contrasena` varchar(25) NOT NULL,
  `tipo` int(1) NOT NULL,
  `estado` int(1) NOT NULL,
  `juridico` int(1) NOT NULL,
  `id_tienda` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(1, 111111111, 'imgs/uploads/foto_perfil/902198esteban.jpg', 'Esteban', '', 'Gonzalez', '', '490', '1990-01-01', 'Hombre', 'esteban@eventory.co.cr', 22737827, 89388828, '123', 1, 1, 0, 1);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(2, 112212828, 'imgs/uploads/foto_perfil/768786diego.jpg', 'Diego', '', 'Mendez', '', '490', '1990-02-02', 'Hombre', 'diego@eventory.co.cr', 28488483, 83992828, '123', 1, 1, 0, 0);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(3, 128838292, 'imgs/uploads/foto_perfil/663789alejandro.jpg', 'Alejandro', '', 'Castillo', '', '490', '1990-03-03', 'Hombre', 'alejandro@eventory.co.cr', 28488483, 83988829, '123', 1, 1, 0, 0);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(4, 123939289, 'imgs/uploads/foto_perfil/26883daniel.jpg', 'Daniel', '', 'Urbina', '', '490', '1990-04-04', 'Hombre', 'daniel@eventory.co.cr', 28488498, 83298829, '123', 1, 1, 0, 0);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(5, 116810122, 'imgs/uploads/foto_perfil/401051gary.jpg', 'Gary', 'Andrey', 'Valverde', 'Hampton', '490', '1997-09-07', 'Hombre', 'gary@eventory.co.cr', 22142294, 86013609, '123', 1, 1, 0, 5);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(6, 2147483647, 'imgs/uploads/foto_perfil/162734cenfotec.png', 'Universidad', '', 'Cenfotec', '', '490', '2000-01-01', 'Intergenero', 'cenfotec@ucenfotec.ac.cr', 22811555, 0, '123', 4, 1, 1, 0);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(8, 172872778, 'imgs/uploads/foto_perfil/425990denisse.jpg', 'Denisse', '', 'Valverde', '', '490', '2000-01-28', 'Hombre', 'denisse@gmail.com', 28983898, 82982888, 'Mecanica12', 4, 1, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `convenio`
--
ALTER TABLE `convenio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lista_evento`
--
ALTER TABLE `lista_evento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `producto_lista_evento`
--
ALTER TABLE `producto_lista_evento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipo_evento`
--
ALTER TABLE `tipo_evento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipo_producto`
--
ALTER TABLE `tipo_producto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `convenio`
--
ALTER TABLE `convenio`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `lista_evento`
--
ALTER TABLE `lista_evento`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
--
-- AUTO_INCREMENT for table `producto_lista_evento`
--
ALTER TABLE `producto_lista_evento`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tipo_evento`
--
ALTER TABLE `tipo_evento`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `tipo_producto`
--
ALTER TABLE `tipo_producto`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
