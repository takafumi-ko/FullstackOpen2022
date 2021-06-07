import React from "react";
import { incrementVote } from "../reducers/anecdoteReducer";
import { setNotificationS } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        props.incrementVote(anecdote.id)
        const message = `you vote ${anecdote.content}`
        props.setNotificationS(message, 5)
    }

    return (
        props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )
    )
}

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes.sort((a, b) => {
            return b.votes - a.votes
        }).filter(anecdote => anecdote.content.includes(state.filter))
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementVote: id => {
            dispatch(incrementVote(id))
        },
        setNotificationS: (message, time) => {
            dispatch(setNotificationS(message, time))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)