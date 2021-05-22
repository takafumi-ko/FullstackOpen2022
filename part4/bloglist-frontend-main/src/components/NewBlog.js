import React, {useState} from "react";
import blogsService from "../services/blogs";

const NewBlog = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            user: props.userId,
            url: url
        }
        const result = await blogsService.create(blog)
        console.log(result)
        if (result != null) {
            props.setBlogs({...props.blogs, result})
            props.setMessage({
                type: "success",
                messageText: `a new blog ${result.title} by ${result.author} added`
            })
            setTimeout(() => {
                props.setMessage(null)
            }, 5000)
        }
    };

    return (
        <div>
            <form onSubmit={handleCreate}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({target}) => setUrl(target.value)}
                    />
                </div>

                <button type="submit">create</button>
            </form>
        </div>
    )
};

export default NewBlog
