-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2025 a las 22:20:52
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
-- Base de datos: `bdasistencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
CREATE TABLE `asistencia` (
  `idasis` int(11) NOT NULL,
  `dni` char(8) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `dia` text DEFAULT NULL,
  `horaim` time DEFAULT NULL,
  `horasm` time DEFAULT NULL,
  `estadom` varchar(255) DEFAULT NULL,
  `minutos_descum` float DEFAULT NULL,
  `horait` time DEFAULT NULL,
  `horast` time DEFAULT NULL,
  `estadot` varchar(255) DEFAULT NULL,
  `minutos_descut` float DEFAULT NULL,
  `comentario` varchar(400) CHARACTER SET utf16 COLLATE utf16_general_ci DEFAULT NULL,
  `comentariot` text DEFAULT NULL,
  `descuento_dia` float DEFAULT NULL,
  `tiempo_tardanza_dia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`idasis`, `dni`, `fecha`, `dia`, `horaim`, `horasm`, `estadom`, `minutos_descum`, `horait`, `horast`, `estadot`, `minutos_descut`, `comentario`, `comentariot`, `descuento_dia`, `tiempo_tardanza_dia`) VALUES
(245, '03125480', '2025-04-25', 'Viernes', NULL, NULL, 'Falta', 240, NULL, NULL, 'Falta', 240, 'sad', NULL, 56.67, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia_seguridad`
--

DROP TABLE IF EXISTS `asistencia_seguridad`;
CREATE TABLE `asistencia_seguridad` (
  `idasisse` int(11) NOT NULL,
  `dni` char(8) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `dia` text DEFAULT NULL,
  `turno` text DEFAULT NULL,
  `horai` time DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `Justificado` varchar(255) DEFAULT NULL,
  `comentario` varchar(400) CHARACTER SET utf16 COLLATE utf16_general_ci DEFAULT NULL,
  `horas` time DEFAULT NULL,
  `estado_salida` varchar(255) DEFAULT NULL,
  `Justificado_salida` varchar(255) DEFAULT NULL,
  `comentario_salida` varchar(400) CHARACTER SET utf16 COLLATE utf16_general_ci DEFAULT NULL,
  `minutos_descu` float DEFAULT NULL,
  `descuento_dia` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

DROP TABLE IF EXISTS `cargos`;
CREATE TABLE `cargos` (
  `idcargo` int(11) NOT NULL,
  `nombre` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`idcargo`, `nombre`, `descripcion`, `fecha_creacion`, `estado`) VALUES
(1, 'Chofer de gerencia', 'Responsable del transporte ejecutivo y de gerencia', '2025-04-24', 'activo'),
(2, 'Encargado de archivo general', 'Administra y organiza la documentación institucional', '2025-04-24', 'activo'),
(3, 'Chofer de volquete', 'Conductor de vehículos de carga pesada y volquetes', '2025-04-24', 'activo'),
(4, 'Chofer', 'Conductor de vehículos institucionales', '2025-04-24', 'activo'),
(5, 'Operador del sistema de agua y alcantarillado', 'Mantiene y opera la infraestructura de agua potable', '2025-04-24', 'activo'),
(6, 'Chofer de camión recolector', 'Conductor de vehículos de recolección de residuos', '2025-04-24', 'activo'),
(7, 'Limpieza camal municipal', 'Personal encargado de la higiene en el camal municipal', '2025-04-24', 'activo'),
(8, 'Jefe de la unidad de registro civil', 'Dirige las actividades del registro civil', '2025-04-24', 'activo'),
(9, 'Jefa del programa vaso de leche', 'Coordina el programa social de alimentación', '2025-04-24', 'activo'),
(10, 'Secretaria general', 'Asistente ejecutiva de alta dirección', '2025-04-24', 'activo'),
(11, 'Jefe de unidad formuladora', 'Responsable de la formulación de proyectos', '2025-04-24', 'activo'),
(12, 'Jefe de archivo (licencia sin goce de haber)', 'Encargado del archivo institucional (actualmente en licencia)', '2025-04-24', 'activo'),
(13, 'Jefe de subsga', 'Director del subsistema de gestión administrativa', '2025-04-24', 'activo'),
(14, 'Jefe de cooperación técnica', 'Coordina proyectos de cooperación internacional', '2025-04-24', 'activo'),
(15, 'Jefe de la unidad de desarrollo agropecuario', 'Dirige programas de desarrollo rural', '2025-04-24', 'activo'),
(16, 'Topógrafo', 'Profesional encargado de mediciones territoriales', '2025-04-24', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidad`
--

DROP TABLE IF EXISTS `modalidad`;
CREATE TABLE `modalidad` (
  `idmodalidad` int(11) NOT NULL,
  `nombrem` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modalidad`
--

INSERT INTO `modalidad` (`idmodalidad`, `nombrem`, `descripcion`, `fecha_creacion`, `estado`) VALUES
(3, 'D.L N°728- obrero', 'Decreto Ley N°728 - Régimen laboral para trabajadores obreros', '2025-04-25', 'activo'),
(4, 'D.L N°276- Carrera Administrativa', 'Decreto Ley N°276 - Régimen de la Carrera Administrativa', '2025-04-25', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
  `dni` char(8) NOT NULL,
  `idcargo` int(11) DEFAULT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `modalidad_contratacion` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `sueldo` decimal(10,2) DEFAULT NULL,
  `fecha_registro` date DEFAULT curdate(),
  `foto` longtext NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `vacaciones` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`dni`, `idcargo`, `nombres`, `apellidos`, `modalidad_contratacion`, `fecha_nacimiento`, `edad`, `sueldo`, `fecha_registro`, `foto`, `estado`, `vacaciones`) VALUES
('02680720', 13, 'Luis Augusto', 'Castillo Córdova', 'D.L N°276- Carrera Administrativa', '1957-12-15', 67, 2873.07, '2025-04-24', '', 'activo', 'Sin solicitar'),
('02817817', 10, 'Chelita del R.', 'Carrasco Rivera', 'D.L N°276- Carrera Administrativa', '1970-11-23', 54, 2191.57, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03092651', 2, 'Gerardo', 'Umbo Jara', 'D.L N°728- obrero', '1961-10-20', 63, 1896.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03095417', 8, 'Elmer S.', 'Hermida Elera', 'D.L N°276- Carrera Administrativa', '1963-04-11', 62, 2185.82, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03118739', 6, 'López', 'Córdova Eli', 'D.L N°728- obrero', '1970-01-04', 55, 1551.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03118768', 3, 'Gilmar', 'Calle Sánchez', 'D.L N°276- Carrera Administrativa', '1969-11-08', 55, 2035.70, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03125480', 15, 'César Mavel', 'More Berrú', 'D.L N°276- Carrera Administrativa', NULL, NULL, 1700.00, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03125560', 14, 'Nolberto', 'López Castillo', 'D.L N°276- Carrera Administrativa', '1973-06-14', 51, 3423.07, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03130541', 3, 'Calle', 'Calle Hernando', 'D.L N°728- obrero', '1959-06-19', 65, 1751.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03318620', 1, 'Luciano', 'Peña Morales', 'D.L N°728- obrero', '1955-12-15', 69, 1896.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03343429', 3, 'Adelmo', 'Berru Sandoval', 'D.L N°276- Carrera Administrativa', '1963-08-06', 61, 3064.20, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03369451', 4, 'Ysmail', 'López Salinas', 'D.L N°728- obrero', '1972-05-01', 52, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('03369701', 9, 'Carmen M.', 'Orozco Berrú', 'D.L N°276- Carrera Administrativa', '1973-10-24', 51, 2175.82, '2025-04-24', '', 'activo', 'Sin solicitar'),
('40704806', 11, 'Jorge L.', 'Chumacero Ruiz', 'D.L N°276- Carrera Administrativa', '1980-07-19', 44, 2295.57, '2025-04-24', '', 'activo', 'Sin solicitar'),
('41595872', 12, 'Wilder E.', 'Saavedra Calle', 'D.L N°276- Carrera Administrativa', '1980-05-21', 44, NULL, '2025-04-24', '', 'activo', 'Sin solicitar'),
('42463800', 5, 'Juan', 'Córdova Montalván', 'D.L N°728- obrero', '1982-11-05', 42, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('42849051', 4, 'Juan Carlos', 'Vásquez Flores', 'D.L N°728- obrero', '1985-03-03', 40, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('43341996', 5, 'Rogelio', 'Córdova Paz', 'D.L N°728- obrero', '1985-10-15', 39, 1751.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('44266347', 16, 'Pedro', 'Córdova Pintado', 'D.L N°276- Carrera Administrativa', '1986-03-20', 39, 3150.00, '2025-04-24', '', 'activo', 'Sin solicitar'),
('45259065', 6, 'Segundo Eladio', 'Calle Peña', 'D.L N°728- obrero', '1986-02-14', 39, 1651.11, '2025-04-24', '', 'activo', 'Sin solicitar'),
('45690213', 7, 'Magda', 'Ambulay Mondragón', 'D.L N°728- obrero', '1981-11-22', 43, 1451.11, '2025-04-24', '', 'activo', 'Sin solicitar');

--
-- Disparadores `personal`
--
DROP TRIGGER IF EXISTS `before_insert_personal`;
DELIMITER $$
CREATE TRIGGER `before_insert_personal` BEFORE INSERT ON `personal` FOR EACH ROW BEGIN
    SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `before_update_´personal`;
DELIMITER $$
CREATE TRIGGER `before_update_´personal` BEFORE UPDATE ON `personal` FOR EACH ROW BEGIN
    SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidas`
--

DROP TABLE IF EXISTS `salidas`;
CREATE TABLE `salidas` (
  `id_sali` int(11) NOT NULL,
  `dni` char(8) NOT NULL,
  `dia` varchar(255) DEFAULT NULL,
  `turno` varchar(255) DEFAULT NULL,
  `fecha_salida` date NOT NULL,
  `hora_salida` time NOT NULL,
  `hora_reingreso` time DEFAULT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tardanza`
--

DROP TABLE IF EXISTS `tardanza`;
CREATE TABLE `tardanza` (
  `idasis` int(11) NOT NULL,
  `dni` char(8) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `dia` date DEFAULT NULL,
  `horaim` time DEFAULT NULL,
  `horasm` time DEFAULT NULL,
  `estadom` varchar(255) DEFAULT NULL,
  `minutos_descum` float DEFAULT NULL,
  `horait` time DEFAULT NULL,
  `horast` time DEFAULT NULL,
  `estadot` varchar(255) DEFAULT NULL,
  `minutos_descut` float DEFAULT NULL,
  `comentario` varchar(400) DEFAULT NULL,
  `tiempo_trabajo` int(11) DEFAULT NULL,
  `tiempo_tardanza_dia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `idusudni` char(8) NOT NULL,
  `datos` varchar(255) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `password` varchar(8) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rol` char(1) NOT NULL,
  `Telefono` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusudni`, `datos`, `usuario`, `password`, `email`, `rol`, `Telefono`) VALUES
('74747441', 'juan perez camachoqeeeee', 'alexsads', '12122', 'milos01239@gmail.com', '1', 4747447),
('76531080', 'Jose .A.Yovera.S', 'admin', 'admin', 'josealexanderyoverasimbala@gmail.com', '1', 902116915),
('77777777', 'juan perez camachoqeeeee', 'admin', '4144', 'MARIABETTY@gmail.com', '1', 144);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacaciones`
--

DROP TABLE IF EXISTS `vacaciones`;
CREATE TABLE `vacaciones` (
  `id_vaca` int(11) NOT NULL,
  `dni` char(8) DEFAULT NULL,
  `dias` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `dias_restantes` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`idasis`),
  ADD KEY `asistencia_personal` (`dni`);

--
-- Indices de la tabla `asistencia_seguridad`
--
ALTER TABLE `asistencia_seguridad`
  ADD PRIMARY KEY (`idasisse`) USING BTREE,
  ADD KEY `asistencia_personal` (`dni`);

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`idcargo`);

--
-- Indices de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  ADD PRIMARY KEY (`idmodalidad`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`dni`) USING BTREE,
  ADD KEY `personal_cargo` (`idcargo`);

--
-- Indices de la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD PRIMARY KEY (`id_sali`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `tardanza`
--
ALTER TABLE `tardanza`
  ADD PRIMARY KEY (`idasis`),
  ADD KEY `asistencia_personal` (`dni`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusudni`);

--
-- Indices de la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  ADD PRIMARY KEY (`id_vaca`),
  ADD KEY `vacaciones_personal` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `idasis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT de la tabla `asistencia_seguridad`
--
ALTER TABLE `asistencia_seguridad`
  MODIFY `idasisse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `idcargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  MODIFY `idmodalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
  MODIFY `id_sali` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tardanza`
--
ALTER TABLE `tardanza`
  MODIFY `idasis` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  MODIFY `id_vaca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_personal` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`);

--
-- Filtros para la tabla `asistencia_seguridad`
--
ALTER TABLE `asistencia_seguridad`
  ADD CONSTRAINT `asistencia_seguridad_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`);

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `personal_cargo` FOREIGN KEY (`idcargo`) REFERENCES `cargos` (`idcargo`);

--
-- Filtros para la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD CONSTRAINT `salidas_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`);

--
-- Filtros para la tabla `tardanza`
--
ALTER TABLE `tardanza`
  ADD CONSTRAINT `tardanza_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`);

--
-- Filtros para la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  ADD CONSTRAINT `vacaciones_personal` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
