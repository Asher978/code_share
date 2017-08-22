import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  // toggle hamburger menu
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">codeshare</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to= "/">Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to= "/challenges">Challenges</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to= "/events">Events</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to= "/login">Sign In</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to= "/register">Create an account</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
