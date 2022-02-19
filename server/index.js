const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Socket } = require("net");
const server = http.createServer(app);
const mongoHandler = require("./mongo/mongoHandler")



app.use(cors({
  origin:"*"
}))
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

let userMap = new Map();
let socketIdMap = new Map();

const controller = require("./mongo/mongoController")
app.use("/mongo",controller);

function findSocketId(username) {
  return socketId
}
io.on('connection', (socket) => {

  //Notification Part
  socket.on("connection-user-notification", msg => {
    userMap.set(socket.id, msg.id);
    socketIdMap.set(msg.id, socket.id);

    const MESSAGECONNECT = {
      salonname: msg.currentsalonName,
      userNickname: "SYSTEM",
      timeStamps: Date.now(),
      textMessage: "user " + msg.id + " connected"
    }
    console.log(MESSAGECONNECT);
    socket.broadcast.emit("server-to-client", MESSAGECONNECT);

  });
  socket.on("disconnect", (s) => {
    console.log("user disconnected", s)
    const username = userMap.get(socket.id);
    const MESSAGEDISCONNECT = {
      salonname: "Main",
      userNickname: "SYSTEM",
      timeStamps: Date.now(),
      textMessage: "user " + username + " disconnect"
    }

    userMap.delete(socket.id);
    socketIdMap.delete(username);
    console.log(MESSAGEDISCONNECT);
    socket.broadcast.emit("server-to-client", MESSAGEDISCONNECT);

  });
  socket.on("client-to-server-system", msg => {
    console.log("client-to-server-system->");
    socket.emit("server-to-client", msg);
  });


  //-------------------------------------

  //Main dial
  /*
  I reseave message via the "client-to-server" name 
  and I broadcast them to the client
  */

  socket.on("client-to-server", (msg, room) => {
    console.log("client-to-server ", msg);
    if (msg.salonname === "Main") {
      socket.broadcast.emit("server-to-client", msg);
    } else {
       console.log("emit return value", socket.to(room).emit("server-to-client", msg))
      mongoHandler.updateMessages(msg.salonname, msg)
    }

  });


  //-------------------------------------

  //Automatique Creation off Salon 
  /*
  An salon can container two or more users,
  You can't go in a salon you have to be invited
  */

  console.log("new salon ->")
  socket.on("new-salon", msg => {
    console.log('=========================')

    console.log("new salon ->", msg)
    console.log('=========================')
    for (let i = 0; i < msg.users.length; i++) {
      io.in(socketIdMap.get(msg.users[i])).socketsJoin(msg.salonName);
      console.log(socketIdMap.get(msg.users[i]))
      //socket.to(socketIdMap.get(msg.users[i])).emit("new-salon-create", msg);
    }

    mongoHandler.saveSalon(msg)

    socket.to(msg.salonName).emit("new-salon-create", msg);

  });

  //-------------------------------------

});



server.listen(8080, () => {
  console.log("listening on ports 8080");
});

