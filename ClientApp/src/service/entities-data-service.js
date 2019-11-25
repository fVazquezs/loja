import Axios from 'axios';
import { ImgurDataService } from './imgur-data-service';

export class EntityDataService {
    constructor(entity) {
        this.entity = entity;
        this.imgurDataService = new ImgurDataService();
    }
    async getAll() {
        const response = await Axios.get(`api/${this.entity}`);
        return response.data;
    }

    async getById(id) {
        const response = await Axios.get(`api/${this.entity}/` + id);
        return response.data;
    }

    async create(body, image) {
        if (this.entity === "Products") {
            const imageResponse = await this.imgurDataService.postImage(image);
            body.imgPath = imageResponse.data.id;
        }
        const response = await Axios.post(`api/${this.entity}`, body);
        return response;
    }

    async update(body, image) {
        if (this.entity === "Products") {
            const imageResponse = await this.imgurDataService.postImage(image);
            body.imgPath = imageResponse.data.id;
        }
        const response = await Axios.put(`api/${this.entity}/` + body.id, body);
        return response;
    }

    async delete(id) {
        const response = await Axios.delete(`api/${this.entity}/` + id);
        return response;
    }
}