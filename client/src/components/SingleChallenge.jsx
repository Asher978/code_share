import React, { Component } from 'react';
import Codemirror from '@skidding/react-codemirror';
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';
import io from 'socket.io-client';
import axios from 'axios';

class SingleChallenge extends Component {
  constructor(props) {
    super(props);

    this.socket = io();
    this.state = {
      code: '',
      status: 'disconnected',
      codeResult: '',
    }
    this.handleExecuteCode = this.handleExecuteCode.bind(this);
  }

  componentDidMount() {
    this.socket.on('connect', this.connect);
    this.socket.emit('room', {
      room: this.props.match.params.single,
    });
    this.socket.on('coding', (data) => {   
      this.updateCodeFromSockets(data);
    });
  }

  componentWillUnmount() {
    this.socket.on('disconnect', this.disconnect);
    this.socket.emit('leave room', {
      room: this.props.match.params.single,
    });
  }

  updateCodeFromSockets = (data) => {
    this.setState({
      code: data.code,
    });
  }

  handleUpdateCodeState = (text) => {
    this.setState({
      code: text,
    });
    this.socket.emit('code room', {
      room: this.props.match.params.single,
      code: this.state.code, 
    });
  }

  // evaluating the code from the editor and setting state of the result
  handleExecuteCode = (code) => {
    if(code) {
      axios.post('/code', {
        code: code,
      }).then(res => {
        console.log('frontend received--->', res)
        this.setState({ codeResult: res.data.data })
      }).catch(err => console.log(err));
    }    
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
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai'
    }

    return (
      <div>
        <Codemirror
          value={this.state.code}
          onChange={this.handleUpdateCodeState}
          options={options}
        />
        <button onClick={() => this.handleExecuteCode(this.state.code)}>EXECUTE</button>
        <textarea cols='30' rows='5' value={'Result: ' + this.state.codeResult} />
      </div>
    )
  }
}

export default SingleChallenge;