import axios from 'axios';
const baseUrl = `http://localhost:${process.env.PORT??3001}/api/directory`;

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

export default{
    getAll
}