import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { User, CreateUser, EditUser, DeleteUser } from './entities/User/js';
import { Counter } from './components/Counter';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route exact path='/users' component={User} />
        <Route exact path='/users/new' component={CreateUser} />
        <Route exact path='/users/edit/:id' component={EditUser} />
        <Route exact path='/users/delete/:id' component={DeleteUser} />
      </Layout>
    );
  }
}
