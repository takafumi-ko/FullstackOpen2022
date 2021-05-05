const blogsRouter = require('express').Router()

const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }).catch(() => {
        response.status(400).end()
    })
})

blogsRouter.get('/:id', async (request, response) => {
    Blog.findById(request.params.id)
        .then(result => {
            if (result) {
                response.status(200).json(result)
            } else {
                response.status(404).end()
            }
        })
})

blogsRouter.delete('/:id', async (request, response) => {
    Blog.findByIdAndRemove(request.params.id).then(() => {
        response.status(204).end()
    })
})

module.exports = blogsRouter