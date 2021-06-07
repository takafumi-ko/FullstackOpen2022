import React from 'react'
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const OnCreateAnecdotes = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        if (anecdote === '') {
            return
        }
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createAnecdote(anecdote)
        console.log("new", newAnecdote)
        dispatch(createAnecdote(newAnecdote))
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