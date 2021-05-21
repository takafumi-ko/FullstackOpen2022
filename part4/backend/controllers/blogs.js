const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const users = await User.find({})
    let user = null
    if (users.length > 0) {
        user = users[0]
    }

    const blogWithUser = {...request.body, user: user._id}
    const blogModel = new Blog(blogWithUser)
    const savedBlog = await blogModel.save()

    if (user != null) {
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    }

    response.json(savedBlog)

})

blogsRouter.get('/:id', async (request, response) => {
    Blog.findById(request.params.id).populate('User')
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

//only update likes
blogsRouter.put('/:id', async (request, response) => {
    Blog.findByIdAndUpdate(request.params.id, {likes: request.body.likes}).then((result) => {
        response.status(201).json(result)
    })
})

module.exports = blogsRouter