-- --------------------------------------------------------
-- Värd:                         127.0.0.1
-- Serverversion:                8.0.18 - MySQL Community Server - GPL
-- Server-OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumpar struktur för tabell pictures.albums
DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumpar data för tabell pictures.albums: ~0 rows (ungefär)
DELETE FROM `albums`;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
	(1, 'Pepole', 15),
	(2, 'animals', 11);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;

-- Dumpar struktur för tabell pictures.albums_photos
DROP TABLE IF EXISTS `albums_photos`;
CREATE TABLE IF NOT EXISTS `albums_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumpar data för tabell pictures.albums_photos: ~0 rows (ungefär)
DELETE FROM `albums_photos`;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;
INSERT INTO `albums_photos` (`id`, `album_id`, `photo_id`) VALUES
	(48, 2, 4);
/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;

-- Dumpar struktur för tabell pictures.photos
DROP TABLE IF EXISTS `photos`;
CREATE TABLE IF NOT EXISTS `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumpar data för tabell pictures.photos: ~1 rows (ungefär)
DELETE FROM `photos`;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
	(1, 'Uganda Transport Bananer', 'https://cdn.pixabay.com/photo/2020/04/05/10/50/uganda-5005579_960_720.jpg', NULL, 15),
	(2, 'test', 'kjashdkjsahdkajhdshkaj', 'jfhsjfsjlh', 9),
	(3, 'test2', 'test2', 'test2', 11),
	(4, 'Tiger', 'https://cdn.pixabay.com/photo/2017/05/17/12/42/tiger-2320819_960_720.jpg', 'tiger', 15);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;

-- Dumpar struktur för tabell pictures.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumpar data för tabell pictures.users: ~1 rows (ungefär)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
	(14, 'test@test.se', '$2b$10$DwCfoe9XbCXTYfCTPAymg.3sK5nds3c047qxa.LHMsroGq6DnSllC', 'test', 'test'),
	(15, 'jn@badcameraphotography.com', '$2b$10$N32JpMUYlNxltdaI5iO58.ErlaTnSDMMuWwjJJicX7pJ9IpFXOrJy', 'Johan', 'Nordström');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
heroku_bac2e3634b14d6bheroku_bac2e3634b14d6b