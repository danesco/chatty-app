// server.js

const express = require('express');
const WebSocket = require('ws')
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
const clients = [];

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  clients.push(ws);
  console.log(wss.clients.size)

  let userNum = {
    type:"userNum",
    num:wss.clients.size
  }

  wss.broadcast(JSON.stringify(userNum));

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.

  ws.on('message', (message) => {

    messageData = JSON.parse(message)

    switch(messageData.type){
      case "postMessage":
        messageData.type = "incomingMessage";
        break;
      case "postNotification":
        messageData.type = "incomingNotification";
        break;
    }

    clients.forEach(client => {
      client.send(JSON.stringify(messageData));
    })

  })

  ws.on('close', () => {
    let userNum = {
      type:"userNum",
      num:wss.clients.size
    }

    wss.broadcast(JSON.stringify(userNum));

    console.log('Client disconnected')});
});

