import React, {useState} from "react";
import blogsService from "../services/blogs";

const NewBlog = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async () => {
        console.log("here")
        const blog = {
            title: title,
            author: author,
            user: props.userId,
            url: url
        }
        const result = await blogsService.create(blog)
        props.setBlogs({...props.blogs, result})
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
