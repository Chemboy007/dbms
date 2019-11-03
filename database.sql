create database college_mag;
use college_maz;

create table admin(
    username varchar(20) primary NOT NULL,
    pwd varchar(20) NOT NULL,
    contact varchar(10) NOT NULL

);

create TABLE student(
    username VARCHAR(20) PRIMARY KEY not null,
    pwd VARCHAR(20) not null,
    contact VARCHAR(10),
    email VARCHAR(30),
    address VARCHAR(100),
    dob date not NULL 
);

CREATE TABLE article(
    art_no int AUTO_INCREMENT PRIMARY KEY,
    stu_username VARCHAR(20),
    status VARCHAR(5),
    admin_username VARCHAR(20),
    content TEXT,
    
)

