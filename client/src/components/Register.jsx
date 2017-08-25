import React, {Component} from 'react';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      currentPage: 'register',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // const email = e.target.email;
    // const firstname = e.target.firstname;
    // const lastname = e.target.lastname;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state.username, this.state.password, this.state.email, this.state.firstname, this.state.lastname)}>
          <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
          <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleInputChange}/>
          <input type='email' name='email' value={this.state.email} placeholder='email' onChange={this.handleInputChange} />
          <input type='text' name='firstname' value={this.state.firstname} placeholder='First name' onChange={this.handleInputChange} />
          <input type='text' name='lastname' value={this.state.lastname} placeholder='Last name' onChange={this.handleInputChange} />                    
          <input type='submit' value='Submit' />
        </form>
      </div>
        
    )
  }
}

export default Register;