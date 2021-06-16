import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-af9ce-default-rtdb.firebaseio.com/'
});

export default instance;