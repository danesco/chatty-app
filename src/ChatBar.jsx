import React from 'react';

function ChatBar(props) {
  function onSubmit(e){
    // props.messagePost
    //conditionally check the key that was pressed
    // if enter => submit beaviour

    if(e.key === "Enter"){
      console.log(document.querySelector('#name').value)
      let content = e.target.value;

      let userName = document.querySelector('#name').value ? document.querySelector('#name').value : 'Anonymous';
      let newMessage = {
              username: userName,
              content: content
      }

      props.messagePost(newMessage);
      e.target.value = '';
    }
  }

  function onNewUser(e){

    if(e.key === "Enter"){
      props.newUser(e.target.value)
    }


  }
  return (
        <footer className="chatbar">
          <input onKeyUp={(e) => onNewUser(e)} id="name" className="chatbar-username" placeholder={props.currentUser.name} />
          <input onKeyPress={(e) => onSubmit(e)} className="chatbar-message" placeholder="Enter a Message!" />
        </footer>

    );
}


export default ChatBar;