import app from "./server.js";
import { createServer } from "http";
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = 80;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
