import axios from 'axios'

const baseUrl = '/api/blogs'
let localToken

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (data) => {
    const response = await axios.post(baseUrl,
        data
        , {
            headers: {
                Authorization: localToken,
            }
        })
    console.log(
        response.status
    )
    return response.data
}

const setToken = (token) => {
    localToken = `bearer ${token}`
}

export default {getAll, setToken, create}