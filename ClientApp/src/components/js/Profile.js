import React from 'react';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../service/entities-data-service';

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.userService = props.userLoginDataService;
        this.state = this.userService.getUser();
        this.userDataService = new EntityDataService('Clients');
    }

    updateUser = async () => {
        const response = await this.userDataService.update(this.state)
        if(response.status === 204)
            this.userService.updateUser(this.state)
        this.setState(this.userService.getUser())
    }

    render() {
        return (
            <div>
                <div className='page-title'>Hi {this.state.name}</div>
                <form className="cliet-self-register-form" onSubmit={this.createProduct}>
                    <label className="new-client-form-label" htmlFor="new-client-name">
                        Name:
                        <input className="new-client-form-input" id="new-client-name" type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-email">
                        Email:
                        <input className="new-client-form-input" id="new-client-email" type="text" name="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-cpf">
                        CPF:
                        <input className="new-client-form-input" id="new-client-cpf" type="text" name="cpf" value={this.state.cpf} onChange={(e) => this.setState({ cpf: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-password">
                        Password:
                        <input className="new-client-form-input" id="new-client-password" type="password" name="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-cep">
                        CEP:
                        <input className="new-client-form-input" id="new-client-cep" type="text" name="cep" value={this.state.cep} onChange={(e) => this.setState({ cep: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-street">
                        Street:
                        <input className="new-client-form-input" id="new-client-street" type="text" name="street" value={this.state.street} onChange={(e) => this.setState({ street: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-number">
                        Number:
                        <input className="new-client-form-input" id="new-client-number" type="text" name="number" value={this.state.number} onChange={(e) => this.setState({ number: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-district">
                        District:
                        <input className="new-client-form-input" id="new-client-district" type="text" name="district" value={this.state.district} onChange={(e) => this.setState({ district: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-city">
                        City:
                        <input className="new-client-form-input" id="new-client-city" type="text" name="city" value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-state">
                        State:
                        <input className="new-client-form-input" id="new-client-state" type="text" name="state" value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-complement">
                        Complement:
                        <input className="new-client-form-input" id="new-client-complement" type="text" name="complement" value={this.state.complement} onChange={(e) => this.setState({ complement: e.target.value })} />
                    </label>
                    <label className="new-client-form-label" htmlFor="new-client-birth-date">
                        Birth Date:
                        <input className="new-client-form-input" id="new-client-birth-date" type="date" name="birth-date" value={this.state.birthDate} onChange={(e) => this.setState({ birthDate: e.target.value })} />
                    </label>
                </form>

                <Button bsStyle="info" onClick={() => this.updateUser()}>Update</Button>
            </div>
        )
    }
}