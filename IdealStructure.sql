CREATE DATABASE  IF NOT EXISTS `datos_ideal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `datos_ideal`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: datos_ideal
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity` varchar(45) NOT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Eventos'),(2,'Emprendimientos'),(3,'Celebraciones'),(4,'Tendencias'),(5,'Empresariales'),(6,'Fashion'),(7,'Presentación '),(8,'Basketball'),(9,'Voleyball'),(10,'Futbol'),(11,'Salud');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lines`
--

DROP TABLE IF EXISTS `lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lines` (
  `line_id` int(11) NOT NULL AUTO_INCREMENT,
  `line` varchar(45) NOT NULL,
  PRIMARY KEY (`line_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lines`
--

LOCK TABLES `lines` WRITE;
/*!40000 ALTER TABLE `lines` DISABLE KEYS */;
INSERT INTO `lines` VALUES (1,'Linea fashion'),(2,'Linea deportiva'),(3,'Linea industrial'),(4,'Linea medica');
/*!40000 ALTER TABLE `lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `material_id` int(11) NOT NULL AUTO_INCREMENT,
  `material` varchar(45) NOT NULL,
  PRIMARY KEY (`material_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'Algodón '),(2,'Poliester'),(3,'Algodón peinado'),(4,'Piel de durazno'),(5,'Antifluido'),(6,'Perchado'),(7,'Dry fit'),(8,'Poli licra'),(9,'Fornax térmico'),(10,'Drill nacional'),(11,'Politex');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(45) NOT NULL,
  `line_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`line_id`),
  KEY `fk_products_lines1_idx` (`line_id`),
  CONSTRAINT `fk_products_lines1` FOREIGN KEY (`line_id`) REFERENCES `lines` (`line_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Conjunto Térmico',50000,'1637897696613_termico_empresa.png',3),(2,'Conjunto Antifluido',45000,'1637897777747_antifluido_empresa.png',3),(3,'Chaleco Industrial',45000,'1637897868749_industrial_empre.png',3),(4,'Overol Industrial',75000,'1637898210057_overol_empresa.png',3),(5,'Bata Quirugica Desechable',3500,'1637898274029_bata_desecha.png',4),(6,'Bata Quirúrgica Reutilizable',25000,'1637898344941_bata_reutiliza.png',4),(7,'Monotraje Desechable',8000,'1637898389604_monotraje_desecha.png',4),(8,'Monotraje Reutilizable',38000,'1637898439319_monotraje_reutili.png',4),(9,'Conjunto Médico Desechable',6000,'1637898528759_conjunMedi_desecha.png',4),(10,'Conjunto Médico Reutilizable',60000,'1637898589617_conjunMedi_reutili.png',4),(11,'Camisetas Polo',28000,'1637897453705_polo_empre.png',1),(12,'Camisetas Polo',38000,'1637897617747_polo_fashi.png',1),(13,'Camisetas Polo',45000,'1637897727004_polo_tenden.png',1),(14,'Chompas Personalizadas',40000,'1637897791293_chompa_even.png',1),(15,'Chompas Personalizadas',40000,'1637897844802_chompa_person_cele.png',1),(16,'Chompas Personalizadas',58000,'1637897917656_chompa_person_tenden.png',1),(17,'Chaquetas',85000,'1637898023189_chaque_tenden.png',1),(18,'Chaquetas',75000,'1637898101220_chaque_empres.png',1),(19,'Uniformes Deportivos',90000,'1637898156637_unifordepor_present.png',2),(20,'Uniformes Deportivos',40000,'1637898230746_unifordepor_basket.png',2),(21,'Uniformes Deportivos',38000,'1637898279075_unifordepor_voleyball.png',2),(22,'Uniformes Deportivos',45000,'1637898329687_unifordepor_futball.png',2),(23,'Camisetas Personalizadas',18000,'1637898170534_cam_per_even.png',1),(24,'Camisetas Personalizadas',18000,'1637898274651_cam_per_even2.png',1),(25,'Camisetas Personalizadas',18000,'1637898538406_cam_per_empren.png',1),(26,'Camisetas Personalizadas',20000,'1637898672051_cam_per_celeb.png',1),(27,'Camisetas Personalizadas',20000,'1637898731172_cam_per_celeb2.png',1),(28,'Camisetas Personalizadas',38000,'1637898796810_cam_per_empren2.png',1),(29,'Camisetas Personalizadas',38000,'1637898835206_cam_per_tenden.png',1),(54,'newProduct',122,'1646234405280_foco.png',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_activities`
--

DROP TABLE IF EXISTS `products_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`product_id`,`activity_id`),
  KEY `fk_products_has_activities_activities1_idx` (`activity_id`),
  KEY `fk_products_has_activities_products_idx` (`product_id`),
  CONSTRAINT `fk_products_has_activities_activities1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`activity_id`),
  CONSTRAINT `fk_products_has_activities_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_activities`
--

LOCK TABLES `products_activities` WRITE;
/*!40000 ALTER TABLE `products_activities` DISABLE KEYS */;
INSERT INTO `products_activities` VALUES (9,9,1),(14,14,1),(23,23,1),(24,24,1),(93,54,1),(25,25,2),(28,28,2),(11,11,3),(15,15,3),(26,26,3),(27,27,3),(13,13,4),(16,16,4),(17,17,4),(29,29,4),(1,1,5),(2,2,5),(3,3,5),(4,4,5),(18,18,5),(12,12,6),(19,19,7),(20,20,8),(21,21,9),(5,5,10),(6,6,10),(7,7,10),(8,8,10),(10,10,10),(22,22,10);
/*!40000 ALTER TABLE `products_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_materials`
--

DROP TABLE IF EXISTS `products_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_materials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`product_id`,`material_id`),
  KEY `fk_products_has_materials_materials1_idx` (`material_id`),
  KEY `fk_products_has_materials_products1_idx` (`product_id`),
  CONSTRAINT `fk_products_has_materials_materials1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`material_id`),
  CONSTRAINT `fk_products_has_materials_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_materials`
--

LOCK TABLES `products_materials` WRITE;
/*!40000 ALTER TABLE `products_materials` DISABLE KEYS */;
INSERT INTO `products_materials` VALUES (11,11,1),(13,12,1),(15,13,1),(17,14,1),(19,15,1),(30,23,1),(32,24,1),(34,25,1),(36,27,1),(121,54,1),(12,11,2),(14,12,2),(16,13,2),(18,14,2),(20,15,2),(31,23,2),(33,24,2),(122,54,2),(21,16,4),(35,26,4),(37,28,4),(38,29,4),(2,2,5),(6,6,5),(8,8,5),(22,17,5),(23,18,5),(24,19,5),(25,19,6),(26,20,7),(27,21,7),(29,22,7),(28,21,8),(48,1,9),(3,3,10),(4,4,10),(5,5,11),(7,7,11),(9,9,11),(10,10,11);
/*!40000 ALTER TABLE `products_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_subactivities`
--

DROP TABLE IF EXISTS `products_subactivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_subactivities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `subactivity_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`product_id`,`subactivity_id`),
  KEY `fk_products_has_subactivities_subactivities1_idx` (`subactivity_id`),
  KEY `fk_products_has_subactivities_products1_idx` (`product_id`),
  CONSTRAINT `fk_products_has_subactivities_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `fk_products_has_subactivities_subactivities1` FOREIGN KEY (`subactivity_id`) REFERENCES `subactivities` (`subactivity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_subactivities`
--

LOCK TABLES `products_subactivities` WRITE;
/*!40000 ALTER TABLE `products_subactivities` DISABLE KEYS */;
INSERT INTO `products_subactivities` VALUES (42,14,1),(45,15,1),(71,23,1),(74,24,1),(179,54,1),(43,14,2),(46,15,2),(72,23,2),(75,24,2),(180,54,2),(44,14,3),(47,15,3),(73,23,3),(76,24,3),(77,25,4),(87,28,4),(78,25,5),(88,28,5),(79,25,6),(89,28,6),(80,25,7),(90,28,7),(81,26,8),(84,27,8),(82,26,9),(85,27,9),(83,26,10),(86,27,10),(48,16,11),(91,29,11),(49,16,12),(92,29,12),(33,11,13),(34,11,14),(35,11,15),(36,12,16),(39,13,16),(50,17,16),(37,12,17),(40,13,17),(51,17,17),(38,12,18),(41,13,18),(52,17,18),(3,2,19),(5,3,19),(7,4,19),(53,18,19),(4,2,20),(6,3,20),(8,4,20),(54,18,20),(55,19,21),(59,20,21),(63,21,21),(67,22,21),(56,19,22),(60,20,22),(64,21,22),(68,22,22),(57,19,23),(61,20,23),(65,21,23),(69,22,23),(58,19,24),(62,20,24),(66,21,24),(70,22,24),(9,5,25),(13,6,25),(17,7,25),(21,8,25),(25,9,25),(29,10,25),(10,5,26),(14,6,26),(18,7,26),(22,8,26),(26,9,26),(30,10,26),(11,5,27),(15,6,27),(19,7,27),(23,8,27),(27,9,27),(31,10,27),(12,5,28),(16,6,28),(20,7,28),(24,8,28),(28,9,28),(32,10,28);
/*!40000 ALTER TABLE `products_subactivities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_techniques`
--

DROP TABLE IF EXISTS `products_techniques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_techniques` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `technique_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`product_id`,`technique_id`),
  KEY `fk_products_has_techniques_techniques1_idx` (`technique_id`),
  KEY `fk_products_has_techniques_products1_idx` (`product_id`),
  CONSTRAINT `fk_products_has_techniques_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `fk_products_has_techniques_techniques1` FOREIGN KEY (`technique_id`) REFERENCES `techniques` (`technique_id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_techniques`
--

LOCK TABLES `products_techniques` WRITE;
/*!40000 ALTER TABLE `products_techniques` DISABLE KEYS */;
INSERT INTO `products_techniques` VALUES (13,10,1),(14,11,1),(15,12,1),(16,13,1),(17,14,1),(20,16,1),(21,17,1),(25,19,1),(26,20,1),(27,21,1),(28,22,1),(29,23,1),(36,26,1),(39,28,1),(40,29,1),(129,54,1),(3,2,2),(5,3,2),(7,4,2),(8,5,2),(9,6,2),(10,7,2),(11,8,2),(12,9,2),(18,15,2),(22,18,2),(30,24,2),(32,25,2),(130,54,2),(23,18,3),(29,15,3),(31,24,3),(33,25,3),(24,18,4),(34,25,4),(37,27,4),(35,25,5),(38,27,5),(4,2,7),(6,3,7);
/*!40000 ALTER TABLE `products_techniques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,1),(2,5);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subactivities`
--

DROP TABLE IF EXISTS `subactivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subactivities` (
  `subactivity_id` int(11) NOT NULL AUTO_INCREMENT,
  `subactivity` varchar(100) NOT NULL,
  PRIMARY KEY (`subactivity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subactivities`
--

LOCK TABLES `subactivities` WRITE;
/*!40000 ALTER TABLE `subactivities` DISABLE KEYS */;
INSERT INTO `subactivities` VALUES (1,'Campañas publicitarias'),(2,'Campañas politicas'),(3,'Eventos corporativos'),(4,'Comidas rápidas'),(5,'Restaurantes'),(6,'Almacenes'),(7,'Negocios'),(8,'Cumpleaños'),(9,'Baby showers'),(10,'Días especiales'),(11,'Diseños de temporada'),(12,'Diseños exclusivos'),(13,'Empresas'),(14,'Negocios'),(15,'Emprendimientos'),(16,'Última moda'),(17,'Re ventas'),(18,'Almacenes de ropa'),(19,'Consorcios'),(20,'Empresas sector: industrial, educativo, administrativo'),(21,'Escuelas de futbol'),(22,'Torneos de colegio'),(23,'Torneos de barrio'),(24,'Torneos de empresas'),(25,'Hospitales'),(26,'Bomberos'),(27,'Consultorios'),(28,'Estéticas');
/*!40000 ALTER TABLE `subactivities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `techniques`
--

DROP TABLE IF EXISTS `techniques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `techniques` (
  `technique_id` int(11) NOT NULL,
  `technique` varchar(45) NOT NULL,
  PRIMARY KEY (`technique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `techniques`
--

LOCK TABLES `techniques` WRITE;
/*!40000 ALTER TABLE `techniques` DISABLE KEYS */;
INSERT INTO `techniques` VALUES (1,'Full color sublimación'),(2,'Serigrafía 1 tinta'),(3,'Serigrafía 2 tintas'),(4,'Vinilo textil 1 color'),(5,'Vinilo textil 2 colores'),(6,'Estampado '),(7,'Bordado');
/*!40000 ALTER TABLE `techniques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` varchar(500) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_roles1_idx` (`role_id`),
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ana','1234','Díaz','ana@gmail.com',2,'foto-1640127703449_WhatsApp Image 2021-12-21 at 6.00.39 PM.jpeg'),(13,'prueba','$2a$10$NrgBrVJOB4EtD19lOHEkwOLF6b6LBOTJJ26NeA.wEkFrAlf200A6i','prueba','prueba@gmail.com',2,'foto-1645731363847_Calendario Ambiental.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-03 11:03:17
