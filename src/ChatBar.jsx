
import React, {Component} from 'react';
class ChatBar extends Component {
  constructor(props){
    super(props);
    this.newMessage = this.newMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }
  newMessage(event){
    if(event.key === "Enter"){
      let content = event.target.value;
      this.props.messagePost(content);
      event.target.value = '';
    }
  }

  onNewUser(event){
    if(event.key === "Enter"){
        this.props.newUser(event.target.value)
      }
  }


  render(){


  return (
        <footer className="chatbar">
          <input onKeyUp={this.onNewUser} id="name" className="chatbar-username" placeholder={this.props.currentUser.name} />

          <input onKeyPress={this.newMessage} className="chatbar-message" placeholder="Enter a Message!" />
        </footer>

    );
  }

}

export default ChatBar;