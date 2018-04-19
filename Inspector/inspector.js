
const io = require('socket.io-client');
console.log(io);
const dev = io.connect('http://localhost:3000');
    dev.on('connect',(data)=>{
        console.log('connect');
        console.log('Welcome to the WonderQ realTime logger!');
        dev.emit('join',{text:`Logger ${dev.id} has joined the fray.`,id:dev.id,type:'inspector'});
    });

    dev.on('info',(data)=>{
        console.log(data);
    });