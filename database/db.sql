CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

CREATE TABLE links (
    id INT(11) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    fecha_nac VARCHAR(100) NOT NULL,
    foto LONGBLOB NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links ADD PRIMARY KEY (id);

ALTER TABLE links MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

DESCRIBE links;