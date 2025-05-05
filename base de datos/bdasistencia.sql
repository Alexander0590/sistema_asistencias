/*
MySQL Backup
Database: bdasistencia
Backup Time: 2025-04-28 23:08:22
*/

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `bdasistencia`.`asistencia`;
DROP TABLE IF EXISTS `bdasistencia`.`asistencia_seguridad`;
DROP TABLE IF EXISTS `bdasistencia`.`cargos`;
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
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `comentario` text DEFAULT NULL,
  PRIMARY KEY (`id_sali`),
  KEY `dni` (`dni`),
  CONSTRAINT `salidas_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `personal` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
BEGIN;
LOCK TABLES `bdasistencia`.`asistencia` WRITE;
DELETE FROM `bdasistencia`.`asistencia`;
INSERT INTO `bdasistencia`.`asistencia` (`idasis`,`dni`,`fecha`,`dia`,`horaim`,`horasm`,`estadom`,`minutos_descum`,`horait`,`horast`,`estadot`,`minutos_descut`,`comentario`,`comentariot`,`descuento_dia`,`tiempo_tardanza_dia`) VALUES (254, '45259065', '2025-04-28', 'Lunes', '08:00:00', '08:00:00', 'Puntual', 0, '00:00:00', '16:00:00', 'Puntual', 0, '', '', 0, 0)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`asistencia_seguridad` WRITE;
DELETE FROM `bdasistencia`.`asistencia_seguridad`;
INSERT INTO `bdasistencia`.`asistencia_seguridad` (`idasisse`,`dni`,`fecha`,`dia`,`turno`,`horai`,`estado`,`Justificado`,`comentario`,`horas`,`estado_salida`,`Justificado_salida`,`comentario_salida`,`minutos_descu`,`descuento_dia`) VALUES (332, '76531080', '2025-04-25', 'viernes', 'Mañana', '08:37:50', 'Tardanza', NULL, NULL, '16:30:51', 'Salida Normal', NULL, NULL, 21, 43.75),(333, '76531080', '2025-04-27', 'domingo', 'Tarde', '18:00:26', 'Puntual', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0),(334, '76531080', '2025-04-28', 'lunes', 'Mañana', '08:52:23', 'Tardanza', NULL, NULL, NULL, NULL, NULL, NULL, 36, 75)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`cargos` WRITE;
DELETE FROM `bdasistencia`.`cargos`;
INSERT INTO `bdasistencia`.`cargos` (`idcargo`,`nombre`,`descripcion`,`fecha_creacion`,`estado`) VALUES (1, 'Chofer de gerencia', 'Responsable del transporte ejecutivo y de gerencia', '2025-04-24', 'activo'),(2, 'Encargado de archivo general', 'Administra y organiza la documentación institucional', '2025-04-24', 'activo'),(3, 'Chofer de volquete', 'Conductor de vehículos de carga pesada y volquetes', '2025-04-24', 'activo'),(4, 'Chofer', 'Conductor de vehículos institucionales', '2025-04-24', 'activo'),(5, 'Operador del sistema de agua y alcantarillado', 'Mantiene y opera la infraestructura de agua potable', '2025-04-24', 'activo'),(6, 'Chofer de camión recolector', 'Conductor de vehículos de recolección de residuos', '2025-04-24', 'activo'),(7, 'Limpieza camal municipal', 'Personal encargado de la higiene en el camal municipal', '2025-04-24', 'activo'),(8, 'Jefe de la unidad de registro civil', 'Dirige las actividades del registro civil', '2025-04-24', 'activo'),(9, 'Jefa del programa vaso de leche', 'Coordina el programa social de alimentación', '2025-04-24', 'activo'),(10, 'Secretaria general', 'Asistente ejecutiva de alta dirección', '2025-04-24', 'activo'),(11, 'Jefe de unidad formuladora', 'Responsable de la formulación de proyectos', '2025-04-24', 'activo'),(12, 'Jefe de archivo (licencia sin goce de haber)', 'Encargado del archivo institucional (actualmente en licencia)', '2025-04-24', 'activo'),(13, 'Jefe de subsga', 'Director del subsistema de gestión administrativa', '2025-04-24', 'activo'),(14, 'Jefe de cooperación técnica', 'Coordina proyectos de cooperación internacional', '2025-04-24', 'activo'),(15, 'Jefe de la unidad de desarrollo agropecuario', 'Dirige programas de desarrollo rural', '2025-04-24', 'activo'),(16, 'Topógrafo', 'Profesional encargado de mediciones territoriales', '2025-04-24', 'activo'),(44, 'Serenazgo', '', '2025-04-25', 'activo')
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
INSERT INTO `bdasistencia`.`personal` (`dni`,`idcargo`,`nombres`,`apellidos`,`modalidad_contratacion`,`fecha_nacimiento`,`edad`,`sueldo`,`fecha_registro`,`foto`,`estado`,`vacaciones`) VALUES ('02680720', 13, 'Luis Augusto', 'Castillo Córdova', 'D.L N°276- Carrera Administrativa', '1957-12-15', 67, 2873.07, '2025-04-24', '', 'activo', 'Sin solicitar'),('02817817', 10, 'Chelita del R.', 'Carrasco Rivera', 'D.L N°276- Carrera Administrativa', '1970-11-23', 54, 2191.57, '2025-04-24', '', 'activo', 'Sin solicitar'),('03092651', 2, 'Gerardo', 'Umbo Jara', 'D.L N°728- obrero', '1961-10-20', 63, 1896.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03095417', 8, 'Elmer S.', 'Hermida Elera', 'D.L N°276- Carrera Administrativa', '1963-04-11', 62, 2185.82, '2025-04-24', '', 'activo', 'Sin solicitar'),('03118739', 6, 'López', 'Córdova Eli', 'D.L N°728- obrero', '1970-01-04', 55, 1551.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03118768', 3, 'Gilmar', 'Calle Sánchez', 'D.L N°276- Carrera Administrativa', '1969-11-08', 55, 2035.70, '2025-04-24', '', 'activo', 'Sin solicitar'),('03125480', 15, 'César Mavel', 'More Berrú', 'D.L N°276- Carrera Administrativa', NULL, NULL, 1700.00, '2025-04-24', '', 'activo', 'Sin solicitar'),('03125560', 14, 'Nolberto', 'López Castillo', 'D.L N°276- Carrera Administrativa', '1973-06-14', 51, 3423.07, '2025-04-24', '', 'activo', 'Sin solicitar'),('03130541', 3, 'Calle', 'Calle Hernando', 'D.L N°728- obrero', '1959-06-19', 65, 1751.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03318620', 1, 'Luciano', 'Peña Morales', 'D.L N°728- obrero', '1955-12-15', 69, 1896.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03343429', 3, 'Adelmo', 'Berru Sandoval', 'D.L N°276- Carrera Administrativa', '1963-08-06', 61, 3064.20, '2025-04-24', '', 'activo', 'Sin solicitar'),('03369451', 4, 'Ysmail', 'López Salinas', 'D.L N°728- obrero', '1972-05-01', 52, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('03369701', 9, 'Carmen M.', 'Orozco Berrú', 'D.L N°276- Carrera Administrativa', '1973-10-24', 51, 2175.82, '2025-04-24', '', 'activo', 'Sin solicitar'),('40704806', 11, 'Jorge L.', 'Chumacero Ruiz', 'D.L N°276- Carrera Administrativa', '1980-07-19', 44, 2295.57, '2025-04-24', '', 'activo', 'Sin solicitar'),('41595872', 12, 'Wilder E.', 'Saavedra Calle', 'D.L N°276- Carrera Administrativa', '1980-05-21', 44, NULL, '2025-04-24', '', 'activo', 'Sin solicitar'),('42463800', 5, 'Juan', 'Córdova Montalván', 'D.L N°728- obrero', '1982-11-05', 42, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('42849051', 4, 'Juan Carlos', 'Vásquez Flores', 'D.L N°728- obrero', '1985-03-03', 40, 1821.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('43341996', 5, 'Rogelio', 'Córdova Paz', 'D.L N°728- obrero', '1985-10-15', 39, 1751.11, '2025-04-24', '', 'activo', 'Días restantes'),('44266347', 16, 'Pedro', 'Córdova Pintado', 'D.L N°276- Carrera Administrativa', '1986-03-20', 39, 3150.00, '2025-04-24', '', 'activo', 'En proceso'),('45259065', 6, 'Segundo Eladio', 'Calle Peña', 'D.L N°728- obrero', '1986-02-14', 39, 1651.11, '2025-04-24', '', 'activo', 'Sin solicitar'),('45690213', 7, 'Magda', 'Ambulay Mondragón', 'D.L N°728- obrero', '1981-11-22', 43, 1451.11, '2025-04-24', '', 'activo', 'En proceso'),('76531080', 44, 'jose alexander', 'yovera simbala', 'D.L N°276- Carrera Administrativa', '2006-02-02', 19, 30000.00, '2025-04-25', 'data:image/jpeg;base64,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zbp+0RVjD3VbhU88888888YfO2LvT0u8I3vrKtdQqtTTYHUm++8888888otyRDQ1GtH7N/tRVQYDJnv3DgW++68gQwy0819Aj+fkJ73/AP8AS/8AZ0ntTyQZbgcc4oVpZqZEV32SoGkD9AWDCXnEo2hURIahoqfAzqVbtPn88e7AUMfhR/D4zHlyueZip27W8RAG6TlU3KUUzZCMIQ2ganpn9m74mVWkYrjAqA7piaAsk8FOmuK+oF3XO7OdVnn2pcIwMQBbJ1if5qOD+wQwQaaQ3nkRx9lDX/5hkgAAgMc8s4rsCmAW8geouik7v8I/N3nrIXIYENJQ888KCCSCQ800AdOUP0N5FUkc0/1cKBs099M888gAMOAAUKoAhS5KH3LLBjIUHcyEp88898888sc888A8qi8XtGINeYfl1VvQE1gP888888888888YAQAA8NoA22uqlzuEVB7R5fc888888888888AAAU89J/fhl3tCCxkgG/588888888888888MAA889tWx59I6sKhB3MR8888888888888888888899M6jrWqVWRpdt0Y8889d888888888888888oYFNJV2GDF6LLM3988tAAAc8888888888QUk6F5pG7OEMLLH+V988RAAA88888888888IAUIqYZSTPy7D70c9988tgsY88888888884IQA8q/dAuUQAMxx6wA8884048888888888gIIU8cFZ0s/V7Y+VQAIQ0AkU88888888888AAwU88UOmtfSWXILAAAADoU888888888888AEMA88ICxkRjUXE88AAkDQ8888888888884A8hIU8EUIb4CXMs88AIUc8888888888888gA04IU8U+e25HoaU88AAXK8888888888888IAA4qY84KM3wXsBo48IEHg8888888888888AAA4JI4pC6zY3ChJA8oQvA8888888888888QAAA2Al+nir9TGXZo8oCWU8888888888888IAAs7IFqUn3ZG97Bo88aMc88888888888888AAoKOVrDpN7KjZtcEMJs8c888c8488888s444kXSJzrz/APv/xAAeEQEBAAICAwEBAAAAAAAAAAABABARICEwQEExUP/aAAgBAwEBPxCGAmMma6mLfJiZvuNWtZPF0iIwORa4ag1OQtan8tYI8KiIwOIv34dT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', 'activo', 'En proceso')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `bdasistencia`.`salidas` WRITE;
DELETE FROM `bdasistencia`.`salidas`;
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
INSERT INTO `bdasistencia`.`vacaciones` (`id_vaca`,`dni`,`dias`,`fecha_inicio`,`fecha_fin`,`dias_restantes`,`year`,`fecha_registro`) VALUES (26, '76531080', 5, '2025-04-16', '2025-04-27', 26, 2025, NULL),(27, '76531080', 2, '2025-04-23', '2025-04-25', 24, 2025, NULL),(28, '76531080', 2, '2025-04-30', '2025-05-02', 22, 2025, NULL),(29, '76531080', 22, '2025-05-14', '2025-06-05', 0, 2025, NULL)
;
UNLOCK TABLES;
COMMIT;
CREATE DEFINER = `root`@`localhost` TRIGGER `before_insert_personal` BEFORE INSERT ON `personal` FOR EACH ROW BEGIN
    SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END;;
CREATE DEFINER = `root`@`localhost` TRIGGER `before_update_´personal` BEFORE UPDATE ON `personal` FOR EACH ROW BEGIN
    SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END;;
