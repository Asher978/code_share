import React, { Component } from 'react';
import { 
  Collapse, 
  Navbar,
  NavbarToggler, 
  NavbarBrand, 
  Nav, 
  NavItem, 
  NavLink, 
  NavDropdown,
  DropdownToggle, 
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false,
    };
  }
  
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand><Link to= "/" onClick={() => this.props.setPage('home')}>codeshare</Link></NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to= "/" onClick={() => this.props.setPage('home')}>Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to= "/challenges" onClick={() => this.props.setPage('challenges')}>Challenges</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to= "/codeEditor" onClick={() => this.props.setPage('codeEditor')}>CodeEditor</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to= "/events" onClick={() => this.props.setPage('events')}>Events</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink></NavLink>
              </NavItem>
              <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                  Hi, {this.props.user}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="dropdown"><Link to= "/" onClick={() => this.props.setPage('logout')}>Log out</Link></DropdownItem>
                </DropdownMenu>
            </NavDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
