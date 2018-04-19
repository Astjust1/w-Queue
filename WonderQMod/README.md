WonderQ Module
======
    
The module should be a node/express application that uses web sockets to handle producer/consumer interactions. You could also use http for producers,but I don't see the need to split that up separately.

Using Web sockets also makes sense because of the nature of the system. For example the word "notify" is used to describe a certain interaction, and personally that signifies the use of a pub/sub model.

The module has a singular map (messageStore) in place of a database that would normally be written to and read from. But all else I believe should be stored within the module itself. The server in that case will act as a layer between the database and the clients and handle the records being processed and the logic that goes along with that, it will also handle writes and deletes.

