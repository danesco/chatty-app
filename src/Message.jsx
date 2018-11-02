import React, {Component} from 'react';
import MessageList from './MessageList.jsx'


function Message(props) {
  return (
      <main className="messages">
        <MessageList messages = {props.messages}/>
      </main>
    );
}

export default Message;