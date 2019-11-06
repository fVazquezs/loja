import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import '../css/Home.css';

export class Home extends Component {
  displayName = Home.name

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  onSignInClick = () => {
    this.props.logInDataService.signIn();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createProduct}>
          <label className="user-login-form-label" htmlFor="user-login-email">
            Email:
            <input className="user-login-form-input" id="user-login-email" type="text" name="name" onChange={(e) => this.setState({ email: e.target.value })} />
          </label>
          <label className="user-login-form-label" htmlFor="user-login-password">
            Password:
            <input className="user-login-form-input" id="user-login-password" type="password" name="price" onChange={(e) => this.setState({ password: e.target.value })} />
          </label>
          <div className="create-product-button">
            <Button bsStyle="primary" type="submit">Login</Button>
          </div>
        </form>

        <Button bsStyle='danger' onClick={this.onSignInClick}>Log In With Google</Button>
      </div>
    );
  }
}
