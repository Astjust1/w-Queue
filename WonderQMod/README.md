WonderQ Module
======
    
The module should be a node/express application that uses web sockets to handle producer/consumer interactions. You could also use http for producers,but I don't see the need to split that up separately.

Using Web sockets also makes sense because of the nature of the system. For example the word "notify" is used to describe a certain interaction, and personally that signifies the use of a pub/sub model.

The module should have a Singular queue in place of a database that would normally be written to and read from

