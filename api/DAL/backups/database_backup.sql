CREATE DATABASE  IF NOT EXISTS `colorado_springs` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `colorado_springs`;
-- MySQL dump 10.13  Distrib 5.5.52, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: colorado_springs
-- ------------------------------------------------------
-- Server version	5.5.52-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `account_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_no` int(10) unsigned NOT NULL,
  `sub_no` int(2) DEFAULT NULL,
  `shred_no` int(2) DEFAULT NULL,
  `description` varchar(140) NOT NULL,
  `annual_budget` decimal(10,2) NOT NULL,
  `transfer` decimal(10,2) NOT NULL,
  `total_budget` decimal(10,2) NOT NULL,
  `expedetures` decimal(10,2) NOT NULL,
  `remaining` decimal(10,2) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,5221000,NULL,NULL,'In House Resurfacing',2160938.00,0.00,2160938.00,0.00,2160938.00),(2,5221000,1,NULL,'Maitenance Paving',0.00,0.00,0.00,0.00,0.00),(3,5221000,3,4,'West Maintenance Paving',0.00,0.00,0.00,0.00,0.00),(4,5221000,2,NULL,'Structural Digout',0.00,0.00,0.00,0.00,0.00),(5,5221000,2,1,'North District Digout',0.00,0.00,0.00,0.00,0.00),(6,5221000,2,2,'South District Digout',0.00,0.00,0.00,0.00,0.00),(7,5221000,2,3,'East District Digout',0.00,0.00,0.00,0.00,0.00),(8,5221000,2,4,'West District Digout',0.00,0.00,0.00,0.00,0.00),(9,5221000,3,0,'District Maintenance Paving',0.00,0.00,0.00,0.00,0.00),(10,5221000,3,1,'North Maintenence Paving',0.00,0.00,0.00,0.00,0.00),(11,5221000,3,2,'South Maintenance Paving',0.00,0.00,0.00,0.00,0.00),(12,5221000,3,3,'East Maintenance Paving',0.00,0.00,0.00,0.00,0.00),(13,5221000,3,4,'West Maintenance Paving',0.00,0.00,0.00,0.00,0.00),(14,5222000,NULL,NULL,'Pothole Patching Repair',0.00,0.00,0.00,0.00,0.00),(15,5222000,1,NULL,'Asphalt Repair',0.00,0.00,0.00,0.00,0.00),(16,5222000,2,NULL,'Propane',0.00,0.00,0.00,0.00,0.00),(17,5222000,3,NULL,'Shovels/Rakes/etc',0.00,0.00,0.00,0.00,0.00);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `transaction_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `vendor_id` int(10) unsigned NOT NULL,
  `invoice_date` date NOT NULL,
  `date_paid` date DEFAULT NULL,
  `invoice_number` varchar(140) NOT NULL,
  `description` varchar(360) NOT NULL,
  `expense` varchar(360) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `transaction_id_UNIQUE` (`transaction_id`),
  UNIQUE KEY `vendor_invoice_UNIQUE` (`invoice_number`,`vendor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_transactions`
--

DROP TABLE IF EXISTS `v_transactions`;
/*!50001 DROP VIEW IF EXISTS `v_transactions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_transactions` (
  `transaction_id` tinyint NOT NULL,
  `vendor_id` tinyint NOT NULL,
  `vendor_name` tinyint NOT NULL,
  `invoice_date` tinyint NOT NULL,
  `date_paid` tinyint NOT NULL,
  `invoice_number` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `expense` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendors` (
  `vendor_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(140) NOT NULL,
  `icon_path` varchar(140) DEFAULT NULL,
  `contract_no` varchar(45) NOT NULL,
  `contract_start` date DEFAULT NULL,
  `contract_end` date NOT NULL,
  `point_of_contact` varchar(140) DEFAULT NULL,
  `phone_no` varchar(10) DEFAULT NULL,
  `street` varchar(360) DEFAULT NULL,
  `city` varchar(360) DEFAULT NULL,
  `state` varchar(360) DEFAULT NULL,
  `zip` varchar(6) DEFAULT NULL,
  `email` varchar(140) DEFAULT NULL,
  `website` varchar(360) DEFAULT NULL,
  PRIMARY KEY (`vendor_id`),
  UNIQUE KEY `vendor_id_UNIQUE` (`vendor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `v_transactions`
--

/*!50001 DROP TABLE IF EXISTS `v_transactions`*/;
/*!50001 DROP VIEW IF EXISTS `v_transactions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_transactions` AS select `t`.`transaction_id` AS `transaction_id`,`t`.`vendor_id` AS `vendor_id`,`vendors`.`name` AS `vendor_name`,`t`.`invoice_date` AS `invoice_date`,`t`.`date_paid` AS `date_paid`,`t`.`invoice_number` AS `invoice_number`,`t`.`description` AS `description`,`t`.`expense` AS `expense` from (`transactions` `t` join `vendors`) where (`t`.`vendor_id` = `vendors`.`vendor_id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-04 20:56:38
