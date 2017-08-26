import React from 'react';
import Users from './Users';
import Messages from './Messages';
import MessageChatForm from './MessageChatForm';

const Chat = (props) => {
  return (
    <div className="chat">
      <Users users={props.users} />
      <Messages 
        messages={props.messages}
        user={props.user} 
      />
      <MessageChatForm 
        handleMessageSubmit={props.handleMessageSubmit} 
        user={props.user}
      />
    </div>
  )
}

export default Chat;