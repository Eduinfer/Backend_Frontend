CREATE DATABASE IF NOT EXISTS salespot;
USE salespot;

CREATE TABLE tipo_documento
(
  tdoc VARCHAR(255) NOT NULL,
  desc_tdoc VARCHAR(255) NOT NULL,
  PRIMARY KEY (tdoc)
);

CREATE TABLE roles
(
  id_rol INT AUTO_INCREMENT NOT NULL,
  desc_rol VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_rol)
);

CREATE TABLE tipo_producto (
  id_tipo_prod INT NOT NULL AUTO_INCREMENT,
  tipo_prod VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_tipo_prod)
);

CREATE TABLE producto (
  id_prod INT NOT NULL AUTO_INCREMENT,
  desc_prod VARCHAR(255) NOT NULL,
  tipo_prod INT NOT NULL,
  valor_prod DECIMAL(10, 0) NOT NULL,
  estado_prod BOOLEAN NOT NULL,
  PRIMARY KEY (id_prod),
  FOREIGN KEY (tipo_prod) REFERENCES tipo_producto(id_tipo_prod)
);

CREATE TABLE factura (
    n_factura INT NOT NULL AUTO_INCREMENT,
    fecha_factura DATE,
    subtotal DECIMAL(10, 2),
    iva DECIMAL(10, 2),
    total_factura DECIMAL(10, 2),
    PRIMARY KEY (n_factura)
);

CREATE TABLE factura_producto (
    n_factura INT,
    id_prod INT,
    cant_prod INT,
    valor_prod_cant DECIMAL(10, 2),
    UNIQUE KEY unique_factura_producto (n_factura, id_prod),
    FOREIGN KEY (n_factura) REFERENCES factura(n_factura),
    FOREIGN KEY (id_prod) REFERENCES producto(id_prod)
);


