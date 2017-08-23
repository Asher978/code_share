import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const Chat = (props) => {
  return (
    <div className="chatbox">
      <div className="users"></div>
      <div className="chat"></div>
      <Form inline>
        <FormGroup>
          <Input type="text" className="textbox" placeholder="Type Message Here" />
          <Button color="primary" className="chatbutton">Send</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default Chat;