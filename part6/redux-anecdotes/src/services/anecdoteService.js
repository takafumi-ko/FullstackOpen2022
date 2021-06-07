import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (anecdote) => {
    const object = { content: anecdote, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async (id) => {
    const targetAnecdote = await axios.get(baseUrl + "/" + id)
    const newAnecdote = { ...targetAnecdote.data, votes: targetAnecdote.data.votes + 1 }
    const response = await axios.put(baseUrl + "/" + id, newAnecdote)
    return response.data
}

export default { getAll, createAnecdote, voteAnecdote }