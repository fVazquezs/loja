import React, { Component } from 'react';
import Axios from 'axios';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };

    Axios.get('api/Users').then(res => {
      this.setState({ users: res.data, loading: false })
    })
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
        {contents}
      </div>
    );
  }
}
