import React, { Component } from 'react';
import { 
  Button, 
  Form, 
  FormGroup, 
  Input 
} from 'reactstrap';

class MessageChatForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const message = {
      user: this.props.user,
      text: this.state.text,
    }
    this.props.handleMessageSubmit(message);
    console.log(message);
    this.setState({text: ''});
  }

  handleTextChange = (e) => {
    this.setState({text: e.target.value});
  }

  render() {
    return (
      <div>
        <Form onSubmit={(e) => this.handleFormSubmit(e)} inline>
          <FormGroup>
            <Input type="text" className="textbox" value={this.state.text} onChange={this.handleTextChange} placeholder="Type Message Here" />
            <Button color="primary" className="chatbutton">Send</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default MessageChatForm;