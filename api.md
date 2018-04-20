WonderQ API
====

I'm going to take a stab at this, I've never designed a websocket protocol before. I'm going to continue to use the design of socket.io

## Connection:

params: URL => the url of the server being connected to.

```
  const socket = io.connect(URL)

```

## Handlers:
` socket.on('event',function(data){})`

 - connect
    
    - returns nothing

- messageAdded

    - returns: a `string` describing the message that was added

- messageConsumed

    - returns: a `string` describing the message consumed

- info

    - returns: a `string` describing what happens within the queue (only to inspectors)

- sendingMessages

    - returns: `{message.id,message.text}`messages ready to be processed 


## Emitters
` socket.emit('event',data)`

- join

    - param: `{text:message to server, id: socket.id, type: type of client}` (type is either producer, consumer,inspector) default: inspector

- addingMessage

    - param: `{text:message,id:socket.id,duration:time till expiry}`

- getMessages

    - param: `socket.id`

- consume
    - param: `{message_id:id of message to process,id:socket.id}`
