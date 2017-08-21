import React from 'react';
import Nav from './Nav';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


  class Header extends Component {
  render() {
    return (
      <header>
        <h1>Code-Share</h1>
        <Nav />
      </header>
    );
  };
}




export default Header;