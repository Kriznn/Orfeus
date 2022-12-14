-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` INT NULL,
  `privacy_level` INT NULL,
  `profile_picture_path` VARCHAR(100) NULL,
  `account_creation_date` DATETIME NULL,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `genre` ;

CREATE TABLE IF NOT EXISTS `genre` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `artist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `artist` ;

CREATE TABLE IF NOT EXISTS `artist` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `song_file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `song_file` ;

CREATE TABLE IF NOT EXISTS `song_file` (
  `song_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `filepath` VARCHAR(1000) NOT NULL,
  `uploaded_date` DATETIME NULL,
  `genre_id` INT NULL,
  `artist_id` INT NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`song_id`),
  INDEX `fk_song_file_genre1_idx` (`genre_id` ASC) VISIBLE,
  INDEX `fk_song_file_artist1_idx` (`artist_id` ASC) VISIBLE,
  INDEX `fk_song_file_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_song_file_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_song_file_artist1`
    FOREIGN KEY (`artist_id`)
    REFERENCES `artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_song_file_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `settings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `settings` ;

CREATE TABLE IF NOT EXISTS `settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `model` VARCHAR(45) NULL,
  `prompt_length_seconds` DECIMAL NULL,
  `sample_length_seconds` DECIMAL NULL,
  `mode` VARCHAR(45) NULL,
  `sampling_temperature` DECIMAL NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `generated_file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `generated_file` ;

CREATE TABLE IF NOT EXISTS `generated_file` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filepath` VARCHAR(45) NULL,
  `creation_date` DATETIME NULL,
  `privacy_level` INT NULL,
  `like_count` INT NULL,
  `song_file_id` INT NULL,
  `user_id` INT NULL,
  `genre_id` INT NULL,
  `settings_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_generated_file_song_file1_idx` (`song_file_id` ASC) VISIBLE,
  INDEX `fk_generated_file_genre1_idx` (`genre_id` ASC) VISIBLE,
  INDEX `fk_generated_file_settings1_idx` (`settings_id` ASC) VISIBLE,
  CONSTRAINT `fk_generated_file_song_file1`
    FOREIGN KEY (`song_file_id`)
    REFERENCES `song_file` (`song_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_generated_file_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_generated_file_settings1`
    FOREIGN KEY (`settings_id`)
    REFERENCES `settings` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  `generated_file_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_generated_file1_idx` (`generated_file_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_generated_file1`
    FOREIGN KEY (`generated_file_id`)
    REFERENCES `generated_file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `preferred_settings_preset`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `preferred_settings_preset` ;

CREATE TABLE IF NOT EXISTS `preferred_settings_preset` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `model` VARCHAR(45) NOT NULL,
  `prompt_length_seconds` DECIMAL NULL,
  `sample_length_seconds` DECIMAL NULL,
  `mode` VARCHAR(45) NULL,
  `sampling_temperature` DECIMAL NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_preferred_settings_preset_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_preferred_settings_preset_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `like` ;

CREATE TABLE IF NOT EXISTS `like` (
  `generated_file_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `fk_like_generated_file1_idx` (`generated_file_id` ASC) VISIBLE,
  INDEX `fk_like_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_like_generated_file1`
    FOREIGN KEY (`generated_file_id`)
    REFERENCES `generated_file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_like_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `privacy_level`, `profile_picture_path`, `account_creation_date`) VALUES (1, 'user1@orfeus.com', 'user1', 'password', 1, 1, 'test', '2015-04-03 14:00:45');
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`, `privacy_level`, `profile_picture_path`, `account_creation_date`) VALUES (2, 'user1@orfeus.com', 'user2', 'password', 1, 1, 'test', '2015-04-03 14:00:45');

COMMIT;


-- -----------------------------------------------------
-- Data for table `genre`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `genre` (`id`, `name`) VALUES (1, 'Pop');
INSERT INTO `genre` (`id`, `name`) VALUES (2, 'Hip hop');

COMMIT;


-- -----------------------------------------------------
-- Data for table `artist`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `artist` (`id`, `name`) VALUES (1, 'Michael Jackson');
INSERT INTO `artist` (`id`, `name`) VALUES (2, 'Drake');

COMMIT;


-- -----------------------------------------------------
-- Data for table `song_file`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `song_file` (`song_id`, `title`, `filepath`, `uploaded_date`, `genre_id`, `artist_id`, `user_id`) VALUES (1, 'sample1', 'fakepath', NULL, 1, 1, NULL);
INSERT INTO `song_file` (`song_id`, `title`, `filepath`, `uploaded_date`, `genre_id`, `artist_id`, `user_id`) VALUES (2, 'sample2', 'fakepath', NULL, 2, 2, NULL);

COMMIT;

