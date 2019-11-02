import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { Button } from "react-bootstrap";

import "../css/list-user.css";

export class User extends Component {
  displayName = User.name

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };

    Axios.get('api/Users').then(res => {
      this.setState({ users: res.data, loading: false })
    })
  }

  addNew() {

  }

  renderUsersTable(users) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderUsersTable(this.state.users);

    return (
      <div>
        <h1>Users</h1>
        <Link to='/users/new'><Button variant="outline-primary" className="new-user-button" onClick={this.addNew()}>Add New</Button></Link>
        {contents}
      </div>
    );
  }
}
