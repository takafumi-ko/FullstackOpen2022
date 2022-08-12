const express = require("express");
const redis = require('../redis')
const {Todo} = require("../mongo");
const {ADDED_TODOS_KEY} = require("../util/config");


const router = express.Router();

router.get('/', async (_, res) => {
    const added_todos = await redis.getAsync(ADDED_TODOS_KEY)
    res.send({
        "added_todos":added_todos
    });
});

module.exports = router;