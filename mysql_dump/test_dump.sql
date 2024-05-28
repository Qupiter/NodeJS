-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.36 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table node.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb3_general_ci',
	`authority` TINYINT(3) NOT NULL DEFAULT '0',
	`deleted` TINYINT(3) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table node.users: ~2 rows (approximately)
REPLACE INTO `users` (`id`, `email`, `password`, `authority`, `deleted`) VALUES
	(1, 'dipper@gmail.com', '$2a$10$mxehy/b1WBW.tjXFiu5m6.DY4Pbck9rPaVFS7bQk1dmSF9w7GHdva', 2, 0),
	(2, 'zubber@gmail.com', '$2a$10$OEZ5saGe4ihnn849ayP9sOz00lVXn6ZGUoznH0Vk6v/Jmtqo/GyL6', 3, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
