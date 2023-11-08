CREATE DATABASE bushopDB;

use bushopDB;

CREATE TABLE auth_user (
    user_id int NOT NULL AUTO_INCREMENT,
    name_user VARCHAR(50) NOT NULL UNIQUE,
    name_email VARCHAR(50) NOT NULL UNIQUE,
    pass int NOT NULL,
    date_create TIMETAMP NOT NULL DEFAULT (NOW()) ,
    PRIMARY KEY (user_id)
)

CREATE TABLE auth_friends (
    friends_id int not null AUTO_INCREMENT,
    user_id int not null,
    fri_id int not null,
    FOREIGN KEY (user_id) REFERENCES auth_user(user_id),
    PRIMARY KEY (friends_id)
)