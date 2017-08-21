import React, { Component } from 'react';
import Nav from './Nav';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


  const Header = () => {
    return (
      <header>
        <h1>Code-Share</h1>
        <Nav />
      </header>
    );
  }

export default Header;