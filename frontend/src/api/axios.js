import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://locahost:5000'
    }
);