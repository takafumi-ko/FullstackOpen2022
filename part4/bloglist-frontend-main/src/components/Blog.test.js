import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    beforeEach(() => {
        const blog = {
            'title': 'React patterns',
            'author': 'Michael Chan',
            'userId': '609ac1c1f3967d14b9156a2d',
            'url': 'https://reactpatterns.com/',
            'likes': 7
        }
        component = render(
            <Blog blog={blog}/>
        )
        component.debug()
    })

    test('renders its children', () => {
        expect(
            component.container.querySelector('.hideWhenVisibleContent')
        ).toBeDefined()
        expect(
            component.container.querySelector('.showWhenVisibleContent')
        ).toBeDefined()
    })

    test('at start the showWhenVisibleContent are not displayed', () => {
        const div = component.container.querySelector('.showWhenVisibleContent')

        expect(div).toHaveStyle('display: none')
    })

    test('at start the hideWhenVisibleContent displayed', () => {
        const div = component.container.querySelector('.hideWhenVisibleContent')

        expect(div).not.toHaveStyle('display: none')
        expect(div).toHaveTextContent('React patterns Michael Chan')
    })


    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.showWhenVisibleContent')
        expect(div).not.toHaveStyle('display: none')

        expect(div).toHaveTextContent('React patterns')
        expect(div).toHaveTextContent('https://reactpatterns.com/')
        expect(div).toHaveTextContent('Michael Chan')
    })
})