import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
const deletePerson = (id)=>{
    const deleteRequest = axios.delete(`${baseUrl}/${id}`)
    let getAllRequest = []
    return deleteRequest.then(response=>response.status).then(response=>{
        if(response === 200){
            getAllRequest = axios.get(baseUrl)
            return getAllRequest.then(response=>response.data)
        }
    })
}

export default { getAll, create, update ,deletePerson}