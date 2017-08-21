import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="navWide">
          <li><Link to= "/">Home</Link></li>
          <li><Link to= "/LogIn">Log in</Link></li>
          <li><Link to= "/Register">Register</Link></li>
          <li><Link to= "/LogOut">Log out</Link></li>
          <li><Link to= "/ChallengesList">Challenges List</Link></li>
          <li><Link to="/EventList">Event List</Link></li>
        </ul>
    </nav>
    );
  };
}

export default Nav;
