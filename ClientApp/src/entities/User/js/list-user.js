import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { UserDataService } from '../service/user-data-service';
import { Button } from "react-bootstrap";

import "../css/list-user.css";

export class User extends Component {
  displayName = User.name

  constructor(props) {
    super(props);
    this.userDataSevice = new UserDataService();

    this.state = { users: [], loading: true };

  }

  async componentDidMount() {
    const users = await this.userDataSevice.getAllUsers();
    this.setState({ users: users, loading: false })
  }

  renderUsersTable(users) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
              <td><Link to={`/users/edit/${user.id}`}><Button>Edit</Button></Link></td>
              <td><Link to={`/users/delete/${user.id}`}><Button>Delete</Button></Link></td>
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
        <Link to='/users/new'><Button variant="outline-primary" className="new-user-button" >Add New</Button></Link>
        {contents}
      </div>
    );
  }
}
