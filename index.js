const express = require("express");
const app = express();
const router = require("./routes/index");

//Archivos estaticos
app.use(express.static(__dirname + "/public"));

//Server
const http = require("http");
const port = process.PORT || 3003;
const server = http.createServer(app);

//Data
const msn = [];

//Socket
const { Server } = require("socket.io");
const io = new Server(server);

//Coneccion Socket
io.on("connection", (socket) => {
  console.log("a user connected");

  //Emitir un mensaje al clinete
  socket.emit("mensage_back", msn);
  //Escuchar
  socket.on("message_client", (data) => {
    console.log(data);
  });

  //Escuchar chat cliente
  socket.on("dataMsn", (data) => {
    msn.push(data);
    console.log(msn);
    // socket.emit("mensage_back", msn);
    io.sockets.emit("mensage_back", msn)
  });
});

app.use("/api", router);

server.listen(port, () => {
  console.log("Server run on port " + port);
});
