import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const Chat = (props) => {
  return (
    <div className="chatbox">
      <div className="users"></div>
      <div className="chat">
        <ul>
          {props.messages.map((message) => {
            return <li>{message}</li>
          })}
        </ul>
      </div>
      <Form onSubmit={(e) => props.handleSubmit(e)} inline>
        <FormGroup>
          <Input type="text" className="textbox" value={props.value} onChange={(e) => props.handleChange(e)} placeholder="Type Message Here" />
          <Button color="primary" className="chatbutton">Send</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default Chat;