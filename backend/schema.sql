DROP DATABASE IF EXISTS ts_todo_db;
CREATE DATABASE ts_todo_db;

\c ts_todo_db

CREATE TABLE ts_task_list(
  id SERIAL PRIMARY KEY,
  task VARCHAR(3000),
  /*details VARCHAR(3000),*/
  is_complete BOOLEAN DEFAULT false
  /*priority INTEGER*/
);
