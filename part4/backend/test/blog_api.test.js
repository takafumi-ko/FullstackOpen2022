const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs
    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('there are six posts', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
})

test('Exercise 4.9. verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => {
        expect(blog.id).toBeDefined()
    })

})

test('Exercise 4.10. verifies blog post ', async () => {
    const newBlog = {
        title: "dummy",
        author: "dummy",
        url: "dummy",
        likes: 0
    }
    const postResponse = await api.post('/api/blogs').send(newBlog).expect(201)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const expectedBlog = {...newBlog, id: postResponse.body.id}

    expect(response.body).toContainEqual(expectedBlog)

})

test('Exercise 4.11. verifies missing property is like ,it wil will be set 0 by default', async () => {
    const newBlog = {
        title: "dummy",
        author: "dummy",
        url: "dummy",
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    //TODO use after implement getById
    // const response = await api.get(`/api/blogs/${postResponse.body.id}`).expect(200)
    const response = await api.get('/api/blogs')
    let targetBlog = response.body.slice(-1)[0];
    expect(targetBlog.likes).toBe(0)
})
afterAll(() => {
    mongoose.connection.close()
})