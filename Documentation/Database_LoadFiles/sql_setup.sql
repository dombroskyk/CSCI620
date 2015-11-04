CREATE SCHEMA `group6_plantfinder`;
CREATE TABLE IF NOT EXISTS `group6_plantfinder`.`plant` (
  `idPlant` INT NOT NULL,
  `plant_name` VARCHAR(45) NULL,
  PRIMARY KEY (`idPlant`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `group6_plantfinder`.`state` (
  `idState` INT NOT NULL,
  `state_name` VARCHAR(45) NULL,
  PRIMARY KEY (`idState`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `group6_plantfinder`.`plant_to_state` (
  `idPlant` INT NOT NULL,
  `idState` INT NOT NULL,
  INDEX `idPlant_idx` (`idPlant` ASC),
  INDEX `idState_idx` (`idState` ASC),
  CONSTRAINT `idPlant`
    FOREIGN KEY (`idPlant`)
    REFERENCES `group6_plantfinder`.`plant` (`idPlant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idState`
    FOREIGN KEY (`idState`)
    REFERENCES `group6_plantfinder`.`state` (`idState`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

LOAD DATA LOCAL INFILE 'D:/CollegeYear4/BigData/project/Documentation/Database_LoadFiles/plant_data.txt' INTO TABLE group6_plantfinder.plant COLUMNS TERMINATED BY '\t' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE 'D:/CollegeYear4/BigData/project/Documentation/Database_LoadFiles/state_data.txt' INTO TABLE group6_plantfinder.state COLUMNS TERMINATED BY '\t' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE 'D:/CollegeYear4/BigData/project/Documentation/Database_LoadFiles/plant_to_state_data.txt' INTO TABLE group6_plantfinder.plant_to_state COLUMNS TERMINATED BY '\t' LINES TERMINATED BY '\n';