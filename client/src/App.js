import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import Header from './components/Header';
import Footer from './components/Footer';


class App extends Component {
  constructor() {
    super();

    this.state = {
      status: 'disconnected',
    }
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
  }

  connect = () => {
    this.setState({
      status: 'connected',
    });
  }

  disconnect = () => {
    this.setState({
      status: 'disconnected',
    });
  }

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
