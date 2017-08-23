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
          </Col>
          <Col md="2">
            <Chat />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SingleChallenge;
