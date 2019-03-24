-- USE hoopra_dev;

-----------------
-- users table --
-----------------
CREATE TABLE IF NOT EXISTS users (
  id bigserial NOT NULL,
  username varchar(100) NOT NULL,
  email varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  created_at timestamp,
  deleted_at timestamp,
  updated_at timestamp,
  PRIMARY KEY (id)
);