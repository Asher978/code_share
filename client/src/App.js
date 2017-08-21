import React, { Component } from 'react';
import './App.css';
import Header from './common/Header';
import Footer from './common/Footer';


class App extends Component {
  render() {
    return (
      <Router >
      <div className="App">
        <Header />
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
