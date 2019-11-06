import React, { Component } from 'react';

export class LogInDataService extends Component {

    constructor(props) {
        super(props);

        this.state = { isUserSignedIn: false, userdId: null };

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '763971660996-buv455rg4jpmg9j68rdpntr5qnce40tc.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    signIn() {
        this.auth.signIn();
    }

    signOut() {
        this.auth.signOut();
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.userdId = this.auth.currentUser.get().getId();
            this.setState({ isUserSignedIn: true });
        } else {
            this.userdId = null;
            this.setState({ isUserSignedIn: false });
        }
    }

    isSignedIn() {
        return this.userdId !== null;
    }
}