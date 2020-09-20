-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 20, 2020 at 10:32 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pictures`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
(1, 'Pepole', 15),
(2, 'animals', 11),
(5, 'foto of mee', 20),
(6, 'foto of mee', 20),
(7, 'foto of mee', 20);

-- --------------------------------------------------------

--
-- Table structure for table `albums_photos`
--

CREATE TABLE `albums_photos` (
  `id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albums_photos`
--

INSERT INTO `albums_photos` (`id`, `album_id`, `photo_id`) VALUES
(48, 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(1, 'Uganda Transport Bananer', 'https://cdn.pixabay.com/photo/2020/04/05/10/50/uganda-5005579_960_720.jpg', NULL, 15),
(2, 'test', 'kjashdkjsahdkajhdshkaj', 'jfhsjfsjlh', 16),
(3, 'test2', 'test2', 'test2', 20),
(55, 'Tiger', 'https://cdn.pixabay.com/photo/2017/05/17/12/42/tiger-2320819_960_720.jpg', 'tiger', 20),
(56, 'foto of mee', 'https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_960_720.png', 'no comments!', 20),
(57, 'foto of mee', 'https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_960_720.png', 'no comments!', 20),
(58, 'foto of mee', 'https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_960_720.png', 'no comments!', 20),
(59, 'foto of mee', 'https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_960_720.png', 'no comments!', 20);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(18, 'test2@test.se', '$2b$10$yMr7Q0qtlO4TCnuykhrYeOAr2V.2U4Btg3PPbjQKDY6AoD7tmOioe', 'test', 'test'),
(19, 'test3@test.se', '$2b$10$yxT7TEp.24b1drohqLpRhOpUOsDsCaicYypKQiBlpN9TXEsKL37OK', 'test', 'test'),
(20, 'test4@test.se', '$2b$10$EZLCzAt6bT9LM/cMvdpEhea4n94QesyM9tj0tsE8eQHWS96vlCjRu', 'test', 'test'),
(21, 'jn@badcameraphotography.com', '$2b$10$bpoIpebXZB9ScFqPOiIBdOt.A5wfuEHhcn7bphBJ7ikev1mdgGqbS', 'Johan', 'Nordström');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `albums_photos`
--
ALTER TABLE `albums_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `albums_photos`
--
ALTER TABLE `albums_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
