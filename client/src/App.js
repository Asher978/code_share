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
      // redirect: false
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
        // redirect: true,
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

  decideWhichPage() {
    console.log('in decideWhichPage function');
    switch(this.state.currentPage) {
      case 'home':
        console.log('home page');
        return <Route exact path= "/" component={Home} />
      case 'challenges':
      console.log('challenges page');
        return <Route exact path="/challenges" component={Challenges} />
      case 'events':
      console.log('event page');
        return <Route exact path="/events" component={Events} />
      case 'login':
      console.log('login page');
      if(!this.state.auth) {
      //  return <Route exact path="/login" render={() => (
        return <Login handleLoginSubmit={this.handleLoginSubmit} />
        } else return <Route exact path= "/" component={Home} />
      case 'register':
        if(!this.state.auth) {
          console.log('register page');
          return <Register handleRegisterSubmit={this.handleRegisterSubmit} />        
      } else return <Route path="/login" component={Login} />
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
             {this.decideWhichPage()} 
          <Route exact path="/challenges/:single" component={SingleChallenge} />
          <Footer />
      </div>
    </Router>
    );
  }
}

export default App;



  // return <Login handleLoginSubmit={this.handleLoginSubmit} />
  //       } 
  //        return <Route exact path= "/" component={Home} />
  //       }  


  //  return <Route exact path="/login" render={() => (
  //          this.state.auth ? (
  //           <Redirect to="/home" />
  //         ) : (
  //           <Login handleLoginSubmit={this.handleLoginSubmit} />
  //         )
  // login redirect to home 
  // register redirect to sign in





   {/*this.state.auth ? (
            <Redirect to='/' />
          ) : (
            <Login handleLoginSubmit={this.handleLoginSubmit} />
          )
        )}/>*/}