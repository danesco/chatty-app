import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name:'Anonymous'},
      messages: [],
    }
    this.messagePost = this.messagePost.bind(this);
    this.newUser = this.newUser.bind(this);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`);
  }

  componentDidMount(){

    this.socket.addEventListener("open", (evt) => {
      console.log("Connected to the Server");

});

    this.socket.onmessage = (message)=> {
      console.log("we are in app componentDidMount" ,message.data);
      let newMessage = JSON.parse(message.data);
      let oldMessages = this.state.messages;
      let newState = [...oldMessages, newMessage]
      this.setState({
        messages: newState
      })

    };
  }

  //this is to post a new message on the screen
  messagePost(message) {
    // this.newUser(message.username);
    // console.log("I AM THE CURRENT USER", this.state.currentUser.name)
    // let user = this.state.currentUser.name;

    let newMessage = {
      type:"postMessage",
      id: uuidv1(),
      username: this.state.currentUser.name,
      content: message
    }

    let messageString = JSON.stringify(newMessage);
    this.socket.send(messageString);
    let oldMessages = this.state.messages;
    // console.log("old mnessages ",oldMessages);
    let newState = [...oldMessages, newMessage]
    console.log("NEW STATE BRUH", newState);
  }

  //this is to change user
  newUser(e) {

     let newMessage = {
      type:"postNotification",
      id: uuidv1(),
      content: this.state.currentUser.name + " changed his name to " + e
    }
    this.socket.send(JSON.stringify(newMessage));
    this.setState({
      currentUser:{name: e}
    }, () => console.log("CURRENT", this.state))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Message messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} messagePost = {this.messagePost} newUser = {this.newUser}/>
      </div>
      );
    }
  }
export default App;

