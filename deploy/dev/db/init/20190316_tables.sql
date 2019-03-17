USE hoopra_dev;

-----------------
-- users table --
-----------------
CREATE TABLE users (
  `id` bigserial NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);


