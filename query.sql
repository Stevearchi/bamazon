-- this  code is to be run to create/overwrite the data base with 10 initial entries

DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT ,  -- unique item ID
product_name VARCHAR(200), -- Name of product
department_name VARCHAR(90), -- Name of department
price DECIMAL(12,2), -- cost to customer
stock_quantity INT, -- how much of the product is available in stores
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('6pck white socks', 'Apparal', 9.99, 101), 
('3pck white socks', 'Apparal', 6.99, 63), 
('6pck fat tire', 'Grocery', 7.99, 244343),
('6pck coors light', 'Grocery', 4.99, 2),
('dancing shoes', 'Apparal', 79.99, 78),
('1989 air jordans', 'Apparal', 399.98, 1),
('mtg black lotus (alpha) bgs 9.5', 'Collectables', 349999.00, 1),
('1952 micky mantle rookie topps bgs 5.5', 'Collectables', 139512.00, 1),
('86-87 michael jordan rookie fleer bgs 9.0', 'Collectables', 4700.00, 2),
('1909 t206 honus wagner psa 10.0', 'Collectables', 100000000.00, 1);

SELECT * FROM products;