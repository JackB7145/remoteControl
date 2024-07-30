const express = require('express'); //Initialization
const {exec} = require('child_process');
const cors = require('cors')
const loudness = require('loudness');
var targetVolume = 20;

const app = express(); //Initialization
var volumeLevel = 20
app.use(cors())
app.use((req, res, next) => { //Middleware Function called everytime a request occurs
  console.log('Time: ', Date.now());
  next(); //Required, directs the program to the next middleware function or to the rest of the code
});

app.get('/power', (req, res) => {
  exec("shutdown /s /t 0")
});

app.get('/change/:vol', (req, res) => {
  loudness.setVolume(Number(req.params.vol))
  console.log(Number(req.params.vol))
});


// Listening for when a user connects to the API
const server = app.listen(3000, () => {
    const hostName = server.address().address
    console.log(`API listening on: http://100.65.12.151:3000`)

});
