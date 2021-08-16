var express = require('express');
var router = express.Router();
var tasks = require('../tasks')
var pending_tasks = tasks.pending_tasks
var finished_tasks = tasks.finished_tasks

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("get REQUEST")
  res.render('index', { title: "TO-DO app", pending_tasks: pending_tasks, finished_tasks: finished_tasks });
});

//POST request -> add task
router.post('/', (req, res) => {
  pending_tasks.push(req.body.newtask)
  res.redirect('/todo');
})

//POST request -> change task state
router.post('/change-state', (req, res) => {
  const value = req.body.value
  console.log(req.body)
  console.log(req.body.state)
  if (req.body.state == "Done!") {
    const index = pending_tasks.indexOf(value);
    if (index > -1) {
      pending_tasks.splice(index, 1);
      finished_tasks.push(value)
    }
  }else{
    const index = finished_tasks.indexOf(value);
    if (index > -1) {
      finished_tasks.splice(index, 1);
      pending_tasks.push(value)
    }
  }
  res.redirect('/todo')
})

module.exports = router;
