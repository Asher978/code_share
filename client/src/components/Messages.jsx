import React from 'react';
import Message from './Message';

const Messages = (props) => {
  return (
    <div className="messages">
      {props.messages.map((message, i) => {
        return ( 
          <Message 
            key={i}
            user={message.user}
            text={message.text} 
          />
        )
      })}
    </div>
  )
}

export default Message;