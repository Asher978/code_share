import React, { Component } from 'react';
import Codemirror from 'react-codemirror';  
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';

class SingleChallenge extends Component {
  constructor() {
    super();

    this.state = {
      code: '',
    }
  }

  handleUpdateCodeState = (code) => {
    this.setState({
      code: code,
    });
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai'
    }
    
    return (
      <Codemirror
        value={this.state.code}
        onChange={this.handleUpdateCodeState}
        options={options} 
      />
    )
  }
}



export default SingleChallenge;
