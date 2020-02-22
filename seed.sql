DROP DATABASE IF EXISTS Employee_db;

CREATE DATABASE Employee_db;

USE Employee_db;

CREATE TABLE department (
   id INT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

INSERT INTO department (id, name)
VALUES (id, name);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2) NULL,
    department_id INT NULL

);

INSERT INTO roles (id, title, salary, department_id)
VALUES(id, title, salary, department_id);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL


);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(id, first_name, last_name, role_id, manager_id);


