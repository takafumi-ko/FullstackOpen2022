const jwt = require('jsonwebtoken')
require('dotenv').config()
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blogWithUser = {...body, user: user._id}
    const blogModel = new Blog(blogWithUser)
    const savedBlog = await blogModel.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
    Blog.findById(request.params.id).populate('user')
        .then(result => {
            if (result) {
                response.status(200).json(result)
            } else {
                response.status(404).end()
            }
        })
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const userid = decodedToken.id
    const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
    if (blog == null) {
        response.status(404).end()
    }
    console.log(blog.user._id)
    if (blog.user._id.toString() === userid.toString()) {
        await Blog.findByIdAndRemove(userid)
        response.status(204).end()
    } else {
        response.status(401).end()
    }
})

//only update likes
blogsRouter.put('/:id', async (request, response) => {
    Blog.findByIdAndUpdate(request.params.id, {likes: request.body.likes}).then((result) => {
        response.status(201).json(result)
    })
})

module.exports = blogsRouter