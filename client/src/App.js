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
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state ={
      auth: false,
      user: null,
      currentPage: 'home',
      currentMovieId: null,
    }
    this.state = {
      status: 'disconnected',
    }
    this.setPage = this.setPage.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  setPage(page) {
    console.log('click');
    this.setState({
      currentPage: page,
    })
  }
  decideWhichPage() {
    switch(this.state.currentPage) {
      case 'home' :
        return <Home />;
      case 'login':
        return <Login handleLoginSubmit={this.handleLoginSubmit} />
      case 'register':
        return <Register handleRegisterSubmit={this.handleRegisterSubmit} />
      default:
      break;
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
  handleLoginSubmit(e, username, password) {
    e.preventDefault();
    axios.post('/auth/login', {
      username, 
      password,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user
      });
    }).catch(err => console.log(err));
  }
  handleRegisterSubmit(e, username, password, email) {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
        currentPage: 'home',
      });
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <Router >
      <div className="App">
        <div className="none">
          <Header setPage={this.setPage}/>
          {this.decideWhichPage()}
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
