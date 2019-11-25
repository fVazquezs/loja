import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/js/Home';
import { Products } from './components/js/Products';
import { Cart } from './components/js/Cart';
import { ListEmployee, CreateEmployee, EditEmployee, DeleteEmployee } from './entities/Employee/js';
import { ListCategory, CreateCategory, EditCategory, DeleteCategory } from './entities/Category/js';
import { ListProduct, CreateProduct, EditProduct, DeleteProduct } from './entities/Product/js';
import { UserLoginDataService } from "./service/user-login-data-service";
import { CartService } from "./service/cart-service.js";

export default class App extends Component {
  displayName = App.name

  constructor(props) {
    super(props);
    this.userLoginDataService = new UserLoginDataService();
    this.cartService = new CartService();
  }

  forceHomeUpdate = () => {
    this.forceUpdate();
  }

  routes = () => {
    if (!this.userLoginDataService.isUserLoggedIn()) {
      return <Route path='/' render={props => <Home {...props} forceHomeUpdate={this.forceHomeUpdate} userLoginDataService={this.userLoginDataService} />} />
    } else if (this.userLoginDataService.isUserLoggedIn() && this.userLoginDataService.isUserEmployee()) {
      return (
        <div>
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

          {/* Product */}
          <Route exact path='/products' component={ListProduct} />
          <Route exact path='/products/new' component={CreateProduct} />
          <Route exact path='/products/edit/:id' component={EditProduct} />
          <Route exact path='/products/delete/:id' component={DeleteProduct} />
        </div>
      )
    } else if (this.userLoginDataService.isUserLoggedIn() && this.userLoginDataService.isUserClient()) {
      return (
        <div>
          <Route exact path='/products' render={props => <Products {...props} cartService={this.cartService} />} />
          <Route exact path='/cart' render={props => <Cart {...props} cartService={this.cartService} />} />
        </div>
      )
    }
  }

  render() {
    return (
      <Layout forceHomeUpdate={this.forceHomeUpdate} userLoginDataService={this.userLoginDataService}>
        {this.routes()}
      </Layout>
    );
  }
}
