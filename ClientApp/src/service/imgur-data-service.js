import axios from 'axios';
import React from 'react';

export class ImgurDataService extends React.Component {
    constructor() {
        super();
    }

    getTokenHeader() {
        return {
            headers: {
                'Authorization': "Client-ID 92b26ed6cde863c"
            }
        };
    }

    postImage = async (body) => {
        await axios.post("https://api.imgur.com/3/image", body, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }
}