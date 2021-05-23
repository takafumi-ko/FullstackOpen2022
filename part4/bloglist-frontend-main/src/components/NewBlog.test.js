import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from './NewBlog'

describe('<NewBlog />', () => {

    test('<Newblog/> call collect values', () => {
        const CreateBlog = jest.fn()
        const component = render(
            <NewBlog createBlog={CreateBlog}/>
        )

        const inputTitle = component.container.querySelector('#title')
        const inputAuthor = component.container.querySelector('#author')
        const inputUrl = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        const title = 'React patterns'
        fireEvent.change(inputTitle, {
            target: { value: title }
        })
        const author = 'Michael Chan'
        fireEvent.change(inputAuthor, {
            target: { value: author }
        })
        const url = 'https://reactpatterns.com/'
        fireEvent.change(inputUrl, {
            target: { value: url }
        })
        fireEvent.submit(form)
        expect(CreateBlog.mock.calls).toHaveLength(1)

        expect(CreateBlog.mock.calls[0][0].title).toBe(title)
        expect(CreateBlog.mock.calls[0][0].author).toBe(author)
        expect(CreateBlog.mock.calls[0][0].url).toBe(url)
    })

})