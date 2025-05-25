/*
MySQL Backup
Database: bdasistencia
Backup Time: 2025-05-24 23:59:27
*/

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `bdasistencia`.`asistencia`;
DROP TABLE IF EXISTS `bdasistencia`.`asistencia_seguridad`;
DROP TABLE IF EXISTS `bdasistencia`.`cargos`;
DROP TABLE IF EXISTS `bdasistencia`.`dias_recuperados`;
DROP TABLE IF EXISTS `bdasistencia`.`modalidad`;
DROP TABLE IF EXISTS `bdasistencia`.`personal`;
DROP TABLE IF EXISTS `bdasistencia`.`salidas`;
DROP TABLE IF EXISTS `bdasistencia`.`tardanza`;
DROP TABLE IF EXISTS `bdasistencia`.`usuarios`;
DROP TABLE IF EXISTS `bdasistencia`.`vacaciones`;
CREATE TABLE `asistencia` (
  `idasis` int(11) NOT NULL AUTO_INCREMENT,
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
  `tiempo_tardanza_dia` int(11) DEFAULT NULL,
  PRIMARY KEY (`idasis`),
  KEY `asistencia_personal` (`dni`),
  CONSTRAINT `asistencia_personal` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=712 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `asistencia_seguridad` (
  `idasisse` int(11) NOT NULL AUTO_INCREMENT,
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
  `descuento_dia` float DEFAULT NULL,
  PRIMARY KEY (`idasisse`) USING BTREE,
  KEY `asistencia_personal` (`dni`),
  CONSTRAINT `asistencia_seguridad_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=335 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `cargos` (
  `idcargo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`idcargo`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `dias_recuperados` (
  `idhorarecu` int(11) NOT NULL AUTO_INCREMENT,
  `idasis` int(11) DEFAULT NULL,
  `minutos_recuperados` int(11) DEFAULT NULL,
  PRIMARY KEY (`idhorarecu`),
  KEY `dias_asis` (`idasis`),
  CONSTRAINT `dias_asis` FOREIGN KEY (`idasis`) REFERENCES `asistencia` (`idasis`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `modalidad` (
  `idmodalidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombrem` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`idmodalidad`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `vacaciones` varchar(255) NOT NULL,
  PRIMARY KEY (`dni`) USING BTREE,
  KEY `personal_cargo` (`idcargo`),
  CONSTRAINT `personal_cargo` FOREIGN KEY (`idcargo`) REFERENCES `cargos` (`idcargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `salidas` (
  `id_sali` int(11) NOT NULL AUTO_INCREMENT,
  `dni` char(8) NOT NULL,
  `dia` varchar(255) DEFAULT NULL,
  `turno` varchar(255) DEFAULT NULL,
  `fecha_salida` date NOT NULL,
  `hora_salida` time NOT NULL,
  `hora_reingreso` time DEFAULT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `tiene_reingreso` varchar(255) DEFAULT NULL,
  `hora_ingreso_real` time DEFAULT NULL,
  `comentario` text DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_sali`),
  KEY `dni` (`dni`),
  CONSTRAINT `salidas_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `tardanza` (
  `idasis` int(11) NOT NULL AUTO_INCREMENT,
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
  `tiempo_tardanza_dia` int(11) DEFAULT NULL,
  PRIMARY KEY (`idasis`),
  KEY `asistencia_personal` (`dni`),
  CONSTRAINT `tardanza_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `usuarios` (
  `idusudni` char(8) NOT NULL,
  `datos` varchar(255) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `password` varchar(8) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rol` char(1) NOT NULL,
  `Telefono` int(16) NOT NULL,
  PRIMARY KEY (`idusudni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `vacaciones` (
  `id_vaca` int(11) NOT NULL AUTO_INCREMENT,
  `dni` char(8) DEFAULT NULL,
  `dias` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `dias_restantes` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  PRIMARY KEY (`id_vaca`),
  KEY `vacaciones_personal` (`dni`),
  CONSTRAINT `vacaciones_personal` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
BEGIN;
LOCK TABLES `bdasistencia`.`asistencia` WRITE;
DELETE FROM `bdasistencia`.`asistencia`;
INSERT INTO `bdasistencia`.`asistencia` (`idasis`,`dni`,`fecha`,`dia`,`horaim`,`horasm`,`estadom`,`minutos_descum`,`horait`,`horast`,`estadot`,`minutos_descut`,`comentario`,`comentariot`,`descuento_dia`,`tiempo_tardanza_dia`) VALUES (288, '03092651', '2025-05-23', 'Sábado', '08:55:00', '13:00:00', 'Tardanza', 639, '14:00:00', '16:30:00', 'Puntual', 0, 'Ingreso con tardanza en su salida coordinada de reingreso.60 minutos de tardanza', '', 5.14, 39),(707, '02817817', '2025-05-24', 'Sábado', '08:00:00', '13:00:00', 'Vacaciones', 0, '14:00:00', '16:30:00', 'Vacaciones', 0, '', '', 0, 0),(708, '02817817', '2025-05-25', 'Domingo', '08:00:00', '13:00:00', 'Vacaciones', 0, '14:00:00', '16:30:00', 'Vacaciones', 0, '', '', 0, 0),(709, '02817817', '2025-05-26', 'Lunes', '08:00:00', '13:00:00', 'Vacaciones', 0, '14:00:00', '16:30:00', 'Vacaciones', 0, '', '', 0, 0),(710, '02817817', '2025-05-27', 'Martes', '08:00:00', '13:00:00', 'Vacaciones', 0, '14:00:00', '16:30:00', 'Vacaciones', 0, '', '', 0, 0),(711, '02817817', '2025-05-28', 'Miércoles', '08:00:00', '13:00:00', 'Vacaciones', 0, '14:00:00', '16:30:00', 'Vacaciones', 0, '', '', 0, 0)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`asistencia_seguridad` WRITE;
DELETE FROM `bdasistencia`.`asistencia_seguridad`;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`cargos` WRITE;
DELETE FROM `bdasistencia`.`cargos`;
INSERT INTO `bdasistencia`.`cargos` (`idcargo`,`nombre`,`descripcion`,`fecha_creacion`,`estado`) VALUES (1, 'Chofer de gerencia', 'Responsable del transporte ejecutivo y de gerencia', '2025-04-24', 'activo'),(2, 'Encargado de archivo general', 'Administra y organiza la documentación institucional', '2025-04-24', 'activo'),(3, 'Chofer de volquete', 'Conductor de vehículos de carga pesada y volquetes', '2025-04-24', 'activo'),(4, 'Chofer', 'Conductor de vehículos institucionales', '2025-04-24', 'activo'),(5, 'Operador del sistema de agua y alcantarillado', 'Mantiene y opera la infraestructura de agua potable', '2025-04-24', 'activo'),(6, 'Chofer de camión recolector', 'Conductor de vehículos de recolección de residuos', '2025-04-24', 'activo'),(7, 'Limpieza camal municipal', 'Personal encargado de la higiene en el camal municipal', '2025-04-24', 'activo'),(8, 'Jefe de la unidad de registro civil', 'Dirige las actividades del registro civil', '2025-04-24', 'activo'),(9, 'Jefa del programa vaso de leche', 'Coordina el programa social de alimentación', '2025-04-24', 'activo'),(10, 'Secretaria general', 'Asistente ejecutiva de alta dirección', '2025-04-24', 'activo'),(11, 'Jefe de unidad formuladora', 'Responsable de la formulación de proyectos', '2025-04-24', 'activo'),(12, 'Jefe de archivo (licencia sin goce de haber)', 'Encargado del archivo institucional (actualmente en licencia)', '2025-04-24', 'activo'),(13, 'Jefe de subsga', 'Director del subsistema de gestión administrativa', '2025-04-24', 'activo'),(14, 'Jefe de cooperación técnica', 'Coordina proyectos de cooperación internacional', '2025-04-24', 'activo'),(15, 'Jefe de la unidad de desarrollo agropecuario', 'Dirige programas de desarrollo rural', '2025-04-24', 'activo'),(16, 'Topógrafo', 'Profesional encargado de mediciones territoriales', '2025-04-24', 'activo')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`dias_recuperados` WRITE;
DELETE FROM `bdasistencia`.`dias_recuperados`;
INSERT INTO `bdasistencia`.`dias_recuperados` (`idhorarecu`,`idasis`,`minutos_recuperados`) VALUES (1, 288, 60)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`modalidad` WRITE;
DELETE FROM `bdasistencia`.`modalidad`;
INSERT INTO `bdasistencia`.`modalidad` (`idmodalidad`,`nombrem`,`descripcion`,`fecha_creacion`,`estado`) VALUES (3, 'D.L N°728- obrero', 'Decreto Ley N°728 - Régimen laboral para trabajadores obreros', '2025-04-25', 'activo'),(4, 'D.L N°276- Carrera Administrativa', 'Decreto Ley N°276 - Régimen de la Carrera Administrativaa', '2025-04-25', 'activo')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`personal` WRITE;
DELETE FROM `bdasistencia`.`personal`;
INSERT INTO `bdasistencia`.`personal` (`dni`,`idcargo`,`nombres`,`apellidos`,`modalidad_contratacion`,`fecha_nacimiento`,`edad`,`sueldo`,`fecha_registro`,`foto`,`estado`,`vacaciones`) VALUES ('02680720', 13, 'Luis Augusto', 'Castillo Córdova', 'D.L N°276- Carrera Administrativa', '1957-12-15', 67, 2873.07, '2025-04-24', '', 'activo', 'Sin solicitar'),('02817817', 10, 'Chelita del R.', 'Carrasco Rivera', 'D.L N°276- Carrera Administrativa', '1970-11-23', 54, 2191.57, '2025-04-24', '', 'activo', 'En proceso'),('03092651', 2, 'Gerardo', 'Umbo Jara', 'D.L N°728- obrero', '1961-10-20', 63, 1896.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03095417', 8, 'Elmer S.', 'Hermida Elera', 'D.L N°276- Carrera Administrativa', '1963-04-11', 62, 2185.82, '2025-04-24', '', 'activo', 'Sin solicitar'),('03118739', 6, 'López', 'Córdova Eli', 'D.L N°728- obrero', '1970-01-04', 55, 1551.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03118768', 3, 'Gilmar', 'Calle Sánchez', 'D.L N°276- Carrera Administrativa', '1969-11-08', 55, 2035.70, '2025-04-24', '', 'activo', 'Sin solicitar'),('03125480', 15, 'César Mavel', 'More Berrú', 'D.L N°276- Carrera Administrativa', NULL, NULL, 1700.00, '2025-04-24', '', 'activo', 'Sin solicitar'),('03125560', 14, 'Nolberto', 'López Castillo', 'D.L N°276- Carrera Administrativa', '1973-06-14', 51, 3423.07, '2025-04-24', '', 'activo', 'Sin solicitar'),('03130541', 3, 'Calle', 'Calle Hernando', 'D.L N°728- obrero', '1959-06-19', 65, 1751.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03318620', 1, 'Luciano', 'Peña Morales', 'D.L N°728- obrero', '1955-12-15', 69, 1896.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03343429', 3, 'Adelmo', 'Berru Sandoval', 'D.L N°276- Carrera Administrativa', '1963-08-06', 61, 3064.20, '2025-04-24', '', 'activo', 'Sin solicitar'),('03369451', 4, 'Ysmail', 'López Salinas', 'D.L N°728- obrero', '1972-05-01', 52, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03369701', 9, 'Carmen M.', 'Orozco Berrú', 'D.L N°276- Carrera Administrativa', '1973-10-24', 51, 2175.82, '2025-04-24', '', 'activo', 'Sin solicitar'),('40704806', 11, 'Jorge L.', 'Chumacero Ruiz', 'D.L N°276- Carrera Administrativa', '1980-07-19', 44, 2295.57, '2025-04-24', '', 'activo', 'Sin solicitar'),('41595872', 12, 'Wilder E.', 'Saavedra Calle', 'D.L N°276- Carrera Administrativa', '1980-05-21', 44, NULL, '2025-04-24', '', 'activo', 'Sin solicitar'),('42463800', 5, 'Juan', 'Córdova Montalván', 'D.L N°728- obrero', '1982-11-05', 42, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('42849051', 4, 'Juan Carlos', 'Vásquez Flores', 'D.L N°728- obrero', '1985-03-03', 40, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('43341996', 5, 'Rogelio', 'Córdova Paz', 'D.L N°728- obrero', '1985-10-15', 39, 1751.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('44266347', 16, 'Pedro', 'Córdova Pintado', 'D.L N°276- Carrera Administrativa', '1986-03-20', 39, 3150.00, '2025-04-24', '', 'activo', 'Sin solicitar'),('45259065', 6, 'Segundo Eladio', 'Calle Peña', 'D.L N°728- obrero', '1986-02-14', 39, 1651.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('45690213', 7, 'Magda', 'Ambulay Mondragón', 'D.L N°728- obrero', '1981-11-22', 43, 1451.11, '2025-04-24', '', 'activo', 'Sin solicitar')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`salidas` WRITE;
DELETE FROM `bdasistencia`.`salidas`;
INSERT INTO `bdasistencia`.`salidas` (`id_sali`,`dni`,`dia`,`turno`,`fecha_salida`,`hora_salida`,`hora_reingreso`,`motivo`,`tiene_reingreso`,`hora_ingreso_real`,`comentario`,`estado`) VALUES (45, '45690213', 'Viernes', 'Mañana', '2025-05-23', '08:00:00', '10:00:00', 'Emergencia familiar', 'si', NULL, 'ghf', 'Finalizado'),(46, '03095417', 'Viernes', 'Mañana', '2025-05-23', '10:00:00', '11:00:00', 'Consulta medica', 'si', NULL, '', 'Finalizado'),(47, '02817817', 'Viernes', 'Tarde', '2025-05-23', '14:00:00', '15:00:00', 'Emergencia familiar', 'si', '16:00:00', 'Ingreso con tardanza en su salida coordinada de reingreso.60 minutos', 'Finalizado'),(48, '02680720', 'Sabado', 'Mañana', '2025-05-24', '09:00:00', '10:00:00', 'Emergencia familiar', 'si', '11:00:00', 'Ingreso con tardanza en su salida coordinada de reingreso', 'Finalizado'),(49, '03092651', 'Viernes', 'Mañana', '2025-05-23', '10:00:00', '11:00:00', 'Emergencia familiar', 'si', '12:00:00', 'Ingreso con tardanza en su salida coordinada de reingreso.60 minutos de tardanza', 'Finalizado')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`tardanza` WRITE;
DELETE FROM `bdasistencia`.`tardanza`;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`usuarios` WRITE;
DELETE FROM `bdasistencia`.`usuarios`;
INSERT INTO `bdasistencia`.`usuarios` (`idusudni`,`datos`,`usuario`,`password`,`email`,`rol`,`Telefono`) VALUES ('74747441', 'juan perez camachoqeeeee', 'alexsads', '12122', 'milos01239@gmail.com', '1', 4747447),('76531080', 'Jose .A.Yovera.S', 'admin', 'admin', 'josealexanderyoverasimbala@gmail.com', '1', 902116915),('77777777', 'juan perez camachoqeeeee', 'admin', '4144', 'MARIABETTY@gmail.com', '1', 144)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`vacaciones` WRITE;
DELETE FROM `bdasistencia`.`vacaciones`;
INSERT INTO `bdasistencia`.`vacaciones` (`id_vaca`,`dni`,`dias`,`fecha_inicio`,`fecha_fin`,`dias_restantes`,`year`,`fecha_registro`) VALUES (74, '02817817', 5, '2025-05-24', '2025-05-29', 26, 2025, '2025-05-24')
;
UNLOCK TABLES;
COMMIT;
CREATE DEFINER = `root`@`localhost` TRIGGER `after_cargo_update` AFTER UPDATE ON `cargos` FOR EACH ROW BEGIN
    -- Si el estado del cargo cambia a 'inactivo', actualiza el personal asociado
    IF NEW.estado = 'inactivo' AND OLD.estado != 'inactivo' THEN
        UPDATE personal 
        SET estado = 'inactivo' 
        WHERE idcargo = NEW.idcargo;
    END IF;

    -- Si el estado del cargo cambia a 'activo', actualiza el personal asociado
    IF NEW.estado = 'activo' AND OLD.estado != 'activo' THEN
        UPDATE personal 
        SET estado = 'activo' 
        WHERE idcargo = NEW.idcargo;
    END IF;
END;;
CREATE DEFINER = `root`@`localhost` TRIGGER `before_insert_personal` BEFORE INSERT ON `personal` FOR EACH ROW BEGIN
    SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END;;
CREATE DEFINER = `root`@`localhost` TRIGGER `before_update_´personal` BEFORE UPDATE ON `personal` FOR EACH ROW BEGIN
    SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END;;
