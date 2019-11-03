import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { UserDataService } from '../service/user-data-service';
import '../css/edit-user.css';

export class EditUser extends React.Component {

    constructor(props) {
        super(props);
        this.userDataSevice = new UserDataService();
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], email: '', password: '', cpf: '', name: '', redirectListUsers: false }
    }

    async componentDidMount() {
        const user = await this.userDataSevice.getUser(this.state.id);
        this.setState({ name: user.name, email: user.email, cpf: user.cpf, password: user.password, loading: false })
    }

    editUser = async (e) => {
        e.preventDefault();
        const response = await this.userDataSevice.updateUser({ id: this.state.id, name: this.state.name, email: this.state.email, cpf: this.state.cpf, password: this.state.password });
        if (response.status === 204) {
            this.setState({ redirectListUsers: true })
        }
    }

    render() {
        if (this.state.redirectListUsers) {
            return <Redirect to='/users' />
        }
        return (
            <div>
                <h1>Edit User</h1>
                <form onSubmit={this.editUser}>
                    <label className="new-user-form-label" htmlFor="new-user-name">
                        Name:
                        <input className="new-user-form-input" id="new-user-name" type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-email">
                        Email:
                        <input className="new-user-form-input" id="new-user-email" type="email" name="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-cpf">
                        CPF:
                        <input className="new-user-form-input" id="new-user-cpf" type="text" name="cpf" maxLength="11" value={this.state.cpf} onChange={(e) => this.setState({ cpf: e.target.value })} />
                    </label>
                    <label className="new-user-form-label" htmlFor="new-user-password">
                        Password:
                        <input className="new-user-form-input" id="new-user-password" type="password" name="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                    </label>
                    <div className="edit-user-button">
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="cancel-edit-user" variant="primary" onClick={() => this.setState({ redirectListUsers: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}