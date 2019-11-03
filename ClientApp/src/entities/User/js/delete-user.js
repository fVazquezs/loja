import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { UserDataService } from '../service/user-data-service';
import '../css/delete-user.css';

export class DeleteUser extends React.Component {

    constructor(props) {
        super(props);
        this.userDataSevice = new UserDataService();
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], email: '', password: '', cpf: '', name: '', redirectListUsers: false }
    }

    async componentDidMount() {
        const user = await this.userDataSevice.getUser(this.state.id);
        this.setState({ name: user.name, email: user.email, cpf: user.cpf, password: user.password, loading: false })
    }

    deleteUser = async (e) => {
        e.preventDefault();
        const response = await this.userDataSevice.deleteUser(this.state.id);
        if (response.status === 200) {
            this.setState({ redirectListUsers: true })
        }
    }

    render() {
        if (this.state.redirectListUsers) {
            return <Redirect to='/users' />
        }
        return (
            <div>
                <h1>Delete User</h1>
                <form onSubmit={this.deleteUser}>
                    <label className="new-user-form-label" htmlFor="new-user-name">
                        Name:
                        <input disabled className="new-user-form-input" id="new-user-name" type="text" name="name" value={this.state.name} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-email">
                        Email:
                        <input disabled className="new-user-form-input" id="new-user-email" type="email" name="email" value={this.state.email} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-cpf">
                        CPF:
                        <input disabled className="new-user-form-input" id="new-user-cpf" type="text" name="cpf" maxLength="11" value={this.state.cpf} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-password">
                        Password:
                        <input disabled className="new-user-form-input" id="new-user-password" type="password" name="password" value={this.state.password} />
                    </label>
                    <div className="delete-user-button">
                        <Button variant="primary" type="submit">Delete</Button>
                        <Button className="cancel-delete-user" variant="primary" onClick={() => this.setState({ redirectListUsers: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}