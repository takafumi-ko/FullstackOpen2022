const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')
const {log} = require("debug");
const {ADDED_TODOS_KEY} = require('../util/config')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const numOfTodos = await redis.getAsync(ADDED_TODOS_KEY);
  console.log("num",(Number(numOfTodos)+1).toString())
  await redis.setAsync(ADDED_TODOS_KEY,(Number(numOfTodos)+1).toString());
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)

  if (!req.todo) return res.sendStatus(404)

  res.send(req.todo);
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
