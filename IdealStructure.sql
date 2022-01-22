-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Ideal_DB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Ideal_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Ideal_DB` DEFAULT CHARACTER SET latin1 ;
USE `Ideal_DB` ;

-- -----------------------------------------------------
-- Table `Ideal_DB`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role` TINYINT NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `roles_role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `roles_role_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  INDEX `fk_users_roles_idx` (`roles_role_id` ASC) ,
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`roles_role_id`)
    REFERENCES `Ideal_DB`.`roles` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(100) NOT NULL,
  `price` INT NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`subactivities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`subactivities` (
  `subactivity_id` INT NOT NULL AUTO_INCREMENT,
  `subactivity` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`subactivity_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`activities` (
  `activity_id` INT NOT NULL AUTO_INCREMENT,
  `activity` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`activity_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`techniques`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`techniques` (
  `technique_id` INT NOT NULL AUTO_INCREMENT,
  `technique` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`technique_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`lines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`lines` (
  `lines_id` INT NOT NULL AUTO_INCREMENT,
  `line` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`lines_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`materials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`materials` (
  `material_id` INT NOT NULL AUTO_INCREMENT,
  `material` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`material_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`products_has_subactivities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`products_has_subactivities` (
  `products_product_id` INT NOT NULL,
  `subactivities_subactivity_id` INT NOT NULL,
  PRIMARY KEY (`products_product_id`, `subactivities_subactivity_id`),
  INDEX `fk_products_has_subactivities_subactivities1_idx` (`subactivities_subactivity_id` ASC) ,
  INDEX `fk_products_has_subactivities_products1_idx` (`products_product_id` ASC) ,
  CONSTRAINT `fk_products_has_subactivities_products1`
    FOREIGN KEY (`products_product_id`)
    REFERENCES `Ideal_DB`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_subactivities_subactivities1`
    FOREIGN KEY (`subactivities_subactivity_id`)
    REFERENCES `Ideal_DB`.`subactivities` (`subactivity_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`products_has_activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`products_has_activities` (
  `products_product_id` INT NOT NULL,
  `activities_activity_id` INT NOT NULL,
  PRIMARY KEY (`products_product_id`, `activities_activity_id`),
  INDEX `fk_products_has_activities_activities1_idx` (`activities_activity_id` ASC) ,
  INDEX `fk_products_has_activities_products1_idx` (`products_product_id` ASC) ,
  CONSTRAINT `fk_products_has_activities_products1`
    FOREIGN KEY (`products_product_id`)
    REFERENCES `Ideal_DB`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_activities_activities1`
    FOREIGN KEY (`activities_activity_id`)
    REFERENCES `Ideal_DB`.`activities` (`activity_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`products_has_techniques`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`products_has_techniques` (
  `products_product_id` INT NOT NULL,
  `techniques_technique_id` INT NOT NULL,
  PRIMARY KEY (`products_product_id`, `techniques_technique_id`),
  INDEX `fk_products_has_techniques_techniques1_idx` (`techniques_technique_id` ASC) ,
  INDEX `fk_products_has_techniques_products1_idx` (`products_product_id` ASC) ,
  CONSTRAINT `fk_products_has_techniques_products1`
    FOREIGN KEY (`products_product_id`)
    REFERENCES `Ideal_DB`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_techniques_techniques1`
    FOREIGN KEY (`techniques_technique_id`)
    REFERENCES `Ideal_DB`.`techniques` (`technique_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`products_has_lines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`products_has_lines` (
  `products_product_id` INT NOT NULL,
  `lines_lines_id` INT NOT NULL,
  PRIMARY KEY (`products_product_id`, `lines_lines_id`),
  INDEX `fk_products_has_lines_lines1_idx` (`lines_lines_id` ASC) ,
  INDEX `fk_products_has_lines_products1_idx` (`products_product_id` ASC) ,
  CONSTRAINT `fk_products_has_lines_products1`
    FOREIGN KEY (`products_product_id`)
    REFERENCES `Ideal_DB`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_lines_lines1`
    FOREIGN KEY (`lines_lines_id`)
    REFERENCES `Ideal_DB`.`lines` (`lines_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ideal_DB`.`products_has_materials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ideal_DB`.`products_has_materials` (
  `products_product_id` INT NOT NULL,
  `materials_material_id` INT NOT NULL,
  PRIMARY KEY (`products_product_id`, `materials_material_id`),
  INDEX `fk_products_has_materials_materials1_idx` (`materials_material_id` ASC) ,
  INDEX `fk_products_has_materials_products1_idx` (`products_product_id` ASC) ,
  CONSTRAINT `fk_products_has_materials_products1`
    FOREIGN KEY (`products_product_id`)
    REFERENCES `Ideal_DB`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_materials_materials1`
    FOREIGN KEY (`materials_material_id`)
    REFERENCES `Ideal_DB`.`materials` (`material_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
