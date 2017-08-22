import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Events from './components/EventList';
import Challenges from './components/ChallengesList';
import Login from './components/Login';
import Register from './components/Register';
import SingleChallenge from './components/SingleChallenge';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';

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
        <div className="none">
          <Header />
          <Route exact path= "/" component={Home}/>
          <Route path="/challenges" component={Challenges} />
          <Route path="/events" component={Events} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/challenges/:single" component={SingleChallenge} />
          <Footer />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
