-- Adminer 5.3.0 MariaDB 10.11.11-MariaDB-0ubuntu0.24.04.2 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(20) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_des` varchar(255) NOT NULL,
  `product_price` int(50) NOT NULL DEFAULT 0,
  `product_discount` int(10) NOT NULL DEFAULT 0,
  `product_stock` int(10) NOT NULL DEFAULT 1,
  `product_img` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `product` (`id`, `product_id`, `product_name`, `product_des`, `product_price`, `product_discount`, `product_stock`, `product_img`, `category`) VALUES
(2,	'PS-LaJ',	'panjul t-shirt',	'baju panjul',	70000,	0,	1,	'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',	'pakaian');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin` varchar(10) NOT NULL DEFAULT '0',
  `password` varchar(50) NOT NULL,
  `token` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `user` (`id`, `uid`, `username`, `name`, `admin`, `password`, `token`) VALUES
(2,	'',	'user1',	'user1',	'0',	'user123',	'user123');

-- 2025-05-20 11:34:01 UTC