DELIMITER $$
CREATE PROCEDURE AdjustProductStock(
    IN id INT(10),
    IN stock INT(10)
)
BEGIN
    UPDATE products
    SET Products.stock = Products.stock - stock
    WHERE Products.id = id;
END$$
DELIMITER;