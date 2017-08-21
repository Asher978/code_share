import React, { Component } from 'react';
import { Link } from 'react-router-dom';

  const Nav = () => {
    return (
      <nav>
        <ul className="navWide">
          <li><Link to= "/">Home</Link></li>
          <li><Link to= "/login">Log in</Link></li>
          <li><Link to= "/register">Register</Link></li>
          <li><Link to= "/logout">Log out</Link></li>
          <li><Link to= "/challenges">Challenges</Link></li>
          <li><Link to="/events">Events</Link></li>
        </ul>
    </nav>
    );
  }

export default Nav;
