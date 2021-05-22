require('dotenv').config()
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')
const {userExtractor} = require("../utils/middleware");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    if (!request.token || !request.user.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(request.user.id)

    const blogWithUser = {...body, user: user._id}
    const blogModel = new Blog(blogWithUser)
    const savedBlog = await blogModel.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
    const result = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
    if (result) {
        response.status(200).json(result)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    if (!request.token || !request.user.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
    if (blog == null) {
        response.status(404).end()
    }
    console.log(blog.user.id)
    if (blog.user._id.toString() === request.user.id.toString()) {
        const result = await Blog.findByIdAndRemove(blog.id)
        console.log(result)
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