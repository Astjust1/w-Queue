Getting Started
======

- Run `npm install` in the home directory
- To Start the server, run `npm run server`

Demonstration
-----

I know that an app was asked for, that generated messages automatically.
But I thought it would be more fun to build some quick and dirty html pages,
so that it could be interactive. Next step for fun is to learn react and build 
a react based front end for this.

Those are located in Driver/ as consumer.html and producer.html

Inspector
----

The inspector is run with:
`npm run inspect`
Multiple inspectors can be run, all interactions are broadcasted to the inspector on the command line.

How I would go about scaling this?
-----
Well, There's a lot that goes into it. First decision, is what data storage medium to use. Personally, I believe mongoDB
or another form of NoSQL database would be the best choice here, for a few reasons. One, it'll free us up to store more types of data
instead of just strings. Two, NoSQL databases are much easier to scale. Secondly, in terms of hosting platform, I think the decision turns
more to cost than anything. AWS seems to be the most popular and reliable so lets go with that. I don't think I would change much about
the logic itself, but I would add some sort of message queue like RabbitMQ to act as a load balancer. Maybe even take the container route 
and use docker + kubernetes. As for the language stack, I'd most definitely like to use typescript. I haven't used it before, but I think
it carries some benefits that will make life easier in the long run. And for a frontend framework, it doesn't really matter. As long as the 
backend is flexible the frontend can be a mobile app in Objective C or a web app written with React.

## Api
The api design is in file /api.md