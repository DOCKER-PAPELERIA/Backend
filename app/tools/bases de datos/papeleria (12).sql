-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2024 a las 05:33:05
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BUSCAR_LOGIN` (IN `_correo` VARCHAR(100))   BEGIN
    SELECT correo, contrasena FROM usuario
    WHERE correo = _correo
    LIMIT 1;
END$$

DROP PROCEDURE IF EXISTS `SP_CATEGORIA_PRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CATEGORIA_PRODUCTOS` (IN `_categoria` VARCHAR(50))   BEGIN
    DECLARE _idCategoria INT;
    
    -- Obtener el ID de la categoría
    SELECT idCategorias INTO _idCategoria
    FROM categorias 
    WHERE Categoria = _categoria;
     
    
    -- Seleccionar productos de la categoría
    SELECT 
        c.Categoria,
        p.nombre_product,
        p.codigo_producto,
        p.stock,
        p.imagen
    FROM 
        producto p
    JOIN 
        categorias c ON p.idCategorias = c.idCategorias
    WHERE 
        p.idCategorias = _idCategoria 
        AND p.stock != 0;
END$$

DROP PROCEDURE IF EXISTS `SP_CREAR_HISTORIAL`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CREAR_HISTORIAL` (IN `_idUsuario` INT(10), IN `_idProducto` INT(10), IN `_idMetodoPago` INT(10), IN `_cantidad` INT(100), IN `_fecha` DATE)   BEGIN
    INSERT INTO factura (
        idUsuario, 
        idProducto, 
        idMetodoPago, 
        cantidad, 
        fecha
    ) VALUES (
        _idUsuario, 
        _idProducto, 
        _idMetodoPago, 
        _cantidad, 
        _fecha
    );
END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_CATEGORIAS` (IN `_IDCATEGORIAS` INT(10), IN `_DESCRIPCION_CATEGORIA` VARCHAR(200), IN `_CATEGORIA` VARCHAR(100), IN `_imagen` TEXT, IN `_FECHA` VARCHAR(15))   BEGIN
UPDATE categorias
SET Categoria = _CATEGORIA,
descripcion_categoria = _DESCRIPCION_CATEGORIA,
fecha = _FECHA,
imagen = _imagen
WHERE idCategorias = _IDCATEGORIAS;
END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_PRODUCTO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_PRODUCTO` (IN `_idProducto` INT(10), IN `_idCategorias` INT(10), IN `_idProveedor` INT(10), IN `_nombre_product` VARCHAR(200), IN `_stock` INT(25), IN `_codigo_producto` INT(50), IN `_imagen` TEXT, IN `_precio` INT(20), IN `_fecha` VARCHAR(15), IN `_estado` VARCHAR(50))   BEGIN
UPDATE producto
SET idCategorias =
CASE
   WHEN _idCategorias = '' THEN idCategorias
   ELSE _idCategorias 
END, idProveedor  =
CASE
   WHEN _idProveedor = '' THEN idProveedor
   ELSE _idProveedor 
END, nombre_product = 
CASE
	WHEN _nombre_product = '' THEN nombre_product
    ELSE _nombre_product
END, stock = 
CASE
	WHEN _stock = '' THEN stock
    ELSE _stock
END, codigo_producto =
CASE
   WHEN _codigo_producto = '' THEN codigo_producto
   ELSE _codigo_producto
END, imagen =
CASE
   WHEN _imagen = '' THEN imagen
   ELSE _imagen
END, precio =
CASE
   WHEN _precio = '' THEN precio
   ELSE _precio
END, fecha =
CASE
   WHEN _fecha = '' THEN fecha
   ELSE _fecha
END, estado =
CASE
   WHEN _estado = '' THEN estado
   ELSE _estado
END
  
WHERE idProducto = _idProducto;

END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_PROVEEDOR` (IN `_idProveedor` INT(10), IN `_nombre_proveedor` VARCHAR(100), IN `_telefono` INT(10), IN `_correo` VARCHAR(150))   BEGIN
UPDATE proveedor
SET nombre_proveedor =
CASE
   WHEN _nombre_proveedor = '' THEN nombre_proveedor
   ELSE _nombre_proveedor
END,
   telefono =
CASE
   WHEN _telefono = '' THEN telefono
   ELSE _telefono
END,
    correo =
CASE
   WHEN _correo = '' THEN correo
   ELSE _correo
END
  
WHERE idProveedor = _idProveedor;

END$$

DROP PROCEDURE IF EXISTS `SP_EDITAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAR_USUARIO` (IN `_identificacion` INT(12), IN `_nombres` VARCHAR(50), IN `_telefono` INT(12), IN `_fecha_naci` VARCHAR(15), IN `_correo` VARCHAR(100), IN `_contrasena` VARCHAR(500), IN `_estado` VARCHAR(50))   BEGIN
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
END, 
    contrasena =
CASE
   WHEN _contrasena = '' THEN contrasena
   ELSE _contrasena
END, 
    estado =
CASE
   WHEN _estado = '' THEN estado
   ELSE _estado
END
  
WHERE correo = _correo;

END$$

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_CATEGORIAS` (IN `_IDCATEGORIAS` INT(10))   BEGIN
DELETE FROM categorias
WHERE idCategorias = _IDCATEGORIAS;
END$$

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_HISTORIAL`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_HISTORIAL` (IN `_idFactura` INT(10))   BEGIN
DELETE FROM factura
WHERE idFactura = _idFactura;
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

DROP PROCEDURE IF EXISTS `SP_ELIMINAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ELIMINAR_USUARIO` (IN `_idUsuario` INT(10))   BEGIN
DELETE FROM usuario
WHERE idUsuario = _idUsuario;
END$$

DROP PROCEDURE IF EXISTS `SP_FILTRAR_PRODUCTOS_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_FILTRAR_PRODUCTOS_CATEGORIAS` (IN `_filtro` VARCHAR(50), IN `_categoria` INT(50))   BEGIN
    IF _filtro = 'sin filtro' THEN
        SELECT p.*, c.Categoria, c.imagen AS foto
        FROM producto p
        JOIN categorias c ON p.idCategorias = c.idCategorias
        WHERE p.idCategorias = _categoria;
    ELSEIF _filtro = 'nuevo' THEN
        SELECT p.*, c.Categoria, c.imagen AS foto
        FROM producto p
        JOIN categorias c ON p.idCategorias = c.idCategorias
        WHERE p.idCategorias = _categoria
        ORDER BY p.fecha DESC;
    ELSEIF _filtro = 'viejo' THEN 
        SELECT p.*, c.Categoria, c.imagen AS foto 
        FROM producto p
        JOIN categorias c ON p.idCategorias = c.idCategorias
        WHERE p.idCategorias = _categoria
        ORDER BY p.fecha ASC;
    ELSEIF _filtro = 'ordenar' THEN
        SELECT p.*, c.Categoria, c.imagen AS foto 
        FROM producto p
        JOIN categorias c ON p.idCategorias = c.idCategorias
        WHERE p.idCategorias = _categoria
        ORDER BY p.nombre_product ASC;
    END IF;
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_CATEGORIA`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_CATEGORIA` (IN `_CATEGORIA` VARCHAR(100), IN `_DESCRIPCION_CATEGORIA` VARCHAR(200), IN `_imagen` TEXT, IN `_FECHA` DATE)   BEGIN
INSERT INTO categorias (categoria, descripcion_categoria, imagen, fecha)
VALUES (_CATEGORIA, _DESCRIPCION_CATEGORIA, _imagen, _FECHA);
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_PRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_PRODUCTOS` (IN `_idCategorias` INT(10), IN `_idProveedor` INT(10), IN `_nombre_product` VARCHAR(200), IN `_stock` INT(25), IN `_codigo_producto` INT(50), IN `_imagen` TEXT, IN `_precio` INT(20), IN `_fecha` DATE, IN `_estado` VARCHAR(50))   BEGIN
INSERT INTO producto (idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado)
VALUES (_idCategorias, _idProveedor, _nombre_product, _stock, _codigo_producto, _imagen, _precio, _fecha, _estado);
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_PROVEEDOR` (IN `_nombre_proveedor` VARCHAR(100), IN `_telefono` INT(10), IN `_correo` VARCHAR(150))   BEGIN
INSERT INTO proveedor (nombre_proveedor, telefono, correo)
VALUES (_nombre_proveedor, _telefono, _correo);
END$$

DROP PROCEDURE IF EXISTS `SP_INSERTAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTAR_USUARIO` (IN `_idRol` INT(10), IN `_identificacion` INT(15), IN `_nombres` VARCHAR(50), IN `_telefono` INT(15), IN `_fecha_naci` DATE, IN `_correo` VARCHAR(100), IN `_contrasena` VARCHAR(500), IN `_estado` VARCHAR(50))   BEGIN
    INSERT INTO usuario (idRol, identificacion, nombres, telefono, fecha_naci, correo, contrasena, estado)
    VALUES(_idRol, _identificacion, _nombres, _telefono, _fecha_naci, _correo, _contrasena, _estado);
END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_CATEGORIAS` ()   BEGIN
 SELECT * FROM categorias;
END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_HISTORIAL`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_HISTORIAL` ()   BEGIN
    SELECT 
        f.idFactura AS ID,
        p.nombre_product AS Nombre_Producto,
        u.nombres AS Usuario,
        f.cantidad AS Cantidad_llevar,
        p.precio AS Precio,
        f.fecha AS Fecha,
		m.tipoPago AS Pago,
        f.cantidad * p.precio AS Total_pagar
        
    FROM 
        factura f
    LEFT JOIN 
        usuario u ON f.idUsuario = u.idUsuario
    LEFT JOIN
    	producto p ON f.idProducto = p.idProducto
    LEFT JOIN 
        metodopago m ON f.idMetodoPago = m.idMetodoPago;
END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_PRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PRODUCTOS` ()   BEGIN

SELECT
		p.idProducto,
        c.Categoria,
        d.nombre_proveedor,
        p.nombre_product,
        p.stock,
        p.codigo_producto,
		p.imagen,
        p.precio,
        p.fecha,
        p.estado
        
        FROM 
        producto p
       
        LEFT JOIN 
        categorias c ON p.idCategorias = c.idCategorias
        LEFT JOIN
        proveedor d ON p.idProveedor = d.idProveedor
		WHERE p.stock != 0;

END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PROVEEDOR` ()   BEGIN

SELECT * FROM proveedor;

END$$

DROP PROCEDURE IF EXISTS `SP_LISTAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_USUARIO` ()   BEGIN

SELECT * FROM usuario;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_CATEGORIAS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_CATEGORIAS` (IN `_IDCATEGORIAS` INT(10))   BEGIN

SELECT * FROM categorias WHERE idCategorias = _IDCATEGORIAS;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_HISTORIAL`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_HISTORIAL` (IN `_idFactura` INT(10))   BEGIN
    SELECT 
         f.idFactura AS ID,
        p.nombre_product AS Nombre_Producto,
        u.nombres AS Usuario,
        f.cantidad AS Cantidad_llevar,
        p.precio AS Precio,
        f.fecha AS Fecha,
		m.tipoPago AS Pago,
        f.cantidad * p.precio AS Total_pagar
        
    FROM 
        factura f
    LEFT JOIN 
        usuario u ON f.idUsuario = u.idUsuario
    LEFT JOIN
    	producto p ON f.idProducto = p.idProducto
    LEFT JOIN 
        metodoPago m ON f.idMetodoPago = m.idMetodoPago
     WHERE idFactura = _idFactura;
END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_PRECIOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_PRECIOS` ()   BEGIN
SELECT precio, nombre_product FROM producto;
END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_PRODUCTOS`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_PRODUCTOS` ()   BEGIN

SELECT
		p.idProducto,
        c.Categoria,
        d.nombre_proveedor,
        p.nombre_product,
        p.stock,
        p.codigo_producto,
		p.imagen,
        p.precio,
        p.fecha,
        p.estado
        
        FROM 
        producto p
       
        LEFT JOIN 
        categorias c ON p.idCategorias = c.idCategorias
        LEFT JOIN
        proveedor d ON p.idProveedor = d.idProveedor
		WHERE p.stock <= 0;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_PROVEEDOR`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_PROVEEDOR` (IN `_IDPROVEEDOR` INT(10))   BEGIN

SELECT * FROM proveedor WHERE idProveedor = _IDPROVEEDOR;

END$$

DROP PROCEDURE IF EXISTS `SP_MOSTRAR_USUARIO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MOSTRAR_USUARIO` (IN `_IDUSUARIO` INT(10))   BEGIN

SELECT * FROM usuario WHERE idUsuario = _IDUSUARIO;

END$$

DROP PROCEDURE IF EXISTS `SP_PRODUCTO_AGOTADO`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PRODUCTO_AGOTADO` ()   BEGIN
 SELECT * FROM producto
WHERE stock <= 0;
END$$

DROP PROCEDURE IF EXISTS `SP_PRODUCTO_AGOTADO_Web`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PRODUCTO_AGOTADO_Web` ()   BEGIN

SELECT
		p.idProducto,
        c.Categoria,
        d.nombre_proveedor,
        p.nombre_product,
        p.stock,
        p.codigo_producto,
		p.imagen,
        p.precio,
        p.fecha,
        p.estado
        
        FROM 
        producto p
       
        LEFT JOIN 
        categorias c ON p.idCategorias = c.idCategorias
        LEFT JOIN
        proveedor d ON p.idProveedor = d.idProveedor
		WHERE p.stock <= 0;

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
  `descripcion_categoria` varchar(500) NOT NULL,
  `imagen` text NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategorias`, `Categoria`, `descripcion_categoria`, `imagen`, `fecha`) VALUES
(1, 'Papelería Escolar', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'data:image/png;base64,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', '0000-00-00'),
(2, 'Papelería de Oficina', 'alalalololcadbk kbdv \r\n', 'data:image/png;base64,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', '2023-04-02'),
(3, 'Material de Escritura', 'qqqqqqqqqqqqqqqqqqqqqqqq', 'data:image/png;base64,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', '2023-05-18'),
(4, 'Cuadernos y Libretas', 'aaaaaaaaaaaaaaaaaaaaaaa', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhMVFRUXFxcYGRgXFxcYFxcWFxgXFxUYFxoYHSggGBolGxcaITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0mICUtLy0tLS8tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALMBGgMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYHAQj/xABHEAACAAMFBAcEBwUGBgMAAAABAgADEQQFEiExBiJBURMyYXGBkaEHQlKxFCNicpLB0RUkM0NEFoKiwuHwU2Nzo7LSNIOT/8QAGwEAAQUBAQAAAAAAAAAAAAAAAAECAwQFBgf/xAA8EQACAQIDBAcHAwQBBAMAAAAAAQIDEQQhMQUSQVETYXGBkaHwIjJCscHR4QYUUiNigvFyFTNDkhaD0v/aAAwDAQACEQMRAD8A7jAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAQAMzbUq6mK9TF0qerAr7ffaojsAxIUkZcQMoq/wDU6TdlcI5uw3d16oEUNUNQEntOvrDIbUorJ3Fk8yzk2xG0YRdp4qlU91iD8WACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACABhZ++U/3pWEbzsOcckx2boYURHqmogBqx7AIEABAAQAEABAAQANmYAKnSGSqRjHeegWKS33wdFjnMbtdp2iFyse0O2ZJjn62PqTeo0RhJ1r5xVdeT1Yh4ytwJh0MVNcRyPBanXQjyi7S2jNIVMtLvvkjJtI28HtV3sx7RoZUwMARoY6OE1OO8hgqHgEABAAQAEABAAQAEABAAQAEABAAQAEABAAlXrDISb1FaFQ8QIAKS12sCf3ED0zivOdpFqnTcoFheNtSXKMxjRaa9+kWEnLQraSzIdxXwk8bhJFKjurQ+sMiyWtG2ZbAwqkm7EJ7DgCAAgASzgUrxNB3wCpN6EOfbqTVl86+J5fn4Ql0JJNWb4jb2/E7IvAhe9jFevUtaK4lrodyKlLjn3EK+rdTdGgjD2rjLf048CuUsvMxyVSbbEsTESkLFK4lgdhCzaGHmOGJ8RRidSEysKRGNDE1OVhyZo9nbZXcPhHYbIxO8txiF7G8AQAEABAAQAEABAAQAEABAAQAEABABHm2kKyqdG0PbDXKzJI03KLa4EiHEZDtDFXy45/rFatNU3dsmgt6NiVLeorD6FeFaO9EiaszybMCirEAdsTpN6DJSUVduxyy89oG6Wgpm5z7OMZUpt1EusbhcfUnWjRVs5Jd1yxtNtNqsciWDRlIxV0OE4aeWcbNSrGjVd9Gvmbe0cA1iJ25prvzKb2d3sZU15T1+qmzJbc6Z09RFPeUc2VpQc4Kx066Z5cMT2etYKLu2yLEU1CyLCJysEAHjNQVMAJXMtft/SpE2WZ00JjJSWDpiIzJPOnHTOKznKTuuBegoxhuPjx+nYN2G9pbzMmBOHEKZ7vVBB0FST307IZHeUXUel7d5ZqYVumpWyvb6ntgt6/SCtM6M+XYMyfTzEUqTk605S+FX+yKdTDVKcXUqO7k7Lqis/mVVrtNWJrHLYmbnJsrDlmmxnTiBLa0ZQl2xrYxMtAhbNjRsWiDcCx41oqIclbIVEWbNh8YgWWz8+kxe8Ru7Lk41EFzbx2IoQAEABAAQAEABAAQAEABAAQAEABABjb62mlWZKTnw5jDxIJNMwMwvCvCIbNqxce4pJlnI2jkoitMcBTQA65kVGndDIVkspEv7GpVf9NX4iTtBIn7spquueEgg4RqRzjP/AFBvUqCusm9eXLxF/Y1qL3qiyZJS8CqMyjHQVpWlfGMHZO01Qrbk/dll2MY6ClNRbt1mNvXasWgqUOHB1hk4oTqDp2R6Jg6tPo6ieqTfgiht/Y2Iw3R1Gt6Ddnwt1swVotBMwdzH0McxQd6kH1lPYUVPaFK/8kWt0bWWdUKs+8gpShqzVpReZjUxScm5I6nE4uDr1L8387F5d9zlb4txNQjpJnL96YM/VXjH2zjJYaEN1Zt+Viph5+ydEuWRhU510i1svEOvByasV8VPeaLKNQqhABkdqtrks8zoyMQA3qHME6Dty+cVMRV3cjZ2fsyVeHSXtyOE+0u/P2jbZUuRmqqEA+25rMr3ZD+7D6GUN58Sjjl0dVwb906Js3apdkkpZs6hQMWufb+Q7Yo4jE53ei9eZHgdrRrVY0HHLSNvr26s2GztnH0adaMiXVqEUOVKkA8tPKEo0pRw1ST1kr+WXkW9pVozqKMdI5GRmWk1rHKONzPZJkWqIpUxjZIa1REqYxyEPOhygOTE/SIXcEueGdBuijUyfD1AS5cbNZzU7xGxs2H9SPaC1OgR1w8IACAAgAIACAAgAIACAAgAIACAAgA5d7Wdl8QNqlioIo478q9x0gA5Nd94Oj9E5Jy3STqoyw94jOxlG3trvOw/Tu0FNftamqzi/oW8u9ZktxMRiGGjDU9/YeUSUascRSdCok8vFfg6DEYaFs1eL19fI6tszfSzkDDiK05cGHg3oRHnm0MJLD1HF8Hb7eKOSxuEdJ2Mftddps9qBUUluCy0yAyOJcuR9DHT7M2hLE4Nxk/ajk/ozSeMjU2TXcvejFp+GT9cigs7gWkV0CEnyMXFkkeWUas6K6WGsWmu5ox9yKXnSAMy0xPNnX9Y2a1906CpKUnKS1zffqfTdpCGYJijNpaVPMCpUeFT5xyP6hqqdWlHqv4/6LOBnv0VPnn5Fxd9MGXMxv7Ihu4VPnmQ1n7ZX3vexltgWmQqeeekPxeM6J2RawuEVSO9IhTtqVlyJsyZhxJSgHvFur6wYfGqcXfVE3/TXOrCENH5W1OHbX36aNMJqzE07WMRQi6s7eJ02JqxwGGutdF2/jUrNgbDQNanFSSVl14n3jE+Lrbq3EeZbQxD9xavU1bS5swiXJznTmEtOx3BJY8gqBmPcOcVI0N/di+Ob7F93ZeJr7HwiwuGeNn70sofWX0XVc7Xctyy7NZZdkl1KJLwVOpyoSe85xruN4tMiOWXmpluyHVSR5GOJlScJuL4BvEaXaqQ107jJMfFrhnRkLYpbbzMI6QsZnptghOiZJvIbNqzh3RiXE/SYcqYxzNjsImOYW4KPU6RubLp3nfkPhnmbkOOYjfH78eYqAcEABAAQAEABAAQAEABAAQAEABAA3aJKupRhVWBBHYYAPnj2l7JtZZxK1wk4kbkeH6GEaTVmOhOUJKUXZrQobBahMWhyIyI5NGPVpyo1LruPS9m4+GOw+89dJLk/WhebNXw1nfnhOIDmNHXxHqIrbTw0cVTVRccn1Ph5+RXxWGUm6cvH5M6NtXMlzbFj61CjIfvED5ExyuzFOni93S90+78nFbRlOhQqx0ut1+JyO9bXgeYR8BXzWO6wtHpb9Sv5o5XDx3kl1lLc3/yJVMsJxDsKhmHqBGmlepFHWbIp9LjacXz+SbPoq55xeUj/GARXgDoPKPOdr1L4+avlF2XcSrCrCp0E77rfzf+ix2NvITkmEGoxlh91sh/4x3eDh0dGMOSRn11nco9ppv7xM8PkIxNqv2364G/s+P9CPf82c62wvTFOMtTurr2vSnoMvOH0Ybkc9Wb+Ao2hvvu7Pz8jn1pDWu0iUp3V1PIDrN+UatO1GlvPVnG/qDaKnVdvdjkut8fXI3tlRVUBRRFGFR2cPEmK2GovEVc9NW+S4nObI2dPaWLUHprJ8lx8dEdI9mtw0rbJgzoySuwEgzXHewCg8k7Yv0bTk6q0eS6orJeOvedNtjERqVujp5Qhku430TmSc09pl2GW4tCjdfJuxwPzA9DGDtLDbtTpFo9e0r1nu5nPvpdIpdEVHWFfTO2E6IidYS1uhVSHRqAl5DnA6DLlKVybLtSniPGIZU2uBb6K48Owg92fyhmmoqwFSWaR0rZ6QlnkKHmIpbearrqRkNeAjdwsqVCkt6au89UVpYPE1JWhB2JUy+5C/zK/dVj60AhZ7Uw0fiv2JlinsPGS1SXeRpm1kldMXiQv6xA9sQ+CLfkXYbBnH36luwZ/tuDkgBPYGc+kKtpV5+7D6kv7KhT96Yl7/tb9STMpzKhB/ipCupjJkbqYKnxuFy3u81mR5iyyDShzJ7iMj5wmHjLpPakZ8tq4SdRwjwNspHOsbgJp6HsAoQAEABAAQAEABAAQAU21dxLbJDSyBizKk8Dy7jAB80X1YXsk84gcjRhzAyr3iIa1JVI24mhszHywddTXuvJrq/BLV8QDKcxmDzEZUXuNxlo8meizUcTSUoO/FPmjR3ZfWKzGzGpo4ZexeKnuNPWM6WD3cUqq5WfbzOL/VNNPCdOuLUX23+plb6FemamQdFr2mtB5A+UbWFk41Ek9U/A53Y9Km8JXlPVblu3e9XIOzSFrTQcBTxYgCL1SqqT33wN39Pbqxe8+EWz6JFmboujl5MJZC/eCEL6x5phoPFYxL+UvrdjK9TKU2ZL2JXrUJLJ1QrTtSh+VY9M+Izpe1TT5E7ba39FMnzOIIC9rkCnlQnwjFxNNVK7vojpNm09+jCPP5XzOM3zbMCE13mqBzqdTE+Hp9JPPQ1Nr4xYXDWj70sl9X3InbK3Z0aVPXfNuxeC/nCYqr0krLRHkuMrdLPdWi+Zsbksqzp6IzBUBqzE5AD/AHlGpKl+1wu48pVNepcfBebPQ8HhVsXZkpy/7k9e16Lu+dzsVjviyACWk6UAoAC4gKAZAUMMhVpaRaOR/cU285ZlmjgioII5jOJiRSTzRHvKwpPltKmCqsKH8iOREMqU4zi4y0ElFSVmcF2z2TtNiYsVZ5OomqCRT7dOoe/KMuWFlB2MuphqkXlmjKpeKnRh5iGvDtcCtKlNcCZd69M2EOi5VJY8ONBxiOpB01ezLOGwdSq7XS7S5WRZJVA7Ga54DkNSFU5DtJis+mmm45I38PhMNStvPefrgSbPflk/k2d3yqCsrkK6toKcTl2xXeAxc37Ul4/b5amusZgaOiS7kvnYmpe81gCllcYuqGaWpbMgkDFoKammRHMQ5bHlrKaGvbeHWifkKW0TdXyUlQDJEuZUt7oLulGGhGmueUWY7IpJ+1NEM9tS+GI9jl0JYTHoab06gxEdUrLSoNaAmuEV1MXaezsNHrKc9pYqXNdzJq2yVKLAXfKJSm8zzZutcPWTqkimPhyyMW44ajHSHkU51cRPVv5fVFl/am0KDhsstAtA1FbdY1wjhVDlv5EV6uRiazWkfkQSpTfDxa+5Gt+0FtKuDLRAtA1Faqlq01bNNN7I65ZQ2W+8t1+RFPC1JJrL/wBvwV1ktVqlM1JSVBAJK1oWNFJ381J8vCIY4dp3Uc+1ENPZkabbVvF9/wAJey9o7dkMMsEsVpQA4lGIqdc8OYPHlFpRnyRdVC3FeD7h2VtHa2FcSncLgLlVcwaZVqp4V1pzh27PqHqHJ+X5Fm/rV8QYdH0gIPWTiRQDeFR2ZjKDckuIqj1mm2ftsxyVmMGoqsCBSobQ+h8oWzWoti7gAIACAAgAIACADnftW2UE+UbQg3gN+nLg35GADhFkmmU5ktpU4ew8RFLFUb+2u86fYG03Tf7eby+Ht5d5oboG+WHL1rGc+TGfrSSWFi4/FLNdaRDvG0Usk0DWZbE/DLlTW+bLE2HhfGRfKD82l9GcpglbD36/oK9lkgTLYQeLJ5IS35CE25V6PDN9T88ixQlUji6bh/dfscWvqd/sVpVZ0tW1clV78LN8hHMfpylv4y/JN/T6mrWpylSk1wzfZexx2wW0XdfMySd1VtdR/wBOcflhf0jvZLO5n05ey4smbe3ss60zcBqiu1DzOhPdlTwjMrW3nbmdrsmi6dCLnrbw9anO7Gn0ifjOctDRftHh65+UTS/o0t3izjNvbS6eq3F5aLs595s0GFacTmYk2Zhukqb8tI/P1mP/AEnsn9xX/c1F7MNOuX417bGu2XsgWXVgCXzoaGgGmsX6k+lqufLJd2r738ka36hxnS4joovKPz4l41jQjOWv4RDXCL1Rg5Mp7VZEQ1lgyzzlkof8JER9BBaK3ZkM/b0m77qFWW8rVoLVNp9ohvUisNdJ8Gxs8LF6Nrv+4Wu75s8UmTywPMGh7xWkRywrfxMpT2fvfHLx/BATYGQdQnhLT8xCLCv+TGrAW/8AJPxLGx7C2cEZHUaBB6hYesMuLfiSrCQWt32ts0M24pK9WzqOGbU+QMSRw1JcC4oQXBeBT3hZytrsypLl5h1mLvNuspaWTkPeltTsxRIqVOOSS8CRStp9hj6GwlZLL+qtglpuE1UzQpGuYCTGFPsdkSJIHUfN+Iq3WGiW+mGiAMpCAETTKVgozyOPoyBzftgsrA6nq5JtcjCbVjY4foyM4AUDGRMWmQ6xAUU+7CviN3lkRbeoWomOMS2Rlm7w3psygRBzYsr5fbHOBtZgnoNXha5CierTkJEhJRGMnFNbHhStaYt9fxiEbWYJjd53zY1NorapBPQJJp0g+smnpNM8wOkWp0GI8jA5IFciXjtHYD0qi1SjWXLkggsakli7/dUNrzqNYTeQlzw7X2LpMSszA2gzaLKeoRJQRRp1mIrTkc6QbwqTehHsu2cpMLiVPYpIm0GAgF500TKVPuqQBXjWDPkPVKo81F89HoMHbIqFSXZZpMuR0KliBV6LjYgcAEWg7TCNvkSLC1r23X4d5r9lNs5YH1kt1JVVCihoqjcqSRVmJJ9M4Riywskl/rU08ratGNAjUzzPZSunLjyhpE6VtWi+lTMQrARC4ACAAgAIAGrQAVIKlgQQQKZg6jOAD5m222ZmGe5lBcOI4auMQAzFa8QCITIVX1QXLYLQqnEmZHBlNe3WM+ph3veysibbWInjKFKKzavfys+8qrbcNvZAokPTpGegK6kBa5HkIs0qShPe42S+pHBQhh4wWt3fyNj7LNn3sxM+erI5Z0wn4aSyrZZa4h4Ri7dpYiuujpwbWTv155fIt4WVFRvL3r+Tt9TTbUTZ8x5Zs4YFCzYgwWjHIUJPKGfp7Azw+/KqrNpJfM2sJiMJ0VSNWaW8reu8w19bKW42wz5lJ5wq2NZitV9BqQSRrpyjeqOW5ZGDsqNNVE8TJWWfaQryuK2MhVJWZyJLoKDjq2sVqNK0ryOi2ltak6Dp0JXbyb6uI9ddxzJAAKqKfbTrHic4bVjKcrs4KvQq1ZEtWAIxutScxiqdaECnHhGnSqxpUNynrbzPQMHtbA4LCxoUr5Llx5vPmb6/JlpdsCu0nCAClEC6ZUFSdO0aaQQWWhzlHEKN3OKfW1mZ+dKtUvqzK07WHyaH2XIt/vKMvepx8CMbztVcyT30PzWEuuXmG9g3rTt2NkuzXjOGssHwH6iDLrGOODem8u/8FrIviaP5PofyaC69L8kTo4Z6TfgiQt/Th/Tr+KYP8hhGyN4alwqeQf2qnAj90HhMP5oIa5vhbzG/tV/Nef2EW/aa3PXo5ctB2zdPwySfWHd68/sSxwSes15/YzaLemJXM5MYJYtgdy0xlCYziYAELVQAAAGOWcL7H8vJlmOAw3xVl/6v7jIuy30QNarRRGZxgloAHfFifTNjjbM/EYXepcXLwZYjgtnca3yX0Y9K2dmEUmWm29fHTeAL1riOHU148KDlCb9Hm/B/Ye8Ls9e7K/8AlYiWrZ1hiaZMnutcb0mOGJUDCd9jiphGoByFNIVqHD142KlT9rBK1u7eb83YYGzqsQFUt0hDoxYlXoAQK4TvUpnXQdkO3eorzxFDPdXZ7K/L8x2RsuCVIlJV3dFDClJqg4pTUIp1Go3ZpnBukbxcL5Rfj9rEiz7MoQCiJnKaagwqCyrQTUbLKYKgVFOt3wWQxYpJq0I9+fc/VywW4Ja10IAktyxSppwroBRlYE1GtBzhbcBv7udskllyXrv1J0q4UxBDqZsyUWBauISzMSbrTFhAB4GsDzB4yu3fe5eu0XLu2XgWYEUEypM0CgIDM4R0GKu64OnOphm5HlyGSxNZ6yfH13irRd0tVcADdFqANF0lEGUdNUchRzrSDdXIZvyvmyWLOgcggBelIYaASzZsVpGVN0TMJ7Gyh1khl29fXpEi6ZoZ5YLAzMMgsBQt0iq/S1AzqUKg9pENbFSOg3fKZUXFTFQA00FNBEY4kwAEABAAQAEAHJdp7mEzpXAFUYkjIYlqagHgdD2ivIwy12SU3mYGz2KgGQJDFQQpXFShwICdw9jZHUawyTsyKpNxaRGGFVbclhVahJxCXJap3ZtCXRuG7UHhyiRXHZWNDdV0CaquUKtQcqNnqAKhwRQgg8Yz8Ri3SnuJLs4vs/JNGinG9/x2iZtgRGdQAaDeNa9GDQ4nBpgXkc+ESUq7qK7X47SfD4WnVbTlZprLmmuGWv0IU5UwiiywhJo7Fik0n3UOrHsIHbSJN5iywkE3a9l2XXW+FhCTWZ2AlKrAfwyKPIBAHSTN7CFy0G9nDpKxnylYeMvFQYVpQkGlA9a4pgJqZYFfe3mplEcVfMvYPDqtFuXl9Fxv5asjPZlV/eqKEEADNc8x7rU4cN2usSoTFxpwluwXbx7k+K6+Yqb7S2ZixBcH/iS6tThVlYViymuZUGZvtCQ9aSPDEvzBhbrmAqz7c2Wu8jr3Z/pAFy8sW3Vg4zXXvWFC5dWTbO7j/VKOG8jD/LBZ8hLltZ9pbA2lss/i4X/ypDXlqJmWlnt1mfqz5Dd0xD8jCXXMLMnylU6FT3GsCDMfEnsh1hAaUeFK9o/QwtguIMhyKbn4W/8AaALlLf0nDKKFxWayyvdUUc79KaES8ZzPuwreQIy/7esMroVNolKonzpi7wOGSOlVKU0BxAAa0J5Qb6yCzKx9vrECGVmf95e0EKjdVVZJaVpkzGjchnWBPkFiv/twcIEqzzGdZTyw2Ggx2hg01qHgtBhHE6wqjN6RDLmEzay1knDZJaJWUPrHI+rkZy0OHPN94ka6dsO6Oo+Q32RMq871ndTACRMqUlt1pp32xM1AwG6DwEJKKWshU+osZNxXi5xzrY0vNSBKVQRgBCAUBoBUkDma6xFKceDY5Jj8m4AlAXnsQFALznHUJKbqEaMSe/PWIXMeol5d+zUggY0x69YswzOI9Yn3s+/ODUDfbN2KXLQ9GiqMhugD5Q9DS5hQCAAgAIACAAgAxFpoDOqAQSympoCCTkT7oOe97ufxQ15Ac5vOziWXQkkCoPSUFEJOFZ1NJfAOMx4CIp6+vPqI8RPenfqz/PrUozkcVWDJWjBQ8yUv/Kl6WuT9o+NNYlWg9aG3uSQEs6ZAYgG1OEkmtatQoeNMqaZRgYp71dry59/wGgneK6ku7u4ke+ZisEIXfUEHeIKAcQB/H7F4jsixhYyTcXovLv8AiJaV021ldW7f/wA9pQz20ws1XoC6pV5gp1Xk0pZVPxjQaVjQgviIsZU3VuLw5d/EQVWXLCjAoBooLYpSMeMlznaJ1M8JqNB3J7zMqC6SViaksIrFqg1UuXzfETRTaKazjoqDIHWHvJXOopqNCipPll1/8Hy/k3roiPaJdK5GvEHMjmGPvHPNhqTT3YZD16+ZhVJOUnJ8SCuzblQws8wqdCEYg+NIidamnuuSv2hmNfsNR1pZXvBEOTT0Ylx+Xs9JPuwu6xN4eGyck+76QbsuYl0H9i5B4DyH6Qlp82JdHh2FlH4f990F6v8AJhkJOwErkv8Ai/WG71XmGR6mxCr1WZe53H5wm/V9IUfTZ+YnVtNoX7s+YPzhelqdQE+QlsTJbfax/wDaG/8ANTEkarCxZWa8bwX+umtkRRpdnbx/hg1iTpWFihvrZqda2DWi2WiZTQNhwjKmSiijLkIVVBLEaR7OqZiaf/yl/rE8cS1okN3CXL2JnL1Z/CgxSFPyaJFjJchvRov7p2Mn4frp4PZKQJl9pjn5QssQ3oCgX9j2Uky8wik/E1WbzMQSqyerHKKLQWFVGgHf+kR5jhu0SxTL00gsKUlqsxrwHqYBSwsjIoGI1Pbn6DKF0zY25pLmvFCShIBpWlRXyGkPi76CF0prmIUD2AAgAIACAAgAwl7mhmf9RuI8cjkw0qp627yMNYIw1+zazDQ9UZEAnCKGpUEfWpwMs58Yhlr69dxBP3vXpmdVTVVUNiYlpao1Jjc3sc0n935mU1TrkcgJ0Tm5vGYJUk5gKqAFnBKDh9agzI7vWOfw6dWo5dedsl/kuL60aCyaX++7kZ5zQLWmf8PFQhuQsGdJfZj4nWuR1kuHruLLkoJvlrz/AM+fcNypZq5IbGAC4qFnhaf1s2tJqccK58MoWT+FGFWqdJJ28FovwN2D61xMUnAckdVorjitnknOR2zW14UGs0Y2yNHZuGc53ayWfJfns4ku0jQCoocK4KEqfeWTXKaadabwFaRDUn7VjQ2hK8Hbja+Wvavh6o+JtNldk5TJLtEwpMDKrIi5ygCN2lesANOG8xzrlgY/H1N50qeXN8fwZMYrVm1Cxiqkr3bJLi8uUW4ypx+F+I3MYmWSW2stD3qIkeKn8OXiJuojNc8g/wApPAUhqxeIX/kYbq5Cf2HI+D1MTraOIWW95ITcQpbnkD+WPWE/fV38XyDciLF1yf8AhJ5CGPGV38TF3I8hf0CVSnRpQ/ZEQuvVvfefiLuoob02cRQXSoAzK10HZ+ka2E2jvyVOos3o/uRyhbNFEbEvMxt7hHcWthXn8oXdC49KsK8/SF3RLlpZLKKa1hd0LkxLKIXdC5PwAKO6FsgGmfl6frCgMTRTNiF79fX9ILBcr7beUpFLFhQe8xwr5tCdgGKvja5DUS6uOY+rl/iYVbwEOVOfHIS6KyTbrVOyUEL9mstfFjvt4UgtCOerFzZu9i7magaY5oDXAgCy6821LeJhd9sN2xuDeMtci615DM+QhN5C2JEqbiFQMoLiDsKAQAEABABg9osi4yp0jE1qQBnmQM6ZnMZjMw1gjA305Mw9YktQb28XC5dGcgk4cOBFOIiF5v167yB+/wCvLrK25ZQeaq6qZoL4VHRO65/vIA+ptIpUYaA0PbBiZbtKTy04uyzyzZapq8kX982gmYAKhlAIOs5TTWVLO7PHf6axQwkLR3n3fjmuRpUoX9Zf5P4SsQVJoaBuvh3hNy0tFRWycDu+XEXfdRSx1fSC/C6r/VjNtcYVl7mEEYQ5IkI3D6M9K2mZXPC2Vaa8Fpx4lGlC9vL8FhJl4Q2LGXIJcuQs4rlnaaZJLFRujPSvCJ37MbnW0aSoUVn36xv/AGPjPreSzsMW9qLwNQDqUUqKElSM5MkfAc3yHGM+D3pX9eHIz8Y26b7c+f8Al/J9eiOn7DTi9gszE1PRgVK4a0JFcPu6acI53GK2InbmUY6F9FUUIUAgAIACAAhbgEABCAQ71mhZTE004mmpA4xZwEd7FQXWNm7RZnpc8H3Qe6hjsN0q7w+qj/hnyhbBcXhTinpBYLj8kS+VPOFsFyUgTn6/6wWFuKm2hBzNPTvJhRLmZvbbWzyqgOGI92VvtXkW6q+Jh0YSlogbMVbdtZ85itnQKewdNM8WYYFPgYe6cY++xFfgR5dx2mccc9yOO8TMf13V8IY6yXuoeocy4sdwykNaYm5mrN4cBFedW+rJFAt5Mojqp+L9BEXSrgP3SRhmkULkLyGQ8hCdJJhZIm3bZqGFiIzdWUbi9wi2tCEdhQCAAgAIAMNfw+uIGvSGlAa1JHVbg3fkchDWCOaX4w6SaGGVWVg5FMNWos9hpLPCYNDURH8Xr1YgXvevXYFwthmNMfH9UjVY1xoDQYGSn7yh4TfsiuoiHGXcFFcX2+XEu0FeXpf6PbRNJYLQ45maIGq7dtnn6WbnhfQ1rXSFpwsrevwXq1VU4WWb8PFfF2joNA2EVK9egwlCR/VCv71wrh5eEC9p+vTMK7qSu/XbzEWKSS+I1pTJwKo5pSkiTrZacWOtainGylwRs7Nob8962UetLvz17OI/amG6tForVAY1RGyoUf8AqZ2eSaa+EOIktPXga2IqXlaPHV2tdf8AH4FzevEj285OT8a4qribHUYTOXQz69QDdXU6RWhr69dxnYz3EvDl/j1c28zpXs0et2yNcukGZqcprjM8T2xzu0MsRL1wKcdDTxTuKELcD2FuAQAeQlwPYLgEAHkIBkfalKV7A0t2ZQ7ywStK9bFx7oubNlu4hS5XElHeVjlVm2PlUqlunL3x1Kxy5kToPkTpOzU9f4d5v4g0+cTLFp8hrokmXd15r1LxU94P/tEn7hckN6IexX6vVtEh+8EflCqtHihOjYG+7+QfwpMzuKf5iId0sOQnRsrXkXnayRaEYA6iY69GO5ENG8oXpqazSBU5aFtYNi1yM1mmn4Ruyx3AZxXqYpskjSSNRYrkwgBECLyAAiu6rehIkiwl3OOOcMbbFuSRYVHCE3QueNJHCFsFxoSoEA9LcJmSB3w5MQ0F3XgGwqATlmcsu8cPGLUHkRNFlDxAgAIACADE30P3g5Vzb3iKilTX7NNRrTMQ1gjk15TqvUUpV2GEEhQS2JlT+cvxyTpSo1hkSKn69erCrvYgBRiq2aqjfWMBxsjk0RP+U2Y4Q2ok5LmaWFj7Lm1kuenfz6h6ysMLuejwE72HKzk8PpY6yTK5VTKuY4w2XJeu0z8TWdWVtfl2CnnZqzajKTjw1qRrd50mDgMfHtrEkVZBFWLCzysCtUNioTMJIE45Zm1toR2LrTOJNFc6jD0lQoJvtu/db/st8XW9OBBsUzGQ4NVYkIyistuYs0s5ydDWa1DXFFKu361KlGfTTnO7fa87Li38S/tWo3eeQ7qhaGlFyxiWx66UrjmnOlQNYjp+vX1I8Z7vz/K+Hqj3nRPZNMrdydkyaPDGSO4Zxz+08sQ+4pR0NlFC4oQXAILgELcAguAQXAILgEJcDGe001kyk5za+Sn9Yt4DOo+wfEobrsAKjKNjdQty0W615Q5RDePf2SOUSJMS56Lq5Ew9OXMTIfs11tiFGYZ8zEkZzGtIt5F0KNc4XN6jLk1LKo4CFsJcX0YgASwhQGZkIBWWu8pa8cVOWnnpALYyN67dy1JWXV3HuyqMR95zksSwoykI5JGcO0FonvQv0QPuyqzJpHa1CR4CLcMMo5shlVb0N/svPmS1CyLNMFcy85yuI8yKsx8aQ5uKGq5r1mWqnWl+T/rDboUvIQUIACADDbRZTphOHIMd7TICmKmeunbSuRhrE4HIbYSzgZ1LAA1o2MVIwNpKngZiYd1xTXMQ2OgU1fIVLVWVkOFkLfWV3JLNytJFGlTu1aA9kI/Zz9d5YxNVRiorz+nV2k20TmxLQvjAoGIHTICB/Dk0w2tKUGKmnLi2Eb5spQjfNjtiQlioNF1fCcQmMQB9dUVsbZ6CmXZmZVqaez6O/V3uCz/0uL6uIu95wCKu4BWi4jRFOn7u38+ZyDVFdaw2ebsam0a7pwaTzlk38TXHej8PdqF2KSWJxYyCZmOizyMqfSsO6JdAKS1zoBWKOIebXrv6iHBRtSTfPK+l/wC3+7reSIt/HJtMyDmMiARhJX+WoPVlas1CcoSjm/XqxHj1aPq67/ifXotDd+xmbWwMD7s+Z60Ofbz7axg7Xyr36kUYaG9rGVvDghbgELcAhbgEFwCEuBDvS85VnTHNYKPUnkBxMT4XDVsVPo6Su/JdrJ8PhqmInuU1dmPn+0FmNJFnZhzJPyA/ONd7IwtLLEV7PlFfc3o7AjBXrVUn65lNtDtC1oMrpZRlYcRzqQ1aCoqBpTti7g9k0Xd4aspdTyYyWw95N0KilbgXtzywUBWhB4iEnCUJOMlZowqtOdKThNWaLqXJhyREOCTD0IOCRDhB6TJzEOQjJVYeMEkwAQ7Vb0TrMK8tT5DOEFsU14bRBBXdQfFMNPQH84cot6C2Mtbr9tE/KzSJs8/E4MuSO3eoWHcPGJ40P5Owx1EtCGNirdas7XPVV+BASo7KaHxrEydKGiuRtzkX12+z2zSwMQeZT4zRfwqAIHWk9MhFBGlsV1y5QpLRVHJQBEbbeo7LgWNmkwIC8lrkO4RIILJgAqrx2glSaYg5r8ClvUaRZpYWdTS3fkOUGxqx7TSplaJOAAJLNLIWgzOcOqYOcNWu5iuFuJgdpNrLOZszDMOYYKQue8oFQTpoRmKZxPHY+Jmrq3iKqMmsjnUycDiYYadU1zULXSZxMkk5EZyzplSK+K2dXwqXSJWfJ+vAljB0leWpLlNgUlmIYDUr0jIh/wCXpapPJjmOMZ7W8/XplCT6SV367vqOS1IIquZqUXGWdsszItJP7rwqjUp28JCXqLWwysKkmlffNMLDj9eK/vLUpUitfGgXRXZ0eBoqlSTkrOWfBt8t1/A+t8Sqts8s1RUA5AgY8Yocll0/cgRX6zUDMREuZj4yr0lVvllrd974vrLS5pdVCqMhXCAellq3Ho5hznzOZOQrGdi5qObeXX6zZq4RxhQUm7X1z4f3fxj1rNj94XDPm9UBanFVmFQcs21xzTpipRRpnFGO1MPTWt/Pz5+Rm47HYdrdjK9uWn+N9I+bNL7PrK9jlTJUzCxeZjBUnCBhAoSQOXDhGPtLHQrzUop5LjYy44+OiTNS95ngBGV00glj+SBbzPECBV5CLHy4osZT1AI4xbjLeSZowkpRUkLh1xx5CXA8ZojlMVI5jaS14WpmYnoZZoo5jh50qfCOpxtX/pODjQh781eT9ctDsI22dhVGPvy19dWiNjd1yy1UAKPKOOlUnUd2zna2IlKV5O7MB7RL8kSLWlnnaCUDoaAMzHUaHKOp2JQm6LqRfH5FaOKlRqKcHZiNk7+lyyS0z6lgSGOla5HPmKiOpxdN1sPGq17SyfWdFtOMcVgo4tLPK/Zo14m4st92d+rNUxldHJHLXLGVakOjr5wu6+QlySkwHiPMQoCp1pVBVmUcMyPSHIRldPvoDqKW7eqvmcz4CH5jbEGbap0ziVHJd0eep9IcoNhdITKuonVqd36mHqKGuTJdl2ekqcWAM3xNvN5tp4RJmNLRbMBwgsJccEvsgAOjhQPaDvgAg2q/pEo4WmLi+Fd5vIQ5JvQQUu1cumjeafrD9yQl0I9ol5mVZ8A1fX7q/wCtI0dl0VOrd8Cxh43lc59eVnQSHnCoLIrfdovu8q6mHUcdX/dRpOWSk1258SSNWamo34lVstJNoV8bsCjoagnNc6rroaaxqbbxVTCziqekk/G+vaTYicoNWKbaJyLRNQE4Q1KVJyoDx740tk1nVwsZyzfEmoT3oJsqbOCrhsxhNQV61fs11PZx04xBtaCnh5w46ruIcRTcoNFrIYthw1qSSglGjk0zazzT/wDGfnKbt7I4tKxmRjYnWGWHqBhMsN9bgSlnxDha5Z3mmDgyZHUVzg1LeEo9LWUbN9S1fZfJPtyLK8pmFUWpBbKWDQs3ECyNohyyxfOG1JJa5Lj+TZxldUqcknZvJ2yf/wBl9X2fIkXNso8yjzi0tTQlQaT5o+G1zFJE0HiMo5zG7fhD2aCv1vTuOQq4xLKGfyNpZLEksYURVA0CgAAcgBoI5fEYqriJb1R3Kc5zqe+7kpZcQKLYqiK6OHOn1jt08oOcMsuLEyEznHCHNp5IZUkrZFpc82qEcjE1J2VjZwM96lbkTolci6Q7dekmSKzZiL3nPwGpiajg8TiHalBvuy8dCejha1Z2pxbMftDtwhRpdnBYsCMZFAAdaDUmOj2b+maiqRqYlqyz3Vnftehv4HYc1NTr5JcCs2FtqKWlOwUk4hXKuVCK88of+rNn1qrjiKabSVnbh1lvbNCcrVIq6SszoBt0pBVpiKO1lH5xydHB4ieUKcn3M5foKk3aMW+5nG/aNYZVqtzTlmnCERQyEUNAa6jmY7fY2CxNDDpVVuK7bvr4fcv0NgV68k6i3V5+BVz7J0kro0ZVUUG8uIGnCnHvjanOdS0aMW0uOi8Te2jhJSwiwmHXJdSS6yulXGwzKyCeGHGh8wcomWFbWdrmD/8AGMRa++r9/wAy4uPZ21zgTKWbLAJBZp7FP7utfKK8404O00YWJw1fDVOjnk/I2Vz7O2iX/Ftsx/shV+ZEVZunfJeZEnPiXy2OlN5+4kUPZpWIrD95kuTZu/8A32w5Ia2TZNm7IWwlyXLljv8AWFEJCr4Qoh6SIBSlvXaqyyKiZPXF8K1dvJaw5Rb0QjyMravaI0w4LHZ2mNwLAt44U/MiJVR4ydhrmuAhLkva25z5nQIfdrT/AAIcvFoP6cdMxPaZo7h9ndmk5uWnNrvUC1+6v51hHVkxVA2C3ZKAA6NPwiGi2RiPaoeoPsH5mNnZWr7S9hOJkLZNY3e9VAAkKVatcQwVao4UOUZVaThjJO2kn8yKpZTb6yo2JthUzMEszQSlcLAUBYgtU6ga0jd/UrjJUpxd17X0LGKs7MrtohS2z/vr6ypcWthu+CfaSYP3e8rbUflE+Jtn2FitoP2TqNioRUCZ0mUvTd+lgZk6YZqdnOONMRmpuxTuucZegwVw9ME4Czhd2dL5Vz4ZQI3dm0kqTm809f425TlrHnl1XNLs/d4oZrKAW76tTRmB6rcwKARx+3No78nRpvR5nObZx3TVOjT9mOXV2J8V1svlaOZMdSSPTMhcxXMTjgG77PKwCXbFS6H3l8WUfnFqjga9b3Y5c3kT08PUnoiNbbYiGYmIF5Sq7rnkraEHQxow2HUs96ST8S3DZ937b8CGu39il5SlmzKnNsNBy1Yg+kQw2VX1lZeZdjUpUY2imXtltIvCTMly5jSSVqGU5ihGR0y59kbWytn0VPfftNcHp4FnCY5QqKpuqS5PicovEGTMZJis7A9YBmVh8Smm8p5x1ENpYa1lJcrKx6DQx9CrTUou1+HFEJrUx6spvHIesS/vZP3KbfcTrELgpPuFpLc9Z0QeLHyApEUq2Pl7kLdtl9Q6Wq9IeLPJssDSax/uhfLMw+nCvZvEVbdUX9bInh0r96y7P9CZcoEgAFiefz5Qjq4ann7z63cgr4qhh1erPu4+Bf3dceKhmMKfCpp5k/lENTHTnknZHP4r9RfDh497+xZW245JQhVwsASDnqOfMRDTrTjK6ZTwu2MTGqnOV03mvtyLH2ZqWWeD1dynfRq+gEaeOs93mWP1Qop02tc/DI002x5/7EZ9kcncTLlKNMz2CvrABIUHkB35nyH6woCqjia9+nkMvOACrvPa2yyN15y4h7ib7fhXTxh0YuWgjdjK2z2mO7dHZLOzNwLbzHuRK+pESqg9ZOw1zQhLivi3Zz5nQoeDHD/25ev94wv9KPWJ7TL+6PZhZkoZxaceR3U/Cv5wkq0uGQKHM2VhuuVKXDKlog5KoA9Iibb1HpJExZcIA4iQoDsOAw/tPstZaPyxKfmPzjV2XL22i1hZWbRzq03vJWxtJaYqsJBG8QAWoRgGebdkQY/C1I1ZVn7rm19fAbWi7uXC5Sezy2pJRmdt3CPE4uA46xfxOFnXwdCFH2neX3JJRcqUUusb2otAN4NgZWUy0ORB3guHh3QuwqlRJ0srZvruh2Ek1Ld4FXebUUczlzOZ5Rd2hPdhLsLGKqJKxZXVY5hphRwV0KIXZAaVMjIhkNd6U+eeWYjlnFrgZTNXbLMVcSVlzWR8OktxLevXLP8A07a5VFaDQGsQVpNU2+S9XNKW0v6entJZPgrfPvzRojf1lU4TOVKZUaq6dpFI87/Z4iXtbrd+843/ALjbTuSJF72dzRJ8pjyDqT5AxHPC1oq8oNdwSg4q7FveMoe+D3VPyhqoVHwI3OK4kWbfI9xSe05DyESxwr+JjXVXAiveSUZrVLM2VTNVWuEjRsNcxz8I1dm9FSqWaWejZawWJhGTVRD1ktN3MMS2TLhWWg9Cc41Z4yhF2azNVVab0ix6978SYjy5UtlcqM2QABQeJ4gV07Yd++g1eKfkWIVk+D8DByellSZ9mllmWaAxBSoYEgrhNMiOYMLRxN4u9l38iOMU0+JorgmGy2dp085EBei4zOQf4Uyz592RlwPRb7tNXfC/An2Xs6rWq9EsrvwRT2+a85uknTFVn3gu9QA6UABwiNqjWo0/ZpR7bJfi521HaFDDXoYalUmoO0pRjf2lqrtq752vbQhWizMtM6g6EaHuMW4S6VXjL7rtNTA7RoYyLlSejs001KL5Si7NfXgOWC7y+bE0rSg4+Mc9tTaFShPoovMgx+0JUZbkNS+sV0qNJY7yKnzMc3Xx1SfvTZiVcbVqe9JkLaT6qdKxV3kPLgx4Hvi7smW/Tnbg/oYuKd5JkuxW1CKEjxBH6iNqCZXF3teFB0Usku2WRrQHKneY0sJh97+pPReZv7I2fvv9xVyhHNddvojX7E3eZMllYkMxDNQcaaVOWQha1XpJt8DM2zjViq+9H3Vkvv3lraZiDXPvqf8ASIjJM7em2dlk1UzAzD3Uq7eITJfEwqi3ohG0jMWzb+dMOCy2cknTFVv8Es/NokVB6yY1zR5K2ave206dzKQ8GOEeEuWa/iMO/pR6xLyZo7m9lFml0M5nnH4ckl/hXXxMI60noChzNvdtzyZK4ZUtEH2QB8oibb1HJJaE8S4LCigkFgFBILAehYWwCoUAgAr79uxbRIeU1MxlXgeES0am5K7049gqdmcjvD2QTmJIKnxibdoPWb8PyOtHmV832Q2odXhyb/WHqNJe7Wa7n9xV1SK8+yS2KaqpHapz+cLClCL3o1rPnZpixjZ5SNaPZOHCl3aWyjLCFb8WIEEwmMxsq8stBatXfd0Wdk2EtMmhkWxVp8Uk180mL8oouberIcye93XoBT6ZJbvSaK9nWMRTSlFxejEauQL12ckP/Glpi4lajPjT/WOOrYXHYNvo25R8fFamNVwLg7xXh9iss+xsqUSZbFSdSRU05VHCKlTaVWp76KdSnKWTlpzX2Hv2A3xqfOI/3keRG6E+a8RxLmYe8vnDXio8g6GfV4kmXd+HVxETrX4C9C1q0OrIlDXD6iG79R8yzTquPx/Man9CMyzGhBADNSo0r2dkSwqVrNLj2FuOOqaXv3DNvu+1T0V7LM6IDFiJRWxHKnW0A/OL+GpUlBzrpPvt9czTwm+4t31KSbsreba25VHMpL/JTD/3uAg7RpXfU39zQjTqPRiLy2SniUFmWpphGZdZeFtc1od1lpxyIi/hcTKUr9A4rhe/+/mVnDGYWbrYSbbecoJ6vmuvmtH2iJVkVFIoDLABJmPSpGeQrxFdKGNCGIxPSXinfms8uu/5I8NjdpY+2Jwk068cpLdUZf8AGVnZq+m8snxTG703Qj2Z2lDPGpGNAT1SK72edeGnGIo4SrjKk3XcXLK3wt89MjWwGPntmTW8o1oqzg8m7a27PHmWF1W+blitMgjtDKYp1tgVW8qb8blqez8ZB2cG+zMoNr9n0tU0z2vCjAUVVGJVUe6oWh7a9sbuz9nzw9JU40+1vi+ZX/6Tja0vca7ciNszsva2JwTJk1RWhIwp5tXPsBjT6GjTzqZvkjRp7OwuC9rGTTf8V6u/JE0WK87PMLfs92X4gQ7dp3a0hKlXpMtFyKO0dszxK6Omt2HLn22+RaWfaS8Jn1UmzsjccSMzeAJAA7xEcaceLMOc7kqTsJeVqztU8qvJ2J/7aUXzEP3qcdEM9pmmuj2W2SXTpcU48jur+FYa6snoCga6w3RJkjDKlog+yoHyiN3eo5JImCUILCigsFgPaQWA9hQCAAgAIACAAgAIACADykAARAB5SADxlEIBDtcoEEEZEdo+UNaA57tGnRV6Oq11oTn5mI7Zjt5mVS850ogJMYDkTiHk1YrVcHQqq84pkcqcZ+8ja3RPaZLDOanuA+Ucpj8NTpv2FYzK9KEXkiUyxkMpuKI80Q6IbqK6ZrFiOgu4rE2fKVLN0qqMdTmQG4ng1REUZOdfcby8PkdHsvCUZU1KUbsive04Wae4feSUrKcK5EtQkZRrVsPTg6UYxspOz5vLnr5nRLD006eWrzMv+37T0YbpnxHU8fPhHV4LDUaMfYil65nRUcBhm7OCID2yZMUl5jt3sf1jqMHhKNSF5Lzf3OY25tCvg6u5h2or/jH6omXYxIZToKUHKpjI2zhKNHdcI2vfn9Tzja+NrwxccVCVqjWclk322yf14kkSQoFK51JqS1c6e8TEeNwlGnSUoRs79fIftXG1p9Bim7VLe8kovLsSKCeaTpiDqhshyjK6erHST8T2XY2LrYjBUqlWV5OKbeQ7ItTS2xIaHuB+YiKWMrvJyZq1aUai3ZadrXyNxs9fU98OOYT4D9InpVJPVnL4/AYem3ux839zo9ilgopIzMXloctUyk0TAsOIxVIUQ9hQCAAgAIACAAgAIACAAgAIACAD/9k=', '2024-01-03'),
(5, 'Carpetas y Archivadores', 'dddddddddddddddddddddddddddd', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqsath23UKuQ5dVc4t-k2uxFUTIg0dYBGHvA&s', '2023-02-09'),
(6, 'Agendas y Planificadores', 'vvvvvvvvvvvvvvvvvvvvvvvvvvvv', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB17AGRDx6wCxy5OcjaelKo17vQDLNKQdJvQ&s', '2022-11-29'),
(9, 'Manualidades y Arte', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBxQhQJNaWTWv4MywW6pjvTPYb8ZbzlrxKKg&s', '2023-08-17'),
(10, 'Impresoras y Tintas', 'rrrrrrrrrrrrrrrrrrrrrrrrrrrr', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBy5EQJdMDtf_qGOeOZnExuO8nYixoxoK26w&s', '2024-05-28'),
(11, 'Bolsas y Mochilas', 'kjjjjjjjjjjjjjjjjjjj', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTItVuunm59B9WL4pmQ3KEC0hgWl5HGmIYUlg&s', '2024-03-06'),
(12, 'Sobres y Correspondencia', 'ffffffffffffffffffffffffffffff', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT8wnOWLZY9LMUAZaEfpY98MCx7cF0zbz0OA&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT8wnOWLZY9LMUAZaEfpY98MCx7cF0zbz0OA&s', '0000-00-00'),
(13, 'Calculadoras y Accesorios de Oficina', 'ddddddddddddddddddddddddddddddddd', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJ5BizyuB4mBRnbkMJh9ql3sgGe6NSkr92w&s', '0000-00-00');
INSERT INTO `categorias` (`idCategorias`, `Categoria`, `descripcion_categoria`, `imagen`, `fecha`) VALUES
(14, 'Juegos y Juguetes Educativos', 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'data:image/jpeg;base64,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', '2023-11-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE `factura` (
  `idFactura` int(10) NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `idProducto` int(10) NOT NULL,
  `idMetodoPago` int(10) NOT NULL,
  `cantidad` int(100) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idFactura`, `idUsuario`, `idProducto`, `idMetodoPago`, `cantidad`, `fecha`) VALUES
(22, 5, 22, 1, 150, '0000-00-00'),
(23, 5, 22, 1, 25, '2024-06-26'),
(88, 1, 3, 1, 20, '2024-07-04');

--
-- Disparadores `factura`
--
DROP TRIGGER IF EXISTS `after_restarcant_fact_prod_update`;
DELIMITER $$
CREATE TRIGGER `after_restarcant_fact_prod_update` AFTER UPDATE ON `factura` FOR EACH ROW BEGIN

    UPDATE producto
    SET stock = stock - NEW.cantidad
    WHERE idProducto = NEW.idProducto;
    
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `after_restarcant_factura_producto`;
DELIMITER $$
CREATE TRIGGER `after_restarcant_factura_producto` AFTER INSERT ON `factura` FOR EACH ROW BEGIN

UPDATE producto
SET stock = stock - NEW.cantidad
WHERE idProducto = NEW.idProducto;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodopago`
--

DROP TABLE IF EXISTS `metodopago`;
CREATE TABLE `metodopago` (
  `idMetodoPago` int(10) NOT NULL,
  `tipopago` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `metodopago`
--

INSERT INTO `metodopago` (`idMetodoPago`, `tipopago`) VALUES
(1, 'Transferencia'),
(2, 'Efectivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `idProducto` int(10) NOT NULL,
  `idCategorias` int(10) NOT NULL,
  `idProveedor` int(10) NOT NULL,
  `nombre_product` varchar(200) NOT NULL,
  `stock` int(25) NOT NULL,
  `codigo_producto` int(50) NOT NULL,
  `imagen` text NOT NULL,
  `precio` int(20) DEFAULT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `idCategorias`, `idProveedor`, `nombre_product`, `stock`, `codigo_producto`, `imagen`, `precio`, `fecha`, `estado`) VALUES
(3, 1, 14, 'san lucas', 0, 2135468794, 'https://www.aciprensa.com/imagespp/sanlucasevangelista.jpg', 5000, '2024-07-05', 'activo'),
(22, 1, 1, 'pepe', 1, 2147483647, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB7ccJX8-082BMgA_ueorNcTlEEU2PAL5lw&s', 14000, '2024-06-25', 'activo'),
(23, 1, 1, 'Bolígrafo Bic Cristal', 1, 1231313, 'https://res.klook.com/image/upload/c_fill,w_750,h_500/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig.jpg', 20000, '2024-06-25', 'disponible'),
(24, 1, 2, 'Lápiz HB Faber-Castell\r\n', 1, 12134342, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB7ccJX8-082BMgA_ueorNcTlEEU2PAL5lw&s', 2333, '2024-06-25', 'disponible'),
(25, 2, 5, 'Cuaderno de espiral A4 Oxford', 333, 6765345, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB7ccJX8-082BMgA_ueorNcTlEEU2PAL5lw&s', 59000, '2024-06-25', 'disponible'),
(26, 1, 4, 'Archivador de palanca Esselte', 1, 87654567, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB7ccJX8-082BMgA_ueorNcTlEEU2PAL5lw&s', 300000, '2024-06-25', 'disponible'),
(27, 1, 7, 'Resaltadores Stabilo Boss', 1, 343532, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB7ccJX8-082BMgA_ueorNcTlEEU2PAL5lw&s', 2000000, '2024-06-25', 'disponible'),
(28, 2, 4, 'Bloc de notas adhesivas Post-it', 333, 987654321, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB7ccJX8-082BMgA_ueorNcTlEEU2PAL5lw&s', 200000, '2024-06-25', 'disponible'),
(32, 1, 14, 'hola', 45, 122, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_VsXICOYXe15xMMFMgQmXWL6lg_xu7UJZEg&s', 5000, '2024-07-05', 'activo'),
(33, 1, 9, 'ora', 50, 321684, 'https://www.aciprensa.com/imagespp/sanlucasevangelista.jpg', 1000, '2024-07-19', 'activo'),
(34, 1, 9, 'ora', 50, 321684, 'https://www.aciprensa.com/imagespp/sanlucasevangelista.jpg', 1000, '2024-07-19', 'activo'),
(35, 1, 9, 'pedro pica piedra', 45, 12354, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_VsXICOYXe15xMMFMgQmXWL6lg_xu7UJZEg&s', 1000, '2024-08-03', 'activo'),
(37, 1, 8, 'pepee', 45, 2135468794, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_VsXICOYXe15xMMFMgQmXWL6lg_xu7UJZEg&s', 1000, '2024-07-31', 'activo'),
(38, 10, 14, 'tintas', 20, 1234564, 'https://todoenartes.co/12810-large_default/tinta-china-pelikan-rojo-15-gr.jpg', 42000, '2024-07-07', 'activo'),
(39, 10, 14, 'tintas', 20, 1234564, 'https://todoenartes.co/12810-large_default/tinta-china-pelikan-rojo-15-gr.jpg', 42000, '2024-07-07', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor` (
  `idProveedor` int(10) NOT NULL,
  `nombre_proveedor` varchar(100) NOT NULL,
  `telefono` int(10) NOT NULL,
  `correo` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`idProveedor`, `nombre_proveedor`, `telefono`, `correo`) VALUES
(1, 'fe', 12345678, 'lodjnbd@gmail.com'),
(2, 'ce', 2147483647, 'proveedor2@example.com'),
(3, 'cr', 2147483647, 'proveedor3@example.com'),
(4, 'vr', 2147483647, 'camilo@gmail.com'),
(5, 'bn', 2147483647, 'proveedor5@example.com'),
(7, 'we', 2147483647, 'proveedor7@example.com'),
(8, 'sd', 1010101010, 'proveedor8@example.com'),
(9, 'fr', 1212121212, 'proveedor9@example.com'),
(10, 're', 1313131313, 'proveedor10@example.com'),
(11, 'fd', 2147483647, 'vtrfy@example.com'),
(14, 'cartonesdelp', 123455, 'lodjnbd@gmail.com');

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
(1, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `idUsuario` int(10) NOT NULL,
  `idRol` int(10) NOT NULL,
  `identificacion` int(15) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `fecha_naci` date NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(500) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `idRol`, `identificacion`, `nombres`, `telefono`, `fecha_naci`, `correo`, `contrasena`, `estado`) VALUES
(1, 1, 12313131, 'c', '12345678', '2004-02-09', 'lodjnbd@gmail.com', '1234', 'activos'),
(2, 1, 12344, 'carlos carlo', '1234567', '2041-09-13', 're', '2', 'activo'),
(3, 1, 111111111, 'Pedro Rodríguez', '111-111-1111', '1985-10-10', 'tr', '3', 'activo'),
(4, 1, 222222222, 'Laura Gómez', '222-222-2222', '1998-03-15', 'ty', '4', 'activo'),
(5, 1, 2397841, 'Marcela Hernandez', '3208794532', '1987-05-18', 'yu', '6', 'activo'),
(6, 1, 444444444, 'Carlos González', '444-444-4444', '1988-06-20', 'ui', '7', 'activo'),
(7, 1, 555555555, 'Sara Ramírez', '555-555-5555', '1989-09-25', 'io', '8', 'activo'),
(8, 1, 666666666, 'Jorge Hernández', '666-666-6666', '1987-12-10', 'op', '9', 'activo'),
(9, 1, 777777777, 'Luis Fernández', '777-777-7777', '1993-04-05', 'po', '11', 'activo'),
(12, 1, 123456874, 'L', '3204879654', '2005-04-17', 'pu', '33', 'activo'),
(16, 1, 122224, 'carl', '12367', '2041-09-15', 'py', '44', 'activo'),
(17, 1, 12345679, 'lisandro', '1202541045', '2002-05-30', 'losdnf@gamil.com', '28', 'activo'),
(35, 1, 6666, 'fabio', '213144', '2005-11-12', 'fafawe6233@kinsef.com', '$2b$04$8/VXXWPsjUrnOvynBR4KeOcIP91J7GortPapACx4VkBWqELXNXXca', 'activo'),
(36, 1, 55555, 'daniel', '213144', '2020-09-11', 'papeleria.angel.info@gmail.com', '$2b$04$VXiO3BfU4HuZbcNH7Lb65.teeqUcCFOE/7jFAuZbm47LxPOlFI/h.', 'activo'),
(38, 1, 2, 'santiago', '3', '2024-07-06', 'Leonardo.franco.tangarife@gmail.com', '$2b$04$72MxvMQCAnGxaahIKK0tpO55mGenv2jN0EKzt4Rb5j4Cwy24mNi5y', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategorias`),
  ADD UNIQUE KEY `descripcion_categoria` (`Categoria`,`descripcion_categoria`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`),
  ADD KEY `idMetodoPago` (`idMetodoPago`),
  ADD KEY `idUsuario` (`idUsuario`) USING BTREE,
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  ADD PRIMARY KEY (`idMetodoPago`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idCategorias` (`idCategorias`),
  ADD KEY `idProveedor` (`idProveedor`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`idProveedor`),
  ADD UNIQUE KEY `nombre_proveedor` (`nombre_proveedor`),
  ADD KEY `telefono` (`telefono`),
  ADD KEY `correo` (`correo`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `identificacion` (`identificacion`),
  ADD UNIQUE KEY `fecha_naci` (`fecha_naci`),
  ADD UNIQUE KEY `contrasena` (`contrasena`),
  ADD UNIQUE KEY `nombres` (`nombres`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategorias` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  MODIFY `idMetodoPago` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProveedor` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `Factura_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Factura_ibfk_3` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `metodopago` FOREIGN KEY (`idMetodoPago`) REFERENCES `metodopago` (`idMetodoPago`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_idcategoria_producto` FOREIGN KEY (`idCategorias`) REFERENCES `categorias` (`idCategorias`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idproveedor_producto` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_idRol_usuario` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
