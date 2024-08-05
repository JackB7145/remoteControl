const express = require('express'); //Initialization
const {exec} = require('child_process');
const http = require('http');
const cors = require('cors')
const loudness = require('loudness');
const { Server } = require('socket.io');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User Connected:', socket.id, 'Total connections:', io.engine.clientsCount);
  console.log('Headers:', socket.handshake.headers);

  socket.on('power', (data) => {
    exec("shutdown /s /t 0")
  });

  socket.on('volume', (vol) => {
    console.log(Number(vol))
    loudness.setVolume(Number(vol))
  })

  socket.on('brightness', (bright) => {
    console.log(bright)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
