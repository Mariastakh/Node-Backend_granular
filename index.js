var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
//path = require('path'),
var io = require ('socket.io')(http);
var osc = require('node-osc');
var shortid =require('js-shortid');

app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));

http.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});


var client = new osc.Client('127.0.0.1', 12345);

var oscServer = new osc.Server(11114, '0.0.0.0');

//-------- SOCKETS CODE -----
io.on('connection', (socket) => {

  console.log('A new WebSocket conection has been established');
  var newId = shortid.gen();
  client.send('/New-User-Joined', newId);

  socket.on('disconnect', function(){
        console.log('user disconnected');
        client.send('/UserDisconnected', newId);
      });

    oscServer.on('message', (msg) =>{
     // console=.log("TUIO message:");
     filesize = msg[2][1];
     io.emit('filesize',  {
              //  uid: time,
                message: filesize
            });
      console.log(filesize);

    
      
});



socket.on('roughness', (payload) => {
		//user = payload.uid;
		message = payload.message;
		console.log(newId + " roughness: " + message);
		//client.send('/oscAddress', user);
		//client.send('/userID', newId);
		client.send('/Grain-Size', message, newId);
	});

socket.on('speed', (payload) => {
    //user = payload.uid;
    message = payload.message;
    console.log(newId + " speed: " + message);
    //client.send('/oscAddress', user);
    //client.send('/userID', newId);
    client.send('/Speed', message, newId);
  });

socket.on('r', (payload) => {
    //user = payload.uid;
    message = payload.message;
    console.log(newId + " Rotation: " + message);
    //client.send('/oscAddress', user);
    //client.send('/userID', newId);
    client.send('/Location', message, newId);
  });

 	});
