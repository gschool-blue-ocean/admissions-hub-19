const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use(cors("*"));

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3175, () => {
  console.log("socket server listening on 127.0.0.1:3175");
});
