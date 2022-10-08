create database java_servlet_example;

use java_servlet_example;

create table tasks(
	id int primary key auto_increment,
	name varchar(200) not null,
	description varchar(500) not null,
	status boolean default false
);