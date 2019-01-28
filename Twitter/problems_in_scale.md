
# PROBLEMS

- Number of reads (people browsing timelines) are much higher compared to number of writes (people tweeting). 

- It is 3lac queries per seconds for reads vs. 6K queries per seconds for writes.

- There will be more than 500-600B documents in the "Tweet" collection, which will make the size of the database more than a few petabytes in size.

- Each tweet is 140 chars = 560 bytes.

- Total size approx. = 500 x 109 x 560 = 280 x 1012 = 280 petabytes.

- There are approx. 200-300M users registered and each user on an average will have 100-200 followers. 

- These number is highly skewed as celebrities will have followers in millions. The number of pairwise documents in the "Follower" Collection would be approx. 100B.

- "Fetching the required user_ids from the "Follower" collection, then fetching all tweets for each user_id and then combining and sorting those tweets based on createdAt and then sending it over the HTTP service, could take well over few minutes for the timeline to be populated and displayed to the user."

- Maintaining such large databases on a single machine is a big problem. They can fail and with it will bring down entire site down.

- Vertical scalability is another problem. More than >1 lac users can be simulateneously accessing their timelines and for each user the combined size of all tweets to be sorted can be greater than 100 MB. Thus for 100K user, this comes to around 10TB of RAM.

# SOLUTIONS

- The problem with large databases can be solved using "sharding" and "replicating".

- Basically this means that partition a large table into blocks (based on time_posted or user_id etc.) and then store each partition on different servers. Additionally replicate the data on each server 3-4 times. Now even if one partition fails, it will not bring down the entire DB. Plus since we have replica of this partition already, we can do a failover to one of the replicas.
To read from sharded tables, one needs to know which database servers we need to access in order to access all the necessary rows of data for the query.

- "Database Sharding"*(Zone sharding)

For e.g. if the Tweet Collection is partitioned on createdAt, then searching all documents on the key 'user', will probably require to access all DB servers because an user can post tweet every day. Whereas if the Collection was partitioned on 'user', then accessing the server corresponding to the 'user' will be enough. Thus one needs to select the shard key carefully.
To enable faster location of the database servers corresponding to the shard key, one can use consistent hashing, i.e. mapping of the shard key to the DB server, such that even if that DB server fails, it will not effect the mapping.


- "Push based approach rather than pull based approach"

Computing the tweets to be shown on the timeline of the logged in user, when the user requests his/her home page is known as Pull based mechanism, because the user is requesting his timeline. We have seen that this method of computing timeline at real-time has its drawbacks and will lead to very high latency, because there are approx. 3 lac queries per second for timelines.

We know the fact that there are only 6K write requests per second as compared to 3 lac read requests per second.

The other method is the Push based mechanism, where instead of computing the timeline during read time, the timelines for users are computed during writes.

Gist - Whenever a user posts a tweet, the tweet is inserted into the timelines of all his/her followers. But how the timelines are stored ? 
Each user's timeline is stored in an in-memory database like "Redis". Whenever a new tweet comes from a 'user', the "Follower" Collection is scanned for all followers of 'user', then based on the user of the followers, determine all the Redis clusters corresponding to these user_ids. 
Each Redis cluster implements a limited size queue, i.e. only the recent 1000 tweets that needs to be shown in the timeline.

Next problem - We are doing some operation every once when a user is posting a tweet which can also slow response time of post api.To enhance the user experience here and make is almost real-time,we can user some messaging service like kafka of RabbitMQ.