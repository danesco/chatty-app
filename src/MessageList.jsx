import React, {Component} from 'react';


function MessageList(props){
  const messageList = props.messages.map(message => {
    // console.log(message.content)

    switch(message.type){
      case "incomingNotification":
        return
          (<div key={message.id}>
             <div className="notification">
               <span className="message system">{message.content}</span>
            </div>
          </div>)
        break;
      case "incomingMessage":
        console.log(message.content)
        return
          (<div key={message.id}>
            <div className="message">
              <span className="message-username">{message.username}</span>
              <span className="message-content">{message.content}</span>
            </div>
          </div>)
        break;
    }
  })
  return <div>{messageList}</div>;
  console.log(messageList)
}

export default MessageList;
