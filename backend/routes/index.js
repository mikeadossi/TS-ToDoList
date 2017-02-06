var express = require('express');
var router = express.Router();

var db = require('../queries.js');

/* NOTICE : routing to the home page is handled on the frontend not here */
router.get('/api/ts_todo_db', db.getAllTasks);
router.post('/api/ts_todo_db', db.createNewTodo);
router.put('/api/ts_todo_db', db.updateTask);
router.delete('/api/ts_todo_db', db.removeTask);

module.exports = router;
