import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';


const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id:1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id:2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: data.currentUser,
      messages: [],
    }
    this.messagePost = this.messagePost.bind(this);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`);
  }

  componentDidMount(){

    this.socket.addEventListener("open", (evt) => {
    console.log("Connected to the Server");
});
  }

  messagePost(message) {
    let lastMessageID = this.state.messages[this.state.messages.length-1].id;
    console.log(lastMessageID)
    console.log(message)

    let newMessage = {
      id: lastMessageID + 1,
      username: message.username,
      content: message.content
    }

    let messageString = JSON.stringify(newMessage);

    this.socket.send(messageString);

    // let oldMessages = this.state.messages;
    // let newState = [...oldMessages, newMessage]
    // this.setState({
    //   messages: newState
    // })
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Message messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} messagePost = {this.messagePost}/>
      </div>
      );
    }
  }
export default App;

