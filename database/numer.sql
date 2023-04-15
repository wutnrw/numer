ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

CREATE DATABASE numer;

use numer;

CREATE TABLE numer.equation (
    ID int not null AUTO_INCREMENT,
    Equa varchar(45) not null,
    primary key (ID)
);

INSERT INTO numer.equation(ID,Equa)
VALUES (1,"x^4-13"),(2,"1/4-x/2");

