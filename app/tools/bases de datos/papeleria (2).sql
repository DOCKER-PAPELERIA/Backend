-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-06-2024 a las 06:12:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `papeleria`
--
CREATE DATABASE IF NOT EXISTS `papeleria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `papeleria`;

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `SP_BUSCAR_LOGIN`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BUSCAR_LOGIN` (IN `_usuario` VARCHAR(100))   BEGIN
    SELECT usuario, contrasena FROM login
    WHERE usuario = _usuario
    LIMIT 1;
END$$

DROP PROCEDURE IF EXISTS `SP_CATEGORIAS_ORDENALFABETICO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CATEGORIAS_ORDENALFABETICO` ()   BEGIN
SELECT idCategorias, Categoria 
FROM categorias
ORDER BY Categoria ASC;
END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_CATEGORIAS` (IN `_IDCATEGORIAS` INT(10), IN `_CATEGORIA` VARCHAR(100), IN `_FECHA` DATE)   BEGIN
UPDATE categorias
SET Categoria = _CATEGORIA,
fecha = _FECHA
WHERE idCategorias = _IDCATEGORIAS;
END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_CREAR_CUENTA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_CREAR_CUENTA` (IN `_idCrearCuenta` INT(10), IN `_correo` VARCHAR(100), IN `_contrasena` VARCHAR(100), IN `_confirmacion` VARCHAR(100), IN `_estado` VARCHAR(50))   BEGIN
UPDATE crearcuenta
SET correo =
CASE
   WHEN _correo = '' THEN correo
   ELSE _correo
END,
   contrasena =
CASE
   WHEN _contrasena = '' THEN contrasena
   ELSE _contrasena
END,
    confirmacion =
CASE
   WHEN _confirmacion = '' THEN confirmacion
   ELSE _confirmacion
END, 
    estado =
CASE
   WHEN _estado = '' THEN estado
   ELSE _estado
END
  
WHERE idCrearCuenta = _idCrearCuenta;

END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_PRODUCTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_PRODUCTO` (IN `_idProducto` INT(10), IN `_descripcion` VARCHAR(200), IN `_unidades` INT(25), IN `_precio_compra` INT(20), IN `_precio_venta` INT(20))   BEGIN
UPDATE producto
SET descripcion =
CASE
   WHEN _descripcion = '' THEN descripcion
   ELSE _descripcion
END, unidades =
CASE
   WHEN _unidades = '' THEN unidades
   ELSE _unidades
END, precio_venta =
CASE
   WHEN _precio_venta = '' THEN precio_venta
   ELSE _precio_venta
END, precio_compra =
CASE
   WHEN _precio_compra = '' THEN precio_compra
   ELSE _precio_compra
END 
  
WHERE idProducto = _idProducto;

END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_PROVEEDOR` (IN `_idProveedor` INT(10), IN `_telefono` INT(10), IN `_direccion` VARCHAR(100), IN `_correo` VARCHAR(150), IN `_nit` INT(20))   BEGIN
UPDATE proveedor
SET telefono =
CASE
   WHEN _telefono = '' THEN telefono
   ELSE _telefono
END,
   direccion =
CASE
   WHEN _direccion = '' THEN direccion
   ELSE _direccion
END,
    correo =
CASE
   WHEN _correo = '' THEN correo
   ELSE _correo
END, 
    nit =
CASE
   WHEN _nit = '' THEN nit
   ELSE _nit
END
  
WHERE idProveedor = _idProveedor;

END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_REGPRODUCTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_REGPRODUCTO` (IN `_idRegProducto` INT(10), IN `_cantinicial` INT(25), IN `_cantfinal` INT(25), IN `_fecha` DATE, IN `_valorcompra` INT(50), IN `_estado` VARCHAR(25))   BEGIN
UPDATE regproducto
SET cantinicial =
CASE
   WHEN _cantinicial = '' THEN cantinicial
   ELSE _cantinicial
END,
   cantfinal =
CASE
   WHEN _cantfinal = '' THEN cantfinal
   ELSE _cantfinal
END,
    fecha =
CASE
   WHEN _fecha = '' THEN fecha
   ELSE _fecha
END, 
   valorcompra =
CASE
   WHEN _valorcompra = '' THEN valorcompra
   ELSE _valorcompra
END, 
    estado =
CASE
   WHEN _estado = '' THEN estado
   ELSE _estado
END
  
WHERE idRegProducto = _idRegProducto;

END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_USUARIO` (IN `_idUsuario` INT(10), IN `_identificacion` INT(15), IN `_nombres` VARCHAR(50), IN `_telefono` VARCHAR(15), IN `_fecha_naci` DATE)   BEGIN
UPDATE usuario
SET identificacion =
CASE
   WHEN _identificacion = '' THEN identificacion
   ELSE _identificacion
END,
   nombres =
CASE
   WHEN _nombres = '' THEN nombres
   ELSE _nombres
END,
    telefono =
CASE
   WHEN _telefono = '' THEN telefono
   ELSE _telefono
END, 
    fecha_naci =
CASE
   WHEN _fecha_naci = '' THEN fecha_naci
   ELSE _fecha_naci
END
  
WHERE idUsuario = _idUsuario;

END$$

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_CATEGORIAS` (IN `_IDCATEGORIAS` INT(10))   BEGIN
DELETE FROM categorias
WHERE idCategorias = _IDCATEGORIAS;
END$$

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_CREARCUENTA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_CREARCUENTA` (IN `_idCrearCuenta` INT(10))   BEGIN
DELETE FROM crearcuenta
WHERE idCrearCuenta = _idCrearCuenta;
END$$

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_PRODUCTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_PRODUCTO` (IN `_idProducto` INT(10))   BEGIN
DELETE FROM producto
WHERE idProducto = _idProducto;
END$$

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_PROVEEDOR` (IN `_idProveedor` INT(10))   BEGIN
DELETE FROM proveedor
WHERE idProveedor = _idProveedor;
END$$

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_REGPRODUCTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_REGPRODUCTO` (IN `_idRegProducto` INT(10))   BEGIN
DELETE FROM regproducto
WHERE idRegProducto = _idRegProducto;
END$$

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_USUARIO` (IN `_idUsuario` INT(10))   BEGIN
DELETE FROM usuario
WHERE idUsuario = _idUsuario;
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_CATEGORIA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_CATEGORIA` (IN `_CATEGORIA` VARCHAR(100), IN `_FECHA` DATE)   BEGIN
INSERT INTO categorias (categoria, fecha)
VALUES (_CATEGORIA, _FECHA);
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_CREARCUENTA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_CREARCUENTA` (IN `_IDUSUARIO` INT(10), IN `_IDROL` INT(10), IN `_CORREO` VARCHAR(100), IN `_CONTRASENA` VARCHAR(100), IN `_CONFIRMACION` VARCHAR(100), IN `_ESTADO` VARCHAR(50))   BEGIN
INSERT INTO crearcuenta (idUsuario, idRol, correo, contrasena, confirmacion, estado)
VALUES (_idUsuario, _idRol, _correo, _contrasena, _confirmacion, _estado);
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_PRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_PRODUCTOS` (IN `_descripcion` VARCHAR(200), IN `_unidades` INT(25), IN `_precio_compra` INT(20), IN `_precio_venta` INT(20))   BEGIN
INSERT INTO producto (descripcion, unidades, precio_compra, precio_venta)
VALUES (_descripcion, _unidades, _precio_compra, _precio_venta);
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_PROVEEDOR` (IN `TELEFONO` VARCHAR(10), IN `DIRECCION` VARCHAR(100), IN `CORREO` VARCHAR(150), IN `NIT` INT(20))   BEGIN
INSERT INTO proveedor (telefono, direccion, correo, nit)
VALUES (telefono, direccion, correo, nit);
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_REGPRODUCTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_REGPRODUCTO` (IN `IDPRODUCTO` INT(10), IN `IDCATEGORIA` INT(10), IN `IDPROVEEDOR` INT(10), IN `CANTINICIAL` INT(25), IN `CANTFINAL` INT(25), IN `FECHA` DATE, IN `VALORCOMPRA` INT(50), IN `ESTADO` VARCHAR(25))   BEGIN
INSERT INTO regproducto (idProducto, idCategoria, idProveedor, cantinicial, cantfinal, fecha, valorcompra, estado)
VALUES (idProducto, idCategoria, idProveedor, cantinicial, cantfinal, fecha, valorcompra, estado);
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_USUARIO` (IN `IDENTIFICACION` INT, IN `NOMBRES` VARCHAR(100), IN `TELEFONO` VARCHAR(20), IN `FECHA_NACIMIENTO` DATE)   BEGIN
    INSERT INTO usuario (identificacion, nombres, telefono, fecha_naci)
    VALUES(IDENTIFICACION, NOMBRES, TELEFONO, FECHA_NACIMIENTO);
END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_CATEGORIAS` ()   BEGIN
 SELECT * FROM categorias;
END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_CUENTA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_CUENTA` ()   BEGIN

SELECT * FROM crearcuenta;

END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_PRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PRODUCTOS` ()   BEGIN
 SELECT * FROM producto;
END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PROVEEDOR` ()   BEGIN

SELECT * FROM proveedor;

END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_REGPRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_REGPRODUCTOS` ()   BEGIN

SELECT  * FROM regproducto;

END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_USUARIO` ()   BEGIN

SELECT * FROM usuario;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_CATEGORIAS` (IN `_IDCATEGORIAS` INT(10))   BEGIN

SELECT * FROM categorias WHERE idCategorias = _IDCATEGORIAS;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_CATE_PRODUC`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_CATE_PRODUC` ()   BEGIN
SELECT C.Categoria, P.descripcion
FROM categorias C
INNER JOIN producto P
ON idCategorias = idProducto;
END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_CUENTA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_CUENTA` (IN `_IDCREARCUENTA` INT(10))   BEGIN
    SELECT * FROM crearcuenta WHERE idCrearCuenta = _IDCREARCUENTA;
END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_PRECIOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_PRECIOS` ()   BEGIN
SELECT precio_venta, descripcion FROM producto;
END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_PRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_PRODUCTOS` (IN `_IDPRODUCTO` INT(10))   BEGIN

SELECT * FROM producto WHERE idProducto = _IDPRODUCTO;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_PROVEEDOR` (IN `_IDPROVEEDOR` INT(10))   BEGIN

SELECT * FROM proveedor WHERE idProveedor = _IDPROVEEDOR;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_REGPRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_REGPRODUCTOS` (IN `_IDREGPRODUCTO` INT(10))   BEGIN

SELECT * FROM regproducto WHERE idRegProducto = _IDREGPRODUCTO;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_USUARIO` (IN `_IDUSUARIO` INT(10))   BEGIN

SELECT * FROM usuario WHERE idUsuario = _IDUSUARIO;

END$$

DROP PROCEDURE IF EXISTS `SP_PRODUCTO_AGOTADO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PRODUCTO_AGOTADO` ()   BEGIN
SELECT P.descripcion, P.unidades
FROM producto P
WHERE unidades <= 0;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `idCategorias` int(10) NOT NULL,
  `Categoria` varchar(100) NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategorias`, `Categoria`, `fecha`) VALUES
(1, 'papels', '2024-05-28'),
(2, 'Sacapuntas', '2023-04-02'),
(3, 'Lapiz Rojo', '2023-05-18'),
(4, 'Colores', '2024-01-03'),
(5, 'Cuadernos', '2023-02-09'),
(6, 'Libros', '2022-11-29'),
(9, 'Diccionarios', '2023-08-17'),
(10, 'COB', '2024-05-28'),
(11, 'Tijeras', '2024-03-06'),
(12, 'CARTUCHOS', '0000-00-00'),
(13, 'aaaa', '0000-00-00'),
(15, 'rggeeg', '2024-05-27'),
(18, 'camas', '0000-00-00'),
(19, 'camas', '0000-00-00'),
(20, 'camas', '0000-00-00'),
(21, 'camas', '2024-05-27'),
(22, 'camas', '2024-05-27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crearcuenta`
--

DROP TABLE IF EXISTS `crearcuenta`;
CREATE TABLE `crearcuenta` (
  `idCrearCuenta` int(10) NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `idRol` int(10) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `confirmacion` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `crearcuenta`
--

INSERT INTO `crearcuenta` (`idCrearCuenta`, `idUsuario`, `idRol`, `correo`, `contrasena`, `confirmacion`, `estado`) VALUES
(74, 4, 2, 'cal', '$2b$04$5/yRBBNJ0s1EY45wTSIKZOt1rH0L/3wuizCksBmazkZU9FyexOqZu', '$2b$04$Vk1dIZt/wlhB23Uvd0HSCuV75gD5itv4Lfw0O4xUPMwr64muQ9Rm6', 'activo'),
(75, 4, 2, 'g', '$2b$04$TtSdLCev7ImMYpDeKyIFF.eyQX7YGexMwb4uvbj4EE0p2lZp0ugR6', '$2b$04$Q8s2xN0ByOU7FeazOo3i2enwWhUlk54C/N1qtlW7dECoGTNxPp5ra', 'activo'),
(76, 5, 1, 'g', '$2b$04$kN7lh4D9gtmIPvn.Mma0b.aBCJriSu5HqRu917tagjzg4FjW4gh9q', '$2b$04$V/5nb0AuFRPU7Mu0Ov8rdu.SmyZ/K5MrPcrz29YiPowrL.8bUvLxm', 'activo'),
(77, 5, 1, 'h', '$2b$04$uHexz/3ipPL9awFROIcmoevbTKe3Pe95YfZlJ1eLJ9J3R.Df5Lpve', '$2b$04$wmS.vnKW7FdQJaiieM//Kumw7oW0NS8JP8ErP.CfmTWgkCGdQEJha', 'activo'),
(78, 1, 1, 'h', '$2b$04$XhrKrDqnoNjWeYeksn9.jOWx36M4h4PIyiAZP3PsY9A4XwtOun3a.', '$2b$04$XcHnNzW.0OGE81/w7.ojsuR5S9cSROiKToG6jGUp.XkN5jtAWt2By', 'activo'),
(79, 6, 1, 'h', '$2b$04$GimlSBNYxRsEgvXw.RBw7uBgfOf0.jcOWdjl.9LBFg4jm9Qq2mXh6', '$2b$04$qzCYg1j6n93D3YXlEU1uj.L0xYF26P8fzxOFOeDejY5cgwjJa.cc.', 'activo'),
(80, 8, 1, 'lo', '$2b$04$tNoxRz4zYzN8sYLHMWtzau36OyWADGnh6YFZJZFyyPZZoN6ZcqJMy', '$2b$04$JmVJa7XIKbbUzMD4QrY4Q.iFNsRtDpw668w/2nI1HH9/tfl.4EE.a', 'activo'),
(81, 8, 1, 'lo', '$2b$04$5l1oJJXWqJCcgvlhtNis1.8JFanI0X5LLdQJgyuOef/ZQdbmiJ8sy', '$2b$04$y7K5ZRfG8QpbuC8b0qe35etS2bEFVIdOJOJ./03E2Mb/5WZRrJ15C', 'activo'),
(82, 8, 1, 'camila', '$2b$04$fIofCBDUrneNtQkdlakx/uEkNECMnsH.9a.wnH/3R852mrIIMy9Cq', '$2b$04$2UZuejhlQ6uFXFevx2GtoutrWBoDjRNVPayZRZYcN.QTl.V0IW5Su', 'activo'),
(83, 3, 1, 'camil', '$2b$04$KM1/W5dbxF6hAUqyC4a08ewYVPUKL6r5ErXxEb/HQBCjY6xyaU96m', '$2b$04$h1Oggj6c5MESn3wfJHTuy.Wkd7xY/WQKU9AeChUSrCs7AajmMz382', 'activo'),
(84, 3, 1, 'camil', '$2b$04$lPBw1JUbDpuDhX3HAItq6eMB7OVdCy7A0uqIQW7YJimCdKGsObxae', '$2b$04$/emuvrGAO.xsdAFaegcTWORpR2kVTctlCr9FGcE6PR1UdAYaGTK3O', 'activo');

--
-- Disparadores `crearcuenta`
--
DROP TRIGGER IF EXISTS `after_crearcuenta_insert`;
DELIMITER $$
CREATE TRIGGER `after_crearcuenta_insert` AFTER INSERT ON `crearcuenta` FOR EACH ROW BEGIN
DECLARE username VARCHAR(100);
    
    SELECT nombres INTO username
    FROM usuario
    WHERE idUsuario = NEW.idUsuario;

    INSERT INTO login (idCrearCuenta, usuario, contrasena)
    VALUES (NEW.idCrearCuenta ,username, NEW.contrasena);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

DROP TABLE IF EXISTS `detalle`;
CREATE TABLE `detalle` (
  `idDetalle` int(10) NOT NULL,
  `idFactura` int(10) NOT NULL,
  `idRegProducto` int(10) NOT NULL,
  `cantidad` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE `factura` (
  `idFactura` int(10) NOT NULL,
  `idCrearCuenta` int(10) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `idLogin` int(10) NOT NULL,
  `idCrearCuenta` int(10) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`idLogin`, `idCrearCuenta`, `usuario`, `contrasena`) VALUES
(62, 74, 'Laura Gómez', '$2b$04$5jae6pOg.NChNhSrjPq0nuRGXG4QlNg.viU4z3ApIri/BOeIyHrN6'),
(63, 75, 'Laura Gómez', '$2b$04$TtSdLCev7ImMYpDeKyIFF.eyQX7YGexMwb4uvbj4EE0p2lZp0ugR6'),
(64, 76, 'Marcela Hernandez', '$2b$04$kN7lh4D9gtmIPvn.Mma0b.aBCJriSu5HqRu917tagjzg4FjW4gh9q'),
(65, 77, 'Marcela Hernandez', '$2b$04$uHexz/3ipPL9awFROIcmoevbTKe3Pe95YfZlJ1eLJ9J3R.Df5Lpve'),
(66, 78, 'Juan Pérez', '$2b$04$XhrKrDqnoNjWeYeksn9.jOWx36M4h4PIyiAZP3PsY9A4XwtOun3a.'),
(67, 79, 'Carlos González', '$2b$04$GimlSBNYxRsEgvXw.RBw7uBgfOf0.jcOWdjl.9LBFg4jm9Qq2mXh6'),
(68, 80, 'Jorge Hernández', '$2b$04$tNoxRz4zYzN8sYLHMWtzau36OyWADGnh6YFZJZFyyPZZoN6ZcqJMy'),
(69, 81, 'Jorge Hernández', '$2b$04$5l1oJJXWqJCcgvlhtNis1.8JFanI0X5LLdQJgyuOef/ZQdbmiJ8sy'),
(70, 82, 'Jorge Hernández', '$2b$04$fIofCBDUrneNtQkdlakx/uEkNECMnsH.9a.wnH/3R852mrIIMy9Cq'),
(71, 83, 'Pedro Rodríguez', '$2b$04$KM1/W5dbxF6hAUqyC4a08ewYVPUKL6r5ErXxEb/HQBCjY6xyaU96m'),
(72, 84, 'Pedro Rodríguez', '$2b$04$lPBw1JUbDpuDhX3HAItq6eMB7OVdCy7A0uqIQW7YJimCdKGsObxae');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodopago`
--

DROP TABLE IF EXISTS `metodopago`;
CREATE TABLE `metodopago` (
  `idMetodoPago` int(10) NOT NULL,
  `idFactura` int(10) NOT NULL,
  `tipopago` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `idProducto` int(10) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `unidades` int(25) NOT NULL,
  `precio_compra` int(20) DEFAULT NULL,
  `precio_venta` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `descripcion`, `unidades`, `precio_compra`, `precio_venta`) VALUES
(1, 'Lapicero azul ', 100, 1500, 2000),
(2, 'Cuaderno argollado', 50, 3000, 6000),
(3, 'Colores', 20, 5500, 10000),
(4, 'Borrador', 200, 700, 1500),
(5, 'Resaltadores', 20, 6000, 12000),
(6, 'Papel bond tamaño carta (500 hojas)', 30, 2000, 3000),
(7, 'Carpeta archivadora de plástico ', 40, 2300, 4000),
(8, 'Tijeras de acero inoxidable', 25, 2500, 5000),
(9, 'Corrector líquido ', 50, 1300, 2500),
(11, 'Carpeta de cartón color café ', 1, 900, 1700),
(12, 'e222222222222e2eeeeee', 1, 9000, 80000),
(13, 'Marcadores', 1, 7300, 15000),
(16, 'carton cuadrado que tiene puntas delgadas', 1, 1200, 1300);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor` (
  `idProveedor` int(10) NOT NULL,
  `telefono` int(10) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `nit` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`idProveedor`, `telefono`, `direccion`, `correo`, `nit`) VALUES
(1, 1234567890, 'Calle 123', 'proveedor1@example.com', 2147483647),
(2, 2147483647, 'Avenida XYZ', 'proveedor2@example.com', 2147483647),
(3, 2147483647, 'Calle Principal', 'proveedor3@example.com', 2147483647),
(4, 2147483647, 'Avenida Regional', 'camilo@gmail.com', 123456789),
(5, 2147483647, 'Calle Secundaria', 'proveedor5@example.com', 2147483647),
(7, 2147483647, 'Avenida Grande', 'proveedor7@example.com', 2147483647),
(8, 1010101010, 'Calle Vieja', 'proveedor8@example.com', 2147483647),
(9, 1212121212, 'Avenida Pequeña', 'proveedor9@example.com', 2147483647),
(10, 1313131313, 'Calle Larga', 'proveedor10@example.com', 2147483647),
(11, 2147483647, 'Calle 45 Avenida Pilsen', 'vtrfy@example.com', 2147483647);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reglogin`
--

DROP TABLE IF EXISTS `reglogin`;
CREATE TABLE `reglogin` (
  `idRegLogin` int(10) NOT NULL,
  `idLogin` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regproducto`
--

DROP TABLE IF EXISTS `regproducto`;
CREATE TABLE `regproducto` (
  `idRegProducto` int(10) NOT NULL,
  `idProducto` int(10) NOT NULL,
  `idCategoria` int(10) NOT NULL,
  `idProveedor` int(10) NOT NULL,
  `cantinicial` int(25) NOT NULL,
  `cantfinal` int(25) NOT NULL,
  `fecha` date NOT NULL,
  `valorcompra` int(50) NOT NULL,
  `estado` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `regproducto`
--

INSERT INTO `regproducto` (`idRegProducto`, `idProducto`, `idCategoria`, `idProveedor`, `cantinicial`, `cantfinal`, `fecha`, `valorcompra`, `estado`) VALUES
(1, 1, 1, 1, 10, 5, '2023-01-01', 500, 'disponible'),
(2, 2, 2, 2, 50, 45, '2023-01-01', 200, 'disponible'),
(3, 3, 3, 3, 20, 18, '2023-01-01', 300, 'disponible'),
(4, 4, 4, 4, 100, 95, '2023-01-01', 50, 'disponible'),
(5, 5, 5, 5, 100, 78, '2024-03-06', 200, 'agotado'),
(9, 9, 9, 9, 30, 25, '2023-01-09', 15, 'disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `idRol` int(10) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `rol`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `idUsuario` int(10) NOT NULL,
  `identificacion` int(15) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `fecha_naci` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `identificacion`, `nombres`, `telefono`, `fecha_naci`) VALUES
(1, 123456789, 'Juan Pérez', '123-456-7890', '1990-01-01'),
(2, 12344, 'carlos carlo', '1234567', '2041-09-13'),
(3, 111111111, 'Pedro Rodríguez', '111-111-1111', '1985-10-10'),
(4, 222222222, 'Laura Gómez', '222-222-2222', '1998-03-15'),
(5, 2397841, 'Marcela Hernandez', '3208794532', '1987-05-18'),
(6, 444444444, 'Carlos González', '444-444-4444', '1988-06-20'),
(7, 555555555, 'Sara Ramírez', '555-555-5555', '1989-09-25'),
(8, 666666666, 'Jorge Hernández', '666-666-6666', '1987-12-10'),
(9, 777777777, 'Luis Fernández', '777-777-7777', '1993-04-05'),
(11, 1040516846, 'Carolina', '315498244', '2005-11-28'),
(12, 123456874, 'Lisandro', '3204879654', '2005-04-17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategorias`);

--
-- Indices de la tabla `crearcuenta`
--
ALTER TABLE `crearcuenta`
  ADD PRIMARY KEY (`idCrearCuenta`),
  ADD KEY `idUsuario` (`idUsuario`) USING BTREE,
  ADD KEY `idRol` (`idRol`) USING BTREE;

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `idFactura` (`idFactura`) USING BTREE,
  ADD KEY `idRegProducto` (`idRegProducto`) USING BTREE;

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`),
  ADD KEY `idCrearCuenta` (`idCrearCuenta`) USING BTREE;

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`idLogin`),
  ADD KEY `idCrearCuenta` (`idCrearCuenta`) USING BTREE;

--
-- Indices de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  ADD PRIMARY KEY (`idMetodoPago`),
  ADD KEY `idFactura` (`idFactura`) USING BTREE;

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `reglogin`
--
ALTER TABLE `reglogin`
  ADD PRIMARY KEY (`idRegLogin`),
  ADD KEY `idLogin` (`idLogin`) USING BTREE;

--
-- Indices de la tabla `regproducto`
--
ALTER TABLE `regproducto`
  ADD PRIMARY KEY (`idRegProducto`),
  ADD KEY `idProducto` (`idProducto`) USING BTREE,
  ADD KEY `idCategoria` (`idCategoria`) USING BTREE,
  ADD KEY `idProveedor` (`idProveedor`) USING BTREE;

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategorias` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `crearcuenta`
--
ALTER TABLE `crearcuenta`
  MODIFY `idCrearCuenta` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `idDetalle` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `idLogin` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  MODIFY `idMetodoPago` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProveedor` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `reglogin`
--
ALTER TABLE `reglogin`
  MODIFY `idRegLogin` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `regproducto`
--
ALTER TABLE `regproducto`
  MODIFY `idRegProducto` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `crearcuenta`
--
ALTER TABLE `crearcuenta`
  ADD CONSTRAINT `CrearCuenta_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CrearCuenta_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `Detalle_ibfk_1` FOREIGN KEY (`idFactura`) REFERENCES `factura` (`idFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relacion1` FOREIGN KEY (`idRegProducto`) REFERENCES `regproducto` (`idRegProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `Factura_ibfk_1` FOREIGN KEY (`idCrearCuenta`) REFERENCES `crearcuenta` (`idCrearCuenta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `Login_ibfk_1` FOREIGN KEY (`idCrearCuenta`) REFERENCES `crearcuenta` (`idCrearCuenta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `metodopago`
--
ALTER TABLE `metodopago`
  ADD CONSTRAINT `MetodoPago_ibfk_1` FOREIGN KEY (`idFactura`) REFERENCES `factura` (`idFactura`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reglogin`
--
ALTER TABLE `reglogin`
  ADD CONSTRAINT `RegLogin_ibfk_1` FOREIGN KEY (`idLogin`) REFERENCES `login` (`idLogin`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `regproducto`
--
ALTER TABLE `regproducto`
  ADD CONSTRAINT `RegProducto_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategorias`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RegProducto_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RegProducto_ibfk_3` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
