import React from 'react';

const Message = (props) => {
  return (
    <div className="message">
      <strong>{props.user}: </strong>
      <em>{props.text}</em>
    </div>
  )
}

export default Message;