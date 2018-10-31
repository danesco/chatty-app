import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
const uuidv1 = require('uuid/v1');



// const data = {
//   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       id:1,
//       username: "Bob",
//       content: "Has anyone seen my marbles?",
//     },
//     {
//       id:2,
//       username: "Anonymous",
//       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ]
// }

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

    this.socket.addEventListener("message", (message) => {

      let newMessage = JSON.parse(message.data);

      let oldMessages = this.state.messages;
      let newState = [...oldMessages, newMessage]
      this.setState({
        messages: newState
      })

    })


});
  }

  messagePost(message) {
    this.newUser(message.username);

    console.log("I AM THE CURRENT USER", this.state.currentUser.name)

    let newMessage = {
      id: uuidv1(),
      username: message.username,
      content: message.content
    }

    let messageString = JSON.stringify(newMessage);

    this.socket.send(messageString);


    let oldMessages = this.state.messages;
    let newState = [...oldMessages, newMessage]
    this.setState({
      messages: newState
    });
  }

  newUser(e) {

    this.setState({
      currentUser:{name: e}
    }, () => console.log("CURRENT USER", this.state.currentUser.name))
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

