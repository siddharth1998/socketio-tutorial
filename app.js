// import {Server} from "socket.io";
const express = require('express');
const { createServer } = require('node:http');
const {join} = require("node:path");
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server,{connectionStateRecovery: {}});// mounting with the Node js script


app.get('/', (req, res) => {
  res.sendFile(join(__dirname,"index.html"));
});

io.on('connection', (socket) => {
    console.log("Connected",socket.id)
    socket.on('chat message', (msg) => {
    io.emit("chat message",msg)
      console.log('message: ' + msg,"from ",socket.id );
    });
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});