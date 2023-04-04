import axios from 'axios';
const baseUrl = `${process.env.BACKEND_SERVER ?? 'http://localhost:3001'}/directory`;

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

export default{
    getAll
}