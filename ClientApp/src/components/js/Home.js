import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import '../css/Home.css';

export class Home extends Component {
  displayName = Home.name

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      createAccountModal: false,
      newName: '',
      newEmail: '',
      newCpf: '',
      newPassword: '',
      newCep:'',
      newStreet: '',
      newNumber: 0,
      newDistrict: '',
      newCity: '',
      newState: '',
      newComplement: '',
      newBirthDate: ''
    };
  }

  logIn = async (e) => {
    e.preventDefault();
    await this.props.userLoginDataService.logIn({ email: this.state.email, password: this.state.password })
    this.props.forceHomeUpdate();
  }

  renderCreateAccountModal() {
    return (
      <Modal show={this.state.createAccountModal} onHide={() => this.setState({ createAccountModal: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.createProduct}>
            <label className="new-client-form-label" htmlFor="new-client-name">
              Name:
              <input className="new-client-form-input" id="new-client-name" type="text" name="name" onChange={(e) => this.setState({ newName: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-email">
              Email:
              <input className="new-client-form-input" id="new-client-email" type="text" name="email" onChange={(e) => this.setState({ newEmail: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-cpf">
              CPF:
              <input className="new-client-form-input" id="new-client-cpf" type="text" name="cpf" onChange={(e) => this.setState({ newCpf: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-password">
              Password:
              <input className="new-client-form-input" id="new-client-password" type="text" name="password" onChange={(e) => this.setState({ newPassword: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-cep">
              CEP:
              <input className="new-client-form-input" id="new-client-cep" type="text" name="cep" onChange={(e) => this.setState({ newCep: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-street">
              Street:
              <input className="new-client-form-input" id="new-client-street" type="text" name="street" onChange={(e) => this.setState({ newStreet: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-number">
              Number:
              <input className="new-client-form-input" id="new-client-number" type="text" name="number" onChange={(e) => this.setState({ newNumber: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-district">
              District:
              <input className="new-client-form-input" id="new-client-district" type="text" name="district" onChange={(e) => this.setState({ newDistrict: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-city">
              City:
              <input className="new-client-form-input" id="new-client-city" type="text" name="city" onChange={(e) => this.setState({ newCity: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-state">
              State:
              <input className="new-client-form-input" id="new-client-state" type="text" name="state" onChange={(e) => this.setState({ newState: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-complement">
              Complement:
              <input className="new-client-form-input" id="new-client-complement" type="text" name="complement" onChange={(e) => this.setState({ newComplement: e.target.value })} />
            </label>
            <label className="new-client-form-label" htmlFor="new-client-birth-date">
              Birth Date:
              <input className="new-client-form-input" id="new-client-birth-date" type="date" name="birth-date" onChange={(e) => this.setState({ newBirthDate: e.target.value })} />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({ createAccountModal: false })}>Close</Button>
          <Button bsStyle="primary" onClick={() => {
            this.setState({ createAccountModal: false })
          }} >Create</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        {this.renderCreateAccountModal()}
        <form onSubmit={this.logIn}>
          <label className="user-login-form-label" htmlFor="user-login-email">
            Email:
            <input className="user-login-form-input" id="user-login-email" type="text" name="name" onChange={(e) => this.setState({ email: e.target.value })} />
          </label>
          <label className="user-login-form-label" htmlFor="user-login-password">
            Password:
            <input className="user-login-form-input" id="user-login-password" type="password" name="price" onChange={(e) => this.setState({ password: e.target.value })} />
          </label>
          <div className="home-screen-buttons">
            <Button bsStyle="primary" type="submit">Login</Button>
            <Button bsStyle='link' onClick={() => this.setState({ createAccountModal: true })}>Create Account</Button>
          </div>
        </form>
      </div>
    );
  }
}
