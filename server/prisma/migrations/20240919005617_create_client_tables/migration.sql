-- CreateTable
CREATE TABLE `clients` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `code` VARCHAR(15) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `document` VARCHAR(20) NOT NULL,
    `zipcode` INTEGER NOT NULL,
    `address` VARCHAR(120) NOT NULL,
    `number` VARCHAR(20) NOT NULL,
    `district` VARCHAR(50) NOT NULL,
    `city` VARCHAR(60) NOT NULL,
    `uf` VARCHAR(2) NOT NULL,
    `complement` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `credit_limit` FLOAT NOT NULL,
    `valid` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
