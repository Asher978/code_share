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
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
      currentPage: 'home',
    }
  }

  setPage = (page) => {
    console.log('click');
    this.setState({
      currentPage: page,
    })
  }

  handleLoginSubmit = (e, username, password) => {
    console.log('handle login')
    e.preventDefault();
    axios.post('/auth/login', {
      username, 
      password,
    }).then(res => {
     console.log(res ,"handlesLoginSubmit");      
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
        currentPage: 'home',
      });
    }).catch(err => console.log(err));
  }

  handleRegisterSubmit = (e, username, password, email) => {
    console.log(username, password, email);
    console.log('handle submit')
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
        currentPage: 'login',
      });
    }).catch(err => console.log(err));
  }

  decideAuth() {
    console.log('in decideWhichPage function');
    switch(this.state.currentPage) {
      case 'login':
      if(!this.state.auth) {
        return <Login handleLoginSubmit={this.handleLoginSubmit} />
        } else return <Redirect to="/" />
      case 'register':
        if(!this.state.auth) {
          return <Register handleRegisterSubmit={this.handleRegisterSubmit} />        
      } else return <Redirect to="/login" />
      case 'logout':
        return (this.logOut());
      default:
        break;
    }
  }

  logOut = () => {
    console.log('logged out');
    axios.get('/auth/logout')
      .then(res => {
        console.log(res);
        this.setState({
          auth: false,
          currentPage: 'home',
        });
      }).catch(err => console.log(err));
  }


  render() {
    return (
      <Router >
      <div className="App">
          <Navigation setPage={this.setPage} />
             {this.decideAuth()} 
          <Route exact path= "/" component={Home} />
          <Route exact path="/challenges" component={Challenges} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/challenges/:single" component={SingleChallenge} />
          <Footer />
      </div>
    </Router>
    );
  }
}

export default App;

