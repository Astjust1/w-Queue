const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const wonderQ = require('../WonderQMod/messageStore');

app.get('/',(req,res,next)=>{
    console.log(wonderQ);
});




let inspectorID =[];
let clients = [];
let consumerList = [];
let producerList = [];
io.sockets.on('connection',(client)=>{
    //console.log(client);
    clients.push(client);

    client.on('disconnect',()=>{
        console.log(`Client ${client.id} is disconnecting`);

        //remove client
        let i = clients.indexOf(client);
        clients.splice(i, 1);
        
        //Keep count of consumers and producers and inspectors
        let j = consumerList.indexOf(client);
        let k = producerList.indexOf(client);
        let l = inspectorID.indexOf(client);
        //console.log(j,k,l);
        if(j >= 0){
            wonderQ.decrementCount('consumer');
            consumerList.splice(j,1);
        }else if (k >= 0){
            wonderQ.decrementCount('producer');
            producerList.splice(k,1);
        }else if (l >= 0){
            inspectorID.splice(l,1);
        }
        inspectorID.forEach((client) => {
            io.to(client.id).emit('info', `Someone has left Consumers: ${wonderQ._numConsumers} Producers ${wonderQ._numProducers}`);
        });
    });
})
io.on('connection',(client)=>{
    console.log('Client connected...');

    client.on('join',(data)=>{
        console.log(data.text);
        //client.emit('info','Welcome!');
        client.join(data.id);
        wonderQ.incrementCount(data.type);
        if(data.type === 'consumer'){
            //console.log(client);
            consumerList.push(client);
            
        }else if(data.type === 'producer'){
            producerList.push(client);
        }else{
            inspectorID.push(client);
        }
        inspectorID.forEach((client) => {
            io.to(client.id).emit('info', ` Someone has joined the party Consumers: ${wonderQ._numConsumers} Producers ${wonderQ._numProducers}`);
        });
        //wonderQ.incrementCount(data.type);
    })

    client.on('addingMessage',(data)=>{
        console.log(`Message added from Producer:${data.id}`)
        const id = wonderQ.addMessage(data.text,data.duration);
        console.log(id);
        console.log(data.id);
        client.emit('messageAdded',`Message ${id} with text: ${data.text} has been added.`);
        inspectorID.forEach((client) => {
            io.to(client.id).emit('info', `Message added from Producer:${data.id}. Message ${id} has text: ${data.text}. `);
        });
    })

    client.on('consume',(data)=>{
        console.log(`Consumer ${data.id} is consuming message ${data.message_id}`);
        wonderQ.deleteMessage(data.message_id);
        client.emit('messageConsumed', `Message ${data.message_id} has been consumed.`)
        inspectorID.forEach((client) => {
            io.to(client.id).emit('info', `Consumer ${data.id} is consuming message ${data.message_id}`);
        });
        
    })

    client.on('getMessages',(data)=>{
        console.log(`Consumer ${data} is requesting messages`);
        const messages = wonderQ.getStore();
        console.log(messages);
        client.emit('sendingMessages',messages);
        
        inspectorID.forEach((client) => {
            io.to(client.id).emit('info', `Consumer ${data} is requesting messages: ${JSON.stringify(messages)}`);
        });
    })
})

server.listen(3000);
console.log('Server listening on Port:3000');