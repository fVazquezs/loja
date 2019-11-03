import Axios from 'axios';

export class EntityDataService {
    constructor(entity){
        this.entity = entity
    }
    async getAll() {
        const response = await Axios.get(`api/${this.entity}`);
        return response.data;
    }

    async getById(id) {
        const response = await Axios.get(`api/${this.entity}/` + id);
        return response.data;
    }

    async create(body) {
        const response = await Axios.post(`api/${this.entity}`, body);
        return response;
    }

    async update(body) {
        const response = await Axios.put(`api/${this.entity}/` + body.id, body);
        return response;
    }
    
    async delete(id) {
        const response = await Axios.delete(`api/${this.entity}/` + id);
        return response;
    }
}