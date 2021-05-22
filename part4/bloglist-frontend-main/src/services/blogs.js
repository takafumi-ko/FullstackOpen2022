import axios from 'axios'

const baseUrl = '/api/blogs'
let localToken

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const setToken = (token) => {
    localToken = token
}

export default {getAll, setToken}