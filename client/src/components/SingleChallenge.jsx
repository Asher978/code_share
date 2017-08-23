import React, { Component } from 'react';
import Codemirror from '@skidding/react-codemirror';
import { Container, Row, Col } from 'reactstrap';
import Chat from './Chat';
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';
import io from 'socket.io-client';

class SingleChallenge extends Component {
  constructor(props) {
    super(props);

    this.socket = io();
    this.state = {
      code: '',
      status: 'disconnected',
      message: '',
      messages: [],
    }
  }

  componentDidMount() {
    this.socket.on('connect', this.connect);

    this.socket.emit('room', {
      room: this.props.match.params.single,
    });

    this.socket.on('coding', (data) => {   
      this.updateCodeFromSockets(data);
    });

    this.socket.on('chat messages', (data) => {
      this.updateMsgFromSockets(data);
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

  updateMsgFromSockets = (data) => {
    const updatedMessages = [...this.state.messages];
    updatedMessages.push(data);
    this.setState({
      messages: updatedMessages,
    });
    console.log('front-end message update', this.state.messages);
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

  handleSubmit = (e) => {
    console.log('clicked');
    e.preventDefault();
    this.socket.emit('message chat', {
      room: this.props.match.params.single,
      message: this.state.message, 
    });
    this.setState({message: ''});
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({message: e.target.value});
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
      <Container>
        <Row>
          <Col md="10">
            <h1>Challenge</h1>
            <Codemirror
              value={this.state.code}
              onChange={this.handleUpdateCodeState}
              options={options}
            />
            <p>Message: {this.state.message}</p>
          </Col>
          <Col md="2">
            <Chat handleSubmit={this.handleSubmit} 
                  value={this.state.message} 
                  handleChange={this.handleChange}
                  messages={this.state.messages}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SingleChallenge;
