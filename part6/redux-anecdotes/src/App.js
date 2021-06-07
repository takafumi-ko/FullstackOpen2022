import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, incrementVote } from "./reducers/anecdoteReducer";

const App = () => {
    const anecdotes = useSelector(state => state.sort((a, b) => {
        return b.votes - a.votes
    }))
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(incrementVote(id))
    }


    const OnCreateAnecdotes = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))

    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={OnCreateAnecdotes}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App