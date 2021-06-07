import React from 'react'
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotificationS } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const OnCreateAnecdotes = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        if (anecdote === '') {
            return
        }
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(setNotificationS(`new anecdote '${anecdote}'`, 10))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={OnCreateAnecdotes}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm