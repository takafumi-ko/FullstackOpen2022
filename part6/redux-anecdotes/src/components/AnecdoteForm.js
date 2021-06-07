import React from 'react'
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { setNotificationS } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const OnCreateAnecdotes = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        if (anecdote === '') {
            return
        }
        event.target.anecdote.value = ''
        props.createAnecdote(anecdote)
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


const mapDispatchToProps = dispatch => {
    return {
        createAnecdote: value => {
            dispatch(createAnecdote(value))
            dispatch(setNotificationS(`new anecdote '${value}'`, 10))
        }
    }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)