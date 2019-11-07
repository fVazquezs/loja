import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  renderLogInButton(){
    // if(this.props.logInDataService.isSignedIn()){
    //   return <Button>Log Out</Button>
    // } else {
    //   return <Link to='/home'><Button>Log In</Button></Link>
    // }
  }

  render() {
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
            <LinkContainer to={'/employees'}>
              <NavItem>
                <Glyphicon glyph='user' /> Employees
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/categories'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Categories
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/products'}>
              <NavItem>
                <Glyphicon glyph='th' /> Products
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/purchases'}>
              <NavItem>
                <Glyphicon glyph='shopping-cart' /> Purchases
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
