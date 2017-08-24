import React, { Component } from 'react';
import Codemirror from '@skidding/react-codemirror';
import { Container, Row, Col } from 'reactstrap';
import Chat from './Chat';
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');
class SingleChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      status: 'disconnected',
      message: '',
      messages: [],
    }
  }

  componentDidMount() {
    socket.on('code', (data) => {   
      this.handleCodeFromSockets(data);
    });

    socket.on('message', (data) => {
      this.handleMessageFromSockets(data);
    });

    socket.emit('join room', {
      room: this.props.match.params.single,
    });
  }

  componentWillUnmount() {
    socket.emit('leave room', {
      room: this.props.match.params.single,
    });
  }

  handleCodeFromSockets = (data) => {
    this.setState({
      code: data.code,
    });
  }

  handleMessageFromSockets = (data) => {
    const updatedMessages = [...this.state.messages];
    updatedMessages.push(data);
    this.setState({
      messages: updatedMessages,
    });
  }

  handleUpdateCodeState = (text) => {
    this.setState({
      code: text,
    });
    socket.emit('coding', {
      room: this.props.match.params.single,
      code: this.state.code, 
    });
  }

  handleUpdateMessageState = (e) => {
    this.setState({message: e.target.value});
  }

  handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit('messaging', {
      room: this.props.match.params.single,
      message: this.state.message, 
    });
    this.setState({message: ''});
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
            <Chat handleSubmit={this.handleMessageSubmit} 
                  value={this.state.message} 
                  handleChange={this.handleUpdateMessageState}
                  messages={this.state.messages}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SingleChallenge;
