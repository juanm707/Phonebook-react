import axios from 'axios';

const baseUrl = '/api/persons' //'http://localhost:3001/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    // return request.then(response => response.data);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => {
        console.log(response.data);
        return response.data;
    });
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const erase = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => {
        return response.data;
    })
}

export default { getAll, create, update, erase }