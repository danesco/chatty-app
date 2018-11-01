import React, {Component} from 'react';
import MessageList from './MessageList.jsx'


function Message(props) {
  console.log(props.messages);
  return (
      <main className="messages">
        <MessageList messages = {props.messages}/>
      </main>
    );
}

export default Message;