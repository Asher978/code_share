import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import Events from './components/EventList';
import Challenges from './components/ChallengesList';
import CodeEditor from './components/CodeEditor';
import Login from './components/Login';
import Register from './components/Register';
import SingleChallenge from './components/SingleChallenge';
import MainNav from './components/MainNav';
import NotLoggedNav from './components/NotLoggedNav';
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

  handleRegisterSubmit = (e, username, password, email, firstname, lastname) => {
    console.log(username, password, email, firstname, lastname);
    console.log('handle submit')
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email,
      firstname,
      lastname,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
        currentPage: 'login',
      });
    }).catch(err => console.log(err));
  }

decideNav() {
     switch (this.state.auth) {
       case true: 
       console.log(this.state.auth)
        return (
          <div>
            <MainNav setPage={this.setPage} /> 
            <Redirect to="/" />
          </div>
        )
       case false:
        return <NotLoggedNav setPage={this.setPage} />
       default:
        break; 
     }
   }

  decideAuth() {
    console.log('in decideWhichPage function');
    switch(this.state.currentPage) {
      case 'login':
      console.log('logged in')
      if(!this.state.auth) {
        console.log("if statement")
        return <Login handleLoginSubmit={this.handleLoginSubmit} />
      } 
      break;
      case 'register':
        if(!this.state.auth) {
          return <Register handleRegisterSubmit={this.handleRegisterSubmit} />        
      } 
      break;
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
          {this.decideNav()}
          {this.decideAuth()} 
          <Route exact path= "/" component={Home} />
          <Route exact path="/challenges" component={Challenges} />
          <Route exact path="/codeEditor" component={CodeEditor} />          
          <Route exact path="/events" render={(match) => <Events id={this.state.user.id} match={match}/>}/>
          <Route exact path="/challenges/:single" component={SingleChallenge} />
          <Footer />
      </div>
    </Router>
    );
  }
}

export default App;

