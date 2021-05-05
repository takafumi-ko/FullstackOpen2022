const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async ()=>{
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs
    const blogObjects = blogs.map(blog=> new Blog(blog))
    const promiseArray = blogObjects.map(blog=>blog.save())
    await Promise.all(promiseArray)
})

test('there are six posts', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
})

afterAll(() => {
    mongoose.connection.close()
})