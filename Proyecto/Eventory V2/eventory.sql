-- phpMyAdmin SQL Dump
-- version 4.6.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 17, 2016 at 06:32 AM
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
           SELECT 1 AS exist;
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
    	estado = 0
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_producto` (IN `p_id_producto` INT(15), IN `p_foto_producto` MEDIUMTEXT, IN `p_nombre` VARCHAR(25), IN `p_descripcion` VARCHAR(250), IN `p_precio_unitario` INT(10), IN `p_marca` VARCHAR(25), IN `p_cantidad` INT(5), IN `p_id_proveedor` INT(15), IN `p_id_tipo` INT(15), IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
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
             p_estado)$$

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

DROP PROCEDURE IF EXISTS `listar_tipos_evento_por_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_tipos_evento_por_tienda` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM tipo_evento WHERE id_tienda = p_id_tienda AND estado = 1$$

DROP PROCEDURE IF EXISTS `listar_tipos_producto_por_tienda`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_tipos_producto_por_tienda` (IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM tipo_producto WHERE id_tienda = p_id_tienda AND estado = 1$$

DROP PROCEDURE IF EXISTS `listar_usuarios_por_estado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_usuarios_por_estado` (IN `p_estado` INT(1), IN `p_id_tienda` INT(15))  NO SQL
SELECT * FROM usuario WHERE estado = p_estado  AND tipo != 4 AND id_tienda = p_id_tienda$$

DROP PROCEDURE IF EXISTS `listar_usuarios_por_juridico`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_usuarios_por_juridico` ()  NO SQL
SELECT * FROM usuario WHERE juridico = 1$$

DROP PROCEDURE IF EXISTS `select_compra`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_compra` (IN `p_id` INT(15))  NO SQL
SELECT * from compra where id = p_id$$

DROP PROCEDURE IF EXISTS `select_convenio`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_convenio` (IN `p_id` INT(15))  NO SQL
SELECT * from convenio where id = p_id$$

DROP PROCEDURE IF EXISTS `select_estado_reserva`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_estado_reserva` (IN `p_id_reserva` INT(15))  NO SQL
IF 1 = 1 THEN

    SET @estado_reserva = 0;
    SET @nombre_producto = "";
    SET @nombre_evento = "";
    SET @fecha_evento = "";

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
  ELSE
    SELECT 0 INTO @estado_reserva;
  END IF;
  

  SELECT nombre INTO @nombre_producto FROM producto WHERE id IN (SELECT id_producto FROM reserva WHERE id = p_id_reserva);

  SELECT nombre INTO @nombre_evento FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);
  SELECT fecha_evento INTO @fecha_evento FROM lista_evento WHERE id IN (SELECT id_lista_evento FROM reserva WHERE id = p_id_reserva);

  SELECT @nombre_producto AS nombre_producto,
         @nombre_evento   AS nombre_evento,
         @fecha_evento    AS fecha_evento,
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
            (SELECT reserva.id_lista_evento FROM reserva WHERE id = p_id_reserva)) ;

	/*Se obtiene el nombre del asociado */
    SELECT CONCAT(primer_nombre, " ", primer_apellido) INTO @nombre_asociado FROM usuario WHERE id = @id_asociado;
    
    
	/*Se obtiene el descuento por convenio */
    IF ((SELECT juridico FROM usuario WHERE id = @id_asociado) = 1) THEN
        IF EXISTS (SELECT * FROM convenio WHERE id_usuario = @id_asociado) THEN
        	SELECT descuento INTO @descuento_convenio FROM convenio WHERE id_usuario = @id_asociado AND id_tienda IN 
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_proveedor` (IN `p_id` INT(15), IN `p_nombre` INT(25), IN `p_numero_telefono_primario` INT(15), IN `p_numero_telefono_secundario` INT(15), IN `p_fecha_inicio_relacion` DATE, IN `p_id_tienda` INT(15), IN `p_estado` INT(1))  NO SQL
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_tienda` (IN `p_id` INT(15), IN `p_identificacion` INT(15), IN `p_logo_tienda` MEDIUMTEXT, IN `p_nombre` VARCHAR(25), IN `p_numero_telefono` INT(15), IN `p_correo_electronico` VARCHAR(100), IN `p_provincia` VARCHAR(25), IN `p_canton` VARCHAR(25), IN `p_distrito` VARCHAR(25), IN `p_impuesto_ventas` INT(5), IN `p_tipo_tienda` INT(1), IN `p_latitud` FLOAT(12,8), IN `p_longitud` FLOAT(12,8), IN `p_estado` INT(1), IN `p_id_administrador` INT(15))  NO SQL
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
    estado				= p_estado,
    id_administrador	= p_id_administrador
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

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`id`, `id_reserva`, `total`, `subtotal`, `fecha_compra`, `descuento`, `impuesto_ventas`, `cantidad`, `id_tienda`, `estado`) VALUES(3, 1, 15675, 16500, '2016-08-10', 2805, 1980, 15, 123, 1);
INSERT INTO `compra` (`id`, `id_reserva`, `total`, `subtotal`, `fecha_compra`, `descuento`, `impuesto_ventas`, `cantidad`, `id_tienda`, `estado`) VALUES(4, 2, 569525, 599500, '2016-08-10', 101915, 71940, 5, 123, 1);

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

INSERT INTO `convenio` (`id`, `id_usuario`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(1, 432, '', '', 15, 0, 1);
INSERT INTO `convenio` (`id`, `id_usuario`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(4, 432, 'Contrato', 'Felicidad', 12, 123, 1);

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

INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(1, 'Boda amor 2', '2016-08-31', 1, 9.93382454, -84.10069275, 432, 22, 123, 1);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(2, 'Lista2', '2016-08-12', 1, 10.00000000, -80.00000000, 432, 4, 124, 2);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(3, 'Lista3', '2016-08-31', 1, 9.50000000, -70.00000000, 432, 22, 123, 0);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(4, 'Lista4', '2016-08-12', 1, 12.12131214, 98.32321167, 432, 4, 123, 1);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(5, 'Lista5', '2016-08-12', 1, 12.12131214, 98.32321167, 433, 4, 123, 1);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(6, 'Lista5', '2016-08-12', 1, 12.12131214, 98.32321167, 432, 4, 124, 1);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(7, 'Evento 08/14/2016', '2016-08-31', 1, 9.92860985, -84.09115601, 432, 22, 123, 0);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(8, 'Fiesta 8/16/2016', '2016-08-16', 0, 9.92038727, -84.08811188, 432, 22, 123, 0);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(9, 'Fiesta 123', '2016-08-25', 0, 9.92469978, -84.09480286, 432, 24, 123, 0);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(10, 'Fiesta 1234', '2016-08-25', 0, 9.91423702, -84.07888031, 432, 24, 123, 0);
INSERT INTO `lista_evento` (`id`, `nombre`, `fecha_evento`, `envio`, `latitud`, `longitud`, `id_asociado`, `id_tipo_evento`, `id_tienda`, `estado`) VALUES(11, 'Fiestita yolo', '2016-08-24', 0, 9.93812084, -84.09830475, 432, 22, 123, 0);

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
  `precio_unitario` int(10) NOT NULL,
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

INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(1, 308863, 'imgs/uploads/tipo_evento/72858hydrangeas.jpg', 'SARTEN1', 'SARTEN ELÉCTRICO', 119900, 'GL', 10, 7954, 3, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(2, 365350, 'FOTO', 'POSA', 'POSA PLANCHA', 5995, 'OSTER', 2, 5759, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(3, 367934, 'FOTO', 'OLLA', 'OLLA DE PRESION ELECTRICA', 74995, 'EL', 1, 5393, 3, 3, 0);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(4, 385653, 'FOTO', 'HORNO', 'HORNO MICROONDAS 1.2 PIES 700W', 199903, 'GL', 1, 7954, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(5, 416835, 'FOTO', 'LICUADORA', 'DUO LICUAD C/PROCESAD ACER INX', 134900, 'ACER', 1, 7954, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(6, 450258, 'FOTO', 'GRILL', 'GRILL Y PRENSA PARA PANINI', 59900, 'GYP', 1, 7954, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(7, 464221, 'FOTO', 'TABLA PLANCHAR', 'TABLA PLANCHAR 107X38 FORG', 19995, 'FORG', 1, 318, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(8, 473039, 'FOTO', 'HERVIDOR', 'HERVIDOR ELECT. 1.7L INOX', 52995, 'INOX', 1, 5393, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(9, 483341, 'FOTO', 'LICUADORA', 'LICUADORA PERSONAL 2/20 AZULB+D', 34899, 'GL', 1, 6797, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(10, 487008, 'FOTO', 'PLANCHA', 'PLANCHA VAPOR 1500W CONAIR', 64995, 'CONAIR', 1, 4005, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(11, 463820, 'FOTO', 'OLLA', 'OLLA ARROCERA 10TZ BIOCERAMIC', 48900, 'BIOC', 1, 5393, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(12, 483330, 'FOTO', 'TEATRO CASA', 'TEATRO CASAC/BLURAY 1200 WF', 699999, 'LG', 1, 7482, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(13, 491907, 'FOTO', 'BARRA SON', 'BARRA SON 100W RMS 2.1 CAN BLTH', 119900, 'LG', 1, 7482, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(14, 372747, 'FOTO', 'ALF RIVER', 'ALF. RIVER ROCKS 18X30"', 11055, 'ET', 1, 6481, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(15, 458440, 'FOTO', 'COPAS', 'COPASX12 BORDEAUX WHIT-CHAPAG', 32134, 'CHAPAG', 1, 5671, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(16, 490067, 'FOTO', 'FORRO COJIN', 'FORRO COJIN 45X45 PLIZADO', 12995, 'ARTECA', 2, 6371, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(17, 400110, 'FOTO', 'FLORERO', 'FLORERO', 34995, 'ARTECA', 1, 6226, 3, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(18, 454415, 'FOTO', 'MARCO', 'MARCO FOTO', 7161, 'ARTECA', 2, 7782, 5, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(19, 465092, 'FOTO', 'CENTRO', 'CENTRO RECTANGULAR ANILLOS', 36080, 'GL', 1, 7475, 5, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(20, 324849, 'FOTO', 'PLUMON', 'PLUMON K PLUMA GANSO', 119994, 'LC', 1, 5992, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(21, 362426, 'FOTO', 'JABONERA', 'JABONERA SILVER', 6295, 'JGB', 1, 39, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(22, 362428, 'FOTO', 'PORTA CEPILLO', 'PORTA CEPILLO SILVER', 7495, 'SILVER', 2, 39, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(23, 362429, 'FOTO', 'VASO P/BANO', 'VASO P/BANO SILVER', 6295, 'SILVER', 2, 39, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(24, 362431, 'FOTO', 'KLEENERA', 'KLEENERA SILVER', 19995, 'SILVER', 2, 39, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(25, 447015, 'FOTO', 'BASURERO', 'BASURERO GIA ACERO', 29995, 'GIA', 2, 2209, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(26, 461133, 'FOTO', 'DUVET', 'DUVET K JGOX7 RUST', 78960, 'RUST', 1, 6969, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(27, 462093, 'FOTO', 'TOALLERO', 'TOALLERO SORA', 56995, 'SORA', 1, 7498, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(28, 470112, 'FOTO', 'SABANA', 'SABANA JGO K BASIC GRIS', 49994, 'JGO', 2, 6075, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(29, 473657, 'FOTO', 'TOALLA MANO', 'TOALLA MANO LT GREY BANDED', 2994, 'LT', 3, 7257, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(30, 473658, 'FOTO', 'TOALLA BANO', 'TOALLA BANO LT GREY BANDED', 7884, 'LT', 2, 7257, 8, 3, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(31, 475259, 'FOTO', 'JABONERA', 'JABONERA', 2794, 'JB', 1, 3170, 8, 3, 0);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(32, 475260, 'FOTO', 'BASURERO', 'BASURERO', 15994, 'JB', 1, 3170, 8, 3, 0);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(33, 475261, 'Foto', 'Porta cepillo ', 'nca cuadrado', 449401, 'Johnson & Johnson', 1, 3170, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(34, 475293, 'Foto', 'Espejo aumen', 'x7 acrilico crom', 1799502, 'Johnson & Johnson', 1, 6669, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(35, 5590, 'Foto', 'Toalla fingertip ', 'monogramp bca', 799475, 'Johnson & Johnson', 1, 5590, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(36, 482682, 'Foto ', 'Toalla banno', 'chev lt grey', 1199495, 'Johnson & Johnson', 2, 7257, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(37, 482686, 'Foto', 'Toalla mano', 'chevlt grey', 379499, 'Johnson & Johnson', 2, 7257, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(38, 483500, 'Foto', 'Toalla banno', 'liza gris', 1199495, 'Johnson & Johnson', 1, 7222, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(39, 483506, 'Foto', 'Toalla mano liza', 'gris', 499460, 'Johnson & Johnson', 1, 7222, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(40, 488009, 'Foto', 'Alf banno', '50x80cm circulos gris', 679497, 'Johnson & Johnson', 1, 5617, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(41, 488102, 'Foto', 'Alf banno rayas', '50x80 gris', 949499, 'Johnson & Johnson', 1, 7596, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(42, 489029, 'Foto', 'Caja bajo cama ', 'con ruedas ', 1999501, 'Johnson & Johnson', 1, 1053, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(43, 490062, 'Foto', 'Caja transparente', 'file box bom', 1199501, 'Johnson & Johnson', 1, 1053, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(44, 4923674, 'Foto', 'Relleno cojin', 'fibra 45x45', 229497, 'Johnson & Johnson', 2, 8051, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(45, 493180, 'Foto', 'cepillo inodoro', 'metal cromado', 749501, 'Johnson & Johnson', 2, 9268, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(46, 459075, 'Foto', 'Edredon ', 'k zebra gris ', 2663500, 'Johnson & Johnson', 1, 7781, 8, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(47, 36123, 'Foto', 'Taza medir ', 'acrilico', 795, 'Johnson & Johnson', 1, 6451, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(48, 378878, 'Foto', 'Timer cocina', 'blanco', 257900, 'Johnson & Johnson', 1, 6174, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(49, 401635, 'Foto', 'Pinchos maiz', '12pz', 99502, 'Johnson & Johnson', 1, 6451, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(50, 401693, 'Foto', 'Rec plastico ', '8pzs', 1899502, 'Johnson & Johnson', 1, 147, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(51, 404873, 'Foto', 'Separador para huevos', 'plastico', 249498, 'Johnson & Johnson', 1, 5759, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(52, 424995, 'Foto', 'contenedor ', '4 psz', 1299500, 'Johnson & Johnson', 1, 6258, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(53, 42, 'Foto', 'cepillo limpieza', 'blanca', 530530, 'Johnson & Johnson', 1, 2836, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(54, 428725, 'Foto', 'Especiero', 'bot base inox', 2499498, 'Johnson & Johnson', 1, 1009, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(55, 432907, 'Foto', 'Tijera multiuso', '11 en 1 ', 220795, 'Johnson & Johnson', 1, 5759, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(56, 436549, 'Foto', 'Refract ', 'jgox bake accents', 2744301, 'Johnson & Johnson', 1, 116, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(57, 438362, 'Foto', 'Set tazones ', 'acero inox c tap', 3290001, 'Johnson & Johnson', 1, 7953, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(58, 443142, 'Foto', 'Azucarera ', 'ny', 479459, 'Johnson & Johnson', 1, 2938, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(59, 446917, 'Foto', 'Rayador ', 'verde', 1097801, 'Johnson & Johnson', 1, 2236, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(60, 451039, 'Foto', 'Rebanador banano', 'blanco', 249498, 'Johnson & Johnson', 1, 5759, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(61, 453240, 'Foto', 'Escurridor vegetales', 'para fregadero', 1198998, 'Johnson & Johnson', 1, 7298, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(62, 453377, 'Foto', 'Balanza de cocina', 'lith', 1999501, 'Johnson & Johnson', 1, 2478, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(63, 458848, 'Foto', 'Toalla cocina ', 'solid vde', 279439, 'Johnson & Johnson', 1, 7417, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(64, 458851, 'Foto', 'Toallita', 'pequenna cocinax vde', 279449, 'Johnson & Johnson', 1, 7417, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(65, 458857, 'Foto', 'Cogedor ollas', 'silicon ', 529405, 'Johnson & Johnson', 1, 7417, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(66, 438362, 'Foto', 'Set tazones ', 'acero inox c tap', 3290001, 'Johnson & Johnson', 1, 7953, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(67, 443142, 'Foto', 'Azucarera ', 'ny', 479459, 'Johnson & Johnson', 1, 2938, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(68, 446917, 'Foto', 'Rayador ', 'verde', 1097801, 'Johnson & Johnson', 1, 2236, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(69, 451039, 'Foto', 'Rebanador banano', 'blanco', 249498, 'Johnson & Johnson', 1, 5759, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(70, 453240, 'Foto', 'Escurridor vegetales', 'para fregadero', 1198998, 'Johnson & Johnson', 1, 7298, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(71, 453377, 'Foto', 'Balanza de cocina', 'lith', 1999501, 'Johnson & Johnson', 1, 2478, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(72, 458848, 'Foto', 'Toalla cocina ', 'solid vde', 279439, 'Johnson & Johnson', 1, 7417, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(73, 458851, 'Foto', 'Toallita', 'pequenna cocinax vde', 279449, 'Johnson & Johnson', 1, 7417, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(74, 458857, 'Foto', 'Cogedor ollas', 'silicon ', 529405, 'Johnson & Johnson', 1, 7417, 10, 2, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(75, 460774, 'Foto', 'Mazo Carne', 'Mazo para carne', 989999, 'JB', 1, 7953, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(76, 461721, 'Foto', 'Porta rollos', 'Porta rollo papel metal/acrilico', 3034300, 'JB', 1, 7226, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(77, 462953, 'Foto', 'Shot tequila', 'Vaso p/Tequila JGO x4', 408900, 'Jose Cuervo', 1, 7201, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(78, 463126, 'Foto', 'Taza/Plato cafe', 'Taza/Plato cafe JGOX4', 859899, 'Esma', 2, 7821, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(79, 466052, 'Foto', 'Infusor de te', 'Infusor de te', 799498, 'Emsa', 1, 7690, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(80, 467063, 'Foto', 'Set utensilios base inox', 'Set de seis utensilios base inox', 3489999, 'Inox', 1, 7953, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(81, 468796, 'Foto', 'Juego de ollas joy zwllin', 'Juego de ollas 5Pz Joy Zwlling', 7889999, 'Joy Zwlling', 1, 1468, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(82, 475062, 'Foto', 'Indiv gris', 'Individual gris', 129498, 'Arzberg', 4, 7268, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(83, 475561, 'Foto', 'Escobas', 'ORG Escobas', 899497, 'Arzberg', 1, 7662, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(84, 476886, 'Foto', 'Plato', 'Plato Redondo', 2499447, 'Arzberg', 1, 7662, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(85, 477222, 'Foto', 'Alfombra', 'Alfombra de cocina', 899497, 'Gien France', 1, 1468, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(86, 483363, 'Foto', 'Huevera', 'JGOX4 moldes p/huevos', 1299500, 'Cha-Chá', 1, 7461, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(87, 480776, 'Foto', 'Plato cuadrado', 'Plato cuadrado división 8" 20cm', 579464, 'Gien France', 1, 7985, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(88, 4807777, 'Foto', 'Plato redondo', 'Plato redondo división 19" 25.2cm', 5797451, 'Gien France', 1, 7354, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(89, 481563, 'Foto', 'Bowl', 'Recipiente redondo 6pz', 499500, 'Gien France', 1, 7214, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(90, 483155, 'Foto', 'Afilador portatil', 'Afilador de cuchillos portátil ', 499500, 'Gien France', 1, 7985, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(91, 483375, 'Foto', 'Infusor de hierbas', 'Infusir de hierbas p/cocinar', 495420, 'Cha-Chá', 1, 7849, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(92, 483377, 'Foto', 'Infusor de te ', 'Infusor de te mastrad', 4209500, 'Cha-Chá', 1, 7391, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(93, 484487, 'Foto', 'Juego de cubiertos', 'JGOx45pc de cubiertos Lexington ', 3499497, 'Lexington ', 1, 420, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(94, 484539, 'Foto', 'Vajilla circular gris', 'Vajilla 16pz circular mosaico gris', 699503, 'Lexington ', 1, 8016, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(95, 484866, 'Foto', 'Mademe petra', 'JGO sart madame petra 20-24-28', 3699501, 'Lexington', 1, 7365, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(96, 485489, 'Foto', 'Escurridor', 'Bandeja p/escurridor pequeña transparenet', 499500, 'La Cornue', 1, 7356, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(97, 485497, 'Foto', 'Canasta', 'Canasta p/Esponja', 599499, 'La Cornue', 1, 8018, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(98, 488254, 'Foto', 'Colador', 'Colador p/todo uso 6"', 699498, 'La Cornue', 1, 2263, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(99, 488693, 'Foto', 'Tabla de picar', 'Tabla de picar GDE bamboo Hawaiia', 1699497, 'La Cornue', 1, 8076, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(100, 488781, 'Foto', 'Plato org', 'Org plato 3Niv 25.5x25.4x21.79', 999502, 'La Cornue', 1, 8076, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(101, 488783, 'Foto', 'Org Platium', 'Org 3Niv 2unid platinm metal', 899497, '8076', 1, 8076, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(102, 489040, 'Foto', 'Individual 33*48', 'Individual 33*48 gris crema', 199502, 'Cha-Chá', 4, 2952, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(103, 490177, 'Foto', 'Hielera', 'Hielara Roja ', 1799502, 'Cha-Chá', 1, 8079, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(104, 490189, 'Foto', 'Mermalada JGOX7', 'Mermalada JGOX7', 1599498, 'Geneviève Lethu', 1, 8079, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(105, 490518, 'Foto', 'Espaciador para crepolini', 'Espaciador p/mezclar crepolini', 999502, 'Geneviève Lethu', 1, 7428, 1, 1, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(106, 490525, 'Foto', 'Lonchera vde', 'Lonchera de silicon verde', 899497, 'Totto', 1, 8089, 1, 1, 0);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(107, 490526, 'Foto', 'Lonchera  roja', 'Lonchera de silicon roja', 899497, 'Totto', 1, 8089, 1, 1, 0);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(108, 382171, 'Foto', 'Servilleteo niquel-satin', 'Servilleteo niquel-satin', 749501, 'JB', 1, 8090, 1, 1, 0);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(109, 401666, 'Foto', 'Envase tortilla', 'envase de plastico', 299501, 'Plastma', 1, 64521, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(110, 467532, 'Foto', 'Dispensador jabon de espu', 'Dispensador de cromo', 749501, 'Ergonomitcs', 1, 2209, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(111, 474259, 'Foto', 'Tabla p/p marmoll', 'Utensilio de cocina elegante', 1599498, 'Ergonomits', 1, 7622, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(112, 476650, 'Foto', 'Pilon para mojito', 'envase de madera', 599499, 'Ergonomits', 1, 7464, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(113, 482921, 'Foto', 'Aro Estrella', 'Aro para servilleta', 329395, 'Ergonomits', 2, 8011, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(114, 482928, 'Foto', 'Aro pez', 'Aro para servilleta', 329395, 'Ergonomits', 2, 8011, 9, 11, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(115, 484478, 'foto', 'Bloque para cuchillos', 'Bloque para 15 cuchillos', 3499497, 'Epicure', 1, 7594, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(116, 485339, 'Foto', 'Identificador copas  de c', 'Identificador para botellas', 799498, 'Seven', 1, 8030, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(117, 488806, 'Foto', 'Sarten 8', 'Sarten de aluminio', 1699497, 'Plastma', 1, 488806, 9, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(118, 417824, 'Foto', 'Hielera azul', 'Hielera  para 7,5 galones', 3299498, 'Contour', 1, 415, 10, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(119, 223516, 'Foto', 'Tenedor p/BBQ', 'Tenedor de madera', 445000, 'Plastma', 1, 7287, 10, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(120, 477934, 'Foto', 'Arreglo floral ', 'Arreglo 8 pulgadas', 6799436, 'Rosas', 1, 6292, 10, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(121, 478880, 'Foto', 'Mini cactus en maceta', 'planta con espinas decorativa', 349494, 'Plantains', 1, 7818, 10, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(122, 490892, 'Foto', 'BBQ carbon weber', 'Parrilla de carbon', 8889998, 'Weber', 1, 378, 10, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(123, 478881, 'Foto', 'Mini cactus en maceta', 'planta con espinas', 329502, 'Plantain', 1, 7818, 10, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(124, 472744, 'Foto', 'Colgador estrella', 'Colgador de plata grande', 949499, 'Ergonomits', 1, 7565, 11, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(125, 487693, 'Foto', 'Servilleta de lino', 'Trapo blanco ', 349498, 'WhiteCastle', 6, 8063, 12, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(126, 487693, 'Foto', 'Forro para cojin de plata', 'Funda de cojin', 1199501, 'WhiteCastle', 1, 5612, 12, 4, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(127, 308864, 'imgs/uploads/tipo_evento/72858hydrangeas.jpg', 'SARTEN2', 'SARTEN ELÉCTRICO', 119900, 'GL', 13, 7954, 3, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(128, 308865, 'imgs/uploads/tipo_evento/72858hydrangeas.jpg', 'SARTEN3', 'SARTEN ELÉCTRICO', 1100, 'GL', 40, 7954, 3, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(129, 134123412, 'imgs/uploads/tipo_evento/72858hydrangeas.jpg', 'SARTEN4', 'SARTEN ELÉCTRICO', 119900, 'GL', 4, 7954, 3, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(130, 1234, 'imgs/uploads/tipo_evento/72858hydrangeas.jpg', 'SARTEN5', 'SARTEN ELÉCTRICO', 119900, 'GL', 44, 7954, 3, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(131, 1, 'imgs/uploads/foto_producto/722233error.png', 'Equis', 'Circulo rojo', 12499, 'Fercomex', 13, 1, 3, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(132, 1, 'imgs/uploads/foto_producto/948233error.png', 'Equis', 'Circulo rojo', 12499, 'Fercomex', 13, 1, 3, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(133, 1, 'imgs/uploads/foto_producto/587693error.png', 'Equis', 'Circulo rojo', 12499, 'Fercomex', 14, 1, 3, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(134, 2, 'imgs/uploads/foto_producto/360290cemaco.png', '1', '1', 1, '1', 1, 1, 1, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(135, 9, 'imgs/uploads/foto_producto/306724error.png', '2', '2', 2, '2', 2, 1, 1, 123, 1);
INSERT INTO `producto` (`id`, `id_producto`, `foto_producto`, `nombre`, `descripcion`, `precio_unitario`, `marca`, `cantidad`, `id_proveedor`, `id_tipo`, `id_tienda`, `estado`) VALUES(136, 3, 'imgs/uploads/foto_producto/54699312780.png', 'Clavo', 'Material de costruccion de alta calidad e inxocidable', 12321, 'Fercomex', 12, 1, 1, 123, 1);

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

INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(6, 1, 1, 3, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(7, 128, 1, 15, '2');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(8, 130, 1, 6, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(9, 129, 1, 1, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(10, 127, 7, 5, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(11, 129, 7, 3, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(12, 130, 7, 17, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(13, 130, 8, 1, '1');
INSERT INTO `producto_lista_evento` (`id`, `id_producto`, `id_lista_evento`, `cantidad`, `estado`) VALUES(14, 128, 11, 4, '1');

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

INSERT INTO `proveedor` (`id`, `nombre`, `numero_telefono_primario`, `numero_telefono_secundario`, `fecha_inicio_relacion`, `id_tienda`, `estado`) VALUES(1, 'Walmart', 28898288, 88298828, '2016-08-16', 123, 1);

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

INSERT INTO `reserva` (`id`, `id_producto`, `id_lista_evento`, `id_usuario`, `cantidad`, `estado`) VALUES(1, 128, 1, 433, 15, 1);
INSERT INTO `reserva` (`id`, `id_producto`, `id_lista_evento`, `id_usuario`, `cantidad`, `estado`) VALUES(2, 130, 1, 434, 5, 0);
INSERT INTO `reserva` (`id`, `id_producto`, `id_lista_evento`, `id_usuario`, `cantidad`, `estado`) VALUES(3, 130, 1, 432, 5, 1);

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
  `tipo_tienda` int(1) NOT NULL,
  `latitud` float(12,8) NOT NULL,
  `longitud` float(12,8) NOT NULL,
  `estado` int(1) NOT NULL,
  `id_administrador` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tienda`
--

INSERT INTO `tienda` (`id`, `identificacion`, `logo_tienda`, `nombre`, `numero_telefono`, `correo_electronico`, `provincia`, `canton`, `distrito`, `impuesto_ventas`, `tipo_tienda`, `latitud`, `longitud`, `estado`, `id_administrador`) VALUES(123, 123456, 'imgs/uploads/logo_tienda/cemaco.png', 'Cemaco', 88888888, 'cemacocr@gmail.com', 'San Jose', 'San Jose', 'Zapote', 12, 1, 9.93621826, -84.10540771, 1, 432);
INSERT INTO `tienda` (`id`, `identificacion`, `logo_tienda`, `nombre`, `numero_telefono`, `correo_electronico`, `provincia`, `canton`, `distrito`, `impuesto_ventas`, `tipo_tienda`, `latitud`, `longitud`, `estado`, `id_administrador`) VALUES(125, 321, 'imgs/uploads/logo_tienda/6349793.png', 'Walmart', 86013609, 'walmart@cr.com', 'San José ', 'San Jose', 'San Sebastian', 12, 0, 9.92882061, -84.09115601, 1, 453);
INSERT INTO `tienda` (`id`, `identificacion`, `logo_tienda`, `nombre`, `numero_telefono`, `correo_electronico`, `provincia`, `canton`, `distrito`, `impuesto_ventas`, `tipo_tienda`, `latitud`, `longitud`, `estado`, `id_administrador`) VALUES(126, 8, 'imgs/uploads/logo_tienda/807414logo.png', '8', 8, '8@2', '8', '8', '8', 8, 0, 9.94289780, -84.08480835, 1, 454);

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

INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(1, '1', '1', '1', 1, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(2, '../imgs/uploads/tipo_evento/700190lighthouse.jpg', '5', '5', 5, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(3, 'imgs/uploads/tipo_evento/133801tulips.jpg', '4', '4', 4, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(4, 'imgs/uploads/tipo_evento/72858hydrangeas.jpg', 'Halloween', 'Fiesta de dia de brujas', 13, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(5, 'imgs/uploads/tipo_evento/695526desert.jpg', '11', '1', 1, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(6, 'imgs/uploads/tipo_evento/946404tulips.jpg', '1', '1', 0, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(7, 'imgs/uploads/tipo_evento/156148chrysanthemum.jpg', 'Prueba', 'Prueba', 12, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(8, 'imgs/uploads/tipo_evento/761256chrysanthemum.jpg', '12', '12', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(9, 'imgs/uploads/tipo_evento/312639chrysanthemum.jpg', '12', '12', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(10, 'imgs/uploads/tipo_evento/275017chrysanthemum.jpg', '12', '21', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(11, 'imgs/uploads/tipo_evento/337729chrysanthemum.jpg', '12', '21', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(12, 'imgs/uploads/tipo_evento/395838tulips.jpg', '2', '2', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(13, 'imgs/uploads/tipo_evento/918082tulips.jpg', '2', '2', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(14, 'imgs/uploads/tipo_evento/48986tulips.jpg', '2', '2', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(15, 'imgs/uploads/tipo_evento/769000tulips.jpg', '2', '2', 12, 1, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(16, 'imgs/uploads/tipo_evento/938173tulips.jpg', '2', '2', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(17, 'imgs/uploads/tipo_evento/818450desert.jpg', '3', '3', 3, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(18, 'imgs/uploads/tipo_evento/108009lighthouse.jpg', 'Prueba', 'Prueba', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(19, 'imgs/uploads/tipo_evento/740068jellyfish.jpg', 'gta', 'ags', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(20, 'imgs/uploads/tipo_evento/650771jellyfish.jpg', 'gta', 'ags', 12, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(21, 'imgs/uploads/tipo_evento/484982tulips.jpg', '3', '3', 3, 0, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(22, 'imgs/uploads/tipo_evento/882137desert.jpg', 'Fiesta de hallowen', '1', 2, 123, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(23, 'imgs/uploads/tipo_evento/673392desert.jpg', '1', '1', 2, 123, 1);
INSERT INTO `tipo_evento` (`id`, `imagen_evento`, `nombre`, `descripcion`, `descuento`, `id_tienda`, `estado`) VALUES(24, 'imgs/uploads/tipo_evento/245841koala.jpg', '1', '1', 1, 123, 1);

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

INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(1, 'Clavo', 'Material de costruccion de alta calidad e inxocidable', 1, '2016-08-17', 123, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(2, 'Clavo', 'Material de costruccion de alta calidad e inxocidable', 0, '2016-08-17', 123, 1);
INSERT INTO `tipo_producto` (`id`, `nombre`, `descripcion`, `precedero`, `fecha_vencimiento`, `id_tienda`, `estado`) VALUES(3, 'Clavo', 'Material de costruccion de alta calidad e inxocidable', 0, '0000-00-00', 123, 1);

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

INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(432, 116810122, 'imgs/uploads/foto_perfil/882473tulips.jpg', 'Gary', 'Andrey', 'Valverde', 'Hampton', '490', '1997-07-09', 'Hombre', 'garyhampton.12@gmail.com', 86013609, 86013609, '123', 1, 1, 1, 123);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(433, 123456789, 'imgs/uploads/foto_perfil/26273cemaco.png', 'Cajero', '', 'Cajerin', '', '490', '1997-02-11', 'Mujer', '1@1', 22222222, 86013609, '1', 2, 1, 0, 123);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(434, 3, 'imgs/uploads/foto_perfil/200781jellyfish.jpg', '3', '3', '3', '3', '160', '2016-08-31', 'Mujer', '3@3', 3, 3, '123', 4, 1, 3, 0);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(453, 2, 'imgs/uploads/foto_perfil/7173851.png', '2', '2', '2', '22', '140', '0002-02-02', 'Hombre', '2@2', 2, 2, '2', 1, 1, 0, 0);
INSERT INTO `usuario` (`id`, `identificacion`, `foto_perfil`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `nacionalidad`, `fecha_nacimiento`, `genero`, `correo_electronico`, `numero_telefono_primario`, `numero_telefono_secundario`, `contrasena`, `tipo`, `estado`, `juridico`, `id_tienda`) VALUES(454, 9, 'imgs/uploads/foto_perfil/213738error1-razon.png', '9', '9', '9', '9', '20', '0009-09-09', 'Hombre', '9@9', 9, 9, '9', 1, 1, 0, 0);

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
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `convenio`
--
ALTER TABLE `convenio`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `lista_evento`
--
ALTER TABLE `lista_evento`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;
--
-- AUTO_INCREMENT for table `producto_lista_evento`
--
ALTER TABLE `producto_lista_evento`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;
--
-- AUTO_INCREMENT for table `tipo_evento`
--
ALTER TABLE `tipo_evento`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `tipo_producto`
--
ALTER TABLE `tipo_producto`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=455;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
