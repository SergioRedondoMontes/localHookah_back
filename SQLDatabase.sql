-- --------------------------------------------------------
-- Base de datos: `kaggle`
-- --------------------------------------------------------
DROP DATABASE IF EXISTS reservas;
CREATE DATABASE reservas;
USE reservas;
-- --------------------------------------------------------
-- CREATE TABLES GESTION USUARIOS
-- --------------------------------------------------------
CREATE TABLE `users`
(
    `id`           int(11)      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email`        varchar(255) NOT NULL UNIQUE,
    `password`     varchar(255) NOT NULL,
    `isActive`     tinyint(1)   NOT NULL DEFAULT '0',
    `dateCreation` TIMESTAMP             default CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
CREATE TABLE `activation_users`
(
    `id`              int(11)      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idUser`          int(11)      NOT NULL UNIQUE,
    `uuid_activation` varchar(255) NOT NULL,
    `dateCreation`    TIMESTAMP    NOT NULL default CURRENT_TIMESTAMP,
    FOREIGN KEY (idUser) REFERENCES users (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
CREATE TABLE `renew_password_users`
(
    `id`                  int(11)      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idUser`              int(11)      NOT NULL UNIQUE,
    `uuid_renew_password` varchar(255) NOT NULL,
    `dateCreation`        TIMESTAMP default CURRENT_TIMESTAMP,
    FOREIGN KEY (idUser) REFERENCES users (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
CREATE TABLE `roles`
(
    `id`   int(11)      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL UNIQUE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
CREATE TABLE `roles_users`
(
    `idUser` int(11) NOT NULL,
    `idRole` int(11) NOT NULL,
    PRIMARY KEY (idUser, idRole),
    FOREIGN KEY (idUser) REFERENCES users (id),
    FOREIGN KEY (idRole) REFERENCES roles (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
-- INSERTS
-- --------------------------------------------------------
INSERT INTO `users` (`id`, `email`, `password`, `isActive`)
VALUES (1, 'test@test.com', '$2b$10$ArvyFGxOAcFlkcjy/oXyz.Qbec4LTt5oouM9KNCLoqO/bfFLZ2jE6', 1);
INSERT INTO `roles`(`id`, `name`)
VALUES (1, 'admin'),
       (2, 'employee');
INSERT INTO `roles_users`(`idUser`, `idRole`)
VALUES (1, '1');
-- --------------------------------------------------------
-- CREATE TABLES GESTION
-- --------------------------------------------------------
CREATE TABLE `zones`
(
    `id`   int(11)      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
CREATE TABLE `bookings`
(
    `id`       int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idZone`   int(11) NOT NULL,
    `people`   int(11) NOT NULL,
    `title` TEXT NOT NULL,
    `comments` TEXT,
    `date`     TIMESTAMP     default CURRENT_TIMESTAMP,
    FOREIGN KEY (idZone) REFERENCES zones (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
-- INSERTS
-- --------------------------------------------------------
INSERT INTO `zones`(`id`, `name`)
VALUES (1, 'interior'),
       (2, 'exterior');
INSERT INTO `bookings` (`id`, `idZone`, `people`,`title`, `comments`, `date`)
VALUES (1, 1, 4,'tit', '',  '2020-05-20 20:00:00');
