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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_transfers`
--

LOCK TABLES `account_transfers` WRITE;
/*!40000 ALTER TABLE `account_transfers` DISABLE KEYS */;
INSERT INTO `account_transfers` VALUES (2,2,15,53.60,'This is a test','2016-11-14'),(3,1,14,23.00,'Another test','2016-11-14'),(4,23,44,300.20,'This is a regression test.','2016-11-20'),(5,27,21,36.20,'More refactor tests!','2016-11-22');
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
  `pprta_account_code_id` int(10) unsigned NOT NULL,
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
INSERT INTO `accounts` VALUES (1,1,NULL,NULL,'In House Resurfacing',2160938.00),(2,1,1,NULL,'Maitenance Paving',2000.00),(4,2,2,NULL,'Structural Digout',20000.00),(5,2,2,1,'North District Digout',3000.00),(6,2,2,2,'South District Digout',520.00),(7,2,2,3,'East District Digout',8963.00),(8,2,2,4,'West District Digout',876.00),(9,1,3,NULL,'District Maintenance Paving',100.00),(10,1,3,1,'North Maintenence Paving',8635.00),(11,1,3,2,'South Maintenance Paving',7548.00),(12,1,3,3,'East Maintenance Paving',9863.00),(13,1,3,4,'West Maintenance Paving',10025.00),(14,3,NULL,NULL,'Pothole Patching Repair',331447.80),(15,3,1,NULL,'Asphalt Repair',7888.00),(16,3,2,NULL,'Propane',896.25),(17,3,3,NULL,'Shovels/Rakes/etc',7865.50),(18,7,NULL,NULL,'In House Pipe',137447.80),(19,7,1,NULL,'Pipe Materials',896.54),(20,7,2,NULL,'Saws/Hand Tools/Etc',788.36),(21,4,NULL,NULL,'In House Concrete',3523678.92),(22,4,1,NULL,'Concrete Materials',5496.54),(23,4,2,NULL,'Tool/Supplies',7778.57),(24,5,NULL,NULL,'In House Project Support',158016.80),(25,5,1,NULL,'Maint Paving Manpower',7835.00),(26,5,2,NULL,'Maint Paving Rental Equip',785.00),(27,5,3,NULL,'Maint District Manpower',4563.50),(28,5,3,1,'North District Manpower',785.00),(29,5,3,2,'South District Manpower',7854.00),(30,5,3,3,'East District Manpower',455.00),(31,5,3,4,'West District Manpower',456.00),(32,5,4,NULL,'Maint District Rental Equip',7854.00),(33,5,4,1,'North District Rental Equip',456.00),(34,5,4,2,'South District Rental Equip',7863.00),(35,5,4,3,'East District Rental Equip',4596.00),(36,5,4,4,'West District Rental Equip',8754.00),(37,5,5,NULL,'In House Pipe Manpower',86.57),(38,5,6,NULL,'In House Pipe Rental Equip',9875.00),(39,5,7,NULL,'In House Concrete Manpower',1265.00),(40,5,8,NULL,'In House Concrete Equip',7868.00),(41,5,9,NULL,'Signs & Markings Manpower',782.00),(42,5,10,NULL,'Reserves',785.00),(43,6,NULL,NULL,'Signs & Markings',14135000.00),(44,6,1,NULL,'Crosswalks/School Legends',785.00),(45,6,2,NULL,'Long Line Contract',7863.00);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_account_assignments`
--

DROP TABLE IF EXISTS `city_account_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city_account_assignments` (
  `city_account_assignment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_id` int(10) unsigned NOT NULL,
  `city_account_id` int(10) unsigned NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`city_account_assignment_id`),
  UNIQUE KEY `city_account_assignments_id_UNIQUE` (`city_account_assignment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_account_assignments`
--

LOCK TABLES `city_account_assignments` WRITE;
/*!40000 ALTER TABLE `city_account_assignments` DISABLE KEYS */;
INSERT INTO `city_account_assignments` VALUES (1,24,4,96.30),(5,42,3,63.21),(40,9,6,63.20),(56,2,9,50.52),(57,2,11,90.00),(60,27,3,63.21),(81,43,7,3.10),(82,43,5,26.00),(83,43,15,11.10),(84,47,9,5.00),(85,47,13,51.25),(88,48,6,96.32),(89,46,2,6.20),(90,46,3,57.00),(91,49,2,7.25),(92,49,1,34.90),(93,49,5,27.90),(94,49,15,8.20),(95,50,3,6.20),(96,50,4,5.00),(97,50,31,52.00),(101,28,3,97.20),(102,28,4,87.00),(103,28,13,78.00),(104,28,2,709.00);
/*!40000 ALTER TABLE `city_account_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_accounts`
--

DROP TABLE IF EXISTS `city_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city_accounts` (
  `city_account_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_no` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` varchar(140) NOT NULL,
  PRIMARY KEY (`city_account_id`),
  UNIQUE KEY `city_account_id_UNIQUE` (`city_account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_accounts`
--

LOCK TABLES `city_accounts` WRITE;
/*!40000 ALTER TABLE `city_accounts` DISABLE KEYS */;
INSERT INTO `city_accounts` VALUES (1,52185,'Aggregate Material','Rip rap, Pioneer sand, river rock, etc.'),(2,51205,'Civilian Salaries','Salaries for FTE positions conducting Street Division field and office duties'),(3,51210,'Overtime','Overtime primarily performed by FTE\'s for various projects and maintenance activities'),(4,51220,'Seasonal Tempory Positions','Seasonal temporary  positions to support Street Division and Stormwater/Drainage  activities throughout the year'),(5,51250,'Special Assignment  Pay','Salaries for personnel for special assignments'),(6,51610,'PERA','Pension fund for FTE’s'),(7,51615,'Worker\'s  Comp.','Worker\'s Compensation  Costs'),(8,51620,'Equitable Life Insurance','Life insurance expenditure for FTE\'s'),(9,51640,'Dental Insurance','Dental insurance expenditure for FTE\'s'),(10,51690,'Medicare','Medicare costs for FTE’s'),(11,51695,'City EPO Medical Plan','Medical Plan costs for FTE\'s'),(12,52110,'Office Supplies','Folders, pens, binders, ink, pads, scissors, staples, adding machine tape, etc.'),(13,52111,'Paper Supplies','Copier  paper'),(14,52120,'Computer Software','Software for computers'),(15,52122,'Cell Phone Equipment','Chargers, cell phones, cases, etc'),(16,52125,'General Supplies','Bolts, screws, batteries, propane, coffee supplies, straps, paper towels, plates, cups, etc.'),(17,52127,'Construction  Supplies','Standard construction supplies to include gas used for marking machines, sockets, tape measure, pails, nuts, bolts, screws, nails, rope, ora'),(18,52131,'Concrete Supplies','Concrete, forms, blankets, structural angle iron, wood, diamond blades, saws, etc.'),(19,52135,'Postage','Postage stamps, postal service charges, Fed Ex, etc.'),(20,52140,'Wearing Apparel','Safety boots, vests, glasses, coveralls, gloves, etc.'),(21,52145,'Paint & Chemical','Spray paint, floor dry, big orange, glass cleaner'),(22,52150,'Seed & Fertilizer','Seed and fertilizer'),(23,52160,'Fuel','Fuel'),(24,52165,'Licenses & Tags','Licenses & Tags'),(25,52175,'Signs','Signs'),(26,52180,'Asphaltic Material','Used for smaller amounts of asphalt'),(27,52190,'Janitorial Supplies','Toilet paper, tissue, soap, lotion, etc.'),(28,52192,'Stormwater Permit','Strictly a SWENT cost'),(29,52210,'Maintenance Trees','Used by SWENT in the past and now drainage STR.  Trees or items to maintain'),(30,52220,'Maintenance  Office  Machines','Maintenance on copiers/printers,  fax machines, map plotter, etc.'),(31,52235,'Maintenance  Machines/App','Maintenance for equipment and field machinery (chain saws, chippers, other equipment)'),(32,52255,'Maintenance  Signs','Sign installation, repair and replacements to include sign blanks, poles, pole sleeves, tools,\nhardware and maintenance'),(33,52265,'Maintenance Building & Str','El Paso Facilities Repairs/Upkeep (Miller, Briargate, Wheeler, Outwest, Transit Yard, Fontanero), City Fire Dept. Hazmat Inspections of buil'),(34,52281,'Maintenance  Infrastructure','Drainage expenditures that are not mandated - Pond issues.   Emergency drainage issues'),(35,52405,'Advertising Services','In the past involved placement of help wanted ads in the Gazette'),(36,52410,'Building Security','ADT bills or other security contracts'),(37,52415,'Contracts & Special Projects','Expenses of “outsourced\" projects/contracts other than Snow Contract'),(38,52423,'Telecommunication Service','Bolts, screws, batteries, propane, coffee supplies, straps, paper towels,  plates, cups, etc.'),(39,52425,'Environmental  Services','Environmental costs ie; waste recycling-sand Trap Wastes by Resource Geoscience at Geiger, Outwest, Briargate, Fontanero and Wheeler, permit'),(40,52426,'Mun Fac Runoff','Drainage - invoicles permits and various municipal items'),(41,52431,'Consulting  Services','Road Weather Information System (RWIS), Design Survey and Grading plans, Anit-skid\ntesting, and multiple project tests and consulting servic'),(42,52435,'Garbage Removal','Monthly Waste Mgmt and other garbage service for Street Barn Locations - 6 in all'),(43,52437,'Debris Waste Service','Use ONLY for Waste Management Barter Program - FOR THIS PURPOSE ONLY!  Revenue for same expense comes back into the City General Fund via th'),(44,52445,'Janitorial Services','Monthly janitorial service for all facilities'),(45,52560,'Parking Services','Parking costs downtown for Streets personnel'),(46,52571,'Snow Removal','De-icer, apex, ice slicer, anti-skid material, temps peronnel working snow events, snow\nmeals, etc.'),(47,52575,'General Services','Answering service, pest control, dead animals dump fee, Sierra Spgs, radio communication, Acme Fire & Safety, hydrant permits (CSU), bird mi'),(48,52590,'Temperary Employment','Outsourced Expenses through temporary employment agencies for personnel in the field and office, ie: Remedy'),(49,52615,'Dues & Memership','APW (Amer. Public Workd Assoc) & CARMA (Colo. Assoc. of Stormwater & Roadway Maintenance), etc'),(50,52625,'In Town Meeting Expenses','Annual employee meeting for suervisors and management'),(51,52630,'Training','Confrences for roadway/snow removal/pubilc safety/personnel safety/enviromental issues, training'),(52,52645,'Subscriptions','Roadway/Construction Subscriptions for managers/supervisors.');
/*!40000 ALTER TABLE `city_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pprta_account_codes`
--

DROP TABLE IF EXISTS `pprta_account_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pprta_account_codes` (
  `pprta_account_code_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_no` int(10) unsigned NOT NULL,
  `fund_no` int(10) unsigned NOT NULL,
  `dept_no` int(10) unsigned NOT NULL,
  `project_no` int(10) unsigned NOT NULL,
  `project_description` varchar(140) NOT NULL,
  `account_prefix` varchar(13) NOT NULL,
  PRIMARY KEY (`pprta_account_code_id`),
  UNIQUE KEY `pprta_account_code_id_UNIQUE` (`pprta_account_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pprta_account_codes`
--

LOCK TABLES `pprta_account_codes` WRITE;
/*!40000 ALTER TABLE `pprta_account_codes` DISABLE KEYS */;
INSERT INTO `pprta_account_codes` VALUES (1,5221000,935,9000,3900003,'Maintenance Paving','03-30'),(2,5221000,935,9000,3900004,'Digout','03-30'),(3,5222000,935,9000,3900005,'Pothole','03-30'),(4,5224000,935,9000,3900011,'Concrete','03-30'),(5,5225000,935,9000,3900012,'Project Suport','03-30'),(6,5226000,935,9000,3900014,'Signs & Markings','03-30'),(7,5223000,935,9000,3900007,'Pipe','03-30');
/*!40000 ALTER TABLE `pprta_account_codes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,2,3,'2016-11-08','2016-11-15','LP09K87HY','This is the first entry.','69.36',1),(2,6,4,'2016-11-22','2016-11-16','ALB892JSA','There is no way to clear the \"date paid\" on the transaction adjustment screen. This would be necessary if a user would want to change a transaction to pending.','950.52',2),(4,7,6,'2017-01-09','2016-11-23','AHK13GDS','This is an updated transaction','23',2),(5,4,6,'2016-11-16','2016-11-15','KJHSAK','This is a pending transaction.At least, it was','12.43',1),(6,16,3,'2016-11-15','2016-11-17','JS-12-SJ','There needs to a character counter on the description field since te database has a character limit.','12.42',1),(7,4,4,'2016-11-15',NULL,'78-098','Pending!!','89.09',2),(9,20,3,'2016-11-09','2016-11-25','LP09K87HY','This is to test invoice coversheets.','63.2',0),(24,18,4,'2016-11-14','2016-11-20','JMU-POL-90','This is a test of account codes','96.3',1),(27,22,7,'2016-11-06','2016-11-27','SFSAFS','Testing Unassigned City Accounts.','63.21',1),(28,19,11,'2016-11-06','2016-11-26','ASFSAF6','Testing Multiple Accounts','971.2',2),(42,44,4,'2016-11-14','2016-11-20','HNH-123-LO','Testing City Accounts... Again','63.21',1),(43,44,4,'2016-11-08','2016-11-16','13-PO-LO','This is testing city account adjustments','63.2',2),(44,23,7,'2016-11-16','2016-11-05','63-854','What a beautiful transaction.','90.09',0),(45,18,4,'2016-11-08','2016-11-24','324','Testing new conversions','63.25',0),(46,20,4,'2016-11-08','2016-11-29','LOK-98','This is a test. I bet this gets deleted. So far it has not','63.2',3),(47,20,6,'2016-11-14','2016-12-07','VNSH-876-SA','When in doubt, make an account... transaction','63',1),(48,19,4,'2016-11-23','2016-11-17','656565','I refactored stuff','96.32',1),(49,11,4,'2016-11-12','2016-12-22','90-876','Regression test.','78.25',2),(50,17,11,'2016-11-07','2016-11-25','JDHE-32','This is a test for the pending functionality. It\'s been a while.','63.2',2);
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
INSERT INTO `user` VALUES (14,'user@email.com','User','McUserson','pbkdf2:sha1:1000$pUDdp4b7$0f61e5f0477095e0659d1553668ea3f8341e045b','QH9OQ2X63DZZXL6ZSMVA5QNYWY44WC1B','2016-11-24 09:13:55',0),(15,'jladley@springsgov.com','Jack','Ladley','pbkdf2:sha1:1000$ncJHphe3$823a65f490143d7190f6860f41eb0f69d5d80df4','PT2JO0CTRGG50YI60ZCP19TFZL2QEW8W','2016-11-24 00:01:14',0);
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
-- Temporary table structure for view `v_accounts`
--

DROP TABLE IF EXISTS `v_accounts`;
/*!50001 DROP VIEW IF EXISTS `v_accounts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_accounts` (
  `account_id` tinyint NOT NULL,
  `pprta_account_code_id` tinyint NOT NULL,
  `account_no` tinyint NOT NULL,
  `sub_no` tinyint NOT NULL,
  `shred_no` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `annual_budget` tinyint NOT NULL,
  `fund_no` tinyint NOT NULL,
  `dept_no` tinyint NOT NULL,
  `project_no` tinyint NOT NULL,
  `project_description` tinyint NOT NULL,
  `account_prefix` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_city_account_assignments`
--

DROP TABLE IF EXISTS `v_city_account_assignments`;
/*!50001 DROP VIEW IF EXISTS `v_city_account_assignments`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_city_account_assignments` (
  `city_account_assignment_id` tinyint NOT NULL,
  `transaction_id` tinyint NOT NULL,
  `city_account_id` tinyint NOT NULL,
  `city_account_no` tinyint NOT NULL,
  `amount` tinyint NOT NULL
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
  `pprta_account_code_id` tinyint NOT NULL,
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
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `vendor_id_UNIQUE` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_images`
--

LOCK TABLES `vendor_images` WRITE;
/*!40000 ALTER TABLE `vendor_images` DISABLE KEYS */;
INSERT INTO `vendor_images` VALUES (2,3,'0','3','png'),(3,4,'0','4','png'),(4,6,'0','6','jpeg'),(5,7,'0','7','jpeg'),(9,11,'0','11','jpeg');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (3,'Grainger','TS1534','2015-06-11','2018-03-23','Tom McGrainger','719-555-3924','1234 Fake Street','Colorado Springs','Colorado','80918','tom@grainger.com','www.grainger.com'),(4,'Concrete Co','PL435A','2015-04-06','2017-12-02','Mr Concrete Jr','719-555-63','987 Not Real Road','Peyton','Colorado','80810','mr@concrete.ord','www.google.com/'),(6,'AAA Building Supply','DS09098','2015-04-12','2018-06-02','Lord Vader','702-963-8745','321 No Moon Lane','Seattle','Washington','85634','vader@deathstar.net','www.starwars.com'),(7,'Iron Wood','PL-9635','2016-02-04','2017-06-16','Woodchuck Ben','719-963-4563','1236 North Street','Colorado Springs','Colorado','80918','benchucks@chuckers.org','www.google.com'),(11,'Logo Inc','LOG987','2016-07-05','2017-04-15','Mr. Logo','719-636-9878','1234 Logo Lane','Logoville','Colorado','80918','logo@logo.com','www.google.com');
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
/*!50001 VIEW `v_account_transfers` AS select `account_transfers`.`transfer_id` AS `transfer_id`,`account_transfers`.`from_account_id` AS `from_account_id`,`from_account`.`account_no` AS `from_account_no`,`from_account`.`sub_no` AS `from_sub_no`,`from_account`.`shred_no` AS `from_shred_no`,`account_transfers`.`to_account_id` AS `to_account_id`,`to_account`.`account_no` AS `to_account_no`,`to_account`.`sub_no` AS `to_sub_no`,`to_account`.`shred_no` AS `to_shred_no`,`account_transfers`.`amount` AS `amount`,`account_transfers`.`description` AS `description`,`account_transfers`.`transfer_date` AS `transfer_date` from ((`account_transfers` join `v_accounts` `from_account` on((`from_account`.`account_id` = `account_transfers`.`from_account_id`))) join `v_accounts` `to_account` on((`to_account`.`account_id` = `account_transfers`.`to_account_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_accounts`
--

/*!50001 DROP TABLE IF EXISTS `v_accounts`*/;
/*!50001 DROP VIEW IF EXISTS `v_accounts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_accounts` AS select `accounts`.`account_id` AS `account_id`,`accounts`.`pprta_account_code_id` AS `pprta_account_code_id`,`pprta`.`account_no` AS `account_no`,`accounts`.`sub_no` AS `sub_no`,`accounts`.`shred_no` AS `shred_no`,`accounts`.`description` AS `description`,`accounts`.`annual_budget` AS `annual_budget`,`pprta`.`fund_no` AS `fund_no`,`pprta`.`dept_no` AS `dept_no`,`pprta`.`project_no` AS `project_no`,`pprta`.`project_description` AS `project_description`,`pprta`.`account_prefix` AS `account_prefix` from (`accounts` join `pprta_account_codes` `pprta` on((`accounts`.`pprta_account_code_id` = `pprta`.`pprta_account_code_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_city_account_assignments`
--

/*!50001 DROP TABLE IF EXISTS `v_city_account_assignments`*/;
/*!50001 DROP VIEW IF EXISTS `v_city_account_assignments`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_city_account_assignments` AS select `assignment`.`city_account_assignment_id` AS `city_account_assignment_id`,`assignment`.`transaction_id` AS `transaction_id`,`assignment`.`city_account_id` AS `city_account_id`,`city_accounts`.`account_no` AS `city_account_no`,`assignment`.`amount` AS `amount` from (`city_account_assignments` `assignment` join `city_accounts` on((`city_accounts`.`city_account_id` = `assignment`.`city_account_id`))) */;
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
/*!50001 VIEW `v_transactions` AS select `t`.`transaction_id` AS `transaction_id`,`t`.`account_id` AS `account_id`,`v_accounts`.`pprta_account_code_id` AS `pprta_account_code_id`,`v_accounts`.`account_no` AS `account_no`,`v_accounts`.`sub_no` AS `sub_no`,`v_accounts`.`shred_no` AS `shred_no`,`t`.`vendor_id` AS `vendor_id`,`vendors`.`name` AS `vendor_name`,`t`.`invoice_date` AS `invoice_date`,`t`.`date_paid` AS `date_paid`,`t`.`invoice_no` AS `invoice_no`,`t`.`description` AS `description`,`t`.`expense` AS `expense`,`t`.`transaction_type_id` AS `transaction_type_id`,`transaction_types`.`transaction_type` AS `transaction_type` from (((`transactions` `t` join `vendors` on((`t`.`vendor_id` = `vendors`.`vendor_id`))) join `transaction_types` on((`transaction_types`.`transaction_type_id` = `t`.`transaction_type_id`))) join `v_accounts` on((`v_accounts`.`account_id` = `t`.`account_id`))) */;
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

-- Dump completed on 2016-11-24  1:22:24
