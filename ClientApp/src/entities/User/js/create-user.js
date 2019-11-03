import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { UserDataService } from '../service/user-data-service';
import '../css/create-user.css';

export class CreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.userDataSevice = new UserDataService();
        this.state = { email: '', password: '', cpf: '', name: '', redirectListUsers: false }
    }

    createUser = async (e) => {
        e.preventDefault();
        const response = await this.userDataSevice.createUser({ name: this.state.name, email: this.state.email, cpf: this.state.cpf, password: this.state.password });
        if (response.status === 201) {
            this.setState({ redirectListUsers: true })
        }
    }

    render() {
        if (this.state.redirectListUsers) {
            return <Redirect to='/users' />
        }
        return (
            <div>
                <h1>Create User</h1>
                <form onSubmit={this.createUser}>
                    <label className="new-user-form-label" htmlFor="new-user-name">
                        Name:
                        <input className="new-user-form-input" id="new-user-name" type="text" name="name" onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-email">
                        Email:
                        <input className="new-user-form-input" id="new-user-email" type="email" name="email" onChange={(e) => this.setState({ email: e.target.value })} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-cpf">
                        CPF:
                        <input className="new-user-form-input" id="new-user-cpf" type="text" name="cpf" maxLength="11" onChange={(e) => this.setState({ cpf: e.target.value })} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-password">
                        Password:
                        <input className="new-user-form-input" id="new-user-password" type="password" name="password" onChange={(e) => this.setState({ password: e.target.value })} />
                    </label>
                    <div className="create-user-button">
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="cancel-create-user" variant="primary" onClick={() => this.setState({ redirectListUsers: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}