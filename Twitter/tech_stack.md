# Tech Stack

## Language : 
A language which can primarily handle a million requests per second and must have support for external libraries like connection to various databases,must be good with messaging services,must have a good authentication mechanism,must be great when it comes to asynchronous programming.
- **candidates :** Node.js, Python, Scala.
- **My choice :** *Node.js* - why? 
	1 past experience with it.
	2 Really awesome with async programming and thanks to the event loop, a server can handle a million requests without blocking I/O.
	3 It is has a good support for external tools for task delication.

## Databases : 
Twitter is read heavy as well as write heavy application.But number of reads are much higher compared to number of writes. It's ~3 lac queries per seconds for reads vs. 6K queries per seconds for writes.
Let's talk about the space required for the application as well.

- no of tweets per day = 500 mn
- Each Tweet = 140 char = 560 bytes
- Total size for each day = 100 x 10^6 x 560 = 28 x 10^10
- Total size for 1 yr = 28 x 10^10 x 365 = 102 Tb

*Considering all this.*
I would choose **MongoDB** for following reasons :
- Joins on normalised tables as in relational SQL is computationally memory intensive, better to de-normalize data into NoSQL DB's like MongoDB or Cassandra.

- We don't have to worry about unique Ids called ObjectIds of documents even when it comes to scaling.MongoDB generated a 12 digit unique id for each document which is a constituent of 4 parts namely Timestamp,Machine Id ,Process Id,Increment

- Dynamic Schema

- Easy to Scale because of it's tons of features like sharding(zone sharding more specifically),Indexing,Special collection types,Powerful aggregation and aggregation pipeline etc.

- I'm more experienced with MongoDB and by choosing this I can further with the discussion.

## Tools and Server : 
- Definitely we would like to have some caching mechanism and services for faster fetch.**Memcached or Redis.**
- Secondly for writes we will definitly have some after operations which are not immidiately needed in the response.These operations can be done sometimes later.For this we will need some job scheduling mechanism, messaging service like **RabbitMQ,kafka** can be used.
