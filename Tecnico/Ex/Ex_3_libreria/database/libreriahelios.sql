-- phpMyAdmin SQL Dump
-- version 4.6.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 16, 2016 at 05:37 AM
-- Server version: 5.5.49-log
-- PHP Version: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `libreriahelios`
--
CREATE DATABASE IF NOT EXISTS `libreriahelios` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `libreriahelios`;

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `insert_compra`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_compra` (IN `p_id_descuento` INT(15), IN `p_total` INT(10), IN `p_subtotal` INT(10), IN `p_comprador` VARCHAR(25))  NO SQL
INSERT INTO compra
	(id_descuento,
     total,
     subtotal,
     comprador)
     	VALUES
            (p_id_descuento,
             p_total,
             p_subtotal,
             p_comprador)$$

DROP PROCEDURE IF EXISTS `insert_descuento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_descuento` (IN `p_nombre` VARCHAR(50), IN `p_porcentaje` INT(3))  NO SQL
INSERT INTO descuento
	(nombre,
     procentaje)
     	VALUES 
        	(p_nombre,
             p_porcentaje)$$

DROP PROCEDURE IF EXISTS `insert_editorial`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_editorial` (IN `p_nombre` VARCHAR(50), IN `p_direccion` VARCHAR(200), IN `p_telefono` VARCHAR(15), IN `p_anno_de_creacion` YEAR, IN `p_representante` VARCHAR(50), IN `p_cedula` INT(15))  NO SQL
INSERT INTO editorial
	(cedula,
     nombre,
     direccion,   
     telefono,   
     anno_de_creacion,   
     representante)
     	VALUES
        	(p_cedula,
             p_nombre,
             p_direccion,   
             p_telefono,   
             p_anno_de_creacion,   
             p_representante)$$

DROP PROCEDURE IF EXISTS `insert_libro`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_libro` (IN `p_isbn` INT(15), IN `p_titulo` VARCHAR(50), IN `p_autor` VARCHAR(50), IN `p_editorial` INT(15), IN `p_anno_publicacion` YEAR, IN `p_genero` VARCHAR(50))  NO SQL
INSERT INTO libro
	(isbn,
     titulo,   
     autor,   
     editorial,   
     anno_publicacion,
     genero)
     	VALUES
        	(p_isbn,
             p_titulo,   
             p_autor,   
             p_editorial,   
             p_anno_publicacion,
             p_genero)$$

DROP PROCEDURE IF EXISTS `insert_lista_productos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_lista_productos` (IN `p_version_libro` INT(15), IN `p_cantidad` INT(10))  NO SQL
IF 1 = 1 THEN
    SET @id_compra = 0;
    SELECT IF( MAX(id) IS NULL, 1, MAX(id)) FROM compra INTO @id_compra;
    INSERT INTO lista_productos
        (version_libro,
         cantidad,
         id_compra)
            VALUES
                (p_version_libro,
                 p_cantidad,
                 @id_compra);
END IF$$

DROP PROCEDURE IF EXISTS `insert_version_libro`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_version_libro` (IN `p_id_libro` INT(15), IN `p_nombre` VARCHAR(50), IN `p_valor` INT(10))  NO SQL
INSERT INTO version_libro
	(id_libro,
	 nombre,
     valor)
     	VALUES
        	(p_id_libro,
             p_nombre,
             p_valor)$$

DROP PROCEDURE IF EXISTS `listar_descuentos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_descuentos` ()  NO SQL
SELECT * FROM descuento$$

DROP PROCEDURE IF EXISTS `listar_editoriales`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_editoriales` ()  NO SQL
SELECT * FROM editorial$$

DROP PROCEDURE IF EXISTS `listar_libros`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_libros` ()  NO SQL
SELECT * FROM libro$$

DROP PROCEDURE IF EXISTS `listar_productos_por_lista`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_productos_por_lista` (IN `p_id_compra` INT(15))  NO SQL
SELECT * FROM lista_productos WHERE id_compra = p_id_compra$$

DROP PROCEDURE IF EXISTS `listar_version_por_libro`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_version_por_libro` (IN `p_id_libro` INT(15))  NO SQL
SELECT * FROM version_libro WHERE id_libro = p_id_libro$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
CREATE TABLE `compra` (
  `id` int(15) NOT NULL,
  `comprador` varchar(50) NOT NULL,
  `total` int(10) NOT NULL,
  `subtotal` int(10) NOT NULL,
  `id_descuento` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`id`, `comprador`, `total`, `subtotal`, `id_descuento`) VALUES(1, 'Gary Valverde H', 51638, 60750, 4);
INSERT INTO `compra` (`id`, `comprador`, `total`, `subtotal`, `id_descuento`) VALUES(2, 'Pablo Monestel', 5000, 5000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `descuento`
--

DROP TABLE IF EXISTS `descuento`;
CREATE TABLE `descuento` (
  `id` int(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `procentaje` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `descuento`
--

INSERT INTO `descuento` (`id`, `nombre`, `procentaje`) VALUES(1, 'Normal', 0);
INSERT INTO `descuento` (`id`, `nombre`, `procentaje`) VALUES(2, 'Cliente frecuente', 5);
INSERT INTO `descuento` (`id`, `nombre`, `procentaje`) VALUES(3, 'Descuento por volumen', 20);
INSERT INTO `descuento` (`id`, `nombre`, `procentaje`) VALUES(4, 'Dia de la madre', 15);

-- --------------------------------------------------------

--
-- Table structure for table `editorial`
--

DROP TABLE IF EXISTS `editorial`;
CREATE TABLE `editorial` (
  `id` int(15) NOT NULL,
  `cedula` int(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `anno_de_creacion` year(4) NOT NULL,
  `representante` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `editorial`
--

INSERT INTO `editorial` (`id`, `cedula`, `nombre`, `direccion`, `telefono`, `anno_de_creacion`, `representante`) VALUES(1, 1, 'Universidad de Costa Rica', 'San Jose', '22392382', 1932, 'Carlos Portugues');
INSERT INTO `editorial` (`id`, `cedula`, `nombre`, `direccion`, `telefono`, `anno_de_creacion`, `representante`) VALUES(2, 2, 'Larousse Editorial S.L.', 'San Jose', '22839838', 1947, 'Hector Perez');
INSERT INTO `editorial` (`id`, `cedula`, `nombre`, `direccion`, `telefono`, `anno_de_creacion`, `representante`) VALUES(3, 3, 'Santillana', 'España', '23398484', 1915, 'Fernando Vasquez');
INSERT INTO `editorial` (`id`, `cedula`, `nombre`, `direccion`, `telefono`, `anno_de_creacion`, `representante`) VALUES(4, 4, 'Legado S.A', 'Cartago', '27748333', 1954, 'Ana Jimenez');
INSERT INTO `editorial` (`id`, `cedula`, `nombre`, `direccion`, `telefono`, `anno_de_creacion`, `representante`) VALUES(6, 6, 'UNED', 'Cartago', '28849383', 1948, 'Octavio Mora');

-- --------------------------------------------------------

--
-- Table structure for table `libro`
--

DROP TABLE IF EXISTS `libro`;
CREATE TABLE `libro` (
  `id` int(15) NOT NULL,
  `isbn` int(15) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `editorial` int(15) NOT NULL,
  `anno_publicacion` year(4) NOT NULL,
  `genero` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `libro`
--

INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(1, 1, 'Cien años de soledad', 'Gabriel García Márquez', 3, 1923, 'Drama');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(2, 2, 'El señor de los anillos', 'J. R. R. Tolkien', 4, 1928, 'Drama');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(3, 3, 'Un mundo feliz', 'Aldous Huxley', 2, 1935, 'Drama');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(4, 4, 'Don Quijote de la Mancha', 'Miguel de Cervantes', 1, 1976, 'Drama');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(5, 5, 'Hamlet', 'William Shakespeare', 2, 1950, 'Drama');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(6, 6, 'La Odisea', 'Homero', 3, 1932, 'Drama');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(7, 7, 'Alicia en el país de las maravillas', 'Lewis Carroll', 1, 1904, 'Drama');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(8, 8, 'Frankenstein', 'Mary W. Shelley', 4, 1910, 'Misterio');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(9, 9, 'Limon blues', 'Anacristina Rossi', 4, 2007, 'Drama');
INSERT INTO `libro` (`id`, `isbn`, `titulo`, `autor`, `editorial`, `anno_publicacion`, `genero`) VALUES(10, 10, 'Asi que pasen 5 años', 'Federico García Lorca', 6, 1931, 'Drama terror');

-- --------------------------------------------------------

--
-- Table structure for table `lista_productos`
--

DROP TABLE IF EXISTS `lista_productos`;
CREATE TABLE `lista_productos` (
  `id` int(15) NOT NULL,
  `version_libro` int(15) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `id_compra` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lista_productos`
--

INSERT INTO `lista_productos` (`id`, `version_libro`, `cantidad`, `id_compra`) VALUES(1, 1, 1, 1);
INSERT INTO `lista_productos` (`id`, `version_libro`, `cantidad`, `id_compra`) VALUES(2, 20, 1, 1);
INSERT INTO `lista_productos` (`id`, `version_libro`, `cantidad`, `id_compra`) VALUES(3, 15, 1, 1);
INSERT INTO `lista_productos` (`id`, `version_libro`, `cantidad`, `id_compra`) VALUES(4, 5, 1, 1);
INSERT INTO `lista_productos` (`id`, `version_libro`, `cantidad`, `id_compra`) VALUES(5, 25, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `version_libro`
--

DROP TABLE IF EXISTS `version_libro`;
CREATE TABLE `version_libro` (
  `id` int(15) NOT NULL,
  `id_libro` int(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `valor` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `version_libro`
--

INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(1, 1, 'Tapa dura', 13000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(2, 1, 'Coleccionista', 20000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(3, 1, 'De bolsillo', 5000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(4, 2, 'Digital', 1000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(5, 2, 'Trilogia', 30000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(6, 2, 'Normal', 10000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(7, 3, 'Tapa dura con cubierta', 13500);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(8, 3, 'De bolsillo', 3000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(9, 4, 'Edicion completa', 12400);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(10, 4, 'Parte 1', 4500);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(11, 4, 'Parte 2', 5650);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(12, 4, 'De bolsillo', 3000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(13, 5, 'De bolsillo', 5000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(14, 6, 'De bolsillo', 3000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(15, 7, 'De bolsillo', 5450);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(16, 8, 'De bolsillo', 3450);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(17, 9, 'De bolsillo', 4000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(18, 9, 'Edicion especial', 14000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(19, 9, 'Edicion estudiantil', 10000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(20, 4, 'Edicion estudiantil', 12300);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(21, 9, 'Edicion firmada', 24000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(22, 5, 'Primera edicion', 54000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(23, 8, 'Primera edicion', 65000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(24, 10, 'Digital', 2000);
INSERT INTO `version_libro` (`id`, `id_libro`, `nombre`, `valor`) VALUES(25, 10, 'Portable', 5000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `descuento`
--
ALTER TABLE `descuento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `editorial`
--
ALTER TABLE `editorial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lista_productos`
--
ALTER TABLE `lista_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `version_libro`
--
ALTER TABLE `version_libro`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `descuento`
--
ALTER TABLE `descuento`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `editorial`
--
ALTER TABLE `editorial`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `libro`
--
ALTER TABLE `libro`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `lista_productos`
--
ALTER TABLE `lista_productos`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `version_libro`
--
ALTER TABLE `version_libro`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
