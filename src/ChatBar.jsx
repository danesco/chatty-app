import React from 'react';

function ChatBar(props) {
  return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" />
          <input className="chatbar-message" placeholder={props.currentUser.name} />
        </footer>

    );
}


export default ChatBar;