import React, { useState } from 'react'

const NewBlog = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = () => {
        const blog = {
            title: title,
            author: author,
            user: props.userId,
            url: url
        }
        props.createBlog(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={handleCreate}>
                <div>
                    title:
                    <input
                        id="title"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>

                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlog
