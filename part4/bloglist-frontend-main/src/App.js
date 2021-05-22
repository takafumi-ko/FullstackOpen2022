import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from "./components/Login";
import Logout from "./components/Logout";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)


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
                <Login setUser={setUser}/>
                <h2>Log in to application</h2>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name + " logged in "}<Logout setUser={setUser}/></p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    )

}

export default App