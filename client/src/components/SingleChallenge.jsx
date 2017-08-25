import React, { Component } from 'react';
import Codemirror from '@skidding/react-codemirror';
import { Container, Row, Col } from 'reactstrap';
import Chat from './Chat';
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';
import io from 'socket.io-client';
import axios from 'axios';
import fileSaver from 'file-saver';
import challenge from '../challenge/challenge';


const socket = io.connect('http://localhost:3001');
class SingleChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      codeResult: '',
      message: '',
      messages: [],
      fileName: '',
      test: `${challenge[`${this.props.match.params.single}`-1].test}`,
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

  // evaluating the code from the editor and setting state of the result
  handleExecuteCode = (code, test) => {
    if(code + test) {
      axios.post('/code', {
        code: code + test,
      }).then(res => {
        let obj = res.data.data;
        console.log('frontend received--->', obj)
        if (obj.__flags) {
          this.setState({ codeResult: 'Test Passed!' })
        } else {
          this.setState({ codeResult: res.data.data })
        }
      }).catch(err => console.log(err));
    }    
  }


  handleUpdateMessageState = (e) => {
    this.setState({message: e.target.value});
  }
  // handle for saving the user code
  handleSaveCode = (code, filename) => {
    console.log(code, filename);
    let blob = new Blob([code], {type: 'text/javascript'});
    fileSaver.saveAs(blob, filename+'.js');
  }
  
  // handle for the change on filename input
  handleSaveCodeChange = (e) => {
    this.setState({ fileName: e.target.value })
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
      <div>
        <Container>
          <Row>
            <Col md="10">
              <h1>Challenge</h1>
              <p>{challenge[`${this.props.match.params.single}`-1].chall}</p>
              <Codemirror
                value={this.state.code}
                onChange={this.handleUpdateCodeState}
                options={options}
              />
              <button onClick={() => this.handleExecuteCode(this.state.code, this.state.test)}>EXECUTE</button>
              <textarea cols='30' rows='5' value={'Result: ' + this.state.codeResult} />
              <input type="text" value={this.state.fileName} 
              placeholder="Enter file name"
              onChange={this.handleSaveCodeChange}/>
              <button onClick={() => this.handleSaveCode(this.state.code, this.state.fileName)}>
              Save Code</button>  
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
      </div>
    )
  }
}

export default SingleChallenge;