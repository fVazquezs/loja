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

    logOut() {
        this.user = null;
    }

    isUserLoggedIn() {
        return true;
        return this.user !== null;
    }

    isUserClient() {
        return true;
        return this.user.cep !== undefined;
    }

    isUserEmployee() {
        return false;
        // return this.user.position !== undefined;
    }
}