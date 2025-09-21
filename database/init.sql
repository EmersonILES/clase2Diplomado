-- Script para crear la base de datos y datos de ejemplo
-- Ejecutar en MySQL Workbench o línea de comandos

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS productos_db;

-- Usar la base de datos
USE productos_db;

-- La tabla se crea automáticamente con TypeORM, pero si quieres crearla manualmente:
/*
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    stock INT DEFAULT 0,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

-- Datos de ejemplo (opcional - puedes crear estos productos usando Postman)
/*
INSERT INTO productos (nombre, descripcion, precio, categoria, stock) VALUES
('iPhone 15', 'Smartphone Apple con pantalla de 6.1 pulgadas', 999.99, 'Electrónicos', 50),
('MacBook Pro 16', 'Laptop profesional con chip M3 Pro', 2499.99, 'Electrónicos', 25),
('AirPods Pro', 'Auriculares inalámbricos con cancelación de ruido', 249.99, 'Audio', 100),
('iPad Air', 'Tablet con pantalla Liquid Retina de 10.9 pulgadas', 599.99, 'Electrónicos', 30),
('Apple Watch Series 9', 'Smartwatch con GPS y sensores avanzados', 399.99, 'Wearables', 75);
*/
