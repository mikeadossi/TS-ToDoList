var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = `postgres://${process.env.USER}@localhost:5432/ts_todo_db`;
var db = pgp(connectionString);

function getAllTasks(req, res, next) {
  db.any('select * from ts_task_list')
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved all tasks'
      })
  })
  .catch(function (err) {
    return next(err);
  })
}

function getSingleTask(req, res, next) {
  var taskID = parseInt(req.params.id);
  db.one('select * from task_list where id = $1', taskID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE task'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createNewTodo(req, res, next) {
  var task = req.body.task
  var is_complete = req.body.is_complete
  db.any('insert into ts_task_list(task, is_complete)' + ' values(${task}, ${is_complete}) returning id',
    req.body)
    .then(function (tasks) {
      res.status(200)
        .json({
          status: 'success',id: tasks[0].id,
          message: 'Inserted one task'
        });
    })
    .catch(function (err) {
      res.status(400).send(err)
    });
}

function updateTask(req, res, next) {
  db.none('update ts_task_list set task=$1, is_complete=$2 where id=$3',
    [req.body.task, req.body.is_complete, parseInt(req.body.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated task'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeTask(req, res, next) {
  var taskID = parseInt(req.body.id);
  db.result('delete from ts_task_list where id = $1', taskID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} task`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllTasks: getAllTasks,
  createNewTodo: createNewTodo,
  updateTask: updateTask,
  removeTask: removeTask
}
