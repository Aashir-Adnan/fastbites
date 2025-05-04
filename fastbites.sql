-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2025 at 07:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fastbites`
--

-- --------------------------------------------------------

--
-- Table structure for table `cuisines`
--

CREATE TABLE `cuisines` (
  `id` int(11) NOT NULL,
  `cuisine_name` varchar(100) NOT NULL,
  `attachment_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cuisines`
--

INSERT INTO `cuisines` (`id`, `cuisine_name`, `attachment_url`) VALUES
(1, 'Burgers', '/burger.jpeg'),
(2, 'Wings', '/wings.jpeg'),
(3, 'Drinks', '/drinks.jpeg'),
(4, 'Rice', '/rice.jpeg'),
(5, 'Pizza', '/pizza.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `dininghall`
--

CREATE TABLE `dininghall` (
  `id` int(11) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `isAvailable` tinyint(1) DEFAULT 1,
  `rating` decimal(2,1) DEFAULT NULL,
  `rating_count` int(11) NOT NULL DEFAULT 0,
  `attachment_url` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dininghall`
--

INSERT INTO `dininghall` (`id`, `category`, `name`, `price`, `isAvailable`, `rating`, `rating_count`, `attachment_url`) VALUES
(1, 'Fast Food', 'Original Chicken', 500.00, 1, 3.9, 6, NULL),
(2, 'Fast Food', 'Spicy Chicken', 550.00, 1, 4.6, 1, NULL),
(3, 'Fast Food', 'Zinger Burger', 600.00, 1, 4.7, 1, NULL),
(4, 'Fast Food', 'Popcorn Chicken', 450.00, 1, 4.4, 1, NULL),
(5, 'Fast Food', 'Twister Wrap', 520.00, 1, 4.3, 1, NULL),
(6, 'Desi Food', 'Original Chicken', 500.00, 1, 4.5, 1, NULL),
(7, 'Desi Food', 'Spicy Chicken', 550.00, 1, 4.6, 1, NULL),
(8, 'Desi Food', 'Zinger Burger', 600.00, 1, 4.7, 1, NULL),
(9, 'Desi Food', 'Popcorn Chicken', 450.00, 1, 4.4, 1, NULL),
(10, 'Desi Food', 'Twister Wrap', 520.00, 1, 4.3, 1, NULL),
(11, 'Drinks', 'Americano', 300.00, 1, 4.5, 1, NULL),
(12, 'Drinks', 'Cappuccino', 300.00, 1, 4.6, 1, NULL),
(13, 'Drinks', 'Double Espresso', 350.00, 1, 4.4, 1, NULL),
(14, 'Drinks', 'Latte', 420.00, 1, 4.7, 1, NULL),
(15, 'Drinks', 'Macchiato', 450.00, 1, 4.5, 1, NULL),
(16, 'Chinese Food', 'Chicken Chowmein', 650.00, 1, 4.6, 1, NULL),
(17, 'Chinese Food', 'Fried Rice', 500.00, 1, 4.4, 1, NULL),
(18, 'Chinese Food', 'Manchurian', 700.00, 1, 4.7, 1, NULL),
(19, 'Chinese Food', 'Spring Rolls', 400.00, 1, 4.5, 1, NULL),
(20, 'Chinese Food', 'Sweet & Sour Soup', 350.00, 1, 4.3, 1, NULL),
(21, 'Italian Food', 'Margherita Pizza', 800.00, 1, 4.8, 1, NULL),
(22, 'Italian Food', 'Pasta Alfredo', 750.00, 1, 4.6, 1, NULL),
(23, 'Italian Food', 'Lasagna', 900.00, 1, 4.7, 1, NULL),
(24, 'Italian Food', 'Garlic Bread', 300.00, 1, 4.4, 1, NULL),
(25, 'Italian Food', 'Tiramisu', 500.00, 1, 4.9, 1, NULL),
(26, 'Desserts', 'Ice Cream', 250.00, 1, 4.5, 1, NULL),
(27, 'Desserts', 'Chocolate Cake', 400.00, 1, 4.7, 1, NULL),
(28, 'Desserts', 'Apple Pie', 350.00, 1, 4.6, 1, NULL),
(29, 'Desserts', 'Brownie', 300.00, 1, 4.8, 1, NULL),
(30, 'Desserts', 'Cheesecake', 450.00, 1, 4.9, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `discount_id` int(11) NOT NULL,
  `discount_name` varchar(100) NOT NULL,
  `discount_description` text DEFAULT NULL,
  `discount_day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') DEFAULT NULL,
  `discount_time_start` time NOT NULL DEFAULT '00:00:00',
  `discount_time_end` time NOT NULL DEFAULT '23:00:00',
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`discount_id`, `discount_name`, `discount_description`, `discount_day`, `discount_time_start`, `discount_time_end`, `restaurant_id`) VALUES
(1, 'SDT', 'Slice Day Thursday!\r\nGet A 20 inch Slice For 479 Or A 40 Inch Slice For 1189!!', 'Thursday', '00:00:00', '23:00:00', 17),
(2, 'Broadway Deal 1', 'Test description for discount 1', NULL, '00:00:00', '23:00:00', 17),
(3, 'Broadway Deal 2', 'Test description for discount 2', 'Sunday', '21:00:00', '22:00:00', 17),
(4, 'Broadway Deal 3', 'Test description for discount 3', NULL, '21:00:00', '22:00:00', 17);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` float NOT NULL,
  `rating_count` int(11) NOT NULL DEFAULT 1,
  `attachment_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `restaurant_id`, `name`, `price`, `rating`, `rating_count`, `attachment_url`) VALUES
(1, 1, 'Burger', 599.00, 3, 2, '/placeholder.jpeg'),
(2, 1, 'Fries', 299.00, 4, 1, '/placeholder.jpeg'),
(3, 1, 'Soda', 150.00, 4.2, 1, '/placeholder.jpeg'),
(4, 2, 'Pizza', 899.00, 4.7, 1, '/placeholder.jpeg'),
(5, 2, 'Garlic Bread', 399.00, 4.5, 1, '/placeholder.jpeg'),
(6, 2, 'Pasta', 750.00, 4.8, 1, '/placeholder.jpeg'),
(7, 3, 'Biryani', 999.00, 4.6, 1, '/placeholder.jpeg'),
(8, 3, 'Butter Chicken', 1050.00, 4.7, 1, '/placeholder.jpeg'),
(9, 3, 'Naan', 250.00, 4.4, 1, '/placeholder.jpeg'),
(10, 4, 'Tacos', 399.00, 4.8, 1, '/placeholder.jpeg'),
(11, 4, 'Burrito', 650.00, 4.6, 1, '/placeholder.jpeg'),
(12, 4, 'Guacamole', 250.00, 4.3, 1, '/placeholder.jpeg'),
(13, 5, 'Sushi', 1299.00, 4.9, 1, '/placeholder.jpeg'),
(14, 5, 'Tempura', 899.00, 4.7, 1, '/placeholder.jpeg'),
(15, 5, 'Miso Soup', 450.00, 4.4, 1, '/placeholder.jpeg'),
(16, 6, 'Steak', 1599.00, 4.9, 1, '/placeholder.jpeg'),
(17, 6, 'Mashed Potatoes', 400.00, 4.5, 1, '/placeholder.jpeg'),
(18, 6, 'Grilled Vegetables', 550.00, 4.3, 1, '/placeholder.jpeg'),
(19, 7, 'Falafel', 500.00, 4.5, 1, '/placeholder.jpeg'),
(20, 7, 'Hummus', 350.00, 4.6, 1, '/placeholder.jpeg'),
(21, 7, 'Pita Bread', 250.00, 4.2, 1, '/placeholder.jpeg'),
(22, 8, 'Hot Dog', 400.00, 4.3, 1, '/placeholder.jpeg'),
(23, 8, 'Onion Rings', 350.00, 4.4, 1, '/placeholder.jpeg'),
(24, 8, 'Coleslaw', 200.00, 4, 1, '/placeholder.jpeg'),
(25, 9, 'Salad', 699.00, 4.6, 1, '/placeholder.jpeg'),
(26, 9, 'Soup', 450.00, 4.5, 1, '/placeholder.jpeg'),
(27, 9, 'Breadsticks', 300.00, 4.2, 1, '/placeholder.jpeg'),
(28, 10, 'Chicken Wings', 750.00, 4.8, 1, '/placeholder.jpeg'),
(29, 10, 'French Fries', 299.00, 4, 1, '/placeholder.jpeg'),
(30, 10, 'Mozzarella Sticks', 500.00, 4.5, 1, '/placeholder.jpeg'),
(31, 11, 'Ramen', 900.00, 4.7, 1, '/placeholder.jpeg'),
(32, 11, 'Gyoza', 600.00, 4.4, 1, '/placeholder.jpeg'),
(33, 11, 'Edamame', 300.00, 4.3, 1, '/placeholder.jpeg'),
(34, 12, 'Grilled Cheese', 450.00, 4.4, 1, '/placeholder.jpeg'),
(35, 12, 'Tomato Soup', 399.00, 4.5, 1, '/placeholder.jpeg'),
(36, 12, 'Mac and Cheese', 550.00, 4.6, 1, '/placeholder.jpeg'),
(37, 13, 'Pancakes', 500.00, 4.7, 1, '/placeholder.jpeg'),
(38, 13, 'Bacon', 350.00, 4.4, 1, '/placeholder.jpeg'),
(39, 13, 'Eggs', 250.00, 4.6, 1, '/placeholder.jpeg'),
(40, 14, 'Ice Cream', 300.00, 4.8, 1, '/placeholder.jpeg'),
(41, 14, 'Waffle', 550.00, 4.7, 1, '/placeholder.jpeg'),
(42, 14, 'Donut', 200.00, 3, 2, '/placeholder.jpeg'),
(43, 15, 'Curry', 1100.00, 4.9, 1, '/placeholder.jpeg'),
(44, 15, 'Rice', 200.00, 4.2, 1, '/placeholder.jpeg'),
(45, 15, 'Papadam', 150.00, 4.4, 1, '/placeholder.jpeg'),
(46, 16, 'Fish and Chips', 950.00, 4.6, 1, '/placeholder.jpeg'),
(47, 16, 'Mushy Peas', 250.00, 4.3, 1, '/placeholder.jpeg'),
(48, 16, 'Gravy', 150.00, 4.1, 1, '/placeholder.jpeg'),
(49, 17, 'Veggie Burger', 600.00, 4.5, 1, '/placeholder.jpeg'),
(50, 17, 'Sweet Potato Fries', 300.00, 4.4, 1, '/placeholder.jpeg'),
(51, 17, 'Avocado Toast', 550.00, 4.6, 1, '/placeholder.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `rating_count` int(11) NOT NULL DEFAULT 1,
  `priceRange` enum('Budget','Mid-Range','Expensive') DEFAULT NULL,
  `cuisine_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `rating`, `rating_count`, `priceRange`, `cuisine_id`) VALUES
(1, 'Burger Palace', 4.5, 1, 'Mid-Range', 1),
(2, 'Grill House', 4.2, 1, 'Budget', 1),
(3, 'Burger King', 3.8, 1, 'Budget', 1),
(4, 'Gourmet Burgers', 4.7, 1, 'Mid-Range', 1),
(5, 'Wing Stop', 4.6, 1, 'Mid-Range', 2),
(6, 'Spicy Bites', 4.3, 1, 'Expensive', 2),
(7, 'Wing World', 4.0, 1, 'Budget', 2),
(8, 'Buffalo Wild Wings', 4.4, 1, 'Mid-Range', 2),
(9, 'Boba Bliss', 4.8, 1, 'Mid-Range', 3),
(10, 'Juice Hub', 4.1, 1, 'Budget', 3),
(11, 'Smoothie King', 4.5, 1, 'Mid-Range', 3),
(12, 'The Drink Lab', 4.9, 1, 'Expensive', 3),
(13, 'Rice Bowl Express', 4.4, 1, 'Mid-Range', 4),
(14, 'Eastern Delight', 4.5, 1, 'Expensive', 4),
(15, 'Bowl of Rice', 3.9, 1, 'Budget', 4),
(16, 'Rice Feast', 4.2, 1, 'Mid-Range', 4),
(17, 'Broadway', 5.0, 1, 'Mid-Range', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `roll_no` varchar(8) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `roll_no`, `email`, `password`, `department`) VALUES
(1, 'Aashir Adnan', 'l226753', 'l226753@lhr.nu.edu.pk', '123456', 'CS'),
(6, 'Aashir Adnan', 'l226754', 'l226754@lhr.nu.edu.pk', '123456', 'CS');

-- --------------------------------------------------------

--
-- Table structure for table `user_discounts`
--

CREATE TABLE `user_discounts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_discounts`
--

INSERT INTO `user_discounts` (`id`, `user_id`, `restaurant_id`) VALUES
(5, 1, 17),
(9, 3, 17);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cuisines`
--
ALTER TABLE `cuisines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dininghall`
--
ALTER TABLE `dininghall`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`discount_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ibfk1_items` (`restaurant_id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ibfk1_restaurants` (`cuisine_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_discounts`
--
ALTER TABLE `user_discounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`restaurant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cuisines`
--
ALTER TABLE `cuisines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dininghall`
--
ALTER TABLE `dininghall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_discounts`
--
ALTER TABLE `user_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discounts`
--
ALTER TABLE `discounts`
  ADD CONSTRAINT `discounts_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `ibfk1_items` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `ibfk1_restaurants` FOREIGN KEY (`cuisine_id`) REFERENCES `cuisines` (`id`);

--
-- Constraints for table `user_discounts`
--
ALTER TABLE `user_discounts`
  ADD CONSTRAINT `user_discounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_discounts_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
