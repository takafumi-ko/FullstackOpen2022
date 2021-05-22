import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
    const blog = props.blog

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const AddLike = async () => {
        let newBlog = {...blog}
        delete newBlog.user
        newBlog.likes = newBlog.likes + 1
        console.log(newBlog)
        await blogService.like(newBlog)
    };

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible}>
                <p>
                    {blog.title}
                    <button onClick={toggleVisibility}>view</button>
                </p>
            </div>
            <div style={showWhenVisible}>
                <p>
                    {blog.title}
                    <button onClick={toggleVisibility}>hide</button>
                </p>
                <p>
                    {blog.url}
                </p>
                <p>
                    {"likes " + blog.likes}
                    <button onClick={AddLike}>like</button>
                </p>
                <p>
                    {blog.author}
                </p>
            </div>
        </div>
    )
}

export default Blog