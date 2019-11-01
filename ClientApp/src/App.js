import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { User } from './components/User';
import { Counter } from './components/Counter';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/users' component={User} />
      </Layout>
    );
  }
}
