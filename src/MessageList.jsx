import React, {Component} from 'react';


function MessageList(props){
  const messageList = props.messages.map(message =>
        <div key={message.key}>
          <div className="message">
            <span className="message-username">{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        </div>
  )
  return <div>{messageList}</div>;
}

export default MessageList;