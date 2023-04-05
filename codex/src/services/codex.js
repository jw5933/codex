import axios from 'axios';

const baseUrl = `${process.env.BACKEND_SERVER ?? 'http://localhost:3001'}/codices`;

const getAll = async () => { //TODO: check authorization later on
    const response = await axios.get(baseUrl);
    return response.data;
};

const getCodex = async (slug) => {
    const response = await axios.get(`${baseUrl}/${slug}`);
    return response.data;
}

const createNewCodex = async (settings) => {
    // console.log('create new codex', settings);
    const response = await axios.post(baseUrl, {settings});
    return response.data;
}

const createNewWord = async (slug, word) => {
    console.log(slug, word);
    const response = await axios.post(`${baseUrl}/${slug}`, {word});
    return response.data;
}

export default{
    getAll,
    getCodex,
    createNewCodex,
    createNewWord
};