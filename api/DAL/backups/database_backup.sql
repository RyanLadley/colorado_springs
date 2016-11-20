CREATE DATABASE  IF NOT EXISTS `colorado_springs` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `colorado_springs`;
-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: colorado_springs
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

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
-- Table structure for table `account_transfers`
--

DROP TABLE IF EXISTS `account_transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_transfers` (
  `transfer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_account_id` int(10) unsigned NOT NULL,
  `to_account_id` int(10) unsigned NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(360) NOT NULL,
  `transfer_date` date NOT NULL,
  PRIMARY KEY (`transfer_id`),
  UNIQUE KEY `trasnfer_id_UNIQUE` (`transfer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_transfers`
--

LOCK TABLES `account_transfers` WRITE;
/*!40000 ALTER TABLE `account_transfers` DISABLE KEYS */;
INSERT INTO `account_transfers` VALUES (2,2,15,53.60,'This is a test','2016-11-14'),(3,1,14,23.00,'Another test','2016-11-14');
/*!40000 ALTER TABLE `account_transfers` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,5221000,NULL,NULL,'In House Resurfacing',2160938.00),(2,5221000,1,NULL,'Maitenance Paving',0.00),(4,5221000,2,NULL,'Structural Digout',0.00),(5,5221000,2,1,'North District Digout',0.00),(6,5221000,2,2,'South District Digout',0.00),(7,5221000,2,3,'East District Digout',0.00),(8,5221000,2,4,'West District Digout',0.00),(9,5221000,3,NULL,'District Maintenance Paving',0.00),(10,5221000,3,1,'North Maintenence Paving',0.00),(11,5221000,3,2,'South Maintenance Paving',0.00),(12,5221000,3,3,'East Maintenance Paving',0.00),(13,5221000,3,4,'West Maintenance Paving',0.00),(14,5222000,NULL,NULL,'Pothole Patching Repair',331447.80),(15,5222000,1,NULL,'Asphalt Repair',0.00),(16,5222000,2,NULL,'Propane',0.00),(17,5222000,3,NULL,'Shovels/Rakes/etc',0.00),(18,5223000,NULL,NULL,'In House Pipe',137447.80),(19,5223000,1,NULL,'Pipe Materials',0.00),(20,5223000,2,NULL,'Swas/Hand Tools/Etc',0.00),(21,5224000,NULL,NULL,'In House Concrete',3523678.92),(22,5224000,1,NULL,'Concrete Materials',0.00),(23,5224000,2,NULL,'Tool/Supplies',0.00),(24,5225000,NULL,NULL,'In House Project Support',158016.80),(25,5225000,1,NULL,'Maint Paving Manpower',0.00),(26,5225000,2,NULL,'Maint Paving Rental Equip',0.00),(27,5225000,3,NULL,'Maint District Manpower',0.00),(28,5225000,3,1,'North District Manpower',0.00),(29,5225000,3,2,'South District Manpower',0.00),(30,5225000,3,3,'East District Manpower',0.00),(31,5225000,3,4,'West District Manpower',0.00),(32,5225000,4,NULL,'Maint District Rental Equip',0.00),(33,5225000,4,1,'North District Rental Equip',0.00),(34,5225000,4,2,'South District Rental Equip',0.00),(35,5225000,4,3,'East District Rental Equip',0.00),(36,5225000,4,4,'West District Rental Equip',0.00),(37,5225000,5,NULL,'In House Pipe Manpower',0.00),(38,5225000,6,NULL,'In House Pipe Rental Equip',0.00),(39,5225000,7,NULL,'In House Concrete Manpower',0.00),(40,5225000,8,NULL,'In House Concrete Equip',0.00),(41,5225000,9,NULL,'Signs & Markings Manpower',0.00),(42,5225000,10,NULL,'Reserves',0.00),(43,5226000,NULL,NULL,'Signs & Markings',14135000.00),(44,5226000,1,NULL,'Crosswalks/School Legends',0.00),(45,5226000,2,NULL,'Long Line Contract',0.00);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_types`
--

DROP TABLE IF EXISTS `transaction_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_types` (
  `transaction_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_type` varchar(45) NOT NULL,
  PRIMARY KEY (`transaction_type_id`),
  UNIQUE KEY `transaction_type_id_UNIQUE` (`transaction_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_types`
--

LOCK TABLES `transaction_types` WRITE;
/*!40000 ALTER TABLE `transaction_types` DISABLE KEYS */;
INSERT INTO `transaction_types` VALUES (1,'Equipment'),(2,'Labor'),(3,'Material');
/*!40000 ALTER TABLE `transaction_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `transaction_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned NOT NULL,
  `vendor_id` int(10) unsigned NOT NULL,
  `invoice_date` date NOT NULL,
  `date_paid` date DEFAULT NULL,
  `invoice_no` varchar(140) NOT NULL,
  `description` varchar(360) NOT NULL,
  `expense` varchar(360) NOT NULL,
  `transaction_type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `transaction_id_UNIQUE` (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,2,3,'2016-11-08','2016-11-15','LP09K87HY','This is the first entry.','69.36',1),(2,6,4,'2016-11-22','2016-11-16','ALB892JSA','There is no way to clear the \"date paid\" on the transaction adjustment screen. This would be necessary if a user would want to change a transaction to pending.','950.52',2),(4,7,6,'2017-01-09','2016-11-23','AHK13GDS','This is an updated transaction','23',2),(5,4,6,'2016-11-16','2016-11-15','KJHSAK','This is a pending transaction.At least, it was','12.43',1),(6,16,3,'2016-11-15','2016-11-17','JS-12-SJ','There needs to a character counter on the description field since te database has a character limit.','12.42',1),(7,4,4,'2016-11-15',NULL,'78-098','Pending!!','89.09',2),(9,20,3,'2016-11-09','2016-11-25','LP09K87HY','This is to test invoice coversheets.','63.2',2);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(254) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `password` varchar(160) DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `token_exp` datetime DEFAULT NULL,
  `permissions` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (14,'user@email.com','User','McUserson','pbkdf2:sha1:1000$pUDdp4b7$0f61e5f0477095e0659d1553668ea3f8341e045b','WVNRJRX2WIGLJFAOAM3ND7PZ9EI06TY6','2016-11-18 09:33:38',0),(15,'jladley@springsgov.com','Jack','Ladley','pbkdf2:sha1:1000$ncJHphe3$823a65f490143d7190f6860f41eb0f69d5d80df4','KXDXWECUC8T7VM7MNXIPGPX74UVQ8O1C','2016-11-18 09:40:18',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_account_transfers`
--

DROP TABLE IF EXISTS `v_account_transfers`;
/*!50001 DROP VIEW IF EXISTS `v_account_transfers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_account_transfers` (
  `transfer_id` tinyint NOT NULL,
  `from_account_id` tinyint NOT NULL,
  `from_account_no` tinyint NOT NULL,
  `from_sub_no` tinyint NOT NULL,
  `from_shred_no` tinyint NOT NULL,
  `to_account_id` tinyint NOT NULL,
  `to_account_no` tinyint NOT NULL,
  `to_sub_no` tinyint NOT NULL,
  `to_shred_no` tinyint NOT NULL,
  `amount` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `transfer_date` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_invoice_accounts`
--

DROP TABLE IF EXISTS `v_invoice_accounts`;
/*!50001 DROP VIEW IF EXISTS `v_invoice_accounts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_invoice_accounts` (
  `transaction_id` tinyint NOT NULL,
  `account_id` tinyint NOT NULL,
  `account_no` tinyint NOT NULL,
  `expense` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_transactions`
--

DROP TABLE IF EXISTS `v_transactions`;
/*!50001 DROP VIEW IF EXISTS `v_transactions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_transactions` (
  `transaction_id` tinyint NOT NULL,
  `account_id` tinyint NOT NULL,
  `account_no` tinyint NOT NULL,
  `sub_no` tinyint NOT NULL,
  `shred_no` tinyint NOT NULL,
  `vendor_id` tinyint NOT NULL,
  `vendor_name` tinyint NOT NULL,
  `invoice_date` tinyint NOT NULL,
  `date_paid` tinyint NOT NULL,
  `invoice_no` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `expense` tinyint NOT NULL,
  `transaction_type_id` tinyint NOT NULL,
  `transaction_type` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_vendors`
--

DROP TABLE IF EXISTS `v_vendors`;
/*!50001 DROP VIEW IF EXISTS `v_vendors`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_vendors` (
  `vendor_id` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `contract_no` tinyint NOT NULL,
  `contract_start` tinyint NOT NULL,
  `contract_end` tinyint NOT NULL,
  `point_of_contact` tinyint NOT NULL,
  `phone_no` tinyint NOT NULL,
  `address` tinyint NOT NULL,
  `city` tinyint NOT NULL,
  `state` tinyint NOT NULL,
  `zip` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `website` tinyint NOT NULL,
  `image_folder` tinyint NOT NULL,
  `image_file_name` tinyint NOT NULL,
  `image_file_type` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vendor_images`
--

DROP TABLE IF EXISTS `vendor_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `vendor_id` int(10) unsigned NOT NULL,
  `folder` varchar(45) DEFAULT NULL,
  `file_name` varchar(45) DEFAULT NULL,
  `file_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_images`
--

LOCK TABLES `vendor_images` WRITE;
/*!40000 ALTER TABLE `vendor_images` DISABLE KEYS */;
INSERT INTO `vendor_images` VALUES (2,3,'0','3','png'),(3,4,'0','4','png'),(4,6,'0','6','jpeg'),(5,7,'0','7','jpeg');
/*!40000 ALTER TABLE `vendor_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendors` (
  `vendor_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(140) NOT NULL,
  `contract_no` varchar(45) NOT NULL,
  `contract_start` date DEFAULT NULL,
  `contract_end` date NOT NULL,
  `point_of_contact` varchar(140) DEFAULT NULL,
  `phone_no` varchar(12) DEFAULT NULL,
  `address` varchar(360) DEFAULT NULL,
  `city` varchar(360) DEFAULT NULL,
  `state` varchar(360) DEFAULT NULL,
  `zip` varchar(6) DEFAULT NULL,
  `email` varchar(140) DEFAULT NULL,
  `website` varchar(360) DEFAULT NULL,
  PRIMARY KEY (`vendor_id`),
  UNIQUE KEY `vendor_id_UNIQUE` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (3,'Grainger','TS1534','2015-06-11','2018-03-23','Tom McGrainger','719-555-3924','1234 Fake Street','Colorado Springs','Colorado','80918','tom@grainger.com','www.grainger.com'),(4,'Concrete Co','PL435A','2015-04-06','2017-12-02','Mr Concrete','719-555-63','987 Not Real Road','Peyton','Colorado','80810','mr@concrete.ord','www.google.com/'),(6,'AAA Building Supply','DS09098','2015-04-12','2018-06-02','Lord Vader','702-963-8745','321 No Moon Lane','Seattle','Washington','85634','vader@deathstar.net','www.starwars.com'),(7,'Iron Wood','PL-9635','2016-02-04','2017-06-16','Woodchuck Ben','719-963-4563','1236 North Street','Colorado Springs','Colorado','80918','benchucks@chuckers.org','www.google.com');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `v_account_transfers`
--

/*!50001 DROP TABLE IF EXISTS `v_account_transfers`*/;
/*!50001 DROP VIEW IF EXISTS `v_account_transfers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_account_transfers` AS select `account_transfers`.`transfer_id` AS `transfer_id`,`account_transfers`.`from_account_id` AS `from_account_id`,`from_account`.`account_no` AS `from_account_no`,`from_account`.`sub_no` AS `from_sub_no`,`from_account`.`shred_no` AS `from_shred_no`,`account_transfers`.`to_account_id` AS `to_account_id`,`to_account`.`account_no` AS `to_account_no`,`to_account`.`sub_no` AS `to_sub_no`,`to_account`.`shred_no` AS `to_shred_no`,`account_transfers`.`amount` AS `amount`,`account_transfers`.`description` AS `description`,`account_transfers`.`transfer_date` AS `transfer_date` from ((`account_transfers` join `accounts` `from_account` on((`from_account`.`account_id` = `account_transfers`.`from_account_id`))) join `accounts` `to_account` on((`to_account`.`account_id` = `account_transfers`.`to_account_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_invoice_accounts`
--

/*!50001 DROP TABLE IF EXISTS `v_invoice_accounts`*/;
/*!50001 DROP VIEW IF EXISTS `v_invoice_accounts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_invoice_accounts` AS select `v_transactions`.`transaction_id` AS `transaction_id`,`v_transactions`.`account_id` AS `account_id`,`v_transactions`.`account_no` AS `account_no`,`v_transactions`.`expense` AS `expense` from `v_transactions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

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
/*!50001 VIEW `v_transactions` AS select `t`.`transaction_id` AS `transaction_id`,`t`.`account_id` AS `account_id`,`accounts`.`account_no` AS `account_no`,`accounts`.`sub_no` AS `sub_no`,`accounts`.`shred_no` AS `shred_no`,`t`.`vendor_id` AS `vendor_id`,`vendors`.`name` AS `vendor_name`,`t`.`invoice_date` AS `invoice_date`,`t`.`date_paid` AS `date_paid`,`t`.`invoice_no` AS `invoice_no`,`t`.`description` AS `description`,`t`.`expense` AS `expense`,`t`.`transaction_type_id` AS `transaction_type_id`,`transaction_types`.`transaction_type` AS `transaction_type` from (((`transactions` `t` join `vendors` on((`t`.`vendor_id` = `vendors`.`vendor_id`))) join `transaction_types` on((`transaction_types`.`transaction_type_id` = `t`.`transaction_type_id`))) join `accounts` on((`accounts`.`account_id` = `t`.`account_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_vendors`
--

/*!50001 DROP TABLE IF EXISTS `v_vendors`*/;
/*!50001 DROP VIEW IF EXISTS `v_vendors`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_vendors` AS select `vendors`.`vendor_id` AS `vendor_id`,`vendors`.`name` AS `name`,`vendors`.`contract_no` AS `contract_no`,`vendors`.`contract_start` AS `contract_start`,`vendors`.`contract_end` AS `contract_end`,`vendors`.`point_of_contact` AS `point_of_contact`,`vendors`.`phone_no` AS `phone_no`,`vendors`.`address` AS `address`,`vendors`.`city` AS `city`,`vendors`.`state` AS `state`,`vendors`.`zip` AS `zip`,`vendors`.`email` AS `email`,`vendors`.`website` AS `website`,`image`.`folder` AS `image_folder`,`image`.`file_name` AS `image_file_name`,`image`.`file_type` AS `image_file_type` from (`vendors` join `vendor_images` `image` on((`image`.`vendor_id` = `vendors`.`vendor_id`))) */;
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

-- Dump completed on 2016-11-18  1:48:18
