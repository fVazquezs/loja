import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  constructor(props) {
    super(props)
    this.userService = props.userLoginDataService;
  }

  renderLogInButton() {
    if (this.userService.isUserLoggedIn()) {
      return <Button className='log-button' onClick={() => { this.userService.logOut(); this.props.forceHomeUpdate() }}>Log Out</Button>
    } else {
      return <Link to='/home'><Button className='log-button'>Log In</Button></Link>
    }
  }

  render() {
    let employees, categories, products, purchases, cart, profile;

    if (this.userService.isUserLoggedIn()) {
      products = (
        <LinkContainer to={'/products'}>
          <NavItem>
            <Glyphicon glyph='th' /> Products
      </NavItem>
        </LinkContainer>)
      if (this.userService.isUserClient()) {
        cart = (
          <LinkContainer to={'/cart'}>
            <NavItem>
              <Glyphicon glyph='shopping-cart' /> Cart
              </NavItem>
          </LinkContainer>
        );
        profile = (
          <LinkContainer to={'/profile'}>
            <NavItem>
              <Glyphicon glyph='user' /> Profile
              </NavItem>
          </LinkContainer>
        );
      }
      else if (this.userService.isUserEmployee()) {
        employees = (
          <LinkContainer to={'/employees'}>
            <NavItem>
              <Glyphicon glyph='user' /> Employees
              </NavItem>
          </LinkContainer>
        );
        categories = (
          <LinkContainer to={'/categories'}>
            <NavItem>
              <Glyphicon glyph='th-list' /> Categories
              </NavItem>
          </LinkContainer>
        );
        purchases = (
          <LinkContainer to={'/purchases'}>
            <NavItem>
              <Glyphicon glyph='shopping-cart' /> Purchases
              </NavItem>
          </LinkContainer>
        );
      }
    }

    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>loja</Link>
            {this.renderLogInButton()}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {employees}
            {categories}
            {purchases}
            {profile}
            {products}
            {cart}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
