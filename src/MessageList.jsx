import React, {Component} from 'react';


function MessageList(props){
  const messageList = props.messages.map(message => {
    switch(message.type){
      case "incomingNotification":
        return (
          <div key={message.id}>
             <div className="notification">
               <span className="message system">{message.content}</span>
            </div>
          </div>
        );
        break;
      case "incomingMessage":
        return (
          <div key={message.id}>
            <div className="message">
              <span className="message-username">{message.username}</span>
              <span className="message-content">{message.content}</span>
            </div>
          </div>
        );
        break;
    }
  });
  return <div>{messageList}</div>;
}

export default MessageList;
