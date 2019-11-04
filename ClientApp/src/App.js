import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListEmployee, CreateEmployee, EditEmployee, DeleteEmployee } from './entities/Employee/js';
import { ListCategory, CreateCategory, EditCategory, DeleteCategory } from './entities/Category/js';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />

        {/* Employee */}
        <Route exact path='/employees' component={ListEmployee} />
        <Route exact path='/employees/new' component={CreateEmployee} />
        <Route exact path='/employees/edit/:id' component={EditEmployee} />
        <Route exact path='/employees/delete/:id' component={DeleteEmployee} />

        {/* Category */}
        <Route exact path='/categories' component={ListCategory} />
        <Route exact path='/categories/new' component={CreateCategory} />
        <Route exact path='/categories/edit/:id' component={EditCategory} />
        <Route exact path='/categories/delete/:id' component={DeleteCategory} />
      </Layout>
    );
  }
}
