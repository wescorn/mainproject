DELIMITER $$
CREATE PROCEDURE OrderStatusChange(
    IN id INT(10),
    IN status VARCHAR(255)
)
BEGIN
    UPDATE Orders
    SET Orders.`Status` = status
    WHERE Orders.id = id;
END$$
DELIMITER ;OrderStatusChange