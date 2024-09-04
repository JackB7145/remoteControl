const express = require('express'); //Initialization
const {exec} = require('child_process');
const http = require('http');
const cors = require('cors')
const loudness = require('loudness');
const { Server } = require('socket.io');
const puppeteer = require('puppeteer');
const ffi = require('ffi-napi');
const ref = require('ref-napi');

var x = 0
var y = 0

const user32 = ffi.Library('user32', {
  'SetCursorPos': ['bool', ['int', 'int']],
  'mouse_event': ['void', ['uint', 'uint', 'uint', 'uint', 'int']]
});

// Constants for mouse actions
const MOUSEEVENTF_MOVE = 0x0001;
const MOUSEEVENTF_LEFTDOWN = 0x0002;
const MOUSEEVENTF_LEFTUP = 0x0004;
const MOUSEEVENTF_RIGHTDOWN = 0x0008;
const MOUSEEVENTF_RIGHTUP = 0x0010;

user32.SetCursorPos(x, y);

const app = express()

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

  socket.on('mouseControl', (action) => {
    console.log(`MouseControl: ${action}`)
    if (action=="left"){
      x-=3
    }
    else if(action=="right"){
      x+=3
    }
    else if(action=="up"){
      y-=3
    }
    else if(action=="down"){
      y+=3
    }
    else if(action=="click"){
      user32.mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
      user32.mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
    }
    else{

    }
    user32.SetCursorPos(x, y);
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
