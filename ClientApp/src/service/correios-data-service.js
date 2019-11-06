import Axios from 'axios';

export class CorreiosDataService {

    constructor(){
        this.baseURL = 'https://viacep.com.br/ws/'
    }

    async getAddressWithCEP(cep){
        const response = await Axios.get(`${this.baseURL}${cep}/json`)
        console.log(response.data)
    }
}