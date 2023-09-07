CREATE DATABASE IF NOT EXISTS PROYECTO;


USE PROYECTO;

CREATE TABLE tipo_documento (
    tipo_documento_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_tipo_documento VARCHAR(50) NOT NULL
);

INSERT INTO tipo_documento (nombre_tipo_documento) VALUES
    ('Cédula de Ciudadanía'),
    ('Tarjeta de Identidad'),
    ('Pasaporte'),
    ('Cédula de Extranjería');

CREATE TABLE empleado (
    empleado_id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento_id INT,
    numero_documento VARCHAR(20) UNIQUE NOT NULL,
    nombre1 VARCHAR(50) NOT NULL,
    nombre2 VARCHAR(50),
    apellido1 VARCHAR(50) NOT NULL,
    apellido2 VARCHAR(50),
    telefono VARCHAR(15),
    direccion VARCHAR(100),
    contrasena VARCHAR(100) NOT NULL,
    CONSTRAINT fk_empleado_tipo_documento FOREIGN KEY (tipo_documento_id) REFERENCES tipo_documento(tipo_documento_id)
);

CREATE TABLE administrador (
    administrador_id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento_id INT,
    numero_documento VARCHAR(20) UNIQUE NOT NULL,
    nombre1 VARCHAR(50) NOT NULL,
    nombre2 VARCHAR(50),
    apellido1 VARCHAR(50) NOT NULL,
    apellido2 VARCHAR(50),
    telefono VARCHAR(15),
    direccion VARCHAR(100),
    contrasena VARCHAR(100) NOT NULL,
    CONSTRAINT fk_administrador_tipo_documento FOREIGN KEY (tipo_documento_id) REFERENCES tipo_documento(tipo_documento_id)
);

-- Insertar un administrador en la tabla "administrador"
INSERT INTO administrador (tipo_documento_id, numero_documento, nombre1, nombre2, apellido1, apellido2, telefono, direccion, contrasena)
VALUES (1, '123456789', 'NombreAdmin1', 'NombreAdmin2', 'ApellidoAdmin1', 'ApellidoAdmin2', '1234567890', 'DirecciónAdmin', 'ContraseñaAdmin');

-- Insertar un empleado en la tabla "empleado"
INSERT INTO empleado (tipo_documento_id, numero_documento, nombre1, nombre2, apellido1, apellido2, telefono, direccion, contrasena)
VALUES (2, '987654321', 'NombreEmpleado1', 'NombreEmpleado2', 'ApellidoEmpleado1', 'ApellidoEmpleado2', '9876543210', 'DirecciónEmpleado', 'ContraseñaEmpleado');

