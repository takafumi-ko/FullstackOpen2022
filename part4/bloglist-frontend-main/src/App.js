import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)


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

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message}/>
            <p>{user.name + " logged in "}<Logout setUser={setUser}/></p>
            <NewBlog userId={user.id} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
            {
                blogs.length ? blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>
                ) : null}
        </div>
    )

}

export default App