import Axios from 'axios';

export class UserDataService {
    async getAllUsers() {
        const response = await Axios.get('api/Users');
        return response.data;
    }

    async getUser(id) {
        const response = await Axios.get('api/Users/' + id);
        return response.data;
    }

    async createUser(body) {
        const response = await Axios.post('api/Users', body);
        return response;
    }

    async updateUser(body) {
        const response = await Axios.put('api/Users/' + body.id, body);
        return response;
    }
    
    async deleteUser(id) {
        const response = await Axios.delete('api/Users/' + id);
        return response;
    }
}