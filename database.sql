--
-- Base de datos: `kaggle`
--

DROP DATABASE IF EXISTS kaggle;
CREATE DATABASE kaggle;
USE kaggle;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activation_users`
--

CREATE TABLE `activation_users` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `uuid_activation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `uuid`, `isActive`) VALUES
(1, 'test@test.com', '$2b$10$ArvyFGxOAcFlkcjy/oXyz.Qbec4LTt5oouM9KNCLoqO/bfFLZ2jE6', NULL, 1);

--
-- Indices de la tabla `activation_users`
--
ALTER TABLE `activation_users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de la tabla `activation_users`
--
ALTER TABLE `activation_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;