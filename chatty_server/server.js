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

wss.on('connection', (ws) => {
  console.log('Client connected');

  clients.push(ws);

  console.log(clients.length)

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (message) => {

    messageData = JSON.parse(message)

    clients.forEach(client => {
      console.log(messageData.type);
      if (client.readyState === WebSocket.OPEN) {
        switch(messageData.type){
          case "postMessage":
            messageData.type = "incomingMessage";
            client.send(JSON.stringify(messageData));
            break;
          case "postNotification":
            messageData.type = "incomingNotification";
            client.send(JSON.stringify(messageData));
            break;
        }
      }
    })

  })
});

