import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={message}/>
                <Login setUser={setUser} setMessage={setMessage}/>
            </div>
        )
    }

    const AddLike = async (blog) => {
        let newBlog = { ...blog }
        delete newBlog.user
        newBlog.likes = newBlog.likes + 1
        console.log(newBlog)
        await blogService.like(newBlog)
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message}/>
            <p>{user.name + ' logged in '}<Logout setUser={setUser}/></p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <NewBlog
                    userId={user.id}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setMessage={setMessage}
                    onCreate={() => blogFormRef.current.toggleVisibility()}/>
            </Togglable>
            {
                blogs.sort(((a, b) => {
                    return b.likes - a.likes
                })).map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        onLike={AddLike(blog)}
                        onDelete={() => setBlogs(blogs.filter((b) => b.id !== blog.id))}/>
                )
            }
        </div>
    )
}

export default App