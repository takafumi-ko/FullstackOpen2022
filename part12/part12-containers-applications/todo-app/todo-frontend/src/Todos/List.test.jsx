
import {render,screen} from '@testing-library/react'
import List from "./List";

it('show one todo false', async () => {

    const todos = [{"text":"test1","done":false}]
    render(
        <List todos={todos} ></List>,
    );

    expect(screen.getByText("test1")).toHaveTextContent("test1")

    await screen.findAllByRole("button").then(el=>expect(el.length).toEqual(2))

});

it('show one todo true', async () => {

    const todos = [{"text":"test2","done":true}]
    render(
        <List todos={todos} ></List>,
    );

    expect(screen.getByText("test2")).toHaveTextContent("test2")

    await screen.findAllByRole("button").then(el=>expect(el.length).toEqual(1))

});