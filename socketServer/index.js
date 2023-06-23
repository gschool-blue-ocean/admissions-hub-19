import express from "express";
const app = express();
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
const server = createServer(app);

// create socket.io server instance to support websocket connection
import { Server } from "socket.io";

// origin will have to be refined for when keys are created
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors("*"));

app.get("*", (req, res) => {
  res.send("connected to socket server");
});

// current data is just used as a check so that clients dont play badmitten with "updates"
let currentData = null;

io.on("connection", (socket) => {
  // socket id is not good for key generation, we will need to use hashing
  console.log("a user connected", socket.id);
  socket.broadcast.emit("User connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit("User disconnected");
  });

  // think of this as an event listener, when a client emits an "update" it forwards
  // the payload to all the other clients who also have event listeners for the "content" event
  socket.on("update", (arg) => {
    if (arg != currentData) {
      currentData = arg;
      socket.broadcast.emit("content", arg);
    }
  });
});

// will need to set this via docker compose and env file
server.listen(port, "0.0.0.0", () => {
  console.log(`socket server listening on 0.0.0.0:${port}`);
});
