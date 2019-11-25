import Axios from 'axios';

export class UserLoginDataService {
    constructor() {
        this.baseUrl = 'api/Users/Authenticate';
        this.user = null;
    }

    async logIn(body) {
        const response = await Axios.post(this.baseUrl, body);
        if (response.status) {
            this.user = response.data;
        }
        return response;
    }

    updateUser(user){
        this.user = user;
    }

    getId() {
        return this.user.id;
    }

    getUser() {
        return this.user;
    }

    logOut() {
        this.user = null;
    }

    isUserLoggedIn() {
        return this.user !== null;
    }

    isUserClient() {
        return this.user.cep !== undefined;
    }

    isUserEmployee() {
        return this.user.position !== undefined;
    }
}