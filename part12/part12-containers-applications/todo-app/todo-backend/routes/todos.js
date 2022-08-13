const express = require('express');
const {Todo} = require('../mongo')
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
    await redis.setAsync(ADDED_TODOS_KEY, (Number(numOfTodos) + 1).toString());
    res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
    const {id} = req.params
    req.todo = await Todo.findById(id)

    if (!req.todo) return res.sendStatus(404)
    next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
    await req.todo.delete()
    res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
    res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
    const {modifiedCount} = await Todo.updateOne(req.todo, {done: true}, {runValidators: true})
    if (modifiedCount === 1) {
        res.sendStatus(200)
    } else {
        res.sendStatus(204)
    }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
