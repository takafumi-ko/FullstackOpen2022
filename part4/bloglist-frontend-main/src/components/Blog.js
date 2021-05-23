import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
    const blog = props.blog

    const [visible, setVisible] = useState(false)

    let deleteVisible = false
    if (props.user && blog.user) {
        deleteVisible = props.user.username === blog.user.username
    }

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const showWhenVisibleDeleteButton = { display: deleteVisible ? '' : 'none' }

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

    const onDelete = () => {
        const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if (!result) return
        blogService.deleteBlogPost(blog.id)
        props.onDelete(blog.id)
    }
    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible} className='hideWhenVisibleContent'>
                <p>
                    {`${blog.title} ${blog.author}`}
                    <button onClick={toggleVisibility}>view</button>
                </p>
            </div>
            <div style={showWhenVisible} className='showWhenVisibleContent'>
                <p>
                    {blog.title}
                    <button onClick={toggleVisibility}>hide</button>
                </p>
                <p>
                    {blog.url}
                </p>
                <p>
                    {'likes ' + blog.likes}
                    <button onClick={props.onLike}>like</button>
                </p>
                <p>
                    {blog.author}
                </p>

                <div style={showWhenVisibleDeleteButton}>
                    <button onClick={onDelete}>remove</button>
                </div>
            </div>
        </div>
    )
}

export default Blog