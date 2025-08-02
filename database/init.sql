CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price NUMERIC
);

INSERT INTO product (name, price) VALUES
('Laptop', 1500),
('Mouse', 25),
('House', 500000),
('Car', 19000),
('Keyboard', 70);